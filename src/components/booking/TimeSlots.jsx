import React from "react";

const times = [
  "9:00 AM",
  "11:00 AM",
  "1:00 PM",
  "3:00 PM",
  "5:00 PM"
];

const TimeSlots = ({ setTime }) => {
  return (
    <div>
      <h4 className="label">Preferred Time</h4>

      <div className="time-slots">
        {times.map((t) => (
          <button
            key={t}
            onClick={() => setTime(t)}
            type="button"
            className="timeslot-btn"
          >
            {t}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TimeSlots;
