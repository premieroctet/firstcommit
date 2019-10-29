import styled from "styled-components";

export const Commit = styled.div`
  margin: 0 auto;
  margin-top: 15px;
  padding: 10px;
  width: 70%;
  @media screen and (max-width: 500px) {
    width: 80%;
  }
`;

export const CommitButton = styled.button`
  color: #1050ff;
  background-color: white;
  border: 1px solid #1050ff;
  padding: 10px;
  font-size: 15px;
  font-weight: bold;
  margin: 0 auto;
  cursor: pointer;
  line-height: 22px;
  border-radius: 5px;
  &:hover,
  &:focus {
    color: white;
    background-color: #1050ff;
  }
  @media screen and (max-width: 500px) {
    font-size: 14px;
  }
`;

export const SkeletonContainer = styled.div`
  width: 300px;
  margin: 0 auto;
  margin-top: 30px;
`;
