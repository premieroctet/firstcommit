import React from "react";
import { Input, Suggestion, SkeletonContainer, NoRepo } from "./elements";
import Downshift from "downshift";
import Skeleton from "react-loading-skeleton";

const DownShiftContainer = props => {
  const onChange = event => {
    props.setUrl(event.target.value);
    window.history.pushState(null, "/?repo=", "/?repo=" + event.target.value);
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
                  <p>
                    <span role="img" aria-label="help">
                      ❓
                    </span>
                    No results were found, the repository may be in private
                    <span role="img" aria-label="help">
                      ❓
                    </span>
                  </p>
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

export default DownShiftContainer;
