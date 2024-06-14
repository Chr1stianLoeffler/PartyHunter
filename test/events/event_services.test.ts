import { EventService } from '../../src/events/event_service';
import * as mongo from 'mongodb';
import { configDotenv } from 'dotenv';

jest.mock('dotenv');
jest.mock('mongodb');

describe('EventService', () => {
    let eventService: EventService;
    let mockCollection: jest.Mocked<mongo.Collection>;
    let mockDb: jest.Mocked<mongo.Db>;
    let mockClient: jest.Mocked<mongo.MongoClient>;

    beforeAll(() => {
        process.env.CONNECTION_STRING = 'mongodb://test:test@localhost:27017/testdb';
    });

    beforeEach(() => {
        configDotenv.mockImplementation(() => {});
        mockCollection = {
            findOne: jest.fn(),
            insertOne: jest.fn(),
            updateOne: jest.fn(),
            findOneAndDelete: jest.fn(),
        } as unknown as jest.Mocked<mongo.Collection>;

        mockDb = {
            collection: jest.fn().mockReturnValue(mockCollection),
        } as unknown as jest.Mocked<mongo.Db>;

        mockClient = {
            db: jest.fn().mockReturnValue(mockDb),
            close: jest.fn(),
        } as unknown as jest.Mocked<mongo.MongoClient>;

        mongo.MongoClient.connect = jest.fn().mockResolvedValue(mockClient);
        eventService = new EventService();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('should initialize mongoUrl from environment variables', () => {
        expect(eventService.mongoUrl).toBe(process.env.CONNECTION_STRING);
    });

    test('should get event by id', async () => {
        const eventId = new mongo.ObjectId();
        const expectedEvent = { _id: eventId, name: 'testevent' };
        mockCollection.findOne.mockResolvedValue(expectedEvent);

        const event = await eventService.getEvent(eventId);

        expect(mockCollection.findOne).toHaveBeenCalledWith({ _id: eventId });
        expect(event).toEqual(expectedEvent);
    });

    test('should create a new event', async () => {
        const newEvent = { name: 'newevent' } as Event;
        const insertedId = new mongo.ObjectId();
        mockCollection.insertOne.mockResolvedValue({ acknowledged: true, insertedId });

        const createdEvent = await eventService.createEvent(newEvent);

        expect(mockCollection.insertOne).toHaveBeenCalledWith(newEvent);
        expect(createdEvent._id).toBe(insertedId);
    });

    test('should fail to create an event with an existing id', async () => {
        const newEvent = { _id: new mongo.ObjectId(), name: 'newevent' } as Event;

        await expect(eventService.createEvent(newEvent)).rejects.toThrow('_id should be undefined when creating a new event. Did you want to update the event?');
    });

    test('should update an event', async () => {
        const eventId = new mongo.ObjectId();
        const valuesToUpdate = { name: 'updatedEvent' } as Event;
        const expectedEvent = { _id: eventId, ...valuesToUpdate };
        mockCollection.updateOne.mockResolvedValue({ modifiedCount: 1 });
        mockCollection.findOne.mockResolvedValue(expectedEvent);

        const updatedEvent = await eventService.updateEvent(eventId, valuesToUpdate);

        expect(mockCollection.updateOne).toHaveBeenCalledWith({ _id: eventId }, { $set: valuesToUpdate });
        expect(updatedEvent).toEqual(expectedEvent);
    });

    test('should fail to update a non-existent event', async () => {
        const eventId = new mongo.ObjectId();
        const valuesToUpdate = { name: 'updatedEvent' } as Event;
        mockCollection.updateOne.mockResolvedValue({ modifiedCount: 0 });

        await expect(eventService.updateEvent(eventId, valuesToUpdate)).rejects.toThrow(`No Event with id ${eventId.toString()} found.`);
    });

    test('should delete an event', async () => {
        const eventId = new mongo.ObjectId();
        const expectedEvent = { _id: eventId, name: 'testevent' };
        mockCollection.findOneAndDelete.mockResolvedValue(expectedEvent);

        const deletedEvent = await eventService.deleteEvent(eventId);

        expect(mockCollection.findOneAndDelete).toHaveBeenCalledWith({ _id: eventId });
        expect(deletedEvent).toEqual(expectedEvent);
    });

    test('should fail to delete a non-existent event', async () => {
        const eventId = new mongo.ObjectId();
        mockCollection.findOneAndDelete.mockResolvedValue(null);

        await expect(eventService.deleteEvent(eventId)).rejects.toThrow(`Delete failed: Event with id ${eventId.toString()} not found.`);
    });
});
