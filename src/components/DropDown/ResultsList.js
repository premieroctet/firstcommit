import React, { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import { motion } from "framer-motion";
import client from "../../api/client";
import { Suggestion, SkeletonContainer, NoRepo, Img, Title } from "./elements";

const ResultsList = props => {
  const [repositories, setRepositories] = useState();
  const [loadingRepo, setLoadingRepo] = useState(false);

  const searchRepositories = async url => {
    if (url === "") {
    } else {
      setLoadingRepo(true);
      let response = await client.get(
        `/search/repositories?q=${url}&per_page=5`
      );
      const repositories = response.data.items;
      setRepositories(repositories.map(repository => repository.full_name));
      setLoadingRepo(false);
    }
  };

  useEffect(() => {
    searchRepositories(props.inputValue);
    window.history.pushState(null, "/?repo=", `/?repo=${props.inputValue}`);
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
                  {...props.getMenuProps()}
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
