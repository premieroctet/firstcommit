import React from "react";
import Footer from "../Footer";
import PropTypes from "prop-types";
import Skeleton from "react-loading-skeleton";
import { formatDistance, subDays } from "date-fns";
import { Commit, CommitButton, SkeletonContainer } from "./elements";

const CommitItem = props => (
  <>
    {props.loadingCommit ? (
      <SkeletonContainer>
        <Skeleton />
      </SkeletonContainer>
    ) : (
      props.firstCommit && (
        <Commit>
          <a
            href={props.firstCommit.html_url}
            target="_blank"
            rel="noopener noreferrer"
          >
            <CommitButton>
              See the first commit{" "}
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
    <Footer />
  </>
);

export default CommitItem;

CommitItem.propTypes = {
  loadingCommit: PropTypes.bool,
  firstCommit: PropTypes.string
};
