import styled from "styled-components";

export const Input = styled.input`
  border: 3px solid forestgreen;
  font-family: "Lato", sans-serif;
  font-weight: bold;
  color: forestgreen;
  text-align: left;
  width: 300px;
  height: 30px;
  border-radius: 5px;
  padding: 10px;
  font-size: 15px;
  @media screen and (max-width: 500px) {
    width: 70%;
    height: 20px;
    margin-top: 20px;
  }
`;

export const Suggestion = styled.ul`
  width: 100%;
  margin: 0 auto;
  font-size: 15px;
  padding: 0;
  border-radius: 5px;
  cursor: pointer;
  background-color: ${props => (props.isActive ? "forestgreen" : "white")};
  font-weight: ${props => (props.selectedItem ? "bold" : "normal")};
  font-size: ${props => (props.selectedItem ? "18px" : "15px")};
  @media screen and (max-width: 500px) {
    width: 70%;
    font-size: ${props => (props.selectedItem ? "15px" : "12px")};
  }
`;

export const Floating = styled.div`
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

export const SkeletonContainer = styled.div`
  width: 300px;
  margin: 0 auto;
  margin-top: 30px;
`;

export const NoRepo = styled.div`
  font-size: 17px;
  text-align: center;
  align-items: center;
  color: forestgreen;
  border-radius: 2px;
  padding: 0;
  width: 25%;
  margin: 0 auto;
  @media screen and (max-width: 800px) {
    width: 50%;
  }
  @media screen and (max-width: 500px) {
    width: 80%;
  }
`;

export const ResultsContainer = styled.ul`
  font-size: 17px;
  text-align: center;
  margin-right: 3.5%;
  @media screen and (max-width: 500px) {
    margin-right: 10%;
  }
`;

export const Img = styled.img`
  width: 70px;
  height: 70px;
  margin: 0 auto;
  display: block;
  margin-top: 30px;
`;

export const Title = styled.p`
  font-size: 17px;
  margin-top: 20px;
  color: forestgreen;
`;

export const RepoTitle = styled.p`
  font-size: 17px;
  color: forestgreen;
  overflow: hidden;
  color: ${props => (props.isActive ? "white" : "forestgreen")};
`;
