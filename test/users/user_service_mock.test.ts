import { UserService } from '../../src/users/user_service';
import * as mongo from 'mongodb';
import { configDotenv } from 'dotenv';

jest.mock('dotenv');
jest.mock('mongodb');

describe('UserService', () => {
    let userService;
    let mockCollection;
    let mockDb;
    let mockClient;

    beforeAll(() => {
        process.env.CONNECTION_STRING = 'mongodb://test:test@localhost:27017/testdb';
    });

    beforeEach(() => {
        configDotenv.mockImplementation(() => {});
        mockCollection = {
            findOne: jest.fn(),
            insertOne: jest.fn(),
            updateOne: jest.fn(),
            findOneAndDelete: jest.fn(),
        };
        mockDb = {
            collection: jest.fn().mockReturnValue(mockCollection),
        };
        mockClient = {
            db: jest.fn().mockReturnValue(mockDb),
            close: jest.fn(),
        };
        mongo.MongoClient.connect.mockResolvedValue(mockClient);
        userService = new UserService();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('should initialize mongoUrl from environment variables', () => {
        expect(userService.mongoUrl).toBe(process.env.CONNECTION_STRING);
    });

    test('should get user by id', async () => {
        const userId = new mongo.ObjectId();
        const expectedUser = { _id: userId, username: 'testuser' };
        mockCollection.findOne.mockResolvedValue(expectedUser);

        const user = await userService.getUserId(userId);

        expect(mockCollection.findOne).toHaveBeenCalledWith({ _id: userId });
        expect(user).toEqual(expectedUser);
    });

    test('should get user by name', async () => {
        const username = 'testuser';
        const expectedUser = { _id: new mongo.ObjectId(), username: username };
        mockCollection.findOne.mockResolvedValue(expectedUser);

        const user = await userService.getUserName(username);

        expect(mockCollection.findOne).toHaveBeenCalledWith({ username: username });
        expect(user).toEqual(expectedUser);
    });

    test('should create a new user', async () => {
        const newUser = { username: 'newuser', accountEmail: 'newuser@example.com' };
        const insertedId = new mongo.ObjectId();
        mockCollection.insertOne.mockResolvedValue({ acknowledged: true, insertedId: insertedId });

        const createdUser = await userService.createUser(newUser);

        expect(mockCollection.insertOne).toHaveBeenCalledWith(newUser);
        expect(createdUser._id).toBe(insertedId);
    });

    test('should fail to create a user with existing username', async () => {
        const newUser = { username: 'existinguser', accountEmail: 'newuser@example.com' };
        mockCollection.findOne.mockResolvedValue(newUser);

        await expect(userService.createUser(newUser)).rejects.toThrow('Username already taken.');
    });

    test('should update a user', async () => {
        const username = 'testuser';
        const valuesToUpdate = { accountEmail: 'updated@example.com' };
        const expectedUser = { _id: new mongo.ObjectId(), username: username, ...valuesToUpdate };
        mockCollection.updateOne.mockResolvedValue({ modifiedCount: 1 });
        mockCollection.findOne.mockResolvedValue(expectedUser);

        const updatedUser = await userService.updateUser(username, valuesToUpdate);

        expect(mockCollection.updateOne).toHaveBeenCalledWith({ username: username }, { $set: valuesToUpdate });
        expect(updatedUser).toEqual(expectedUser);
    });

    test('should delete a user', async () => {
        const username = 'testuser';
        const expectedUser = { _id: new mongo.ObjectId(), username: username };
        mockCollection.findOneAndDelete.mockResolvedValue(expectedUser);

        const deletedUser = await userService.deleteUser(username);

        expect(mockCollection.findOneAndDelete).toHaveBeenCalledWith({ username: username });
        expect(deletedUser).toEqual(expectedUser);
    });

    test('should fail to delete a non-existent user', async () => {
        const username = 'nonexistentuser';
        mockCollection.findOneAndDelete.mockResolvedValue(null);

        await expect(userService.deleteUser(username)).rejects.toThrow('Delete failed: User with name nonexistentuser not found.');
    });
});
