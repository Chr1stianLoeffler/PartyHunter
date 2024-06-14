import {UserService} from "../../src/users/user_service";
import {UserController} from "../../src/users/user_controller";
import {describe, expect, test} from '@jest/globals';

jest.mock('mongodb')
describe("tests the service for the users", () =>{

    let usertest;
    let user_controll;
    let user;
    beforeAll(() => {
        user = new UserActivation()
        usertest = new UserService;
        user_controll = new UserController();
        user = user_controll.getUser("Test")
        usertest.createUser(user)
        }
    );

    test("tests the get_user_id funktion", () => {
       expect(usertest.getUserId(user)).toBe(user._id);
    });

    test("tests the get user name function", () => {
        expect(usertest.getUserName(user)).toBe(user.username)
    });

    test("tests the get user Email function", () => {
        expect(usertest.getUserEmail(user)).toBe(user.accountEmail)
    });
    }
)