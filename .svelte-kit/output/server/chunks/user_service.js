import { configDotenv } from "dotenv";
import * as mongo from "mongodb";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
class UserService {
  mongoUrl;
  userProjection;
  constructor() {
    configDotenv();
    this.mongoUrl = process.env.CONNECTION_STRING;
    this.userProjection = {
      _id: 1,
      username: 1,
      accountEmail: 1,
      description: 1,
      accountType: 1,
      contact: 1
    };
  }
  verifyJwt(token) {
    if (!token)
      throw new Error("No token provided");
    const verified = jwt.verify(token, process.env.SECRET_KEY);
    return verified.username;
  }
  async collection() {
    const client = await mongo.MongoClient.connect(this.mongoUrl);
    const collection = client.db("PartyHunterDB").collection("Users");
    return collection;
  }
  async getUserId(userId) {
    const coll = await this.collection();
    return coll.findOne({ "_id": userId }, { projection: this.userProjection });
  }
  async getUserName(name) {
    const coll = await this.collection();
    return coll.findOne({ "username": name }, { projection: this.userProjection });
  }
  async getUserEmail(email) {
    const coll = await this.collection();
    return coll.findOne({ "accountEmail": email }, { projection: this.userProjection });
  }
  async createUser(toCreate) {
    if (toCreate._id !== void 0)
      return Promise.reject(new Error("_id should be undefined when creating a new user. Did you want to update the user?"));
    if (await this.getUserName(toCreate.username))
      return Promise.reject(new Error("Username already taken."));
    if (await this.getUserEmail(toCreate.accountEmail))
      return Promise.reject(new Error("Email already in use: " + toCreate.accountEmail));
    const coll = await this.collection();
    const insertResult = await coll.insertOne(toCreate);
    const userWithoutPassword = {
      //turn UserWithPass into normal User without Typescript crying
      _id: toCreate._id,
      username: toCreate.username,
      accountEmail: toCreate.accountEmail,
      description: toCreate.description,
      accountType: toCreate.accountType,
      contact: toCreate.contact
    };
    const user = new Promise((res, rej) => {
      if (insertResult.acknowledged === true) {
        userWithoutPassword._id = insertResult.insertedId;
        res(userWithoutPassword);
      }
      rej(new Error("Something went wrong while trying to create User: " + JSON.stringify(userWithoutPassword)));
    });
    return user;
  }
  async updateUser(name, valuesToUpdate, token) {
    if (this.verifyJwt(token) !== name)
      return Promise.reject(new Error("Update failed: Unauthorized"));
    const coll = await this.collection();
    const update_result = await coll.updateOne({ "username": name }, { $set: valuesToUpdate });
    if (update_result.modifiedCount !== 1)
      return Promise.reject(new Error("User update failed: No User with Username " + name + " found."));
    return this.getUserName(name);
  }
  async deleteUser(name, token) {
    if (this.verifyJwt(token) !== name)
      return Promise.reject(new Error("Delete failed: Unauthorized"));
    const coll = await this.collection();
    const delete_result = await coll.findOneAndDelete({ "username": name }, { projection: this.userProjection });
    const user = new Promise((res, rej) => {
      if (delete_result)
        res(delete_result);
      else
        rej(new Error("Delete failed: User with name " + name + " not found."));
    });
    return user;
  }
  async registerUser(newUser) {
    const plainPass = newUser.password;
    const passwordHash = await bcrypt.hash(plainPass, 10);
    newUser.password = passwordHash;
    await this.createUser(newUser);
    return this.loginUser(newUser.username, plainPass);
  }
  async loginUser(nameOrEmail, password) {
    const coll = await this.collection();
    const query = {
      $or: [
        { "username": nameOrEmail },
        { "accountEmail": nameOrEmail }
      ]
    };
    const user = await coll.findOne(query);
    if (!user)
      return Promise.reject(new Error("Login failed: Incorrect username or password!"));
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid)
      return Promise.reject(new Error("Login failed: Incorrect username or password!"));
    const token = jwt.sign({ username: user.username }, process.env.SECRET_KEY, { expiresIn: process.env.EXPIRATION_TIME });
    const userWithoutPassword = {
      //turn UserWithPass into normal User without Typescript crying
      _id: user._id,
      username: user.username,
      accountEmail: user.accountEmail,
      description: user.description,
      accountType: user.accountType,
      contact: user.contact
    };
    return Promise.resolve({ user: userWithoutPassword, token });
  }
}
export {
  UserService as U
};
