import React from "react";

const CalendarPicker = ({ setDate }) => {
  return (
    <div>
      <h4 className="label">Preferred Date</h4>

      <input
        className="input"
        type="date"
        onChange={(e) => setDate(e.target.value)}
      />
    </div>
  );
};

export default CalendarPicker;
