import React from "react";
import styled from "styled-components";

const StyledButton = styled.button`
  width: ${({ width }) => width || "100px"};
  height: ${({ height }) => height || "100px"};
  background-color: ${({ backgroundColor }) =>
    backgroundColor || "var(--primary-color)"};
  border-radius: calc(
    min(
        ${(props) => props.width || "100px"},
        ${(props) => props.height || "100px"}
      ) * 0.3
  );
  font-size: ${({ fontSize }) => fontSize || "1.5em"};
  font-weight: ${({ fontWeight }) => fontWeight || "500"};
  border: none;
  margin-top: 10px;
  &:hover {
    cursor: pointer;
  }
`;

const PagingButton = (props) => {
  return <StyledButton {...props}>{props.children}</StyledButton>;
};

export default PagingButton;
