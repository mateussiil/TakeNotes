import axios from "axios";
import { HOST } from "./api";

axios.defaults.headers.common["Authorization"] = `Bearer ${process.env.ACCESS_TOKEN}`;

export async function fetchDocuments(timeInfo = null) {
  let res;
  if (timeInfo === null) {
    res = await axios.get(`${HOST}/documents`);
  } else {
    res = await axios.get(`${HOST}/documents`, timeInfo);
  }

  const documents = res.data;
  return documents;
}

export async function fetchDocumentsByEventIdAndDate(eventId: string, date: any) {
  const res = await axios.get(`${HOST}/documents/events/${eventId}`, {
    params: {
      date
    } 
  });

  const documents = res.data;
  return documents;
}

export async function uploadFile(payload: any) {
  const formData = new FormData();

  formData.append('file', payload.file);
  formData.append('eventId', payload.eventId || '');

  if(!payload.date) formData.append('date', new Date().toISOString())

  const res = await axios.post(`${HOST}/documents`, formData, {});

  const document = res.data;
  return document;
}

export async function showDocument(id:string) {
  const res = await axios.get(`${HOST}/documents/${id}`);
  const document = res.data;
  return document;
}

export async function updateDocument(id:string, documentInput:any) {
  const res = await axios.put(`${HOST}/documents/${id}`, documentInput);
  const document = res.data;
  return document;
}

export async function deleteDocument(id:string) {
  const res = await axios.delete(`${HOST}/documents/${id}`);
  const document = res.data;
  return document;
}

export type Document = {
  id: string;
  eventId: string;
  file_url: string;
  userId: string;
  file_type: 'PDF' | 'DOCX';
  date: string;
  createdAt: Date;
}
