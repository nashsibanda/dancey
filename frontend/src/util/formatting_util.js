import React, { Fragment } from "react";
import { Link } from "react-router-dom";

export const joinObjectLinks = (
  objectArray,
  newTabOrWindow = false,
  collection = "personnel",
  identifier = "name"
) => {
  const randId = makeRandomId();
  if (objectArray.length > 0) {
    return (
      <Fragment key={`${randId}-main`}>
        {objectArray.slice(0, -1).map(object => (
          <Fragment key={`${randId}-${object._id}`}>
            <Link
              to={`/${collection}/${object._id}`}
              target={newTabOrWindow ? "_blank" : "_self"}
              rel="noopener noreferrer"
            >
              {object[identifier]}
            </Link>
            {", "}
          </Fragment>
        ))}
        <Link
          to={`/${collection}/${objectArray[objectArray.length - 1]._id}`}
          target={newTabOrWindow ? "_blank" : "_self"}
          rel="noopener noreferrer"
        >
          {objectArray[objectArray.length - 1][identifier]}
        </Link>
      </Fragment>
    );
  } else {
    return <Fragment key={randId}></Fragment>;
  }
};

export const makeFriendlyTime = duration =>
  `${parseInt(duration / 60)}:${
    duration % 60 > 9 ? duration % 60 : "0" + (duration % 60)
  }`;

export const makeReleaseHtmlTitle = (mainArtists, release) => {
  const { title, format, releaseYear, releaseCountry } = release;
  const mainArtistsString = mainArtists.map(a => a.name).join(", ");
  const detailsString = [releaseYear, format, releaseCountry]
    .filter(Boolean)
    .join(", ");
  return `${mainArtists.length > 0 ? mainArtistsString : ""} - ${title}${
    detailsString ? ` (${detailsString})` : ""
  } | dancey`;
};

export const makeRandomId = () => {
  var S4 = function () {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  };
  return S4() + S4() + "-" + S4();
};
