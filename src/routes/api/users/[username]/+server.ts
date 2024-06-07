import type { RequestHandler } from '@sveltejs/kit';
import { UserController } from '../../../../users/user_controller';
import { type User } from '../../../../users/user'

export const GET: ({params}: { params: any }) => Promise<{ body: User; status: number } | {
    body: { error: string };
    status: number
}> = async ({ params }) => {
    try {
        const { username } = params;
        const controller = new UserController();
        const user = await controller.getUser(username);

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

export const PUT: ({params, request}: { params: any; request: any }) => Promise<{ body: User; status: number } | {
    body: { error: string };
    status: number
}> = async ({ params, request }) => {
    try {
        const { username } = params;
        const body = await request.json();
        const controller = new UserController();
        const updatedUser = await controller.updateUser(username, body);

        return {
            status: 200,
            body: updatedUser,
        };
    } catch (error) {
        return {
            status: 500,
            body: { error: 'Failed to update user' },
        };
    }
};

export const DELETE: ({params}: { params: any }) => Promise<{ body: User; status: number } | {
    body: { error: string };
    status: number
}> = async ({ params }) => {
    try {
        const { username } = params;
        const controller = new UserController();
        const deletedUser = await controller.deleteUser(username);

        return {
            status: 200,
            body: deletedUser,
        };
    } catch (error) {
        return {
            status: 500,
            body: { error: 'Failed to delete user' },
        };
    }
};