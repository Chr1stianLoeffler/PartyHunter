import { ObjectId } from "mongodb";

export interface Event {

    _id: ObjectId | undefined;
    creator: string;  //username
    name: string;
    title: string | undefined;
    description: string;
    tags: string[] | undefined;
    genre_or_atmosphere: string | undefined;   //if it's disco etc. this is the music genre, if there is no music (i.e. bar quiz) this is the atmosphere
    date_and_time: string;
    location: LocationPoint; 
    address: string | undefined;       //human readable address that will be displayed on the website
    pictures: any;        

}

export interface LocationPoint {

    name: string,
    address: string,
    longitude: number,
    latitude: number
    
}