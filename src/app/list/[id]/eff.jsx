import React, { memo, useMemo, useState } from "react";

const Heading = memo(({ style, title }) => {
  console.log("Memo Rendered:", title);
  return <h1 style={style}>{title}</h1>;
});

const HeadingWithNoMemo = ({ style, title }) => {
  console.log("NoMemo Rendered:", title);
  return <h1 style={style}>{title}</h1>;
};

export default function App() {
  const [count, setCount] = useState(0);

  const normalStyle = {
    backgroundColor: "teal",
    color: "white"
  };

  const memoizedStyle = useMemo(() => {
    return {
      backgroundColor: "red",
      color: "white"
    };
  }, []);

  return (
    <>
      <button
        onClick={() => {
          setCount(count + 1);
        }}
      >
        Increment {count}
      </button>
      <Heading style={memoizedStyle} title="Memoized" />
      <Heading style={normalStyle} title="Normal" />
      <Heading title="React.memo Normal" />
      <HeadingWithNoMemo title="nomemo Normal" />
    </>
  );
}
