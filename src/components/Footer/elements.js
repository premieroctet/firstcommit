import styled from "styled-components";

export const FooterWrapper = styled.footer`
  position: fixed;
  bottom: 5px;
  background-color: forestgreen;
  font-size: 1em;
  font-weight: bold;
  right: 0;
  color: white;
  padding: 4px 10px 4px 10px;
  @media screen and (max-width: 500px) {
    display: none;
  }
`;

export const FooterLink = styled.a`
  color: white;
`;
