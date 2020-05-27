import React from "react";
import parse from "html-react-parser";
import { Link } from "react-router-dom";

export const joinMainArtistLinksBad = mainArtists => {
  const linksArray = mainArtists.map(artistObj => {
    return <Link to={`api/personnel/${artistObj._id}`}>{artistObj.name}</Link>;
  });
  console.log(`linksArray = ${JSON.stringify(linksArray)}`);
  return parse(linksArray.join());
};

export const joinMainArtistLinks = mainArtists => {
  if (mainArtists.length > 0) {
    return (
      <>
        {mainArtists.slice(0, -1).map(({ _id, name }) => (
          <>
            <Link to={`/api/personnel/${_id}`}>{name}</Link>
            {", "}
          </>
        ))}
        <Link to={`/api/personnel/${mainArtists[mainArtists.length - 1]._id}`}>
          {mainArtists[mainArtists.length - 1].name}
        </Link>
      </>
    );
  } else {
    return <span>No Artist</span>;
  }
};

// export default formattingUtil;
