import styled from "@emotion/styled";
import { Button } from "antd";
import MainStore from "@/stores/MainStore";

import { useNavigate } from "react-router";

//#BC4B55
//#8C8184
//#79BF49

const ControlPage = () => {
  const navigate = useNavigate();
  const { diameter, background, setDiameter, setBackground } = MainStore();

  return (
    <Wrapper>
      <h1>Control</h1>
      <h2>현재 설정값</h2>
      <SubWrapper>
        <span>[모기 크기] {diameter}px</span>
        <span>[배경 화면] {background}</span>
        <Button
          onClick={() => {
            navigate("/");
          }}
        >
          SAVE
        </Button>
      </SubWrapper>
      <h2>모기 크기</h2>
      <SubWrapper>
        <Button
          onClick={() => {
            setDiameter(30);
          }}
        >
          SMALL
        </Button>
        <Button
          onClick={() => {
            setDiameter(40);
          }}
        >
          MIDDLE
        </Button>
        <Button
          onClick={() => {
            setDiameter(50);
          }}
        >
          BIG
        </Button>
      </SubWrapper>
      <h2>배경화면 색</h2>
      <SubWrapper>
        <Button
          onClick={() => {
            setBackground("white");
          }}
        >
          WHITE
        </Button>
        <Button
          onClick={() => {
            setBackground("#79BF49");
          }}
        >
          정보색
        </Button>
        <Button
          onClick={() => {
            setBackground("#8C8184");
          }}
        >
          유사색A
        </Button>
        <Button
          onClick={() => {
            setBackground("#BC4B55");
          }}
        >
          유사색B
        </Button>
      </SubWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 500px;
  display: flex;
  flex-direction: column;
  align-items: start;

  > h1 {
    width: 100%;
    text-align: center;
  }
`;

const SubWrapper = styled.div`
  width: 100%;
  justify-content: space-between;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;

  * {
    width: 100%;
  }
`;

export default ControlPage;
