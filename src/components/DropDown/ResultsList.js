import React, { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import { motion } from "framer-motion";
import client from "../../api/client";
import { Suggestion, SkeletonContainer, NoRepo, Img, Title } from "./elements";
import debounce from "lodash/debounce";

const ResultsList = props => {
  const [repositories, setRepositories] = useState();
  const [loadingRepo, setLoadingRepo] = useState(false);

  const searchRepositories = debounce(async () => {
    if (props.inputValue) {
      setLoadingRepo(true);
      let response = await client.get(
        `/search/repositories?q=${props.inputValue}&per_page=5`
      );
      const repositories = response.data.items;
      setRepositories(repositories.map(repository => repository.full_name));
      setLoadingRepo(false);
    } else {
      setRepositories(null);
      props.setFirstCommit(null);
      setLoadingRepo(false);
      props.clearSelection();
    }
  }, 400);

  useEffect(() => {
    window.history.pushState(null, "/?repo=", `/?repo=${props.inputValue}`);
    searchRepositories();
    props.setFirstCommit();
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
        <>
          <NoRepo>
            {repositories &&
              repositories.length === 0 &&
              props.inputValue !== "" && (
                <>
                  <motion.div
                    animate={{ scale: 2 }}
                    transition={{ duration: 2 }}
                  >
                    <Img
                      className="icon-reward"
                      src={require(`../../assets/img/error.png`)}
                      alt="icon-reward"
                    />
                  </motion.div>
                  <Title>
                    No results were found, the repository may be in private
                  </Title>
                </>
              )}

            {repositories &&
              repositories.length >= 1 &&
              repositories.map((repository, index) => (
                <Suggestion
                  isActive={props.highlightedIndex === index}
                  selectedItem={props.selectedItem === repository}
                  key={repository}
                >
                  <p
                    style={{ padding: 10, margin: 0 }}
                    {...props.getItemProps({
                      item: repository,
                      key: repository
                    })}
                  >
                    {repository}
                  </p>
                </Suggestion>
              ))}
          </NoRepo>
        </>
      )}
    </div>
  );
};

export default ResultsList;
