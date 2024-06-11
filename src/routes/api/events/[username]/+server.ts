import { EventController } from '../../../../events/event_controller';
import type { Event } from "../../../../events/event";

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

//Returns all Events from a User
export const GET: ({request}: { request: any }) => Promise<Response> = async ({ request }) => {
    try {
        const body = await request.json();
        const token = extractToken(request.headers)
        const username = extractUsername(request.headers)

        if (!token)
            return new Response(JSON.stringify("No token provided"), {status: 401});

        if (!username)
            return new Response(JSON.stringify("No Username to get Events"), {status: 401})

        const controller = new EventController();
        const events = await controller.getAllEventsFromUser(username);

        return new Response(JSON.stringify(events), {status: 200})
    } catch (error) {
        return new Response(JSON.stringify({ error: 'Failed to fetch events' }), { status: 500 });
    }
}