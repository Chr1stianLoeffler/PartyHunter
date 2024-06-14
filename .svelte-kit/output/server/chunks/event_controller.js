import * as mongo from "mongodb";
import { ObjectId } from "mongodb";
import { configDotenv } from "dotenv";
import jwt from "jsonwebtoken";
import { Get, SuccessResponse, Response, Post, Body, Header, Put, Delete, Route } from "tsoa";
class EventService {
  mongoUrl;
  constructor() {
    configDotenv();
    this.mongoUrl = process.env.CONNECTION_STRING;
  }
  verifyJwt(token) {
    if (!token)
      throw new Error("No token provided");
    console.log(token);
    const verified = jwt.verify(token, process.env.SECRET_KEY);
    return verified.username;
  }
  async collection() {
    const client = await mongo.MongoClient.connect(this.mongoUrl);
    const collection = client.db("PartyHunterDB").collection("Events");
    return collection;
  }
  async getEvent(eventId) {
    const coll = await this.collection();
    return coll.findOne({ "_id": eventId });
  }
  async getAllEvents() {
    const coll = await this.collection();
    return coll.find().toArray();
  }
  async getAllEventsFromUser(username) {
    const coll = await this.collection();
    return coll.find({ "creator": username }).toArray();
  }
  async createEvent(toCreate, token) {
    if (this.verifyJwt(token) !== toCreate.creator)
      return Promise.reject(new Error("Create failed: Unauthorized"));
    if (toCreate._id !== void 0)
      return Promise.reject(new Error("_id should be undefined when creating a new event. Did you want to update the event?"));
    const coll = await this.collection();
    const insertResult = await coll.insertOne(toCreate);
    const event = new Promise((res, rej) => {
      if (insertResult.acknowledged === true) {
        toCreate._id = insertResult.insertedId;
        res(toCreate);
      }
      rej(new Error("Something went wrong while trying to create event: " + JSON.stringify(toCreate)));
    });
    return event;
  }
  async updateEvent(eventId, valuesToUpdate, token) {
    const referencedEvent = await this.getEvent(eventId);
    if (!referencedEvent)
      return Promise.reject(new Error("Event not found"));
    if (this.verifyJwt(token) !== referencedEvent.creator)
      return Promise.reject(new Error("Update failed: Unautorized"));
    const coll = await this.collection();
    const update_result = await coll.updateOne({ "_id": eventId }, { $set: valuesToUpdate });
    if (update_result.modifiedCount !== 1)
      return Promise.reject(new Error("No Event with id " + eventId.toString() + " found."));
    return this.getEvent(eventId);
  }
  async deleteEvent(eventId, token) {
    const referencedEvent = await this.getEvent(eventId);
    if (!referencedEvent)
      return Promise.reject(new Error("Event not found"));
    if (this.verifyJwt(token) !== referencedEvent.creator)
      return Promise.reject(new Error("Update failed: Unautorized"));
    const coll = await this.collection();
    const delete_result = await coll.findOneAndDelete({ "_id": eventId });
    const event = new Promise((res, rej) => {
      if (delete_result)
        res(delete_result);
      else
        rej(new Error("Delete failed: Event with id " + eventId.toString() + " not found."));
    });
    return event;
  }
}
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp(target, key, result);
  return result;
};
var __decorateParam = (index, decorator) => (target, key) => decorator(target, key, index);
let EventController = class {
  async getAllEvents() {
    return new EventService().getAllEvents();
  }
  async getEvent(eventId) {
    return new EventService().getEvent(new ObjectId(eventId));
  }
  async getAllEventsFromUser(username) {
    return new EventService().getAllEventsFromUser(username);
  }
  async createEvent(requestBody, token) {
    return new EventService().createEvent(requestBody, token);
  }
  async updateEvent(eventId, requestBody, token) {
    return new EventService().updateEvent(new ObjectId(eventId), requestBody, token);
  }
  async deleteEvent(eventId, token) {
    return new EventService().deleteEvent(new ObjectId(eventId), token);
  }
};
__decorateClass([
  Get(),
  SuccessResponse(200, "OK"),
  Response(404, "NOT FOUND")
], EventController.prototype, "getAllEvents", 1);
__decorateClass([
  Get("{eventId}"),
  SuccessResponse(200, "OK"),
  Response(404, "NOT FOUND")
], EventController.prototype, "getEvent", 1);
__decorateClass([
  Get("{username}"),
  SuccessResponse(200, "OK"),
  Response(404, "NOT FOUND")
], EventController.prototype, "getAllEventsFromUser", 1);
__decorateClass([
  Post(),
  SuccessResponse(201, "Created"),
  Response(401, "Unauthorized"),
  Response(403, "Forbidden"),
  __decorateParam(0, Body()),
  __decorateParam(1, Header("Authorization"))
], EventController.prototype, "createEvent", 1);
__decorateClass([
  Put("{eventId}"),
  SuccessResponse(200, "OK"),
  Response(404, "NOT FOUND"),
  Response(401, "Unauthorized"),
  Response(403, "Forbidden"),
  __decorateParam(1, Body()),
  __decorateParam(2, Header("Authorization"))
], EventController.prototype, "updateEvent", 1);
__decorateClass([
  Delete("{eventId}"),
  SuccessResponse(200, "OK"),
  Response(404, "NOT FOUND"),
  Response(401, "Unauthorized"),
  Response(403, "Forbidden"),
  __decorateParam(1, Header("Authorization"))
], EventController.prototype, "deleteEvent", 1);
EventController = __decorateClass([
  Route("events")
], EventController);
export {
  EventController as E
};
