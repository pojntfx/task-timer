import React from "react";
import { Icon, Header as HeaderTemplate } from "semantic-ui-react";

const Header = props => (
  <HeaderTemplate
    textAlign="center"
    style={{
      whiteSpace: "nowrap",
      paddingTop: "2em",
      paddingBottom: "2em",
      overflowX: "auto"
    }}
    {...props}
  >
    <HeaderTemplate.Content as="h1">
      Felix Pojtinger's Task Timer
    </HeaderTemplate.Content>
    <HeaderTemplate.Subheader>
      Contribute on{" "}
      <a href="https://github.com/pojntfx/task-timer">
        <Icon name="github" fitted /> GitHub
      </a>
      !
    </HeaderTemplate.Subheader>
  </HeaderTemplate>
);

export { Header };
