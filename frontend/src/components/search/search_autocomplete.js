import React, { Component } from "react";

import AsyncCreatableSelect from "react-select/async-creatable";
import AsyncSelect from "react-select/async";

export default class SearchAutocomplete extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selected: [],
      inputValue: "",
      redirect: false,
    };
    this.fetchData = this.fetchData.bind(this);
    this.updateInputValue = this.updateInputValue.bind(this);
    this.makeOptions = this.makeOptions.bind(this);
    this.updateSelected = this.updateSelected.bind(this);
    this.setDefaultOptions = this.setDefaultOptions.bind(this);
    this.handleCreate = this.handleCreate.bind(this);
    this.linkToResource = this.linkToResource.bind(this);
    // this.typingTimer = false;
    // this.typingTimerInterval = 1500;
    // this.timedInput = this.timedInput.bind(this);
  }

  componentDidMount() {
    if (this.props.defaultSelected) {
      const { formUpdate, fieldName, defaultSelected } = this.props;
      console.log("MOUNTED");

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
    console.log("MAKING OPTIONS");
    const options = data.map(object => {
      const objectFields = this.props.getOptionFields(object);
      return {
        value: object._id,
        label: objectFields.labelField,
        moreInfoField1: objectFields.moreInfoField1,
        moreInfoField2: objectFields.moreInfoField2,
        image: objectFields.image,
      };
    });
    console.log(options);
    return options;
  }

  // timedInput(inputValue) {
  //   if (inputValue.length < 2) return this.setDefaultOptions();
  //   if (this.typingTimer) clearTimeout(this.typingTimer);
  //   console.log(this.typingTimerInterval);
  //   this.typingTimer = setTimeout(
  //     this.fetchData(inputValue),
  //     this.typingTimerInterval
  //   );
  // }

  fetchData(inputValue) {
    const { receiveResponseErrors, getQueryData } = this.props;
    console.log(inputValue);
    if (inputValue.length < 2) return this.setDefaultOptions();
    return getQueryData(this.props.recordType, inputValue)
      .then(dataCollection => {
        console.log(dataCollection.data);
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

  linkToResource(selected) {
    this.setState({ selected });
  }

  render() {
    if (this.props.noCreate) {
      return (
        <AsyncSelect
          cacheOptions
          // menuIsOpen
          className="search-autocomplete"
          classNamePrefix="search-autocomplete"
          loadOptions={this.fetchData}
          // defaultOptions={this.setDefaultOptions()}
          placeholder={this.props.placeholderText}
          onInputChange={this.updateInputValue}
          formatOptionLabel={this.props.formatOptionLabel}
          onCreateOption={this.handleCreate}
          onChange={
            this.props.optionLinks ? this.linkToResource : this.updateSelected
          }
          value={this.state.selected}
        />
      );
    } else {
      return (
        <>
          <AsyncCreatableSelect
            isMulti={this.props.multiSelect}
            cacheOptions
            // menuIsOpen
            className="search-autocomplete"
            classNamePrefix="search-autocomplete"
            loadOptions={this.fetchData}
            // defaultOptions={this.setDefaultOptions()}
            placeholder={this.props.placeholderText}
            onInputChange={this.updateInputValue}
            formatOptionLabel={this.props.formatOptionLabel}
            onCreateOption={this.handleCreate}
            onChange={
              this.props.optionLinks ? this.linkToResource : this.updateSelected
            }
            value={this.state.selected}
          />
        </>
      );
    }
  }
}
