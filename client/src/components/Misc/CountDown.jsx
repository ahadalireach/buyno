import { useEffect, useState } from "react";
import axios from "axios";

const CountDown = ({ data }) => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    if (
      typeof timeLeft.days === "undefined" &&
      typeof timeLeft.hours === "undefined" &&
      typeof timeLeft.minutes === "undefined" &&
      typeof timeLeft.seconds === "undefined"
    ) {
      axios.delete(
        `${process.env.REACT_APP_BACKEND_URL}/events/event/${data._id}`
      );
    }

    return () => clearTimeout(timer);
  });

  function calculateTimeLeft() {
    const difference = +new Date(data.finishDate) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  }

  const timeUnits = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Minutes", value: timeLeft.minutes },
    { label: "Seconds", value: timeLeft.seconds },
  ];

  return (
    <div className="flex gap-3 mt-4">
      {Object.keys(timeLeft).length ? (
        timeUnits.map(
          (unit, idx) =>
            unit.value !== undefined && (
              <div
                key={idx}
                className="flex flex-col items-center px-4 py-2 rounded-lg bg-orange-50 border border-orange-200 shadow text-black min-w-[60px]"
              >
                <span className="font-bold text-2xl leading-none">
                  {unit.value.toString().padStart(2, "0")}
                </span>
                <span className="text-xs text-orange-500 uppercase tracking-wide">
                  {unit.label}
                </span>
              </div>
            )
        )
      ) : (
        <span className="text-red-500 text-xl font-semibold">Time's Up</span>
      )}
    </div>
  );
};

export default CountDown;
