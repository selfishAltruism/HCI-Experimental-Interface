import { Global, css } from "@emotion/react";

const Styles = css`
  @import "~antd/dist/antd.css";

  * {
    font-family: "Pretendard", "sans-seri";
  }
  body {
    height: 100vh;
    width: 100vw;

    margin: 0 0 0 0;

    display: flex;
    justify-content: center;
    align-items: center;
  }
  button {
    all: unset;
  }
`;

const AppStyles = () => <Global styles={Styles}></Global>;

export default AppStyles;
