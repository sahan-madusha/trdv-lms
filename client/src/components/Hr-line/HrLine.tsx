import React from "react";

export const HrLine = ({ text }: any) => {
  return (
    <div className="hr-container">
      <hr className="hr-line" />
      <span className="hr-text">{text}</span>
      <hr className="hr-line" />
    </div>
  );
};
