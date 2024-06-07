import type { RequestHandler } from '@sveltejs/kit';
import { Register } from "../../../users/auth_controller";
import { type User } from '../../../users/user'


export const POST: ({request}: { request: any }) => Promise<{ body: { user: User; token: string }; status: number } | {
    body: { error: string };
    status: number
}> = async ({ request }) => {
    try {
        const body = await request.json();
        console.log(body)
        const controller = new Register();
        const newUser = await controller.registerUser(body);


        return {
            status: 201,
            body: newUser,
        };
    } catch (error) {
        console.log(error)
        console.log("Ein Fehler ist aufgetreten")
        const myOptions = { status: 500 };
        return new Response("User could not be Created", myOptions);
    }
};