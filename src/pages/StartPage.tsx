import styled from "@emotion/styled";
import { Button } from "antd";
import { Link } from "react-router-dom";

import { PAGE_URL } from "@/configs";

const StartPage = () => {
  return (
    <>
      <Wrapper>
        <h2>모기 잡기 게임</h2>
        <Link to={PAGE_URL.Main}>
          <Button>Start</Button>
        </Link>
        <Link to={PAGE_URL.Control}>
          <Button>Control</Button>
        </Link>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;

  * {
    width: 100%;
  }
`;

export default StartPage;
