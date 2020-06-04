import React, { Component } from "react";

import AsyncSelect from "react-select/async";

export default class SearchAutocomplete extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selected: [],
      inputValue: "",
    };
    this.fetchData = this.fetchData.bind(this);
    this.updateInputValue = this.updateInputValue.bind(this);
    this.makeOptions = this.makeOptions.bind(this);
    this.updateSelected = this.updateSelected.bind(this);
  }

  updateInputValue(newValue) {
    const inputValue = newValue.replace(/\W/g, "");
    this.setState({ inputValue });
    return inputValue;
  }

  makeOptions(data) {
    const options = data.map(object => ({
      value: object._id,
      label: object[this.props.labelField],
      moreInfoField1: object[this.props.moreInfoField1],
      moreInfoField2: object[this.props.moreInfoField2],
    }));
    console.log(options);
    return options;
  }

  fetchData(inputValue) {
    const { receiveResponseErrors, getQueryData } = this.props;
    return getQueryData(inputValue)
      .then(dataCollection => {
        return this.makeOptions(dataCollection.data);
      })
      .catch(err => receiveResponseErrors(err.response.data));
  }

  updateSelected = selected => {
    const { formUpdate, fieldName } = this.props;
    this.setState({ selected }, () =>
      formUpdate(
        fieldName,
        this.state.selected.map(obj => obj.value)
      )
    );
    console.log(selected);
  };

  render() {
    return (
      <AsyncSelect
        isMulti
        cacheOptions
        className="search-autocomplete"
        classNamePrefix="search-autocomplete"
        loadOptions={this.fetchData}
        defaultOptions
        placeholder="Main Artist(s)..."
        onInputChange={this.updateInputValue}
        formatOptionLabel={this.props.formatOptionLabel}
        onChange={this.updateSelected}
        value={this.state.selected}
      />
    );
  }
}
