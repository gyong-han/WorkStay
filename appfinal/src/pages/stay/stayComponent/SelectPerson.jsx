import React, { useState } from "react";
import styled from "styled-components";

const SelectorWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 600px;
  padding: 10px;
  font-size: 1.2rem;
`;

const CntWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const CntBtn = styled.button`
  border: none;
  background: none;
  font-size: 1.5rem;
  cursor: pointer;
  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }
`;

const SelectPerson = ({ maxAdults, maxChildren, maxInfant }) => {
  const [adult, setAdult] = useState(0);
  const [child, setChild] = useState(0);
  const [infant, setInfant] = useState(0);

  return (
    <>
      <SelectorWrapper>
        {/* 성인 인원 선택 */}
        <CntWrapper>
          성인
          <CntBtn onClick={() => setAdult(adult - 1)} disabled={adult <= 0}>
            -
          </CntBtn>
          {adult}명
          <CntBtn
            onClick={() => setAdult(adult + 1)}
            disabled={adult >= maxAdults}
          >
            +
          </CntBtn>
        </CntWrapper>

        {/* 아동 인원 선택 */}
        <CntWrapper>
          아동
          <CntBtn onClick={() => setChild(child - 1)} disabled={child <= 0}>
            -
          </CntBtn>
          {child}명
          <CntBtn
            onClick={() => setChild(child + 1)}
            disabled={child >= maxChildren}
          >
            +
          </CntBtn>
        </CntWrapper>

        {/* 영아 인원 선택 */}
        <CntWrapper>
          영아
          <CntBtn onClick={() => setInfant(infant - 1)} disabled={infant <= 0}>
            -
          </CntBtn>
          {infant}명
          <CntBtn
            onClick={() => setInfant(infant + 1)}
            disabled={infant >= maxInfant}
          >
            +
          </CntBtn>
        </CntWrapper>
      </SelectorWrapper>
    </>
  );
};

export default SelectPerson;
