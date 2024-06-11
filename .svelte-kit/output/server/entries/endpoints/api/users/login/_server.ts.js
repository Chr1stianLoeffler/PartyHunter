import { L as Login } from "../../../../../chunks/auth_controller.js";
const POST = async ({ request }) => {
  try {
    console.log("Hello World");
    const body = await request.json();
    console.log(body);
    const username = body.username;
    const password = body.password;
    const controller = new Login();
    const loggedinUser = await controller.loginUser({
      nameOrEmail: username,
      password
    });
    const header = new Headers();
    header.append("username", loggedinUser.user.username);
    header.append("Authorization", loggedinUser.token);
    return new Response("Login successful", { status: 200, headers: header });
  } catch (error) {
    console.log(error);
    if (error.message.includes("Login failed: Incorrect username or password!")) {
      return new Response(JSON.stringify({ message: error.message }), { status: 409 });
    }
    return new Response(JSON.stringify({ message: "Internal Server Error" }), { status: 500 });
  }
};
export {
  POST
};
