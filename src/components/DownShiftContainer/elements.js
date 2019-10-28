import styled from "styled-components";

export const Input = styled.input`
  border: 3px solid #1050ff;
  font-family: "Lato", sans-serif;
  font-weight: bold;
  color: #1050ff;
  text-align: left;
  width: 300px;
  height: 30px;
  border-radius: 5px;
  padding: 10px;
  font-size: 15px;
  margin: 50px 0 20px 0;
  @media screen and (max-width: 500px) {
    width: 70%;
    margin: 30px 0 20px 0;
  }
`;

export const Suggestion = styled.ul`
  border: 1px solid #1050ff;
  border-radius: 5px;
  width: 300px;
  margin: 0 auto;
  font-size: 15px;
  overflow: hidden;
  margin-bottom: 10px;
  cursor: pointer;
  background-color: ${props => (props.isActive ? "#1050ff" : "white")};
  color: ${props => (props.isActive ? "white" : "#1050ff")};
  font-weight: ${props => (props.selectedItem ? "bold" : "normal")};
  font-size: ${props => (props.selectedItem ? "18px" : "15px")};
  @media screen and (max-width: 500px) {
    width: 70%;
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
  color: #1050ff;
  margin-right: 3%;
`;
