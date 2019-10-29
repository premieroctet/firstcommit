import React from "react";
import { Input, Suggestion, SkeletonContainer, NoRepo } from "./elements";
import Skeleton from "react-loading-skeleton";
import PropTypes from "prop-types";
import Downshift from "downshift";

const DropDown = props => {
  const onChange = event => {
    props.setUrl(event.target.value);
    window.history.pushState(null, "/?repo=", `/?repo=${event.target.value}`);
  };

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
              onChange={onChange}
              onKeyPress={handleKeyPress}
              type="text"
              value={props.url}
              autoFocus
            />
          </form>
          {props.loadingRepo ? (
            <SkeletonContainer>
              <Skeleton />
            </SkeletonContainer>
          ) : (
            <NoRepo>
              {props.repositories &&
                props.repositories.length === 0 &&
                props.url !== "" && (
                  <>
                    <span role="img" aria-label="help">
                      ❓
                    </span>
                    <p>
                      No results were found, the repository may be in private
                    </p>
                  </>
                )}

              {props.repositories &&
                props.repositories.length >= 1 &&
                props.repositories.map((repository, index) => (
                  <Suggestion
                    isActive={highlightedIndex === index}
                    selectedItem={selectedItem === repository}
                    onClick={() => props.getFirstCommit(repository)}
                    key={repository}
                    {...getMenuProps()}
                  >
                    <p
                      style={{ padding: 10, margin: 0 }}
                      {...getItemProps({
                        item: repository,
                        key: repository
                      })}
                    >
                      {repository}
                    </p>
                  </Suggestion>
                ))}
            </NoRepo>
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
