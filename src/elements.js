import styled from "styled-components";

const Container = styled.div`
  text-align: center;
`;

const Title = styled.p`
  font-size: 25px;
  font-weight: bold;
  color: #1050ff;
`;

const Desc = styled.p`
  font-size: 18px;
  color: #1050ff;
`;

const Input = styled.input`
  border: 3px solid #1050ff;
  color: #1050ff;
  width: 350px;
  height: 30px;
  border-radius: 5px;
  padding: 10px;
  font-size: 18px;
  margin: 20px 0 20px 0;
`;

const Suggestion = styled.div`
  border: 1px solid #1050ff;
  margin: 0 auto;
  border-radius: 5px;
  width: 500px;
  height: 30px;
  margin-top: 10px;
  padding-top: 10px;
  cursor: pointer;
  &:hover {
    background-color: #1050ff;
    color: white;
  }
`;

const CommitContainer = styled.div`
  margin: 0 auto;
  margin-top: 20px;
  padding: 10px;
  width: 480px;
`;

const CommitButton = styled.button`
  color: #1050ff;
  background-color: white;
  border: 1px solid #1050ff;
  padding: 10px;
  font-size: 15px;
  font-weight: bold;
  margin: 0;
  cursor: pointer;
  border-radius: 5px;
  &:hover {
    color: white;
    background-color: #1050ff;
  }
`;

export default Container;
export { Title, Desc, Input, Suggestion, CommitContainer, CommitButton };
