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
  RESET,
} from "../../redux/counterSlice";
import { RiResetRightFill } from "react-icons/ri";
import { setMemberCnt } from "../../redux/spaceSlice";
import { setMemberCount } from "../../redux/roomSlice";

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
    font-size: 25px;
    font-weight: 700;
    letter-spacing: 1px;
  }

  & > div:nth-child(1) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr;
    justify-content: start;
    align-items: center;
    height: 65px;
    border-bottom: 1px solid #d9d9d9;
  }
  & > div:nth-child(1) > button {
    width: 40px;
    height: 40px;
    margin-left: auto;
    margin-bottom: auto;
    background-color: white;
    border: none;
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
  & > div > span {
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
  display: grid;
  grid-template-columns: 3fr 1fr 3fr;
  grid-template-rows: 1fr;

  & > div > button {
    width: 100px;
    height: 30px;
    background-color: white;
    border: none;
    font-size: 30px;
  }
  & > div {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  & > .Counter {
    font-size: 30px;
  }
  & > .minusBtn {
    margin-bottom: 8px;
  }
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
    cursor: pointer;
  }
  & > div > button:nth-child(2) {
    width: 145px;
    height: 45px;
    border: none;
    background-color: #049dd9;
    color: #fafafa;
    font-size: 20px;
    border-radius: 5px;
  }
`;

const PeopleSpan = styled.p`
  font-size: 25px;
  font-weight: 700;
  color: #202020;
`;

const People = ({ isOpen, onClose }) => {
  const { adult, child, baby } = useSelector((state) => state.counter);
  const dispatch = useDispatch();
  if (!isOpen) return null;
  function ClickHandler() {
    dispatch(setMemberCnt({ adult, child, baby }));
    dispatch(setMemberCount({ adult, child, baby }));
    dispatch(RESET());
    onClose();
  }

  return (
    <Overlay>
      <Modal>
        <div>
          <span>인원을 선택해주세요.</span>{" "}
          <button
            onClick={() => {
              onClose();
            }}
          >
            X
          </button>
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
              <PeopleSpan>성인</PeopleSpan>
            </div>
            <div>
              <PeopleSpan>아동</PeopleSpan>
            </div>
            <div>
              <PeopleSpan>영아</PeopleSpan>
            </div>
          </TitleDiv>
          <TitleDiv>
            <CounterDiv>
              <div class="minusBtn">
                <ModalBtn
                  disabled={adult <= 0 ? true : false}
                  str="-"
                  f={() => {
                    dispatch(DECREMENT_ADULT());
                  }}
                />
              </div>
              <div class="Counter">{adult}</div>
              <div>
                <ModalBtn
                  disabled={adult >= 40 ? true : false}
                  str="+"
                  f={() => {
                    dispatch(INCREMENT_ADULT());
                  }}
                />
              </div>
            </CounterDiv>
            <CounterDiv>
              <div class="minusBtn">
                <ModalBtn
                  disabled={child <= 0 ? true : false}
                  str="-"
                  f={() => {
                    dispatch(DECREMENT_CHILD());
                  }}
                ></ModalBtn>
              </div>
              <div class="Counter">{child}</div>
              <div>
                <ModalBtn
                  disabled={child >= 10 ? true : false}
                  str="+"
                  f={() => {
                    dispatch(INCREMENT_CHILD());
                  }}
                ></ModalBtn>
              </div>
            </CounterDiv>
            <CounterDiv>
              <div class="minusBtn">
                <ModalBtn
                  disabled={baby <= 0 ? true : false}
                  str="-"
                  f={() => {
                    dispatch(DECREMENT_BABY());
                  }}
                ></ModalBtn>
              </div>
              <div class="Counter">{baby}</div>
              <div>
                <ModalBtn
                  disabled={baby >= 5 ? true : false}
                  str="+"
                  f={() => {
                    dispatch(INCREMENT_BABY());
                  }}
                ></ModalBtn>
              </div>
            </CounterDiv>
          </TitleDiv>
        </InnerDiv>
        <FooterDiv>
          <div>
            <button
              onClick={() => {
                dispatch(RESET());
              }}
            >
              <RiResetRightFill size={30} />
            </button>
            <button onClick={ClickHandler}>Search</button>
          </div>
        </FooterDiv>
      </Modal>
    </Overlay>
  );
};
export default People;
