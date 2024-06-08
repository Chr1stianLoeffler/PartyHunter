import type { RequestHandler } from '@sveltejs/kit';
import { EventController } from '../../../events/event_controller';

function extractToken(headers: Headers): string | null {
    const authHeader = headers.get('Authorization');
    if (!authHeader) return null;
    const token = authHeader.split(' ')[1]; // Bearer token
    return token;
}

export const POST: RequestHandler = async ({ request }) => {
    try {
        const body = await request.json();
        const token = extractToken(request)
        const controller = new EventController();
        const newUser = await controller.createEvent(body);
        console.log("The Event should be created")

        return {
            status: 201,
            body: newUser,
        };
    } catch (error) {
        return {
            status: 500,
            body: { error: 'Failed to create Event' },
        };
    }
};