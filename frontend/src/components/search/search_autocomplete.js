import React, { Component } from "react";

import AsyncCreatableSelect from "react-select/async-creatable";

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
    this.setDefaultOptions = this.setDefaultOptions.bind(this);
    this.handleCreate = this.handleCreate.bind(this);
  }

  componentDidMount() {
    if (this.props.defaultSelected) {
      const { formUpdate, fieldName, defaultSelected } = this.props;

      this.setState({ selected: this.makeOptions(defaultSelected) }, () =>
        formUpdate(fieldName, this.state.selected)
      );
    }
  }

  updateInputValue(newValue) {
    const inputValue = newValue.replace(
      /[^\w\d\-_ 　\u3040-\u309F\u30A0-\u30FF\uFF00-\uFFEF\u4E00-\u9FAF]/g,
      ""
    );
    this.setState({ inputValue });
    return inputValue;
  }

  makeOptions(data) {
    const options = data.map(object => ({
      value: object._id,
      label: object[this.props.labelField],
      moreInfoField1: object[this.props.moreInfoField1],
      moreInfoField2: object[this.props.moreInfoField2],
      image: object.images ? object.images.find(img => img.mainImage) : null,
    }));
    return options;
  }

  fetchData(inputValue) {
    const { receiveResponseErrors, getQueryData } = this.props;
    if (inputValue.length < 2) return this.setDefaultOptions();
    return getQueryData(inputValue)
      .then(dataCollection => {
        return this.makeOptions(dataCollection.data);
      })
      .catch(err => receiveResponseErrors(err.response.data));
  }

  handleCreate(inputValue) {
    this.setState({ isLoading: true });
    this.props.createNewEntry(inputValue).then(newEntry => {
      const newOption = this.makeOptions([newEntry.data]);
      this.setState({ isLoading: false });
      const newSelected = this.state.selected.concat(newOption);
      this.updateSelected(newSelected);
    });
  }

  updateSelected = selected => {
    const { formUpdate, fieldName } = this.props;
    this.setState({ selected }, () =>
      formUpdate(fieldName, this.state.selected)
    );
  };

  setDefaultOptions() {
    return this.makeOptions(Object.values(this.props.statePersonnel));
  }

  render() {
    return (
      <AsyncCreatableSelect
        isMulti={this.props.multiSelect}
        cacheOptions
        className="search-autocomplete"
        classNamePrefix="search-autocomplete"
        loadOptions={this.fetchData}
        defaultOptions={this.setDefaultOptions()}
        placeholder={this.props.placeholderText}
        onInputChange={this.updateInputValue}
        formatOptionLabel={this.props.formatOptionLabel}
        onCreateOption={this.handleCreate}
        onChange={this.updateSelected}
        value={this.state.selected}
      />
    );
  }
}
