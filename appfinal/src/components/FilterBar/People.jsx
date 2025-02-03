import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import ModalBtn from "./ModalBtn";
import {
  DECREMENT_ADULT,
  DECREMENT_BABY,
  DECREMENT_CHILD,
  INCREMENT_ADULT,
  INCREMENT_BABY,
  INCREMENT_CHILD,
} from "../../redux/counterSlice";

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
`;

const Modal = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 773.5px;
  height: 374.47px;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 2fr 1fr;
  z-index: 2;
  & > div > span {
    color: #049dd9;
    font-size: 30px;
    font-weight: 700;
  }
  & > div:nth-child(1) {
    height: 80%;
    margin-top: 0px;
    border-bottom: 1px solid #d9d9d9;
  }
`;

const InnerDiv = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 1fr 1fr;
`;

const TitleDiv = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr;
  align-items: end;
  justify-items: center;

  & > div > span {
    font-size: 13px;
    color: #f20530;
  }
  & > div > h1 {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  & > div {
    display: flex;
    justify-content: center;
    align-items: end;
    width: 100%;
    height: 100%;
  }
`;
const CounterDiv = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const FooterDiv = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  & > div {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr;
    justify-items: center;
    align-items: center;
    width: 400px;
    height: 80px;
  }
  & > div > button:nth-child(1) {
    width: 60px;
    height: 60px;
    border: none;
    background-color: white;
    font-size: 40px;
  }
  & > div > button:nth-child(2) {
    width: 145px;
    height: 45px;
    border: none;
    background-color: #049dd9;
    color: white;
    border-radius: 5px;
  }
`;

const People = ({ isOpen, onClose }) => {
  const { adult, child, baby } = useSelector((state) => state.counter);
  const dispatch = useDispatch();
  if (!isOpen) return null;
  function ClickHandler(e) {
    console.log(e.target.value);
    onClose();
  }

  return (
    <Overlay>
      <Modal>
        <div>
          <span>인원을 선택해주세요.</span>
        </div>
        <InnerDiv>
          <TitleDiv>
            <div></div>
            <div>
              <span>24개월 ~ 12살</span>
            </div>
            <div>
              <span>24개월 미만</span>
            </div>
          </TitleDiv>
          <TitleDiv>
            <div>
              <h1>성인</h1>
            </div>
            <div>
              <h1>아동</h1>
            </div>
            <div>
              <h1>영아</h1>
            </div>
          </TitleDiv>
          <TitleDiv>
            <CounterDiv>
              <ModalBtn
                str="+"
                f={() => {
                  dispatch(INCREMENT_ADULT());
                }}
              ></ModalBtn>
              {adult}
              <ModalBtn
                str="-"
                f={() => {
                  dispatch(DECREMENT_ADULT());
                }}
              ></ModalBtn>
            </CounterDiv>
            <CounterDiv>
              <ModalBtn
                str="+"
                f={() => {
                  dispatch(INCREMENT_CHILD());
                }}
              ></ModalBtn>
              {child}
              <ModalBtn
                str="-"
                f={() => {
                  dispatch(DECREMENT_CHILD());
                }}
              ></ModalBtn>
            </CounterDiv>
            <CounterDiv>
              <ModalBtn
                str="+"
                f={() => {
                  dispatch(INCREMENT_BABY());
                }}
              ></ModalBtn>
              {baby}
              <ModalBtn
                str="-"
                f={() => {
                  dispatch(DECREMENT_BABY());
                }}
              ></ModalBtn>
            </CounterDiv>
          </TitleDiv>
        </InnerDiv>
        <FooterDiv>
          <div>
            <button>⟳</button>
            <button onClick={ClickHandler}>Search</button>
          </div>
        </FooterDiv>
      </Modal>
    </Overlay>
  );
};
export default People;
