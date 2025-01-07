const separator = ": ";

const timeSavedDataRaw = `
2024-12-18: 60
2024-12-20: 72
2024-12-21: 82
2024-12-22: 60
2024-12-23: 66
2024-12-24: 82
2024-12-25: 150
2024-12-26: 60
2024-12-27: 60
2024-12-28: 426
2024-12-29: 792
2024-12-30: 60
2024-12-31: 60
2025-01-01: 76
2025-01-02: 60
2025-01-03: 60
2025-01-04: 52
2025-01-05: 52
2025-01-06: 60
`;

const timeWastedDataRaw = `
2024-12-05: 8.0
2024-12-07: 10.0
2024-12-10: 6.0
2024-12-12: 5.0
2024-12-13: 35.0
2024-12-16: 11.0
2024-12-17: 41.0
2024-12-18: 37.0
2024-12-19: 41.0
2024-12-20: 15.0
2024-12-21: 9.0
2024-12-23: 25.0
2024-12-25: 17.0
2024-12-28: 10.0
2025-01-02: 36.0
2025-01-05: 7.0
`;

// this is manually written, based on my calendar
const buildingTime = `
2024-12-20: 420
2024-12-16: 469
2024-12-17: 439
2024-12-13: 600
2024-12-10: 120
2024-12-05: 10
`;

interface TimeData {
  date: string;
  minutes: number;
  percent: number;
}

const parse = (data: string): TimeData[] => {
  // Step 1: Parse and group data by date
  const groupedData = new Map<string, number>();

  data
    .trim()
    .split("\n")
    .forEach((line) => {
      const [date, minutesStr] = line.split(separator);
      const minutes = parseInt(minutesStr);
      if (groupedData.has(date)) {
        groupedData.set(date, groupedData.get(date)! + minutes);
      } else {
        groupedData.set(date, minutes);
      }
    });

  // Step 2: Convert the grouped data into an array
  const processedData = Array.from(groupedData, ([date, minutes]) => ({ date, minutes }));

  // Step 3: Calculate percent values
  const minutesArray = processedData.map((e) => e.minutes);
  const max = Math.max(...minutesArray);
  const min = Math.min(...minutesArray);

  const finalData = processedData.map((obj) => ({
    percent: (obj.minutes - min) / (max - min),
    ...obj,
  }));

  return finalData;
};

export const timeWastedData = parse(timeWastedDataRaw.trim() + "\n" + buildingTime.trim());
export const timeSavedData = parse(timeSavedDataRaw);
export const TotalMinutesSaved = () => {
  const number = timeSavedData.reduce((acc, ele) => acc + ele.minutes, 0).toString();
  return (
    <>
      <div className="text-center mt-6 text-xl font-bold ">Time saved</div>
      <div className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-green-600 drop-shadow-lg text-center">
        {number} minutes
        <br />
        {"\u2248"} {Math.round(number / 60)} hours
      </div>
    </>
  );
};
export const TotalMinutesWasted = () => {
  const number = timeWastedData.reduce((acc, ele) => acc + ele.minutes, 0).toString();
  return (
    <>
      <div class="text-center mt-6 text-xl font-bold ">Time spent</div>
      <div className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-red-600 drop-shadow-lg text-center">
        {number} minutes
        <br />
        {"\u2248"} {Math.round(number / 60)} hours
      </div>
    </>
  );
};
