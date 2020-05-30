import React from "react";
import { Link } from "react-router-dom";

export default function PersonnelIndexItem(props) {
  const { role, personnel } = props;
  const { name, _id } = personnel;
  return (
    <li className="personnel-index-item">
      <span className="personnel-name">
        <Link to={`/personnel/${_id}`}>{name}</Link>
      </span>
      {" — "}
      <span className="personnel-role">{role}</span>
    </li>
  );
}
