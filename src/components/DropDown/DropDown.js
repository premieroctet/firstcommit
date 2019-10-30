import React from "react";
import { Input, ResultsContainer } from "./elements";
import PropTypes from "prop-types";
import Downshift from "downshift";
import ResultsList from "./ResultsList";

const DropDown = props => {
  const onChangeDownshift = selection => {
    props.getFirstCommit(selection);
  };

  const handleKeyPress = event => {
    if (event.key === "Enter") {
      event.preventDefault();
    }
  };

  return (
    <Downshift onChange={onChangeDownshift}>
      {({
        inputValue,
        getInputProps,
        getMenuProps,
        getItemProps,
        highlightedIndex,
        selectedItem
      }) => (
        <div>
          <form>
            <Input
              {...getInputProps()}
              placeholder="Name of Github repository"
              onKeyPress={handleKeyPress}
              type="text"
              autoFocus
            />
          </form>
          <ResultsContainer {...getMenuProps()}>
            <ResultsList
              inputValue={inputValue}
              highlightedIndex={highlightedIndex}
              getItemProps={getItemProps}
              selectedItem={selectedItem}
              setFirstCommit={props.setFirstCommit}
            />
          </ResultsContainer>
        </div>
      )}
    </Downshift>
  );
};

export default DropDown;

DropDown.propTypes = {
  setUrl: PropTypes.func,
  url: PropTypes.string,
  loadingRepo: PropTypes.bool,
  repositories: PropTypes.array,
  getFirstCommit: PropTypes.func
};
