import { configDotenv } from "dotenv";
import { type User, type UserWithPass } from "./user";
import * as mongo from "mongodb";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


export class UserService {
    mongoUrl: string;
    userProjection: any;
    
    
    constructor() {
        configDotenv()
        this.mongoUrl = process.env.CONNECTION_STRING as string;
        this.userProjection = {
            _id: 1,
            username: 1,
            accountEmail: 1,
            description: 1,
            accountType: 1,
            contact: 1,
        }
    }

    private verifyJwt(token:string|null): string {
        if(!token) throw new Error("No token provided");
        
        const verified = jwt.verify(token, process.env.SECRET_KEY as string) as unknown as {username: string};
        return verified.username;
    }

    private async collection(): Promise<mongo.Collection<UserWithPass>> {
        const client = await mongo.MongoClient.connect(this.mongoUrl);
        const collection = client.db("PartyHunterDB").collection<UserWithPass>("Users")
        return collection;
    }

    public async getUserId(userId:mongo.ObjectId): Promise<User | null> {       //returns User if user was found and null if no user was found
        const coll = await this.collection();
        return coll.findOne({"_id": userId},{projection: this.userProjection});
    }

    public async getUserName(name:string): Promise<User | null> {
        const coll = await this.collection();
        return coll.findOne({"username": name},{projection: this.userProjection});
    }

    public async getUserEmail(email:string): Promise<User | null> {
        const coll = await this.collection();
        return coll.findOne({"accountEmail": email},{projection: this.userProjection});
    }

    private async createUser(toCreate: UserWithPass): Promise<User> {   //takes a user (without _id property), checks whether username or email is taken and if not, creates the user and returns it
        if(toCreate._id !== undefined)
            return Promise.reject(new Error("_id should be undefined when creating a new user. Did you want to update the user?"))
        if(await this.getUserName(toCreate.username))
            return Promise.reject(new Error("Username already taken."))
        if(await this.getUserEmail(toCreate.accountEmail)) 
            return Promise.reject(new Error("Email already in use: " + toCreate.accountEmail))
        
        const coll = await this.collection();
        const insertResult: mongo.InsertOneResult = await coll.insertOne(toCreate);
        const userWithoutPassword: User = {     //turn UserWithPass into normal User without Typescript crying
            _id: toCreate._id,
            username: toCreate.username,
            accountEmail: toCreate.accountEmail,
            description: toCreate.description,
            accountType: toCreate.accountType,
            contact: toCreate.contact
        };
        const user = new Promise<User>((res,rej) => {
            if(insertResult.acknowledged === true) {
                userWithoutPassword._id = insertResult.insertedId;
                res(userWithoutPassword);
            }
            rej(new Error("Something went wrong while trying to create User: " + JSON.stringify(userWithoutPassword)));
        })
        return user;
    }

    public async updateUser(name: string, valuesToUpdate: User, token:string|null): Promise<User | null> {   //toUpdate should have the form {property1 : "new value", property2 : "new value"}
        if(this.verifyJwt(token) !== name)
            return Promise.reject(new Error("Update failed: Unauthorized"));
        const coll = await this.collection();
        const update_result: mongo.UpdateResult = await coll.updateOne({"username": name}, {$set: valuesToUpdate});
        if(update_result.modifiedCount !== 1)
            return Promise.reject(new Error("User update failed: No User with Username " + name + " found."))
        return this.getUserName(name);
    }

    public async deleteUser(name: string, token:string|null): Promise<User> {  //deletes user and returns the deleted user (in case the data is needed one last time)
        if(this.verifyJwt(token) !== name)
            return Promise.reject(new Error("Delete failed: Unauthorized"));
        const coll = await this.collection();
        const delete_result: User | null = await coll.findOneAndDelete({"username": name},{projection: this.userProjection});
        const user = new Promise<User>((res, rej) => {
            if(delete_result)   res(delete_result);
            else                rej(new Error("Delete failed: User with name " + name + " not found."));
        })
        return user;
    }

    public async registerUser(newUser: UserWithPass): Promise<{user:User, token:string}> {
        const plainPass = newUser.password;
        const passwordHash = await bcrypt.hash(plainPass, 10);
        newUser.password = passwordHash;
        await this.createUser(newUser);

        return this.loginUser(newUser.username, plainPass);
    }

    public async loginUser(nameOrEmail:string, password:string): Promise<{user:User, token:string}> { //User with token somehow
        const coll = await this.collection();
        const query = {
            $or: [
                { "username": nameOrEmail },
                { "accountEmail": nameOrEmail }
            ]
        };
        const user = await coll.findOne(query);
        if(!user)
            return Promise.reject(new Error("Login failed: Incorrect username or password!"));
        const isValid = await bcrypt.compare(password, user.password);
        if(!isValid)
            return Promise.reject(new Error("Login failed: Incorrect username or password!"));

        const token = jwt.sign({ username: user.username }, process.env.SECRET_KEY as string, { expiresIn: process.env.EXPIRATION_TIME });

        const userWithoutPassword: User = {     //turn UserWithPass into normal User without Typescript crying
            _id: user._id,
            username: user.username,
            accountEmail: user.accountEmail,
            description: user.description,
            accountType: user.accountType,
            contact: user.contact
        };

        return Promise.resolve({user:userWithoutPassword, token:token});
    }
}
