import { ObjectId } from "mongodb";

export interface User {
    
    _id: ObjectId;
    username: string;
    accountEmail: string;
    description: string;
    accountType: 'private' | 'company' | 'admin';

    contact: {
        publicEmail: string;
        phone: string;
        name: string;
    };

}

export interface UserWithPass {
    
    _id: ObjectId;
    username: string;
    accountEmail: string;
    password: string;
    description: string;
    accountType: 'private' | 'company' | 'admin';

    contact: {
        publicEmail: string;
        phone: string;
        name: string;
    };

}