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

        const header = new Headers();
        header.append("username", newUser.user.username);
        header.append("Token", newUser.token);

        return new Response("Succesfully created the User", { status: 200, headers : header});
    } catch (error) {
        return new Response("User could not be Created", { status: 500 });
    }
};