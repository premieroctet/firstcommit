import React, { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import client from "../../api/client";
import debounce from "lodash/debounce";
import {
  Suggestion,
  SkeletonContainer,
  NoRepo,
  Img,
  Title,
  Floating,
  RepoTitle
} from "./elements";

const ResultsList = ({
  inputValue,
  setRepositories,
  setFirstCommit,
  clearSelection,
  repositories,
  highlightedIndex,
  selectedItem,
  getItemProps
}) => {
  const [loadingRepo, setLoadingRepo] = useState(false);
  const searchRepositories = debounce(async () => {
    if (inputValue) {
      setLoadingRepo(true);
      let response = await client.get(
        `/search/repositories?q=${inputValue}&per_page=5`
      );
      const repositories = response.data.items;
      setRepositories(repositories.map(repository => repository.full_name));
      setLoadingRepo(false);
    } else {
      setFirstCommit(null);
      setLoadingRepo(false);
      clearSelection();
      setRepositories(null);
    }
  }, 400);

  useEffect(() => {
    window.history.pushState(null, "/?repo=", `/?repo=${inputValue}`);
    searchRepositories();
    setFirstCommit();
    setLoadingRepo(true);
    return () => {
      searchRepositories.cancel();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputValue]);

  return (
    <div>
      {loadingRepo ? (
        <SkeletonContainer>
          <Skeleton />
        </SkeletonContainer>
      ) : (
        <NoRepo>
          {repositories && repositories.length === 0 && inputValue !== "" && (
            <>
              <Floating>
                <Img
                  className="icon-reward"
                  src={require(`../../assets/img/error.png`)}
                  alt="icon-reward"
                />
              </Floating>
              <Title>
                No results were found, the repository may be in private
              </Title>
            </>
          )}

          {repositories &&
            repositories.length >= 1 &&
            repositories.map((repository, index) => (
              <Suggestion
                isActive={highlightedIndex === index}
                selectedItem={selectedItem === repository}
                key={repository}
              >
                <RepoTitle
                  isActive={highlightedIndex === index}
                  selectedItem={selectedItem === repository}
                  style={{ padding: 10, margin: 0 }}
                  {...getItemProps({
                    item: repository,
                    key: repository
                  })}
                >
                  {repository}
                </RepoTitle>
              </Suggestion>
            ))}
        </NoRepo>
      )}
    </div>
  );
};

export default ResultsList;
