import type { RequestHandler } from '@sveltejs/kit';
import { EventController } from '../../../events/event_controller';


export const POST: RequestHandler = async ({ request }) => {
    try {
        const body = await request.json();
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