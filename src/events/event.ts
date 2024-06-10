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
    location: LocationPoint;   //TODO: figure out data type (need to be able to calculate distance between two locations) and connect to Google Maps somehow
    address: string | undefined;       //human readable address that will be displayed on the website
    pictures: any;         //TODO: figure out what data type this should have..

}

export interface LocationPoint {

    name: string,
    address: string,
    type: string,
    id: ObjectId,
    longitude: number,
    latitude: number
    
}