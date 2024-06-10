import { configDotenv } from "dotenv";
import { type Event } from "./event";
import * as mongo from "mongodb";
import jwt from "jsonwebtoken";

export class EventService {
    mongoUrl: string;

    constructor() {
        configDotenv()
        this.mongoUrl = process.env.CONNECTION_STRING as string;
    }

    private verifyJwt(token:string): string {
        if(!token) throw new Error("No token provided");
        console.log(token)
        const verified = jwt.verify(token, process.env.SECRET_KEY as string) as unknown as {username: string};
        return verified.username;
    }

    private async collection(): Promise<mongo.Collection<Event>>{
        const client = await mongo.MongoClient.connect(this.mongoUrl);
        const collection = client.db("PartyHunterDB").collection<Event>("Events")
        return collection;
    }

    public async getEvent(eventId: mongo.ObjectId): Promise<Event|null> {
        const coll = await this.collection();
        return coll.findOne({ "_id": eventId });
    }

    public async createEvent(toCreate: Event, token:string): Promise<Event> {
        if (this.verifyJwt(token) !== toCreate.creator)
            return Promise.reject(new Error("Create failed: Unauthorized"))
        if (toCreate._id !== undefined)
            return Promise.reject(new Error("_id should be undefined when creating a new event. Did you want to update the event?"));

        const coll = await this.collection();
        const insertResult: mongo.InsertOneResult = await coll.insertOne(toCreate);
        const event = new Promise<Event>((res, rej) => {
            if (insertResult.acknowledged === true) {
                toCreate._id = insertResult.insertedId;
                res(toCreate);
            }
            rej(new Error("Something went wrong while trying to create event: " + JSON.stringify(toCreate)));
        })
        return event;
    }

    public async updateEvent(eventId: mongo.ObjectId, valuesToUpdate: Event, token:string): Promise<Event|null> {  //toUpdate should have the form {property1 : "new value", property2 : "new value"}
        const referencedEvent = await this.getEvent(eventId);
        if(!referencedEvent)
            return Promise.reject(new Error("Event not found"));
        if(this.verifyJwt(token) !== (referencedEvent).creator)
            return Promise.reject(new Error("Update failed: Unautorized"));
        const coll = await this.collection();
        const update_result: mongo.UpdateResult = await coll.updateOne({ "_id": eventId }, { $set: valuesToUpdate });
        if (update_result.modifiedCount !== 1)
            return Promise.reject(new Error("No Event with id " + eventId.toString() + " found."));
        return this.getEvent(eventId);
    }

    public async deleteEvent(eventId: mongo.ObjectId, token:string): Promise<Event> {
        const referencedEvent = await this.getEvent(eventId);
        if(!referencedEvent)
            return Promise.reject(new Error("Event not found"));
        if(this.verifyJwt(token) !== (referencedEvent).creator)
            return Promise.reject(new Error("Update failed: Unautorized"));
        const coll = await this.collection();
        const delete_result: Event|null = await coll.findOneAndDelete({ "_id": eventId });
        const event = new Promise<Event>((res, rej) => {
            if (delete_result) res(delete_result);
            else rej(new Error("Delete failed: Event with id " + eventId.toString() + " not found."));
        })
        return event;
    }
}