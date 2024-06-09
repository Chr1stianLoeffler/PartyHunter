import type { RequestHandler } from '@sveltejs/kit';
import { EventController } from '../../../events/event_controller';

function extractToken(headers: Headers): string | null {
    const authHeader = headers.get('Authorization');
    if (!authHeader) return null;
    const token = authHeader.split(' ')[1]; // Bearer token
    return token;
}

export const POST: ({request}: { request: any }) => Promise<Response> = async ({ request }) => {
    try {
        const body = await request.json();
        const token = extractToken(request.headers)
        if(!token)
            throw new Error("No token provided");
        const controller = new EventController();
        const newEvent = await controller.createEvent(body,token);
        console.log("The Event should be created")

        return new Response(JSON.stringify(newEvent), {status: 201});
    } catch (error) {
        return new Response(JSON.stringify({body: { error: 'Failed to create Event' }}), {status:500});
    }
};