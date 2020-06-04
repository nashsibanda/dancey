import React from "react";
import {
  fetchQueryPersonnel,
  receiveOnePersonnel,
  receivePersonnelErrors,
} from "../../actions/personnel_actions";
import { connect } from "react-redux";
import { getQueryPersonnel } from "../../util/personnel_api_util";
import SearchAutocomplete from "./search_autocomplete";
import moment from "moment";

const formatPersonnelOptionLabel = ({
  value,
  label,
  moreInfoField1,
  moreInfoField2,
}) => (
  <div className="search-autocomplete-option">
    <div>
      <span>{label}</span>
    </div>
    <div className="more-info">
      <span>{moreInfoField1}</span>
      <span>
        {moreInfoField2 ? `b. ${moment(moreInfoField2).format("YYYY")}` : ""}
      </span>
    </div>
  </div>
);

const mapStateToProps = state => ({
  formatOptionLabel: formatPersonnelOptionLabel,
  labelField: "name",
  moreInfoField1: "countryOfOrigin",
  moreInfoField2: "dateOfBirth",
  statePersonnel: state.entities.personnel,
});

const mapDispatchToProps = dispatch => ({
  fetchQueryEntities: query => dispatch(fetchQueryPersonnel(query)),
  getQueryData: query => getQueryPersonnel(query),
  receiveSelectedData: data => dispatch(receiveOnePersonnel(data)),
  receiveResponseErrors: errors => dispatch(receivePersonnelErrors(errors)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchAutocomplete);
