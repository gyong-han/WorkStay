import React, { useState } from "react";
import styled from "styled-components";
import { setMemberCnt } from "../../../redux/spaceSlice";
import { useDispatch, useSelector } from "react-redux";

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

const SelectPeople = ({ maxAdults, maxChildren, maxInfant }) => {

  const { adult, child, baby } = useSelector((state) => state.space); 
  const dispatch = useDispatch();

  return (
    <>
      <SelectorWrapper>
        {/* 성인 인원 선택 */}
        <CntWrapper>
          성인
          <CntBtn onClick={() => dispatch(setMemberCnt({adult : adult - 1,child,baby}))} disabled={adult <= 0}>
            -
          </CntBtn>
          {adult}명
          <CntBtn
            onClick={() => dispatch(setMemberCnt({adult : adult + 1,child,baby}))}
            disabled={adult >= maxAdults}
          >
            +
          </CntBtn>
        </CntWrapper>

        {/* 아동 인원 선택 */}
        <CntWrapper>
          아동
          <CntBtn onClick={() => dispatch(setMemberCnt({child : child - 1,adult,baby}))} disabled={child <= 0}>
            -
          </CntBtn>
          {child}명
          <CntBtn
            onClick={() => dispatch(setMemberCnt({child : child + 1,adult,baby}))}
            disabled={child >= maxChildren}
          >
            +
          </CntBtn>
        </CntWrapper>

        {/* 영아 인원 선택 */}
        <CntWrapper>
          영아
          <CntBtn onClick={() => dispatch(setMemberCnt({baby : baby - 1,adult,child}))} disabled={baby <= 0}>
            -
          </CntBtn>
          {baby}명
          <CntBtn
            onClick={() => dispatch(setMemberCnt({baby : baby +1,adult,child}))}
            disabled={baby >= maxInfant}
          >
            +
          </CntBtn>
        </CntWrapper>
      </SelectorWrapper>
    </>
  );
};

export default SelectPeople;
