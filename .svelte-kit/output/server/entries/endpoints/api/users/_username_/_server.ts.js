import "mongodb";
import { U as UserService } from "../../../../../chunks/user_service.js";
import { Get, SuccessResponse, Response as Response$1, Put, Body, Header, Delete, Route } from "tsoa";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp(target, key, result);
  return result;
};
var __decorateParam = (index, decorator) => (target, key) => decorator(target, key, index);
let UserController = class {
  async getUser(username) {
    return new UserService().getUserName(username);
  }
  async updateUser(username, requestBody, token) {
    return new UserService().updateUser(username, requestBody, token);
  }
  async deleteUser(username, token) {
    return new UserService().deleteUser(username, token);
  }
};
__decorateClass([
  Get("{username}"),
  SuccessResponse(200, "OK"),
  Response$1(404, "NOT FOUND")
], UserController.prototype, "getUser", 1);
__decorateClass([
  Put("{username}"),
  SuccessResponse(200, "OK"),
  Response$1(404, "NOT FOUND"),
  Response$1(401, "Unauthorized"),
  Response$1(403, "Forbidden"),
  __decorateParam(1, Body()),
  __decorateParam(2, Header("Authorization"))
], UserController.prototype, "updateUser", 1);
__decorateClass([
  Delete("{username}"),
  SuccessResponse(200, "OK"),
  Response$1(404, "NOT FOUND"),
  Response$1(401, "Unauthorized"),
  Response$1(403, "Forbidden"),
  __decorateParam(1, Header("Authorization"))
], UserController.prototype, "deleteUser", 1);
UserController = __decorateClass([
  Route("users")
], UserController);
function extractToken(headers) {
  const authHeader = headers.get("Authorization");
  if (!authHeader)
    return null;
  const token = authHeader.split(" ")[1];
  return token;
}
const GET = async ({ params }) => {
  try {
    const { username } = params;
    const controller = new UserController();
    const user = await controller.getUser(username);
    if (!user) {
      throw new Error("Username does not exist");
    }
    return {
      status: 200,
      body: user
    };
  } catch (error) {
    return {
      status: 500,
      body: { error: "Failed to get user" }
    };
  }
};
const PUT = async ({ params, request }) => {
  try {
    const { username } = params;
    const body = await request.json();
    const token = extractToken(request.headers);
    if (!token)
      throw new Error("No token provided");
    const controller = new UserController();
    const updatedUser = await controller.updateUser(username, body, token);
    if (!updatedUser)
      throw new Error("user not found");
    const header = new Headers();
    header.append("username", updatedUser.username);
    header.append("Authorization", token);
    return new Response("Succesfully updated the User", { status: 200, headers: header });
  } catch (error) {
    return new Response("Failed to update user", { status: 500 });
  }
};
const DELETE = async ({ params, request }) => {
  try {
    const { username } = params;
    const token = extractToken(request.headers);
    if (!token)
      throw new Error("No token provided");
    const controller = new UserController();
    const deletedUser = await controller.deleteUser(username, token);
    return new Response("Succesfully deleted the User", { status: 200 });
  } catch (error) {
    return new Response("Failed to delete user", { status: 500 });
  }
};
export {
  DELETE,
  GET,
  PUT
};
