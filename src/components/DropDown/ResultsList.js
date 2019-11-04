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

const ResultsList = props => {
  const [loadingRepo, setLoadingRepo] = useState(false);
  const searchRepositories = debounce(async () => {
    if (props.inputValue) {
      setLoadingRepo(true);
      let response = await client.get(
        `/search/repositories?q=${props.inputValue}&per_page=5`
      );
      const repositories = response.data.items;
      props.setRepositories(
        repositories.map(repository => repository.full_name)
      );
      setLoadingRepo(false);
    } else {
      props.setRepositories(null);
      props.setFirstCommit(null);
      setLoadingRepo(false);
      props.clearSelection();
    }
  }, 400);

  useEffect(() => {
    window.history.pushState(null, "/?repo=", `/?repo=${props.inputValue}`);
    searchRepositories();
    props.setFirstCommit();
    setLoadingRepo(true);
    return () => {
      searchRepositories.cancel();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.inputValue]);

  return (
    <div>
      {loadingRepo ? (
        <SkeletonContainer>
          <Skeleton />
        </SkeletonContainer>
      ) : (
        <NoRepo>
          {props.repositories &&
            props.repositories.length === 0 &&
            props.inputValue !== "" && (
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

          {props.repositories &&
            props.repositories.length >= 1 &&
            props.repositories.map((repository, index) => (
              <Suggestion
                isActive={props.highlightedIndex === index}
                selectedItem={props.selectedItem === repository}
                key={repository}
              >
                <RepoTitle
                  isActive={props.highlightedIndex === index}
                  selectedItem={props.selectedItem === repository}
                  style={{ padding: 10, margin: 0 }}
                  {...props.getItemProps({
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
