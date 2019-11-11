import React, { useState } from "react";
import { Combobox as ReachCombobox, ComboboxPopover } from "@reach/combobox";

import { Input, List, Suggestion, SuggestionSkeleton } from "./elements";
import Skeleton from "react-loading-skeleton";
import useRepoSearch, { RESULT_PER_PAGE } from "../../hooks/useRepoSearch";

const Combobox = props => {
  const [searchTerm, setSearchTerm] = useState(props.initialValue);
  const { repositories, loading } = useRepoSearch(searchTerm);

  const handleSearchTermChange = event => {
    setSearchTerm(event.target.value);
  };

  return (
    <ReachCombobox
      onSelect={e => {
        setSearchTerm(e);
        props.handleOnSelect(e);
      }}
    >
      <Input
        value={searchTerm}
        placeholder="Search repositories…"
        type="text"
        autoFocus
        onChange={handleSearchTermChange}
      />
      <ComboboxPopover>
        <List>
          {loading &&
            [...new Array(RESULT_PER_PAGE)].map((_, index) => (
              <SuggestionSkeleton key={index}>
                <Skeleton
                  count={1}
                  width={Math.floor(Math.random() * (200 - 120 + 1) + 120)}
                />
              </SuggestionSkeleton>
            ))}

          {!loading &&
            repositories &&
            repositories.length > 0 &&
            repositories.map(repository => (
              <Suggestion
                key={repository.full_name}
                value={repository.full_name}
              />
            ))}

          {!loading && repositories && repositories.length === 0 && (
            <SuggestionSkeleton>No repository found</SuggestionSkeleton>
          )}
        </List>
      </ComboboxPopover>
    </ReachCombobox>
  );
};

export default Combobox;
