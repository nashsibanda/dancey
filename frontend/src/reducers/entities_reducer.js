import { combineReducers } from "redux";
import ReleasesReducer from "./entities/releases_reducer";
import PersonnelReducer from "./entities/personnel_reducer";
import TracksReducer from "./entities/tracks_reducer";
import CommentsReducer from "./entities/comments_reducer";
import ReviewsReducer from "./entities/reviews_reducer";

const EntitiesReducer = combineReducers({
  releases: ReleasesReducer,
  personnel: PersonnelReducer,
  tracks: TracksReducer,
  comments: CommentsReducer,
  reviews: ReviewsReducer,
});

export default EntitiesReducer;
