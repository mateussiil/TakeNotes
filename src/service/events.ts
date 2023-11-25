import axios from "axios";
import { HOST } from "./api";
import { Event } from "../@types/events";

axios.defaults.headers.common["Authorization"] = `Bearer ${process.env.ACCESS_TOKEN}`;

export async function fetchEvents(timeInfo = null): Promise<Event[]> {
  let res;
  if (timeInfo === null) {
    res = await axios.get(`${HOST}/events`);
  } else {
    res = await axios.get(`${HOST}/events`, timeInfo);
  }

  const events = res.data;
  console.log("fetchEvents: ", events);
  return events;
}

export async function createEvent(eventInput:any) {
  const res = await axios.post(`${HOST}/events`, eventInput);
  const event = res.data;
  console.log("createEvent: ", event);
  return event;
}

export async function showEvent(id:string) {
  const res = await axios.get(`${HOST}/events/${id}`);
  const event = res.data;
  console.log("showEvent: ", event);
  return event;
}

export async function updateEvent(id:string, eventInput:any) {
  const res = await axios.put(`${HOST}/events/${id}`, eventInput);
  const event = res.data;
  console.log("updateEvent: ", event);
  return event;
}

export async function deleteEvent(id:string) {
  const res = await axios.delete(`${HOST}/events/${id}`);
  const event = res.data;
  console.log(`deletedEvent: ${id}`);
  return event;
}
