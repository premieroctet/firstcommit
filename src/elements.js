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

export const Error = styled.p`
  font-size: 17px;
  text-align: center;
  color: #1050ff;
  margin-top: 30px;
`;

export const Desc = styled.label`
  font-size: 20px;
  font-weight: bold;
  color: #1050ff;
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

export default Container;
