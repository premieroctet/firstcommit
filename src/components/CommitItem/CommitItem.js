import React from "react";
import PropTypes from "prop-types";
import Skeleton from "react-loading-skeleton";
import { formatDistance, subDays } from "date-fns";
import { Commit, CommitButton, SkeletonContainer, Img } from "./elements";
import { motion } from "framer-motion";

const CommitItem = props => (
  <>
    {props.loadingCommit ? (
      <SkeletonContainer>
        <Skeleton />
      </SkeletonContainer>
    ) : (
      props.firstCommit && (
        <Commit>
          <motion.div animate={{ scale: 1.5 }} transition={{ duration: 1.5 }}>
            <Img
              className="icon-reward"
              src={require(`../../assets/img/win.png`)}
              alt="icon-reward"
            />
          </motion.div>
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
  </>
);

export default CommitItem;

CommitItem.propTypes = {
  loadingCommit: PropTypes.bool,
  firstCommit: PropTypes.object
};
