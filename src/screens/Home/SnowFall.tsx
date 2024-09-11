import React from "react";

interface SnowflakeProps {
  style: React.CSSProperties;
}
interface SnowfallProps {
  numberOfFlakes: number;
}

const Snowflake = ({ style }: SnowflakeProps) => (
  <div className="snowflake" style={{ ...style, color: "#FFFFFF" }}>
    ❄
  </div>
);

const Snowfall = ({ numberOfFlakes }: SnowfallProps) => {
  const snowflakes = Array.from({ length: numberOfFlakes }, (_, index) => ({
    id: index,
    left: `${Math.random() * 100}vw`,
    animationDuration: `${Math.random() * 25 + 5}s`,
    animationDelay: `${-Math.random() * 5}s`,
  }));

  return (
    <div>
      {snowflakes.map((flake) => (
        <Snowflake
          key={flake.id}
          style={{
            left: flake.left,
            animationDuration: flake.animationDuration,
            animationDelay: flake.animationDelay,
          }}
        />
      ))}
    </div>
  );
};

export default Snowfall;
