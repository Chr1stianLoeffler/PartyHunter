import type { RequestHandler } from '@sveltejs/kit';
import { EventController } from '../../../events/event_controller';
import {ObjectId} from "mongodb";
import type { Event } from "../../../events/event";
import { log } from 'console';

function extractToken(headers: Headers): string | null {
    const authHeader = headers.get('authorization');
    if (!authHeader) return null;
    const token = authHeader.split(' ')[1]; // Bearer token
    return token;
}

function extractUsername(headers: Headers): string | null {
    const authHeader = headers.get('username');
    if (!authHeader) return null;
    const username = authHeader.split(' ')[1]; // Bearer token
    return username;
}

function extractEventId(headers: Headers): string | null {
    const authHeader = headers.get('eventId');
    if (!authHeader) return null;
    const eventId = authHeader.split(' ')[1]; // Bearer token
    return eventId;
}

export const POST: ({request}: { request: any }) => Promise<Response> = async ({ request }) => {
    try {
        const body = await request.json();
        const token = extractToken(request.headers)
        const username = extractUsername(request.headers)
        if(!token)
            return new Response(JSON.stringify("No token provided"), {status: 401});

        const { eventName, eventDate, eventLocation, eventDescription } = body;

        const eventDetails = {
            _id: undefined,
            creator: username,
            name: eventName,
            tags: undefined,
            title: undefined,
            genre_or_atmosphere: undefined,
            description: eventDescription,
            date_and_time: eventDate,
            location: eventLocation,
            address: undefined,
            pictures: undefined
        } as Event

        const controller = new EventController();
        const newEvent = await controller.createEvent(eventDetails, token);

        return new Response(JSON.stringify(newEvent), {status: 201});
    } catch (error:any) {
        if (error.message.includes("Create failed: Unauthorized"))
            return new Response(JSON.stringify({body: {error: error}}), {status: 401})
        return new Response(JSON.stringify({body: { error: 'Failed to create Event' }}), {status:500});
    }
};

export const GET: () => Promise<Response> = async () => {
    try {
        const controller = new EventController();
        const events: Event[] = await controller.getAllEvents();
        return new Response(JSON.stringify(events), {status: 200})
    } catch (error) {
        console.log(error)
        return new Response(JSON.stringify({ error: 'Failed to fetch events' }), { status: 500 });
    }
}

export const PUT: ({request}: { request: any }) => Promise<Response> = async ({ request }) => {
    try {
        const body = await request.json();
        const token = extractToken(request.headers)
        const username = extractUsername(request.headers)
        const eventId = extractEventId(request.headers)
        if(!token)
            return new Response(JSON.stringify({body: "No token provided"}), {status: 401});

        if(!eventId)
            return new Response(JSON.stringify({body: "No EventID provided"}), {status: 400});

        const { eventName, eventDate, eventLocation, eventDescription } = body;

        const eventDetails = {
            _id: undefined,
            creator: username,
            name: eventName,
            tags: undefined,
            title: undefined,
            genre_or_atmosphere: undefined,
            description: eventDescription,
            date_and_time: eventDate,
            location: eventLocation,
            address: undefined,
            pictures: undefined
        } as Event

        const controller = new EventController();
        const newEvent = await controller.updateEvent(eventId, eventDetails, token);

        return new Response(JSON.stringify(newEvent), {status: 201});
    } catch (error: any) {
        if(error.message.includes("Update failed: Unautorized"))
            return new Response(JSON.stringify({body: error.message}), {status: 401})
        else if (error.message.includes("No Event with id "))
            return new Response(JSON.stringify({body: error.message}), {status: 404})
        return new Response(JSON.stringify({ error: 'Failed to fetch events' }), { status: 500 });
    }
}