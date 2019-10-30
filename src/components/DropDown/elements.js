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
  }
`;

export const Suggestion = styled.ul`
  border: 1px solid forestgreen;
  border-radius: 5px;
  width: 300px;
  margin: 0 auto;
  font-size: 15px;
  padding: 0;
  overflow: hidden;
  margin-bottom: 10px;
  cursor: pointer;
  background-color: ${props => (props.isActive ? "forestgreen" : "white")};
  color: ${props => (props.isActive ? "white" : "forestgreen")};
  font-weight: ${props => (props.selectedItem ? "bold" : "normal")};
  font-size: ${props => (props.selectedItem ? "18px" : "15px")};
  @media screen and (max-width: 500px) {
    width: 70%;
    font-size: ${props => (props.selectedItem ? "15px" : "12px")};
  }
`;

export const SkeletonContainer = styled.div`
  width: 300px;
  margin: 0 auto;
  margin-top: 30px;
`;

export const NoRepo = styled.ul`
  font-size: 17px;
  text-align: center;
  color: forestgreen;
  width: 100%;
  padding: 0;
`;

export const ResultsContainer = styled.ul`
  font-size: 17px;
  text-align: center;
  margin-right: 3.5%;
`;

export const Img = styled.img`
  width: 60px;
  height: 60px;
  margin: 0 auto;
  display: block;
  margin-top: 50px;
`;

export const Title = styled.p`
  font-size: 17px;
  margin-top: 50px;
  color: forestgreen;
`;
