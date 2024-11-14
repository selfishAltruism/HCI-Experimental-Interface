import { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { useNavigate } from "react-router";

import { PAGE_URL, paths } from "@/configs";
import MainStore from "@/stores/MainStore";

const MainPage = () => {
  const { diameter, background, start, click, grapple } = MainStore();

  const navigate = useNavigate();

  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [currentSteps, setCurrentSteps] = useState([0, 0, 0, 0, 0]);
  const [visibleMovers, setVisibleMovers] = useState([
    true,
    true,
    true,
    true,
    true,
  ]);

  useEffect(() => {
    start();
    const handleMouseMove = (event) => {
      requestAnimationFrame(() => {
        setPosition({ x: event.clientX, y: event.clientY });
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  useEffect(() => {
    const interval1 = setInterval(() => {
      setCurrentSteps((prevSteps) => [
        (prevSteps[0] + 1) % paths[0].length,
        (prevSteps[1] + 1) % paths[1].length,
        prevSteps[2],
        prevSteps[3],
        prevSteps[4],
      ]);
    }, 1500);

    const interval2 = setInterval(() => {
      setCurrentSteps((prevSteps) => [
        prevSteps[0],
        prevSteps[1],
        (prevSteps[2] + 1) % paths[2].length,
        (prevSteps[3] + 1) % paths[3].length,
        prevSteps[4],
      ]);
    }, 1000);

    const interval3 = setInterval(() => {
      setCurrentSteps((prevSteps) => [
        prevSteps[0],
        prevSteps[1],
        prevSteps[2],
        prevSteps[3],
        (prevSteps[4] + 1) % paths[4].length,
      ]);
    }, 1200);

    return () => {
      clearInterval(interval1);
      clearInterval(interval2);
      clearInterval(interval3);
    };
  }, []);

  // 마우스 좌클릭 이벤트 핸들러
  const handleLeftClick = (event) => {
    event.preventDefault();
    click();

    setVisibleMovers((prevVisible) =>
      prevVisible.map((isVisible, index) => {
        if (!isVisible) return false;

        const moverPosition = paths[index][currentSteps[index]];
        const moverX = (moverPosition.x * window.innerWidth) / 100;
        const moverY = (moverPosition.y * window.innerHeight) / 100;

        const moverCenterX = moverX + diameter / 2;
        const moverCenterY = moverY + diameter / 2;

        const distance = Math.sqrt(
          Math.pow(position.x - moverCenterX, 2) +
            Math.pow(position.y - moverCenterY, 2)
        );

        return distance > 15 + diameter / 2;
      })
    );
  };

  useEffect(() => {
    window.addEventListener("click", handleLeftClick);
    return () => {
      window.removeEventListener("click", handleLeftClick);
    };
  }, [position, currentSteps]);

  // 클릭되지 않은 원의 수 계산
  const remainingMoversCount = visibleMovers.filter(
    (isVisible) => isVisible
  ).length;

  useEffect(() => {
    if (!visibleMovers.find((element) => element === true))
      navigate(PAGE_URL.Result);
    grapple();
  }, [visibleMovers]);

  return (
    <Container style={{ backgroundColor: background }}>
      <Follower style={{ left: `${position.x}px`, top: `${position.y}px` }} />
      {currentSteps.map((step, index) =>
        visibleMovers[index] ? (
          <Mover
            key={index}
            style={{
              left: `${paths[index][step].x}%`,
              top: `${paths[index][step].y}%`,
              height: diameter + "px",
              width: diameter + "px",
            }}
          />
        ) : null
      )}
      <Counter>{remainingMoversCount}마리 남았습니다!</Counter>{" "}
    </Container>
  );
};

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  cursor: none;
  position: relative;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Follower = styled.div`
  position: absolute;
  width: 30px; /* 크기 증가 */
  height: 30px;
  background-color: red;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  pointer-events: none;
  z-index: 99;
`;

const Mover = styled.div`
  position: absolute;
  width: 30px; /* 크기 증가 */
  height: 30px;
  background-color: blue;
  border-radius: 50%;
  transition: all 0.3s ease;
  z-index: 2;
`;

const Counter = styled.div`
  position: absolute;
  font-size: 24px;
  color: #00000057;
  font-weight: bold;
`;

export default MainPage;
