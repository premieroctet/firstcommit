import styled from "styled-components";

export const Layout = styled.div`
  text-align: center;
  padding: 20px;
  height: 95vh;
  align-items: center;
`;

export const Box = styled.div`
  text-align: center;
  align-items: center;
  margin-top: 10%;
  @media screen and (max-width: 500px) {
    margin-top: 0;
  }
`;

export const Container = styled.div`
  text-align: center;
  margin: 0 auto;
  margin-top: 2%;
  vertical-align: middle;
`;

export const Title = styled.p`
  font-size: 65px;
  text-align: center;
  font-weight: bold;
  color: forestgreen;
  margin: 0;
  margin-top: 30px;
  @media screen and (max-width: 500px) {
    font-size: 25px;
    margin-top: 0;
    margin-bottom: 25px;
  }
`;

export const Error = styled.p`
  font-size: 17px;
  text-align: center;
  color: forestgreen;
  margin-top: 30px;
`;

export const Img = styled.img`
  width: 70px;
  height: 70px;
  margin: 0 auto;
  display: block;
  margin-top: 40px;
  margin-bottom: 40px;
  @media screen and (max-width: 500px) {
    width: 80px;
    height: 80px;
  }
`;

export const Desc = styled.label`
  font-size: 20px;
  font-weight: 600;
  color: forestgreen;
  @media screen and (max-width: 500px) {
    font-size: 17px;
  }
`;

export default Container;
