import "@toast-ui/calendar/dist/toastui-calendar.min.css";
import { useCallback, useEffect, useRef, useState } from "react";
import { timeSavedData, timeWastedData } from "./CatFeederCalendarData";
import interpolate from "color-interpolate";

const buttonClass =
  "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded";

const savedColorscale = interpolate([
  "#94C58C",
  "#64AD62",
  "#429B46",
  "#1A8828",
  "#0A6921",
  "#063204",
  "#094F29",
]);

const wastedColorScale = interpolate(["#FF4646", "#FF3232", "#F61A23", "#DD111B"]);

const initialEvents = timeWastedData
  .map((data, index) => ({
    id: index,
    calendarId: "0",
    title: data.minutes.toString(),
    category: "allday",
    start: data.date,
    end: data.date,
    backgroundColor: wastedColorScale(data.percent),
    isReadOnly: true,
  }))
  .concat(
    timeSavedData.map((data, index) => ({
      id: index + timeWastedData.length,
      calendarId: "0",
      title: data.minutes.toString(),
      category: "allday",
      start: data.date,
      end: data.date,
      backgroundColor: savedColorscale(data.percent),
      isReadOnly: true,
    })),
  );

export default function () {
  const [Calendar, setCalendar] = useState(null);
  const calendarRef = useRef(null);
  const [month, setMonth] = useState("December 2024");

  useEffect(() => {
    // Dynamically import the Calendar module because astro doesn't like the import statement
    import("@toast-ui/react-calendar").then((mod) => {
      setCalendar(() => mod.default);
    });
  }, []);

  useEffect(() => {
    calendarRef?.current?.getInstance()?.setDate("2024-12-05");
  }, [Calendar]);

  useEffect(() => {
    const today = calendarRef?.current?.getInstance()?.today();
  }, [calendarRef]);

  // https://github.com/nhn/tui.calendar/blob/b53e765e8d896ab7c63d9b9b9515904119a72f46/apps/react-calendar/src/index.tsx#L23-L34

  const getCalInstance = useCallback(() => calendarRef.current?.getInstance?.(), []);

  const updateRenderRangeText = useCallback(() => {
    const calInstance = getCalInstance();
    if (!calInstance) {
      setMonth("...");
    }

    const calDate = calInstance.getDate();

    const year = calDate.getFullYear();
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const monthName = months[calDate.getMonth()];
    const dateRangeText = `${monthName} ${year}`;

    setMonth(dateRangeText);
  }, [getCalInstance]);

  function handlePrev() {
    calendarRef?.current?.getInstance()?.prev();
    updateRenderRangeText();
  }

  function handleNext() {
    calendarRef?.current?.getInstance()?.next();
    updateRenderRangeText();
  }

  return (
    <>
      <div className="w-full flex justify-between py-5">
        <button className={buttonClass} onClick={handlePrev}>
          Previous
        </button>
        <div className="py-2 text-2xl">{month}</div>
        <button className={buttonClass} onClick={handleNext}>
          Next
        </button>
      </div>
      {Calendar ? (
        <Calendar
          ref={calendarRef}
          isReadOnly={true}
          usageStatistics={false}
          view="month"
          height="35em"
          date="2024-12-01"
          events={initialEvents}
        />
      ) : (
        <div>Loading calendar...</div>
      )}
    </>
  );
}
