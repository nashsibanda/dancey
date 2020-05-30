import React from "react";
import PersonnelIndexItem from "./personnel_index_item";

export default function PersonnelIndex(props) {
  const { releasePersonnel, statePersonnel } = props;
  return (
    <ul className="personnel-index">
      {releasePersonnel.length > 0 &&
        releasePersonnel.map(rPersonnel => {
          const itemPersonnel = statePersonnel[rPersonnel.personnelId._id];
          return (
            itemPersonnel && (
              <PersonnelIndexItem
                personnel={itemPersonnel}
                role={rPersonnel.role}
                key={rPersonnel._id}
              />
            )
          );
        })}
    </ul>
  );
}
