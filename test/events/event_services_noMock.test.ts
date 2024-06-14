import { Event } from '../../src/events/event';
import { EventService } from '../../src/events/event_service';
import * as mongo from "mongodb";

describe('EventService', () => {
    let eventService: EventService;
    let event: Event;

    beforeAll(() => {
        eventService = new EventService();
        event = {
            _id: undefined,
            creator: "testman",
            name: "testevent",
            title: "big party",
            description: "this is a big party where we test our event service",
            tags: ["test", "party", "event"],
            genre_or_atmosphere: "happy (if the test works. otherwise angry)",
            location: [69,42],
            address: "my room",
            date_and_time: null,
            pictures: null
        }
    });

    beforeEach(() => {
    });

    afterEach(() => {
    });

    test('should create a new event', async () => {

        const createdEvent = await eventService.createEvent(event);
        expect(createdEvent).toBeDefined();
        expect(createdEvent._id).toBeDefined();
        event._id = createdEvent._id
    });

    test('should get event by id', async () => {

        const retrievedEvent = await eventService.getEvent(event._id);
        expect(retrievedEvent).toEqual(event);
    });

    test('should fail to create an event with an existing id', async () => {
        const newEvent = { _id: new mongo.ObjectId(), name: 'newevent' } as Event;

        await expect(eventService.createEvent(newEvent)).rejects.toThrow('_id should be undefined when creating a new event. Did you want to update the event?');
    });

    test('should update an event', async () => {
        const eventId = event._id;
        const valuesToUpdate = { name: 'updatedEvent' } as Event;

        const updatedEvent = await eventService.updateEvent(eventId, valuesToUpdate);
        expect(updatedEvent._id).toEqual(eventId);
        expect(updatedEvent.name).toEqual("updatedEvent");
        event = updatedEvent;
    });

    test('should fail to update a non-existent event', async () => {
        const eventId = new mongo.ObjectId();
        const valuesToUpdate = { name: 'updatedEvent' } as Event;

        await expect(eventService.updateEvent(eventId, valuesToUpdate)).rejects.toThrow(`No Event with id ${eventId.toString()} found.`);
    });

    test('should delete an event', async () => {
        const eventId = event._id;

        const deletedEvent = await eventService.deleteEvent(eventId);
        expect(deletedEvent).toEqual(event);
    });

    test('should fail to delete a non-existent event', async () => {
        const eventId = new mongo.ObjectId();

        await expect(eventService.deleteEvent(eventId)).rejects.toThrow(`Delete failed: Event with id ${eventId.toString()} not found.`);
    });
});
