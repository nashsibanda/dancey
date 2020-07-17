const express = require("express");
const router = express.Router();
const passport = require("passport");
const formats = require("../../validation/formats");
const countries = require("../../validation/countries");
const got = require("got");
const discogReleases = require("../../temp_scratch/most_popular_discogs_releases_ids");
const artistUrls = require("../../temp_scratch/artist_urls");
const fs = require("fs");

const Release = require("../../models/Release");
const Personnel = require("../../models/Personnel");
const Track = require("../../models/Track");

router.post("/release", async (req, res, next) => {
  const { body } = await got(
    "https://api.discogs.com/releases/1863994?key=ojkJUdaxGTxoNRzmdENU&secret=TKkEeItRzgeMYOxPEHirJsoZgAQhLfzz",
    {
      responseType: "json",
    }
  );
  const relJson = body;

  const newRelease = {
    releaseYear: relJson.year,
    title: relJson.title,
    description: relJson.notes,
    videos: relJson.videos.map(video => {
      return {
        title: video.title,
        description: video.description,
        videoUrl: video.uri,
      };
    }),
    images: relJson.images.map(img => {
      return {
        imageUrl: img.uri,
        mainImage: img.type === "primary",
      };
    }),
  };

  const keyFormat = relJson.formats.find(obj =>
    obj.descriptions.some(desc => formats.includes(desc))
  );
  if (keyFormat) {
    newRelease["format"] = keyFormat.descriptions.find(desc =>
      formats.includes(desc)
    );
  }

  const relCountry = Object.values(countries).find(
    countryObj =>
      countryObj.name === relJson.country || countryObj.code === relJson.country
  );

  if (relCountry) {
    newRelease["releaseCountry"] = relCountry.name;
  }

  const mainArtistIds = [];
  for (const artist of relJson.artists) {
    const mainArtistPersonnelRecord = await Personnel.findOne({
      name: artist.name,
    });
    if (mainArtistPersonnelRecord) {
      mainArtistIds.push(mainArtistPersonnelRecord._id);
    } else {
      newArtist = new Personnel({
        name: artist.name,
        alsoKnownAs: [artist.anv],
      });
      const newArtistPersonnelRecord = await newArtist.save();
      mainArtistIds.push(newArtistPersonnelRecord._id);
    }
  }
  newRelease["mainArtists"] = mainArtistIds;

  const personnel = [];
  const personnelRoles = [
    ...new Set(relJson.extraartists.map(obj => obj.role)),
  ];
  for (const role of personnelRoles) {
    const personnelObject = { role: role, personnelIds: [] };
    const jsonArtists = relJson.extraartists
      .filter(obj => obj.role === role)
      .map(obj => ({ name: obj.name, anv: obj.anv }));
    for (const artist of jsonArtists) {
      const namePersonnelRecord = await Personnel.findOne({
        name: artist.name,
      });
      if (namePersonnelRecord) {
        personnelObject.personnelIds.push(namePersonnelRecord._id);
      } else {
        newPersonnel = new Personnel({
          name: artist.name,
          alsoKnownAs: [artist.anv],
        });
        const newPersonnelRecord = await newPersonnel.save();
        personnelObject.personnelIds.push(newPersonnelRecord._id);
      }
    }
    personnel.push(personnelObject);
  }
  newRelease["personnel"] = personnel;

  const labelArr = [];
  for (const label of relJson.labels) {
    const labelObj = { catalogueNumber: label.catno, labelIds: [] };
    const labelPersonnelRecord = await Personnel.findOne({ name: label.name });
    if (labelPersonnelRecord) {
      labelObj.labelIds.push(labelPersonnelRecord._id);
    } else {
      newLabel = new Personnel({
        name: label.name,
      });
      const newLabelPersonnelRecord = await newLabel.save();
      labelObj.labelIds.push(newLabelPersonnelRecord._id);
    }
    labelArr.push(labelObj);
  }
  newRelease["label"] = labelArr;

  const trackListing = [];
  for (const listing of relJson.tracklist) {
    const listingObj = {};
    const positionArr = listing.position.match(/([A-Za-z]+)([0-9]+)/).splice(1);
    listingObj["sideOrDisc"] =
      positionArr.length === 1
        ? null
        : positionArr[0].length === 1
        ? positionArr[0].charCodeAt(0) - 64
        : positionArr[0][1].charCodeAt(0) -
          65 +
          (positionArr[0][0].charCodeAt(0) - 64 * 27);
    listingObj["order"] =
      positionArr.length === 1
        ? parseInt(positionArr[0])
        : parseInt(positionArr[1]);

    let trackArtists = mainArtistIds;
    if (listing.artists) {
      const listingArtistIds = [];
      for (const artist of listing.artists) {
        const listingArtistPersonnelRecord = await Personnel.findOne({
          name: artist.name,
        });
        if (listingArtistPersonnelRecord) {
          listingArtistIds.push(listingArtistPersonnelRecord._id);
        } else {
          newArtist = new Personnel({
            name,
            alsoKnownAs: [artist.anv],
          });
          const newArtistPersonnelRecord = await newArtist.save();
          listingArtistIds.push(newArtistPersonnelRecord._id);
        }
      }
      trackArtists = mainArtistIds;
    }

    const trackPersonnel = [];
    const trackPersonnelRoles = listing.extraartists
      ? [...new Set(listing.extraartists.map(obj => obj.role))]
      : [];
    for (const role of trackPersonnelRoles.filter(
      role => role != "Written-By"
    )) {
      const trackPersonnelObject = {
        role: role,
        personnelIds: [],
      };
      const jsonArtists = listing.extraartists
        .filter(obj => obj.role === role)
        .map(obj => ({
          name: obj.name,
          anv: obj.anv,
        }));
      for (const artist of jsonArtists) {
        const nameTrackPersonnelRecord = await Personnel.findOne({
          name: artist.name,
        });
        if (nameTrackPersonnelRecord) {
          trackPersonnelObject.personnelIds.push(nameTrackPersonnelRecord._id);
        } else {
          newTrackPersonnel = new Personnel({
            name: artist.name,
            alsoKnownAs: [artist.anv],
          });
          const newTrackPersonnelRecord = await newTrackPersonnel.save();
          trackPersonnelObject.personnelIds.push(newTrackPersonnelRecord._id);
        }
      }
      trackPersonnel.push(trackPersonnelObject);
    }

    const writers = [];
    const jsonWriters = trackPersonnelRoles.includes("Written-By")
      ? listing.extraartists
          .filter(obj => obj.role === "Written-By")
          .map(obj => ({
            name: obj.name,
            anv: obj.anv,
          }))
      : [];

    for (const artist of jsonWriters) {
      const nameTrackPersonnelRecord = await Personnel.findOne({
        name: artist.name,
      });
      if (nameTrackPersonnelRecord) {
        writers.push(nameTrackPersonnelRecord._id);
      } else {
        newTrackPersonnel = new Personnel({
          name: artist.name,
          alsoKnownAs: [artist.anv],
        });
        const newTrackPersonnelRecord = await newTrackPersonnel.save();
        writers.push(newTrackPersonnelRecord._id);
      }
    }

    const durationArr = listing.duration.split(":").map(x => parseInt(x));
    const durationSeconds = durationArr[0] * 60 + durationArr[1];

    const newTrack = new Track({
      title: listing.title,
      mainArtists: trackArtists,
      personnel: trackPersonnel,
      duration: durationSeconds,
      writers,
    });

    const newTrackRecord = await newTrack.save();
    listingObj["trackId"] = newTrackRecord._id;

    trackListing.push(listingObj);
  }
  newRelease["trackListing"] = trackListing;

  const newReleaseRecord = new Release(newRelease);
  newReleaseRecord
    .save()
    .then(release => res.json(release))
    .catch(err => next(err));
});

router.post("/releases", async (req, res, next) => {
  let counter = 0;
  let errors = [];
  let increment;
  for (const releaseId of discogReleases) {
    try {
      increment = await addRelease(releaseId);
    } catch (error) {
      increment = 0;
      console.log(error);
      errors.push(errors);
    }
    counter = counter + increment;
    await sleeper();
  }
  console.log(errors);
  res.json({
    message: `OK! ${counter} release${counter === 1 ? "" : "s"} added!`,
    errors: errors.length,
  });
});

router.get("/personnel_resource_urls", async (req, res, next) => {
  let counter = 0;
  let errors = [];
  const personnelIdUrls = {};
  const releasesLength = discogReleases.length;
  const chunk = 25;
  for (let i = 0; i < releasesLength; i += chunk) {
    const subArr = discogReleases.slice(i, i + chunk);
    for (const releaseId of subArr) {
      try {
        console.log(
          `Processing: release ${
            counter + 1
          } of ${releasesLength}. ID: ${releaseId}`
        );
        const thisArray = await getPersonnelResourceUrlsForRelease(releaseId);
        thisArray.forEach(url => (personnelIdUrls[url] = true));
        counter++;
      } catch (error) {
        console.log(error);
        errors.push(errors);
      }
      await sleeper();
    }
    console.log(`${Object.keys(personnelIdUrls).length} personnel URLs added.`);
    fs.writeFile("temp_scratch/resource_urls.txt", "Start File\n", err => {
      if (err) throw err;
    });
    Object.keys(personnelIdUrls).forEach(url => {
      fs.appendFile(
        `temp_scratch/yet_more_resource_urls_${i}.txt`,
        `${url}\n`,
        err => {
          if (err) throw err;
        }
      );
    });
  }
  res.json({
    message: `OK! ${counter} release${counter === 1 ? "" : "s"} added!`,
    errors: errors.length,
  });
});

router.put("/artists", async (req, res, next) => {
  let counter = 0;
  let errors = [];
  let increment;
  for (const url of artistUrls) {
    try {
      increment = await updatePersonnelRecord(url);
    } catch (error) {
      increment = 0;
      console.log(error);
      errors.push(url);
    }
    counter = counter + increment;
    await sleeper();
  }
  console.log(errors);
  res.json({
    message: `OK! ${counter} release${counter === 1 ? "" : "s"} added!`,
    errors: errors.length,
  });
});

const sleeper = () => {
  return new Promise(resolve => setTimeout(resolve, 1000));
};

const getPersonnelResourceUrlsForRelease = async function (discogsReleaseId) {
  // console.log(
  //   `${discogsReleaseId} - Fetching title...: Retrieving from Discogs API...`
  // );
  const { body } = await got(
    `https://api.discogs.com/releases/${discogsReleaseId}?key=ojkJUdaxGTxoNRzmdENU&secret=TKkEeItRzgeMYOxPEHirJsoZgAQhLfzz`,
    {
      responseType: "json",
    }
  );
  const relJson = body;

  const resourceUrlsArray = [];

  if (relJson.artists)
    relJson.artists.forEach(artist =>
      resourceUrlsArray.push(artist.resource_url)
    );
  if (relJson.labels)
    relJson.labels.forEach(artist =>
      resourceUrlsArray.push(artist.resource_url)
    );
  if (relJson.extraartists)
    relJson.extraartists.forEach(artist =>
      resourceUrlsArray.push(artist.resource_url)
    );
  if (relJson.tracklist) {
    relJson.tracklist.forEach(listing => {
      if (listing.extraartists) {
        listing.extraartists.forEach(artist =>
          resourceUrlsArray.push(artist.resource_url)
        );
      }
    });
  }

  return resourceUrlsArray;
};

const updatePersonnelRecord = async function (discogsArtistId) {
  // console.log(
  //   `${discogsArtistId} - Fetching artist...: Retrieving from Discogs API...`
  // );
  const {
    body,
  } = await got(
    `https://api.discogs.com/${discogsArtistId}?key=ojkJUdaxGTxoNRzmdENU&secret=TKkEeItRzgeMYOxPEHirJsoZgAQhLfzz`,
    { responseType: "json" }
  );

  const perJson = body;
  const currentPersonnel = await Personnel.findOne({ name: perJson.name });

  if (!currentPersonnel) {
    console.log(`A personnel record does not exist for ${discogsArtistId}`);
    return 0;
  }

  const newPersonnel = {
    name: perJson.name,
    images: perJson.images
      ? perJson.images.map(img => {
          return {
            imageUrl: img.uri,
            mainImage: img.type === "primary",
          };
        })
      : [],
    alsoKnownAs: currentPersonnel.alsoKnownAs
      ? currentPersonnel.alsoKnownAs
      : [],
    associated: currentPersonnel.associated ? currentPersonnel.associated : [],
  };

  if (perJson.aliases) {
    newPersonnel.alsoKnownAs = perJson.aliases.map(alias => alias.name);
    for (const alias of perJson.aliases) {
      const extantAlias = await Personnel.findOne({ name: alias.name });
      if (extantAlias) {
        newPersonnel.associated.push(extantAlias._id);
      }
    }
  }

  if (perJson.groups) {
    for (const group of perJson.groups) {
      const extantGroup = await Personnel.findOne({ name: group.name });
      if (extantGroup) {
        newPersonnel.associated.push(extantGroup._id);
      }
    }
  }

  if (perJson.namevariations) {
    newPersonnel.alsoKnownAs.push(...perJson.namevariations);
  }

  newPersonnel.associated = [...new Set(newPersonnel.associated)].filter(
    assc => !!assc
  );
  newPersonnel.alsoKnownAs = [...new Set(newPersonnel.alsoKnownAs)].filter(
    aka => !!aka
  );

  Personnel.findOneAndReplace(
    { name: currentPersonnel.name },
    Object.assign({}, currentPersonnel.toObject(), newPersonnel),
    { new: true },
    (err, saved) => {
      if (err) {
        console.log(err);
        return 0;
      } else {
        console.log(
          `${saved.name} updated! (${discogsArtistId}) / (danceyId: ${saved._id})`
        );
        return 1;
      }
    }
  );
  return 1;
};

const addRelease = async function (discogsReleaseId) {
  console.log(
    `${discogsReleaseId} - Fetching title...: Retrieving from Discogs API...`
  );
  const { body } = await got(
    `https://api.discogs.com/releases/${discogsReleaseId}?key=ojkJUdaxGTxoNRzmdENU&secret=TKkEeItRzgeMYOxPEHirJsoZgAQhLfzz`,
    {
      responseType: "json",
    }
  );
  const relJson = body;

  const existingReleases = await Release.find({ title: relJson.title });

  if (
    existingReleases &&
    existingReleases.length > 0 &&
    existingReleases.some(
      x => parseInt(x.releaseYear) === parseInt(relJson.year)
    )
  ) {
    console.log(
      `${existingReleases[0].title} - ${existingReleases[0].releaseYear} already exists in database.`
    );
    return 0;
  }

  const newRelease = {
    releaseYear:
      parseInt(relJson.year) > 1890 && parseInt(relJson.year) < 2030
        ? relJson.year
        : null,
    title: relJson.title,
    description: relJson.notes,
    videos: relJson.videos
      ? relJson.videos.map(video => {
          return {
            title: video.title,
            description: video.description,
            videoUrl: video.uri,
          };
        })
      : [],
    images: relJson.images.map(img => {
      return {
        imageUrl: img.uri,
        mainImage: img.type === "primary",
      };
    }),
  };

  const keyFormat = relJson.formats.find(obj =>
    obj.descriptions.some(desc => formats.includes(desc))
  );
  if (keyFormat) {
    newRelease["format"] = keyFormat.descriptions.find(desc =>
      formats.includes(desc)
    );
  }

  const relCountry = Object.values(countries).find(
    countryObj =>
      countryObj.name === relJson.country || countryObj.code === relJson.country
  );

  if (relCountry) {
    newRelease["releaseCountry"] = relCountry.name;
  }

  const mainArtistIds = [];
  for (const artist of relJson.artists) {
    const mainArtistPersonnelRecord = await Personnel.findOne({
      name: artist.name,
    });
    if (mainArtistPersonnelRecord) {
      console.log(
        `${discogsReleaseId} - ${
          relJson.title.length > 20
            ? `${relJson.title.slice(0, 20)}...`
            : relJson.title
        }: Found personnel ${
          mainArtistPersonnelRecord.name
        }, adding to release...`
      );
      mainArtistIds.push(mainArtistPersonnelRecord._id);
    } else {
      newArtist = new Personnel({
        name: artist.name,
        alsoKnownAs: [artist.anv],
      });
      const newArtistPersonnelRecord = await newArtist.save();
      console.log(
        `${discogsReleaseId} - ${
          relJson.title.length > 20
            ? `${relJson.title.slice(0, 20)}...`
            : relJson.title
        }: Created personnel ${
          newArtistPersonnelRecord.name
        }, adding to release...`
      );
      mainArtistIds.push(newArtistPersonnelRecord._id);
    }
  }
  newRelease["mainArtists"] = mainArtistIds;

  const personnel = [];
  const personnelRoles = [
    ...new Set(relJson.extraartists.map(obj => obj.role)),
  ];
  for (const role of personnelRoles) {
    const personnelObject = { role: role, personnelIds: [] };
    const jsonArtists = relJson.extraartists
      .filter(obj => obj.role === role)
      .map(obj => ({ name: obj.name, anv: obj.anv }));
    for (const artist of jsonArtists) {
      const namePersonnelRecord = await Personnel.findOne({
        name: artist.name,
      });
      if (namePersonnelRecord) {
        console.log(
          `${discogsReleaseId} - ${
            relJson.title.length > 20
              ? `${relJson.title.slice(0, 20)}...`
              : relJson.title
          }: Found personnel ${namePersonnelRecord.name}, adding to release...`
        );
        personnelObject.personnelIds.push(namePersonnelRecord._id);
      } else {
        newPersonnel = new Personnel({
          name: artist.name,
          alsoKnownAs: [artist.anv],
        });
        const newPersonnelRecord = await newPersonnel.save();
        console.log(
          `${discogsReleaseId} - ${
            relJson.title.length > 20
              ? `${relJson.title.slice(0, 20)}...`
              : relJson.title
          }: Created personnel ${newPersonnelRecord.name}, adding to release...`
        );
        personnelObject.personnelIds.push(newPersonnelRecord._id);
      }
    }
    personnel.push(personnelObject);
  }
  newRelease["personnel"] = personnel;

  const labelArr = [];
  for (const label of relJson.labels) {
    const labelObj = { catalogueNumber: label.catno, labelIds: [] };
    const labelPersonnelRecord = await Personnel.findOne({ name: label.name });
    if (labelPersonnelRecord) {
      console.log(
        `${discogsReleaseId} - ${
          relJson.title.length > 20
            ? `${relJson.title.slice(0, 20)}...`
            : relJson.title
        }: Found record label ${
          labelPersonnelRecord.name
        }, adding to release...`
      );
      labelObj.labelIds.push(labelPersonnelRecord._id);
    } else {
      newLabel = new Personnel({
        name: label.name,
      });
      const newLabelPersonnelRecord = await newLabel.save();
      console.log(
        `${discogsReleaseId} - ${
          relJson.title.length > 20
            ? `${relJson.title.slice(0, 20)}...`
            : relJson.title
        }: Created record label ${
          newLabelPersonnelRecord.name
        }, adding to release...`
      );
      labelObj.labelIds.push(newLabelPersonnelRecord._id);
    }
    labelArr.push(labelObj);
  }
  newRelease["label"] = labelArr;

  const trackListing = [];
  for (const listing of relJson.tracklist) {
    if (listing.position.split("-")[0] == "CD") continue;
    console.log(
      `${discogsReleaseId} - ${
        relJson.title.length > 20
          ? `${relJson.title.slice(0, 20)}...`
          : relJson.title
      }: Adding track ${listing.title}...`
    );
    const listingObj = {};
    const listingPosition =
      listing.position.length === 2 &&
      !listing.position[0].match(/[A-Z]/i) &&
      listing.position[1].match(/[A-Z]/i)
        ? listing.position.split("").reverse().join("")
        : listing.position;

    const positionArr =
      listingPosition.length > 0
        ? listingPosition.length > 1
          ? listingPosition.match(/([A-Za-z]+)([0-9]+)/).splice(1)
          : listingPosition.match(/[A-Z]/i)
          ? [listingPosition, "1"]
          : [listingPosition]
        : listing.sub_tracks
        ? listing.sub_tracks[0].position.match(/([A-Za-z]+)([0-9]+)/)
          ? listing.sub_tracks[0].position
              .match(/([A-Za-z]+)([0-9]+)/)
              .splice(1)
          : listing.sub_tracks[0].position.split(".").length === 2
          ? listing.sub_tracks[0].position.split(".")
          : [null]
        : [null];

    listingObj["sideOrDisc"] =
      positionArr.length === 1
        ? null
        : positionArr[0].length === 1
        ? positionArr[0].charCodeAt(0) - 64
        : positionArr[0][1].charCodeAt(0) -
          65 +
          (positionArr[0][0].charCodeAt(0) - 64 * 27);
    listingObj["order"] =
      positionArr.length === 1 ? positionArr[0] : positionArr[1];

    let trackArtists = mainArtistIds;
    if (listing.artists) {
      const listingArtistIds = [];
      for (const artist of listing.artists) {
        const listingArtistPersonnelRecord = await Personnel.findOne({
          name: artist.name,
        });
        if (listingArtistPersonnelRecord) {
          console.log(
            `${discogsReleaseId} - ${
              relJson.title.length > 20
                ? `${relJson.title.slice(0, 20)}...`
                : relJson.title
            }: Found personnel ${
              listingArtistPersonnelRecord.name
            }, adding to track ${listing.title}...`
          );
          listingArtistIds.push(listingArtistPersonnelRecord._id);
        } else {
          newArtist = new Personnel({
            name: artist.name,
            alsoKnownAs: [artist.anv],
          });
          const newArtistPersonnelRecord = await newArtist.save();
          console.log(
            `${discogsReleaseId} - ${
              relJson.title.length > 20
                ? `${relJson.title.slice(0, 20)}...`
                : relJson.title
            }: Created personnel ${
              newArtistPersonnelRecord.name
            }, adding to track ${listing.title}...`
          );
          listingArtistIds.push(newArtistPersonnelRecord._id);
        }
      }
      trackArtists = mainArtistIds;
    }

    const trackPersonnel = [];
    const trackPersonnelRoles = listing.extraartists
      ? [...new Set(listing.extraartists.map(obj => obj.role))]
      : [];
    for (const role of trackPersonnelRoles.filter(
      role => role != "Written-By"
    )) {
      const trackPersonnelObject = {
        role: role,
        personnelIds: [],
      };
      const jsonArtists = listing.extraartists
        .filter(obj => obj.role === role)
        .map(obj => ({
          name: obj.name,
          anv: obj.anv,
        }));
      for (const artist of jsonArtists) {
        const nameTrackPersonnelRecord = await Personnel.findOne({
          name: artist.name,
        });
        if (nameTrackPersonnelRecord) {
          trackPersonnelObject.personnelIds.push(nameTrackPersonnelRecord._id);
        } else {
          newTrackPersonnel = new Personnel({
            name: artist.name,
            alsoKnownAs: [artist.anv],
          });
          const newTrackPersonnelRecord = await newTrackPersonnel.save();
          trackPersonnelObject.personnelIds.push(newTrackPersonnelRecord._id);
        }
      }
      trackPersonnel.push(trackPersonnelObject);
    }

    const writers = [];
    const jsonWriters = trackPersonnelRoles.includes("Written-By")
      ? listing.extraartists
          .filter(obj => obj.role === "Written-By")
          .map(obj => ({
            name: obj.name,
            anv: obj.anv,
          }))
      : [];

    for (const artist of jsonWriters) {
      const nameTrackPersonnelRecord = await Personnel.findOne({
        name: artist.name,
      });
      if (nameTrackPersonnelRecord) {
        writers.push(nameTrackPersonnelRecord._id);
      } else {
        newTrackPersonnel = new Personnel({
          name: artist.name,
          alsoKnownAs: [artist.anv],
        });
        const newTrackPersonnelRecord = await newTrackPersonnel.save();
        writers.push(newTrackPersonnelRecord._id);
      }
    }

    const durationArr = listing.duration.split(":").map(x => parseInt(x));
    const durationSeconds =
      (durationArr[0] ? durationArr[0] * 60 : 0) +
      (durationArr[1] ? durationArr[1] : 1);

    const newTrack = new Track({
      title: listing.title,
      mainArtists: trackArtists,
      personnel: trackPersonnel,
      duration: durationSeconds,
      writers,
    });

    const existingTrack = await Track.findOne({
      title: listing.title,
      duration: durationSeconds,
    });
    if (existingTrack) {
      console.log(
        `${discogsReleaseId} - ${
          relJson.title.length > 20
            ? `${relJson.title.slice(0, 20)}...`
            : relJson.title
        }: Found existing track ${existingTrack.title}, adding to release...`
      );
      listingObj["trackId"] = existingTrack._id;
    } else {
      const newTrackRecord = await newTrack.save();
      console.log(
        `${discogsReleaseId} - ${
          relJson.title.length > 20
            ? `${relJson.title.slice(0, 20)}...`
            : relJson.title
        }: Created new track ${newTrackRecord.title}, adding to release...`
      );
      listingObj["trackId"] = newTrackRecord._id;
    }

    trackListing.push(listingObj);
  }
  newRelease["trackListing"] = trackListing;

  const newReleaseRecord = new Release(newRelease);
  newReleaseRecord
    .save()
    .then(release =>
      console.log(
        `${discogsReleaseId} - ${
          relJson.title.length > 20
            ? `${relJson.title.slice(0, 20)}...`
            : relJson.title
        }: Successfully added release: ${release.title}`
      )
    )
    .catch(err => console.log(err));

  return 1;
};

router.put("/fix_multi_artist", async (req, res, next) => {
  const releases = await Release.find();
  for (const release of releases) {
    const uniqueArtists = release.mainArtists.filter(
      (v, i, a) => a.indexOf(v) === i
    );
    await release.updateOne({ mainArtists: uniqueArtists });
    console.log(`Updated ${release.title}`);
  }
  console.log("DONE!");
  res.json({ message: "Done!" });
});

module.exports = router;
