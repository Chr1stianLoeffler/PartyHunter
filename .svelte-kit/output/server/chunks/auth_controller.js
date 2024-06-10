import "mongodb";
import { U as UserService } from "./user_service.js";
import { Post, SuccessResponse, Body, Route } from "tsoa";
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
let Register = class {
  async registerUser(requestBody) {
    return new UserService().registerUser(requestBody);
  }
};
__decorateClass([
  Post(),
  SuccessResponse(201, "Created"),
  __decorateParam(0, Body())
], Register.prototype, "registerUser", 1);
Register = __decorateClass([
  Route("auth/register")
], Register);
let Login = class {
  async loginUser(requestBody) {
    return new UserService().loginUser(requestBody.nameOrEmail, requestBody.password);
  }
};
__decorateClass([
  Post(),
  SuccessResponse(201, "Created"),
  __decorateParam(0, Body())
], Login.prototype, "loginUser", 1);
Login = __decorateClass([
  Route("auth/login")
], Login);
export {
  Login as L,
  Register as R
};
