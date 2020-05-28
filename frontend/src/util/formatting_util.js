import React from "react";
import { Link } from "react-router-dom";

export const joinObjectLinks = (
  objectArray,
  collection = "personnel",
  identifier = "name"
) => {
  if (objectArray.length > 0) {
    return (
      <>
        {objectArray.slice(0, -1).map(object => (
          <>
            <Link to={`/${collection}/${object._id}`}>
              {object[identifier]}
            </Link>
            {", "}
          </>
        ))}
        <Link to={`/${collection}/${objectArray[objectArray.length - 1]._id}`}>
          {objectArray[objectArray.length - 1][identifier]}
        </Link>
      </>
    );
  } else {
    return <></>;
  }
};

// export default formattingUtil;
