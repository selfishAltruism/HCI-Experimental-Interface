import styled from "@emotion/styled";
import { Button } from "antd";
import { Link } from "react-router-dom";

import { PAGE_URL } from "@/configs";

const StartPage = () => {
  return (
    <Wrapper>
      <Img src="image/mosquito2.png" alt="" />
      <h1>모기 잡기 게임</h1>

      <h2>피실험자</h2>
      <Start>
        <span>ST</span>
        <Link to={PAGE_URL.Main}>A</Link>
        <span>RT</span>
      </Start>

      <h2>실험자</h2>
      <Link to={PAGE_URL.Control}>
        <Button>CONTROL</Button>
      </Link>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  gap: 10px;

  * {
    width: 100%;
  }

  > h2 {
    margin-top: 0px;
    margin-bottom: 0px;
    text-align: center;
  }
`;

const Img = styled.img`
  width: 100px;

  margin-bottom: -20px;
`;

const Start = styled(Button)`
  display: flex;
  flex-direction: row;
  gap: 0px;

  * {
    width: 16px;
  }

  a {
    font-weight: bold;
  }
`;

export default StartPage;
