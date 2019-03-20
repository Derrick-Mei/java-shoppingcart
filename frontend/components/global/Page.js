import React, {Component} from "react";
import styled, {
  ThemeProvider,
  injectGlobal,
  withTheme,
} from "styled-components";
import Meta from "./Meta";
import {CloudinaryContext} from "cloudinary-react";
const theme = {
  black: "#393939",
  grey: "#E7E7E7",
  bordergrey: "#C8C8C8",
  darkgrey: "#525252",
  brown: "#973f00",
  lightorange: "#FF9B53",
  orange: "#EA6200",
  white: "#E9E9E9",
  red: "#D10000",
  lightred: "#FF8D8D",
  blue: "#00577D",
  lightblue: "#039ADA",
  lightgreen: "#9DFF8D",
};

const StyledPage = styled.div`
  color: ${props => props.theme.black};
  height: 100vh;
  width: 100vw;
  max-width: 100%;
`;

injectGlobal`
  html {
    @import url('https://fonts.googleapis.com/css?family=Saira:400,700');
    box-sizing: border-box;
    font-size: 62.5%;
  }
  *, *:before, *:after {
    box-sizing: inherit;
  }
  body {
    padding: 0;
    margin: 0;
    font-size: 1.6rem;
    line-height: 4rem;
    font-family: sans-serif;
  }
  a {
    text-decoration: none;
    color: ${theme.black};
  }
`;

// withTheme allows all pages to have access to theme prop
const StyledPageWithTheme = withTheme(StyledPage);
class Page extends Component {
  render() {
    return (
      <CloudinaryContext cloudName={"meanbeancoffeebean"}>
        <ThemeProvider theme={theme}>
          <StyledPageWithTheme>
            <Meta />
            {this.props.children}
          </StyledPageWithTheme>
        </ThemeProvider>
      </CloudinaryContext>
    );
  }
}

export default Page;
