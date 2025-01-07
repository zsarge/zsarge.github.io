import "@toast-ui/calendar/dist/toastui-calendar.min.css";
import { useEffect, useState } from "react";

export default function () {
  const [Calendar, setCalendar] = useState(null);

  const initialEvents = [
    {
      id: "3",
      calendarId: "0",
      title: "FE Workshop",
      category: "allday",
      start: "2025-01-06",
      end: "2025-01-06",
      isReadOnly: true,
    },
  ];

  useEffect(() => {
    // Dynamically import the Calendar module because astro doesn't like the import statement
    import("@toast-ui/react-calendar").then((mod) => {
      setCalendar(() => mod.default);
    });
  }, []);
  useEffect(() => {
    console.log("Calendar props:", { events: initialEvents });
  }, [Calendar]);

  // https://github.com/nhn/tui.calendar/blob/b53e765e8d896ab7c63d9b9b9515904119a72f46/apps/react-calendar/src/index.tsx#L23-L34

  return <>{Calendar ? <Calendar events={initialEvents} /> : <div>Loading calendar...</div>}</>;
}
