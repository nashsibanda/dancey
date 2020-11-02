import React from "react";
import {
  receiveOnePersonnel,
  receivePersonnelErrors,
} from "../../actions/personnel_actions";
import { connect } from "react-redux";
import { postPersonnel } from "../../util/personnel_api_util";
import SearchAutocomplete from "./search_autocomplete";
import moment from "moment";
import plainPersonnelImage from "../../assets/abstract-user-flat-1.svg";
import plainRecordImage from "../../assets/plain_record.png";
import { getSearchRecords } from "../../util/search_api_util";

const formatOptionLabel = ({
  value,
  label,
  moreInfoField1,
  moreInfoField2,
  image,
}) => (
  <div className="search-autocomplete-option">
    <div className="image">
      <img src={image} className={"main-image"} alt={`${label}`} />
    </div>
    <div className="label-and-details">
      <div className="main-label">
        <span>{label}</span>
      </div>
      <div className="more-info">
        <span>{moreInfoField1}</span>
        <span>{moreInfoField2}</span>
      </div>
    </div>
  </div>
);

const getOptionFields = object => {
  const fields = {
    labelField: object.name ? object.name : object.title,
    moreInfoField1: object.name
      ? object.alsoKnownAs && object.alsoKnownAs.length > 0
        ? `aka. ${object.alsoKnownAs.slice(0, 4).join(", ")}`
        : ""
      : object.mainArtists.map(x => x.name).length > 0
      ? `by ${object.mainArtists
          .map(x => x.name)
          .slice(0, 4)
          .join(", ")}`
      : "",
    moreInfoField2: object.name
      ? object.dateOfBirth
        ? `b. ${moment(object.dateOfBirth).format("YYYY")}`
        : ""
      : object.releaseYear
      ? `${object.releaseYear ? object.releaseYear : ""}${
          object.releaseYear && object.format ? ", " : ""
        }${object.format ? object.format : ""}`
      : "",
    image:
      object.images.length > 0
        ? object.images.find(img => img.mainImage)
          ? object.images.find(img => img.mainImage).imageUrl
          : object.images[0].imageUrl
        : object.name
        ? plainPersonnelImage
        : plainRecordImage,
    resourceType: object.name ? "personnel" : "releases",
  };
  return fields;
};

const mapStateToProps = state => ({
  formatOptionLabel: formatOptionLabel,

  getOptionFields: object => getOptionFields(object),
  statePersonnel: state.entities.personnel,
});

const mapDispatchToProps = dispatch => ({
  getQueryData: (recordType, query) => getSearchRecords(recordType, query),
  receiveSelectedData: data => dispatch(receiveOnePersonnel(data)),
  receiveResponseErrors: errors => dispatch(receivePersonnelErrors(errors)),
  createNewEntry: name => postPersonnel({ name }),
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchAutocomplete);
