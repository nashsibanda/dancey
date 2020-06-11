import React from "react";
import { joinObjectLinks } from "../../util/formatting_util";

export default function PersonnelIndexItem(props) {
  const { role, personnel } = props;
  return (
    <li className="personnel-index-item">
      {joinObjectLinks(personnel)}
      {" — "}
      <span className="personnel-role">{role}</span>
    </li>
  );
}
