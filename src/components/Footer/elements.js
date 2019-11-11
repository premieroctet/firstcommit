import styled from "styled-components";

export const FooterWrapper = styled.footer`
  position: fixed;
  font-weight: 600;
  bottom: 5px;
  font-size: 1.1rem;
  right: 0;
  padding: 4px 10px 4px 10px;

  a {
    color: white;
  }

  @media screen and (max-width: 500px) {
    display: none;
  }
`;
