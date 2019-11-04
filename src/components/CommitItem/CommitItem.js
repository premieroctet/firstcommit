import React from "react";
import PropTypes from "prop-types";
import Skeleton from "react-loading-skeleton";
import { formatDistance, subDays } from "date-fns";
import {
  Commit,
  CommitButton,
  SkeletonContainer,
  Img,
  Animation
} from "./elements";

const CommitItem = props => (
  <>
    {props.loadingCommit ? (
      <SkeletonContainer>
        <Skeleton />
      </SkeletonContainer>
    ) : (
      props.firstCommit && (
        <Commit>
          <Animation>
            <Img
              className="icon-reward"
              src={require(`../../assets/img/win.png`)}
              alt="icon-reward"
            />
          </Animation>
          <a
            href={props.firstCommit.html_url}
            target="_blank"
            rel="noopener noreferrer"
          >
            <CommitButton>
              First commit of {props.url}{" "}
              {formatDistance(
                subDays(new Date(props.firstCommit.commit.committer.date), 3),
                new Date()
              )}{" "}
              ago
              <span
                style={{ marginLeft: "8px" }}
                role="img"
                aria-label="checkmark"
              >
                ✅
              </span>{" "}
            </CommitButton>
          </a>
        </Commit>
      )
    )}
  </>
);

export default CommitItem;

CommitItem.propTypes = {
  loadingCommit: PropTypes.bool,
  firstCommit: PropTypes.object
};
