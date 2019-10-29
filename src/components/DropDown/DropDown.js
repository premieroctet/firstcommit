import React from "react";
import { Input } from "./elements";
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
    <Downshift
      itemToString={item => (item ? item.value : "")}
      onChange={onChangeDownshift}
    >
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
              placeholder="Name of Github repository"
              {...getInputProps()}
              onKeyPress={handleKeyPress}
              type="text"
              autoFocus
            />
          </form>

          <ResultsList
            inputValue={inputValue}
            highlightedIndex={highlightedIndex}
            getMenuProps={getMenuProps}
            getItemProps={getItemProps}
            getFirstCommit={props.getFirstCommit}
            selectedItem={selectedItem}
          />
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
