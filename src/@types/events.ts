export type Event = {
  id: string;
  title: string;
  startTime: number;
  bgColor?: string;
  endTime: number;
  startDate: string;
  durationInMinutes: number;
  endDate: string;
  name: string;
  isAllDay: boolean;
  isRecurrence: boolean;
  description: string;
  recurrencePattern?: string;
  attendees?: string;
  userId: string;
}

export type EventId = string;

export interface EventException extends Event {
  id: string;
  eventId: EventId;
  exceptionDate: number;
  isRescheduled?: boolean;
  isCancelled?: boolean;
}

export type Guest = {
  id: string;
  userId: string;
  eventId: string;
  email: string;
  status: 'ACCEPTED' | 'WAITING' | 'REFUSE';
}
