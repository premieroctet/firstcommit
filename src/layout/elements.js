import styled from "styled-components";

export const Layout = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  text-align: center;
  flex-direction: column;
`;

export const Container = styled.div`
  margin: 0 auto;
  margin-top: 2%;
  vertical-align: middle;
`;

export const Title = styled.h1`
  font-size: 4.5rem;
  font-weight: bold;
  margin: 0;
  margin-top: -1.5rem;

  @media screen and (max-width: 500px) {
    font-size: 3rem;
    margin-top: 0;
  }
`;

export const Caption = styled.h2`
  font-size: 23px;
  font-weight: 600;
  margin: 0;
  margin-bottom: 2rem;

  @media screen and (max-width: 500px) {
    font-size: 1rem;
  }
`;

export const Error = styled.p`
  font-size: 1rem;
  color: white;
  margin-top: 30px;
`;

export default Container;
