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
  border: ${(props) => {
    return props.border;
  }};
  border-radius: 5px;
  font-size: ${(props) => {
    return props.font;
  }};
  color: ${(props) => {
    return props.color;
  }};
  cursor: pointer;
`;
const HostBtn = ({
  width,
  height,
  backColor,
  str,
  f,
  top,
  font,
  color,
  border,
}) => {
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
      border={border}
    >
      {str}
    </Btn>
  );
};

export default HostBtn;
