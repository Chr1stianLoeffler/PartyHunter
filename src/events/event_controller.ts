import { ObjectId } from "mongodb";
import { type Event } from "./event";
import { EventService } from "./event_service";
import {Get, Post, Put, Delete, Route, Body, Response, SuccessResponse, Header} from "tsoa";

@Route("events")
export class EventController{
    
    @Get("{eventId}")
    @SuccessResponse(200, "OK")
    @Response(404, "NOT FOUND")
    public async getEvent(
                eventId: string
    ): Promise<Event> {
        return new EventService().getEvent(new ObjectId(eventId));
    }

    @Post()
    @SuccessResponse(201, "Created")
    @Response(401, "Unauthorized")
    @Response(403, "Forbidden")
    public async createEvent(
        @Body() requestBody: Event,
        @Header("Authorization") token: string
    ): Promise<Event> {
        return new EventService().createEvent(requestBody,token);
    }

    @Put("{eventId}")
    @SuccessResponse(200, "OK")
    @Response(404, "NOT FOUND")
    @Response(401, "Unauthorized")
    @Response(403, "Forbidden")
    public async updateEvent( 
                eventId: string, 
        @Body() requestBody: Event,
        @Header("Authorization") token: string
    ): Promise<Event> {
        return new EventService().updateEvent(new ObjectId(eventId), requestBody, token);
    }

    @Delete("{eventId}")
    @SuccessResponse(200, "OK")
    @Response(404, "NOT FOUND")
    @Response(401, "Unauthorized")
    @Response(403, "Forbidden")
    public async deleteEvent(
                eventId: string,
                @Header("Authorization") token: string
    ): Promise<Event> {
        return new EventService().deleteEvent(new ObjectId(eventId),token);
    }
}