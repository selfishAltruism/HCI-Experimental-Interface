import { useState, useEffect, useRef } from "react";
import styled from "@emotion/styled";
import { useNavigate } from "react-router";

import { PAGE_URL } from "@/configs";
import MainStore from "@/stores/MainStore";
import { Mosquito } from "@/entities";

const MainPage = () => {
  const { diameter, background, start, click, grapple, finish, setClick } =
    MainStore();

  const navigate = useNavigate();

  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [visibleMovers, setVisibleMovers] = useState([
    true,
    true,
    true,
    true,
    true,
  ]);

  const gameId = useRef(0);

  useEffect(() => {
    gameId.current = Date.now();
    setClick(0);
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

  const handleLeftClick = (event) => {
    event.preventDefault();
    click();

    const key = "USER-" + gameId.current + "-" + Date.now();
    localStorage.setItem(key, JSON.stringify({ x: position.x, y: position.y }));

    setVisibleMovers((prevVisible) =>
      prevVisible.map((isVisible, index) => {
        if (!isVisible) return false;

        const moverElement = document.getElementById(`random-mover-${index}`);
        const rect = moverElement.getBoundingClientRect();
        const moverCenterX = rect.left + rect.width / 2;
        const moverCenterY = rect.top + rect.height / 2;

        const key =
          "MOSQUITO" + index + "-" + gameId.current + "-" + Date.now();
        localStorage.setItem(
          key,
          JSON.stringify({ x: moverCenterX, y: moverCenterY })
        );

        const distance = Math.sqrt(
          Math.pow(position.x - moverCenterX, 2) +
            Math.pow(position.y - moverCenterY, 2)
        );

        const result = distance > 30 + diameter / 2;

        if (!result) grapple();

        return result;
      })
    );
  };

  useEffect(() => {
    window.addEventListener("click", handleLeftClick);
    return () => {
      window.removeEventListener("click", handleLeftClick);
    };
  }, [position]);

  const remainingMoversCount = visibleMovers.filter(
    (isVisible) => isVisible
  ).length;

  useEffect(() => {
    if (!visibleMovers.find((element) => element === true)) {
      finish(gameId.current);
      navigate(PAGE_URL.Result);
    }
  }, [visibleMovers]);

  return (
    <Container style={{ backgroundColor: background }}>
      <Follower style={{ left: `${position.x}px`, top: `${position.y}px` }}>
        <FollowerImg src="image/catcher.png"></FollowerImg>
      </Follower>
      {visibleMovers.map((isVisible, index) =>
        isVisible ? (
          <Mosquito
            key={index}
            id={`random-mover-${index}`}
            index={index}
            diameter={diameter}
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
  width: 60px;
  height: 60px;
  transform: translate(-50%, -50%);
  pointer-events: none;

  border-radius: 50px;
  //border: 1px solid black;
  z-index: 99;
`;

const FollowerImg = styled.img`
  position: relative;
  top: 2px;
  left: 2px;

  width: 70px;
  height: 70px;
  pointer-events: none;
`;

const Counter = styled.div`
  position: absolute;
  font-size: 24px;
  color: #00000057;
  font-weight: bold;
`;

export default MainPage;
