import { connect } from "react-redux";
import PersonnelIndex from "./personnel_index";

const mapStateToProps = state => ({
  statePersonnel: state.entities.personnel,
});

export default connect(mapStateToProps, null)(PersonnelIndex);
