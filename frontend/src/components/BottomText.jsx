import React, { useEffect, useState } from "react";

const BottomText = () => {
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const [forward, setForward] = useState(true);

  const content = "If you like the project, give me a star on GitHub!😉..... ";

  useEffect(() => {
    let interval;
    if (forward) {
      if (index < content.length) {
        interval = setInterval(() => {
          setText((prevText) => prevText + content[index]);
          setIndex((prevIndex) => prevIndex + 1);
        }, 150);
      } else {
        setForward(false);
      }
    } else {
      if (index > 0) {
        interval = setInterval(() => {
          setText((prevText) => prevText.slice(0, -1));
          setIndex((prevIndex) => prevIndex - 1);
        }, 100);
      } else {
        setForward(true);
      }
    }

    return () => clearInterval(interval);
  }, [index, content, forward]);

  return (
    <div className="hireme-container">
      <a
        href="https://github.com/Copheles/BootstrapShop"
        className="command-line cursor-pointer"
        target="_blank"
        rel="noreferrer"
      >
        <span className="typed-text">{text}</span>
        <span className="cursor">_</span>
      </a>
    </div>
  );
};

export default BottomText;
