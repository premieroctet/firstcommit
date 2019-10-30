import styled from "styled-components";

export const Commit = styled.div`
  margin: 0 auto;
  margin-top: 15px;
  padding: 10px;
  width: 70%;
  @media screen and (max-width: 500px) {
    width: 80%;
    padding: 0;
  }
`;

export const CommitButton = styled.button`
  color: forestgreen;
  background-color: white;
  border: 1px solid forestgreen;
  padding: 10px;
  font-size: 15px;
  font-weight: bold;
  margin: 0 auto;
  margin-top: 25px;
  cursor: pointer;
  line-height: 22px;
  border-radius: 5px;
  &:hover,
  &:focus {
    color: white;
    background-color: forestgreen;
  }
  @media screen and (max-width: 500px) {
    font-size: 11px;
    padding: 5px;
    margin-top: 5px;
  }
`;

export const SkeletonContainer = styled.div`
  width: 300px;
  margin: 0 auto;
  margin-top: 30px;
`;

export const Img = styled.img`
  width: 50px;
  height: 50px;
  margin: 0 auto;
  display: block;
  margin-top: 30px;
  margin-bottom: 30px;
`;
