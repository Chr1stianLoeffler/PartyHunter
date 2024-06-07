import type { RequestHandler } from '@sveltejs/kit';
import { Register } from "../../../users/auth_controller";
import { type User } from '../../../users/user'

export const POST: RequestHandler = async ({ request }) => {
    try {
        const body = await request.json();
        const controller = new Register();
        const newUser = await controller.registerUser(body);
        console.log("The User should be created")

        return {
            status: 201,
            body: newUser,
        };
    } catch (error) {
        return {
            status: 500,
            body: { error: 'Failed to create user' },
        };
    }
};