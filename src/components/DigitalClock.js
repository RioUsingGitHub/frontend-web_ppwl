// src/components/DigitalClock.js

import React, { useState, useEffect } from "react";

const DigitalClock = () => {
  const [time, setTime] = useState({
    hours: "00",
    minutes: "00",
    seconds: "00",
    ampm: "AM",
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const updateTime = () => {
        let h = new Date().getHours();
        let m = new Date().getMinutes();
        let s = new Date().getSeconds();
        let ap = h >= 12 ? "PM" : "AM";

        // Convert to 12-hour format
        if (h > 12) {
          h = h - 12;
        }
        h = h < 10 ? "0" + h : h;
        m = m < 10 ? "0" + m : m;
        s = s < 10 ? "0" + s : s;

        return { hours: h, minutes: m, seconds: s, ampm: ap };
      };

      setTime(updateTime());
    }, 1000);

    return () => clearInterval(interval); // Clear interval on unmount
  }, []);

  return (
    <div className="digital-clock flex justify-center items-center space-x-4 p-6 bg-gray-800 text-white rounded-xl shadow-lg">
      <div className="text-2xl">
        <span>{time.hours}:</span>
        <span>{time.minutes}:</span>
        <span>{time.seconds}</span>
      </div>
      <div className="text-xl">{time.ampm}</div>
    </div>
  );
};

export default DigitalClock;
