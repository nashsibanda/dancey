import * as TrackAPIUtil from "../util/track_api_util";
import { tracksLoadingOn, tracksLoadingOff } from "./loading_actions";

export const RECEIVE_TRACKS = "RECEIVE_TRACKS";
export const RECEIVE_TRACK = "RECEIVE_ONE_TRACK";
export const RECEIVE_TRACK_ERRORS = "RECEIVE_TRACK_ERRORS";

const receiveTracks = tracks => ({
  type: RECEIVE_TRACKS,
  tracks,
});

const receiveTrack = track => ({
  type: RECEIVE_TRACK,
  track,
});

const receiveTrackErrors = errors => ({
  type: RECEIVE_TRACK_ERRORS,
  errors,
});

export const fetchResourceTracks = (resourceType, resourceId) => dispatch => {
  dispatch(tracksLoadingOn());
  TrackAPIUtil.getResourceTracks(resourceType, resourceId)
    .then(tracks => {
      dispatch(receiveTracks(tracks.data));
      dispatch(tracksLoadingOff());
    })
    .catch(err => {
      dispatch(receiveTrackErrors(err.response.data));
      dispatch(tracksLoadingOff());
    });
};

export const fetchTrack = id => dispatch => {
  dispatch(tracksLoadingOn());
  TrackAPIUtil.getTrack(id)
    .then(track => {
      dispatch(receiveTrack(track.data));
      dispatch(tracksLoadingOff());
    })
    .catch(err => {
      dispatch(receiveTrackErrors(err.response.data));
      dispatch(tracksLoadingOff());
    });
};
