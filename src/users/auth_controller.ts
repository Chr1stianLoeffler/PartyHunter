import { type User, type UserWithPass } from "./user";
import { UserService } from "./user_service";
import {Post, Route, Body, SuccessResponse} from "tsoa";


@Route("auth/register")
export class Register{

    @Post()
    @SuccessResponse(201, "Created")
    public async registerUser(
        @Body() requestBody: UserWithPass
    ): Promise<{user:User, token:string}> {
        return new UserService().registerUser(requestBody);
    }
}
            
@Route("auth/login")
export class Login{

    @Post()
    @SuccessResponse(201, "Created")
    public async loginUser(
        @Body() requestBody: {nameOrEmail: string, password: string}
    ): Promise<{user:User, token:string}> {
        return new UserService().loginUser(requestBody.nameOrEmail, requestBody.password);
    }
}