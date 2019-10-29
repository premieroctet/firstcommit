import React from "react";
import { FooterWrapper, FooterLink } from "./elements";

const Footer = () => (
  <FooterWrapper>
    Crafted by{" "}
    <FooterLink href="https://www.premieroctet.com/" target="_blank">
      @premieroctet
    </FooterLink>{" "}
    😘 - Code available on{" "}
    <FooterLink
      href="https://github.com/premieroctet/firstcommit"
      target="_blank"
    >
      GitHub
    </FooterLink>{" "}
    ✨
  </FooterWrapper>
);

export default Footer;
