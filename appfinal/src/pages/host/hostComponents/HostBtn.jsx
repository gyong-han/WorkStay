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
  border: 1px solid #2b8c44;
  border-radius: 5px;
  font-size: ${(props) => {
    return props.font;
  }};
  color: ${(props) => {
    return props.color;
  }};
  cursor: pointer;
`;
const HostBtn = ({ width, height, backColor, str, f, top, font, color }) => {
  return (
    <Btn
      type="button"
      width={width}
      height={height}
      backColor={backColor}
      top={top}
      font={font}
      onClick={f}
      color={color}
    >
      {str}
    </Btn>
  );
};

export default HostBtn;
