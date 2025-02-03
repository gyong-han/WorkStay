import React from "react";
import { styled } from "styled-components";

const Btn = styled.button`
  width: ${(props) => {
    return props.width;
  }};
  height: ${(props) => {
    return props.height;
  }};
  background-color: ${(props) => {
    return props.backColor;
  }};
  margin-top: ${(props) => {
    return props.top;
  }};
  border: none;
  border-radius: 5px;
  font-size: ${(props) => {
    return props.font;
  }};
  color: white;
  cursor: pointer;
`;
const HostBtn = ({ width, height, backColor, str, f, top, font }) => {
  return (
    <Btn
      type="button"
      width={width}
      height={height}
      backColor={backColor}
      top={top}
      font={font}
      onClick={f}
    >
      {str}
    </Btn>
  );
};

export default HostBtn;
