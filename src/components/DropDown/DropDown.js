import React from "react";
import { Input, ResultsContainer } from "./elements";
import PropTypes from "prop-types";
import Downshift from "downshift";
import ResultsList from "./ResultsList";

const DropDown = ({
  getFirstCommit,
  url,
  setFirstCommit,
  firstCommit,
  repositories,
  setRepositories
}) => {
  const onChangeDownshift = selection => {
    getFirstCommit(selection);
  };

  const handleKeyPress = event => {
    if (event.key === "Enter") {
      event.preventDefault();
    }
  };

  return (
    <Downshift initialInputValue={url} onChange={onChangeDownshift}>
      {({
        inputValue,
        getInputProps,
        getMenuProps,
        getItemProps,
        highlightedIndex,
        selectedItem,
        clearSelection
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

          {inputValue && (
            <ResultsContainer {...getMenuProps()}>
              <ResultsList
                inputValue={inputValue}
                highlightedIndex={highlightedIndex}
                getItemProps={getItemProps}
                selectedItem={selectedItem}
                clearSelection={clearSelection}
                setFirstCommit={setFirstCommit}
                firstCommit={firstCommit}
                repositories={repositories}
                setRepositories={setRepositories}
              />
            </ResultsContainer>
          )}
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
