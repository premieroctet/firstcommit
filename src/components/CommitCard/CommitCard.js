import React from "react";
import { formatDistance, subDays } from "date-fns";
import { Commit, Description, Avatar, Message, Card } from "./elements";

const CommitCard = ({ commit }) => (
  <Commit href={commit.html_url} target="_blank" rel="noopener noreferrer">
    <Avatar>
      {commit.author && (
        <img
          width="50"
          alt={commit.commit.committer.name}
          src={commit.author.avatar_url}
        />
      )}
    </Avatar>

    <Card tabIndex="0">
      <Message>{commit.commit.message}</Message>
      <Description>
        <b>{commit.commit.committer.name}</b> commited{" "}
        {formatDistance(
          subDays(new Date(commit.commit.committer.date), 3),
          new Date()
        )}{" "}
        ago
      </Description>
    </Card>
  </Commit>
);

export default CommitCard;
