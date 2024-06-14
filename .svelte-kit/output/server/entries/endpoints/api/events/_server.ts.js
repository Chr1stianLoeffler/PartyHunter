import { E as EventController } from "../../../../chunks/event_controller.js";
import "mongodb";
function extractToken(headers) {
  const authHeader = headers.get("authorization");
  if (!authHeader)
    return null;
  const token = authHeader.split(" ")[1];
  return token;
}
function extractUsername(headers) {
  const authHeader = headers.get("username");
  if (!authHeader)
    return null;
  const username = authHeader.split(" ")[1];
  return username;
}
function extractEventId(headers) {
  const authHeader = headers.get("eventId");
  if (!authHeader)
    return null;
  const eventId = authHeader.split(" ")[1];
  return eventId;
}
const POST = async ({ request }) => {
  try {
    const body = await request.json();
    const token = extractToken(request.headers);
    const username = extractUsername(request.headers);
    if (!token)
      return new Response(JSON.stringify("No token provided"), { status: 401 });
    const { eventName, eventDate, eventLocation, eventDescription } = body;
    const eventDetails = {
      _id: void 0,
      creator: username,
      name: eventName,
      tags: void 0,
      title: void 0,
      genre_or_atmosphere: void 0,
      description: eventDescription,
      date_and_time: eventDate,
      location: eventLocation,
      address: void 0,
      pictures: void 0
    };
    const controller = new EventController();
    const newEvent = await controller.createEvent(eventDetails, token);
    return new Response(JSON.stringify(newEvent), { status: 201 });
  } catch (error) {
    if (error.message.includes("Create failed: Unauthorized"))
      return new Response(JSON.stringify({ body: { error } }), { status: 401 });
    return new Response(JSON.stringify({ body: { error: "Failed to create Event" } }), { status: 500 });
  }
};
const GET = async () => {
  try {
    const controller = new EventController();
    const events = await controller.getAllEvents();
    return new Response(JSON.stringify(events), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ error: "Failed to fetch events" }), { status: 500 });
  }
};
const PUT = async ({ request }) => {
  try {
    const body = await request.json();
    const token = extractToken(request.headers);
    const username = extractUsername(request.headers);
    const eventId = extractEventId(request.headers);
    if (!token)
      return new Response(JSON.stringify({ body: "No token provided" }), { status: 401 });
    if (!eventId)
      return new Response(JSON.stringify({ body: "No EventID provided" }), { status: 400 });
    const { eventName, eventDate, eventLocation, eventDescription } = body;
    const eventDetails = {
      _id: void 0,
      creator: username,
      name: eventName,
      tags: void 0,
      title: void 0,
      genre_or_atmosphere: void 0,
      description: eventDescription,
      date_and_time: eventDate,
      location: eventLocation,
      address: void 0,
      pictures: void 0
    };
    const controller = new EventController();
    const newEvent = await controller.updateEvent(eventId, eventDetails, token);
    return new Response(JSON.stringify(newEvent), { status: 201 });
  } catch (error) {
    if (error.message.includes("Update failed: Unautorized"))
      return new Response(JSON.stringify({ body: error.message }), { status: 401 });
    else if (error.message.includes("No Event with id "))
      return new Response(JSON.stringify({ body: error.message }), { status: 404 });
    return new Response(JSON.stringify({ error: "Failed to fetch events" }), { status: 500 });
  }
};
export {
  GET,
  POST,
  PUT
};
