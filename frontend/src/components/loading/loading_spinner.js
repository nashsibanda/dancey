import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function LoadingSpinner(props) {
  return (
    <div
      className={
        "loading-spinner" + (props.className ? ` ${props.className}` : "")
      }
    >
      <FontAwesomeIcon
        icon="compact-disc"
        spin
        rotation={[90, 180, 270][Math.floor(Math.random() * 3)]}
      />
    </div>
  );
}
