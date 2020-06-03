import { combineReducers } from "redux";
import ReleasesLoadingReducer from "./loading/releases_loading_reducer";
import ReviewsLoadingReducer from "./loading/reviews_loading_reducer";
import CommentsLoadingReducer from "./loading/comments_loading_reducer";
import TracksLoadingReducer from "./loading/tracks_loading_reducer";
import PersonnelLoadingReducer from "./loading/personnel_loading_reducer";
import TrackPersonnelLoadingReducer from "./loading/track_personnel_loading_reducer";
import SessionLoadingReducer from "./loading/session_loading_reducer";

const LoadingReducer = combineReducers({
  releases: ReleasesLoadingReducer,
  reviews: ReviewsLoadingReducer,
  comments: CommentsLoadingReducer,
  tracks: TracksLoadingReducer,
  personnel: PersonnelLoadingReducer,
  trackPersonnel: TrackPersonnelLoadingReducer,
  session: SessionLoadingReducer,
});

export default LoadingReducer;
