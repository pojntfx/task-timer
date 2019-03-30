import "semantic-ui-css/semantic.min.css";
import React from "react";
import { Container } from "semantic-ui-react";
import { Header } from "../components/Header";

const DefaultLayout = ({ children, header, ...otherProps }) => (
  <div
    style={{
      background:
        "linear-gradient(0deg, transparent 33%, rgba(255,255,255,0.9))"
    }}
  >
    <div
      style={{
        borderRadius: 0,
        border: 0
      }}
    >
      <Header />
    </div>
    <Container
      style={{
        paddingBottom: "1em"
      }}
      {...otherProps}
    >
      {children}
    </Container>
  </div>
);

export { DefaultLayout };
