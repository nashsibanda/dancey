export const RELEASES_LOADING_ON = "RELEASES_LOADING_ON";
export const RELEASES_LOADING_OFF = "RELEASES_LOADING_OFF";
export const REVIEWS_LOADING_ON = "REVIEWS_LOADING_ON";
export const REVIEWS_LOADING_OFF = "REVIEWS_LOADING_OFF";
export const COMMENTS_LOADING_ON = "COMMENTS_LOADING_ON";
export const COMMENTS_LOADING_OFF = "COMMENTS_LOADING_OFF";
export const TRACKS_LOADING_ON = "TRACKS_LOADING_ON";
export const TRACKS_LOADING_OFF = "TRACKS_LOADING_OFF";
export const PERSONNEL_LOADING_ON = "PERSONNEL_LOADING_ON";
export const PERSONNEL_LOADING_OFF = "PERSONNEL_LOADING_OFF";

export const releasesLoadingOn = () => ({
  type: RELEASES_LOADING_ON,
});

export const releasesLoadingOff = () => ({
  type: RELEASES_LOADING_OFF,
});

export const reviewsLoadingOn = () => ({
  type: REVIEWS_LOADING_ON,
});

export const reviewsLoadingOff = () => ({
  type: REVIEWS_LOADING_OFF,
});

export const commentsLoadingOn = () => ({
  type: COMMENTS_LOADING_ON,
});

export const commentsLoadingOff = () => ({
  type: COMMENTS_LOADING_OFF,
});

export const tracksLoadingOn = () => ({
  type: TRACKS_LOADING_ON,
});

export const tracksLoadingOff = () => ({
  type: TRACKS_LOADING_OFF,
});

export const personnelLoadingOn = () => ({
  type: PERSONNEL_LOADING_ON,
});

export const personnelLoadingOff = () => ({
  type: PERSONNEL_LOADING_OFF,
});
