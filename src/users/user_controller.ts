import { type User } from "./user";
import { UserService } from "./user_service";
import {Get, Put, Delete, Route, Body, Header, SuccessResponse, Response} from "tsoa";

@Route("users")
export class UserController{
    
    @Get("{username}")
    @SuccessResponse(200, "OK")
    @Response(404, "NOT FOUND")
    public async getUser(
                username: string
    ): Promise<User> {
        return new UserService().getUserName(username);
    }

    @Put("{username}")
    @SuccessResponse(200, "OK")
    @Response(404, "NOT FOUND")
    @Response(401, "Unauthorized")
    @Response(403, "Forbidden")
    public async updateUser( 
                username: string, 
        @Body() requestBody: User,
        @Header("Authorization") token: string
    ): Promise<User> {
        return new UserService().updateUser(username, requestBody, token);
    }

    @Delete("{username}")
    @SuccessResponse(200, "OK")
    @Response(404, "NOT FOUND")
    @Response(401, "Unauthorized")
    @Response(403, "Forbidden")
    public async deleteUser(
                username: string,
        @Header("Authorization") token: string
    ): Promise<User> {
        return new UserService().deleteUser(username, token);
    }
}