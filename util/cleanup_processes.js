const Personnel = require("../models/Personnel");
const Release = require("../models/Release");
const Track = require("../models/Track");

const cleanupReleasePersonnel = async deletedPersonnel => {
  const deletedId = deletedPersonnel._id;
  let promises = await Release.find({
    $or: [
      {
        mainArtists: {
          $elemMatch: { $eq: deletedId },
        },
      },
      {
        "personnel.personnelIds": {
          $elemMatch: { $eq: deletedId },
        },
      },
    ],
  })
    .then(releases => {
      const cleanupReleases = releases.map(release => {
        return cleanupOneReleasePersonnel(release, deletedId);
      });
      return Promise.all(cleanupReleases);
    })
    .catch(err => {
      console.log(err);
    });
  return promises;
};

const cleanupOneReleasePersonnel = (release, deletedId) => {
  return new Promise(
    resolve => {
      const newRelease = release.toObject();
      newRelease["mainArtists"] = newRelease.mainArtists.filter(
        id => `${id}` != `${deletedId}`
      );
      newRelease["personnel"] = newRelease.personnel
        .map(personnelListing => {
          const { _id, role, personnelIds } = personnelListing;
          return {
            _id,
            role,
            personnelIds: personnelIds.filter(id => `${id}` != `${deletedId}`),
          };
        })
        .filter(listing => listing.personnelIds.length != 0);
      const replacement = Object.assign(
        {},
        release.toObject(),
        { ...newRelease },
        {
          updatedAt: Date.now(),
        }
      );
      Release.findByIdAndUpdate(
        release._id,
        {
          $set: {
            personnel: newRelease.personnel,
            mainArtists: newRelease.mainArtists,
          },
        },
        (err, updatedReleaseRecord) => {
          if (err) {
            return console.log(err);
          }
          resolve();
        }
      );
    },
    reject => {
      return console.log("REJECTED");
    }
  );
};

const cleanupTrackPersonnel = async deletedPersonnel => {
  const deletedId = deletedPersonnel._id;
  let promises = await Track.find({
    $or: [
      {
        mainArtists: {
          $elemMatch: { $eq: deletedId },
        },
      },
      {
        writers: {
          $elemMatch: { $eq: deletedPersonnel._id },
        },
      },
      {
        "personnel.personnelIds": {
          $elemMatch: { $eq: deletedId },
        },
      },
    ],
  })
    .then(tracks => {
      const cleanupTracks = tracks.map(track =>
        cleanupOneTrackPersonnel(track, deletedId)
      );
      return Promise.all(cleanupTracks);
    })
    .catch(err => console.log(err));
  return promises;
};

const cleanupOneTrackPersonnel = (track, deletedId) => {
  return new Promise(resolve => {
    const newTrack = track.toObject();
    newTrack["mainArtists"] = newTrack.mainArtists.filter(
      id => `${id}` != `${deletedId}`
    );
    newTrack["writers"] = newTrack.writers.filter(
      id => `${id}` != `${deletedId}`
    );
    newTrack["personnel"] = newTrack.personnel
      .map(personnelListing => {
        const { _id, role, personnelIds } = personnelListing;
        return {
          _id,
          role,
          personnelIds: personnelIds.filter(id => `${id}` != `${deletedId}`),
        };
      })
      .filter(listing => listing.personnelIds.length != 0);
    const replacement = Object.assign(
      {},
      track.toObject(),
      { ...newTrack },
      { updatedAt: Date.now() }
    );

    Track.findByIdAndUpdate(
      track._id,
      {
        $set: {
          personnel: newTrack.personnel,
          mainArtists: newTrack.mainArtists,
          writers: newTrack.writers,
        },
      },
      (err, updatedTrackRecord) => {
        if (err) return console.log(err);
        resolve();
      }
    );
  });
};

module.exports = { cleanupReleasePersonnel, cleanupTrackPersonnel };
