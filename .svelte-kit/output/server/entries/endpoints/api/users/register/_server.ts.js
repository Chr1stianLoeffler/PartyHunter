import { R as Register } from "../../../../../chunks/auth_controller.js";
import "mongodb";
const POST = async ({ request }) => {
  try {
    const body = await request.json();
    const controller = new Register();
    const newUser = await controller.registerUser(body);
    const header = new Headers();
    header.append("username", newUser.user.username);
    header.append("Authorization", newUser.token);
    return new Response("Succesfully created the User", { status: 200, headers: header });
  } catch (error) {
    if (error.message.includes("Username already taken") || error.message.includes("Email already in use.")) {
      return new Response(JSON.stringify({ message: error.message }), { status: 409 });
    }
    return new Response(JSON.stringify({ message: "Internal Server Error" }), { status: 500 });
  }
};
export {
  POST
};
