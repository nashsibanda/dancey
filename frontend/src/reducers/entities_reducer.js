import { combineReducers } from "redux";
import ReleasesReducer from "./entities/releases_reducer";

const EntitiesReducer = combineReducers({
  releases: ReleasesReducer,
});

export default EntitiesReducer;
