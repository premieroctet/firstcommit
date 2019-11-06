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
  margin-bottom: 30px;
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
  width: 70px;
  height: 70px;
  margin: 0 auto;
  display: block;
  margin-top: 30px;
  margin-bottom: 30px;
`;

export const Animation = styled.div`
  -webkit-animation-name: tada;
  animation-name: tada;
  -webkit-animation-duration: 1s;
  animation-duration: 1s;
  -webkit-animation-iteration-count: infinite;
  animation-iteration-count: infinite;
  @keyframes tada {
    from {
      -webkit-transform: scale3d(1, 1, 1);
      transform: scale3d(1, 1, 1);
    }

    10%,
    20% {
      -webkit-transform: scale3d(0.9, 0.9, 0.9) rotate3d(0, 0, 1, -3deg);
      transform: scale3d(0.9, 0.9, 0.9) rotate3d(0, 0, 1, -3deg);
    }

    30%,
    50%,
    70%,
    90% {
      -webkit-transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg);
      transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg);
    }

    40%,
    60%,
    80% {
      -webkit-transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -3deg);
      transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -3deg);
    }

    to {
      -webkit-transform: scale3d(1, 1, 1);
      transform: scale3d(1, 1, 1);
    }
  }
`;
