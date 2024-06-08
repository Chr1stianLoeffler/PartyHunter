import type { RequestHandler } from '@sveltejs/kit';
import { Register } from "../../../users/auth_controller";
import { Login } from "../../../users/auth_controller";
import { type User } from '../../../users/user'


export const POST: ({request}: { request: any }) => Promise<{ body: { user: User; token: string }; status: number } | {
    body: { error: string };
    status: number
}> = async ({ request }) => {
    try {
        const body = await request.json();
        const controller = new Register();
        const newUser = await controller.registerUser(body);

        const header = new Headers();
        header.append("username", newUser.user.username);
        header.append("Authorization", newUser.token);

        return new Response("Succesfully created the User", { status: 200, headers : header});
    } catch (error) {
        if (error.message.includes('Username already taken') || error.message.includes('Email already in use.')) {
            return new Response(JSON.stringify({ message: error.message }), { status: 409 });
        }
        return new Response(JSON.stringify({ message: 'Internal Server Error' }), { status: 500 });
    }
};

export const LOGIN: ({request}: { request: any }) => Promise<{ body: { user: User; token: string }; status: number } | {
    body: { error: string };
    status: number
}> = async ({ request }) => {
    try {
        const body = await request.json();
        const controller = new Login();
        const loggedinUser = await controller.loginUser(body);

        const header = new Headers();
        header.append("username", loggedinUser.user.username);
        header.append("Authorization", loggedinUser.token);

        return new Response("Succesfully created the User", { status: 200, headers : header});
    } catch (error) {
        if (error.message.includes('Username already taken') || error.message.includes('Email already in use.')) {
            return new Response(JSON.stringify({ message: error.message }), { status: 409 });
        }
        return new Response(JSON.stringify({ message: 'Internal Server Error' }), { status: 500 });
    }
};