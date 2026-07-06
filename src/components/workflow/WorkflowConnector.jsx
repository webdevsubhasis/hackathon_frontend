import React from "react";
import {
  ChevronRight,
  ChevronLeft,
  ArrowDown,
} from "lucide-react";

export default function WorkflowConnector({
  direction = "right",
}) {
  if (direction === "right") {
    return (
      <div className="workflow-connector horizontal">

        <div className="workflow-line"></div>

        <ChevronRight
          size={22}
          className="workflow-arrow"
        />

      </div>
    );
  }

  if (direction === "left") {
    return (
      <div className="workflow-connector horizontal">

        <ChevronLeft
          size={22}
          className="workflow-arrow"
        />

        <div className="workflow-line"></div>

      </div>
    );
  }

  return (
    <div className="workflow-connector vertical">

      <div className="workflow-line-vertical"></div>

      <ArrowDown
        size={22}
        className="workflow-arrow"
      />

    </div>
  );
}