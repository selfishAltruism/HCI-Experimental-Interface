import styled from "@emotion/styled";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";

import MainStore from "@/stores/MainStore";

const ResultPage = () => {
  const navigate = useNavigate();
  const { grappleTimes, totalTime, totalClicks, reset, diameter, background } =
    MainStore();

  return (
    <>
      <Wrapper>
        <h1>모기 잡기 결과</h1>
        <h2>총 소모 시간</h2>
        <span>{totalTime}ms</span>
        <h2>각각 소모 시간</h2>
        {grappleTimes.map((time, index) => (
          <span key={time}>
            [{index + 1}] {time}ms
          </span>
        ))}
        <h2>총 클릭 수</h2>
        <span>{totalClicks}번</span>
        <h2>설정</h2>
        <span>[모기 크기] {diameter}px</span>
        <span>[배경화면 색] {background}</span>
        <h2>저장 및 초기화</h2>
        <Button
          onClick={() => {
            reset();
            navigate("/");
          }}
        >
          SAVE
        </Button>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  * {
    width: 100%;
    text-align: center;
  }

  > h2 {
    margin-top: 20px;
    margin-bottom: 7px;
    //text-align: center;
  }
`;

export default ResultPage;
