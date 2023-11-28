import React, { useEffect, useState } from 'react';
import { Calendar as BigCalendar, ICalendarEventBase } from 'react-native-big-calendar';
import { fetchEvents } from '../../service/events';
import { Event } from '../../@types/events';

const initialEvents: ICalendarEventBase[] = [
  {
    title: 'Meeting',
    start: new Date(2023, 10, 25, 10, 0),
    end: new Date(2023, 10, 25, 10, 30),
  },
  {
    title: 'Coffee break',
    start: new Date(2023, 10, 26, 15, 45),
    end: new Date(2023, 10, 26, 16, 30),
  },
]

const CalendarPage: React.FC = () => {
  const [events, setEvents] = useState<ICalendarEventBase[]>(initialEvents);

  useEffect(() => {
    init()
  }, [])

  const init = async () => {
    try {
      const events = await fetchEvents();
      const newItems = reformatEvents(events);
      console.log("init: ", newItems);
      setEvents(newItems);
    } catch (e) {
      console.log(e);
    }
  };

  function reformatEvents(events: Event[]): ICalendarEventBase[] {
    return events?.map(function (event) {
      const startUtcDate = new Date(event.startDate);
      const endUtcDate = new Date(event.endDate);

      return {
        id: event.id,
        title: event.title,
        bgColor: event.bgColor || 'blue',
        description: event.description,
        allDay: false,
        start: new Date(startUtcDate.getFullYear(), startUtcDate.getMonth(), startUtcDate.getDate(), startUtcDate.getUTCHours(), startUtcDate.getMinutes(), 0),
        end: new Date(endUtcDate.getFullYear(), endUtcDate.getMonth(), endUtcDate.getDate(), endUtcDate.getUTCHours(), endUtcDate.getMinutes(), 0)
      }
    });
  }

  return <BigCalendar onPressEvent={(event)=> console.log(event)} mode='3days' date={new Date()} events={events} height={600} />

}

export default CalendarPage;