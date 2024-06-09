import type { RequestHandler } from '@sveltejs/kit';
import { UserController } from '../../../../users/user_controller';
import { type User } from '../../../../users/user'

function extractToken(headers: Headers): string | null {
    const authHeader = headers.get('Authorization');
    if (!authHeader) return null;
    const token = authHeader.split(' ')[1]; // Bearer token
    return token;
}

export const GET: ({params}: { params: any }) => Promise<{ body: User; status: number } | {
    body: { error: string };
    status: number
}> = async ({ params }) => {
    try {
        const { username } = params;
        const controller = new UserController();
        const user = await controller.getUser(username);
        if(!user){
            throw new Error("Username does not exist");
        }
        return {
            status: 200,
            body: user,
        };
    } catch (error) {
        return {
            status: 500,
            body: { error: 'Failed to get user' },
        };
    }
};

export const PUT: ({params, request}: { params: any; request: any }) => Promise<Response> = async ({ params, request }) => {
    try {
        const { username } = params;
        const body = await request.json();
        const token = extractToken(request.headers);
        if(!token)
            throw new Error("No token provided")

        const controller = new UserController();
        const updatedUser = await controller.updateUser(username, body, token);
        if(!updatedUser)
            throw new Error("user not found");
        const header = new Headers();
        header.append("username" , updatedUser.username);
        header.append("Authorization", token);

        return new Response("Succesfully updated the User", { status: 200, headers: header});
    } catch (error) {
        return new Response("Failed to update user", {status: 500 });
    }
};

export const DELETE: ({params}: { params: any, request: any }) => Promise<Response> = async ({ params , request}) => {
    try {
        const { username } = params;
        const token = extractToken(request.headers);
        if(!token)
            throw new Error("No token provided");
        const controller = new UserController();
        const deletedUser = await controller.deleteUser(username, token);


        return new Response("Succesfully deleted the User", { status: 200 });
    } catch (error) {
        return new Response("Failed to delete user", {status: 500 });
    }
};