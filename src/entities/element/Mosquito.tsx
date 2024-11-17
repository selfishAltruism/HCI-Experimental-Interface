import { useState, useEffect, useRef } from "react";

export const Mosquito = ({ id, index, diameter }) => {
  const speed = 7;
  const elementWidth = diameter;
  const elementHeight = diameter;

  const getRandomPosition = () => {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    const randomX = Math.random() * (windowWidth - elementWidth);
    const randomY = Math.random() * (windowHeight - elementHeight);

    return { x: randomX, y: randomY };
  };

  const [position, setPosition] = useState(getRandomPosition);
  const elementRef = useRef(null);

  useEffect(() => {
    let xDirection = Math.random() * 2 - 1;
    let yDirection = Math.random() * 2 - 1;

    const magnitude = Math.sqrt(
      xDirection * xDirection + yDirection * yDirection
    );
    xDirection /= magnitude;
    yDirection /= magnitude;

    const move = () => {
      setPosition((prevPos) => {
        let newX = prevPos.x + xDirection * speed;
        let newY = prevPos.y + yDirection * speed;

        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;

        if (newX <= 0 || newX + elementWidth >= windowWidth) {
          xDirection *= -1;
          newX = Math.max(0, Math.min(newX, windowWidth - elementWidth));
        }
        if (newY <= 0 || newY + elementHeight >= windowHeight) {
          yDirection *= -1;
          newY = Math.max(0, Math.min(newY, windowHeight - elementHeight));
        }

        return { x: newX, y: newY };
      });

      requestAnimationFrame(move);
    };

    const animationFrame = requestAnimationFrame(move);

    return () => cancelAnimationFrame(animationFrame);
  }, [speed]);

  return (
    <>
      <img
        id={id}
        ref={elementRef}
        src={`image/mosquito${index + 1}.png`}
        style={{
          position: "absolute",
          left: `${position.x}px`,
          top: `${position.y}px`,
          width: `${elementWidth}px`,
          height: `${elementHeight}px`,
          pointerEvents: "none",
          filter: "sepia(1) hue-rotate(330deg) saturate(7) brightness(1.2)",
        }}
      />
    </>
  );
};
