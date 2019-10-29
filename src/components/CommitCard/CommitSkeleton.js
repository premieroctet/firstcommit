import React from "react";
import { Commit, Description, Avatar, Message } from "./elements";
import Skeleton from "react-loading-skeleton";
import noAvatar from "../../assets/no-avatar.png";

const CommitSkeleton = () => (
  <Commit>
    <Avatar>
      <img width="50" alt="Loading…" src={noAvatar} />
    </Avatar>

    <div>
      <Message>
        <Skeleton width={200} count={1} />
      </Message>
      <Description>
        <Skeleton width={100} count={1} />
      </Description>
    </div>
  </Commit>
);

export default CommitSkeleton;
