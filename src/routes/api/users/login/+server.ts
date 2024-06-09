import type {User} from "../../../../users/user";
import {Login} from "../../../../users/auth_controller";

export const POST: ({request}: { request: any }) => Promise<Response> = async ({ request }) => {   
    try {
        console.log("Hello World")
        const body = await request.json();
        const controller = new Login();
        const loggedinUser = await controller.loginUser(body);

        const header = new Headers();
        header.append("username", loggedinUser.user.username);
        header.append("Authorization", loggedinUser.token);

        return new Response("Login successful", { status: 200, headers : header});
    } catch (error:any) {
        console.log(error)
        if (error.message.includes('Login failed: Incorrect username or password!')) {
            return new Response(JSON.stringify({ message: error.message }), { status: 409 });
        }
        return new Response(JSON.stringify({ message: 'Internal Server Error' }), { status: 500 });
    }
};

/* previous return type: Promise<{ body: { user: User; token: string }; status: number } | {
    body: { error: string };
    status: number
}> */