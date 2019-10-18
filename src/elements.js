import styled from "styled-components";

export const Layout = styled.div`
  border: 15px solid #1050ff;
  text-align: center;
  padding: 20px;
  height: 95vh;
`;

export const Container = styled.div`
  text-align: center;
  margin: 0 auto;
  margin-top: 10%;
  vertical-align: middle;
`;

export const Title = styled.p`
  font-size: 30px;
  text-align: center;
  font-weight: bold;
  color: #1050ff;
`;

export const Desc = styled.label`
  font-size: 20px;
  font-weight: bold;
  color: #1050ff;
`;

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
  padding: 10px;
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

export const CommitContainer = styled.div`
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
  &:hover {
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

export default Container;
