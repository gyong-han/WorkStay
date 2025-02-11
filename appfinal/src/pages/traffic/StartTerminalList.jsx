import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { selectStartTerminal } from "../../redux/terminalSlice";

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: ${(props) => (props.show ? "flex" : "none")};
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContainer = styled.div`
  background: white;
  padding: 20px;
  width: 600px;
  height: 500px;
`;

const Header = styled.div`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 20px;
  text-align: center;
`;

const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
`;

const TerminalGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 40px;
  padding: 20px;
`;

const Terminallist = styled.div`
  width: 70px;
  height: 60px;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const CloseButton = styled.button`
  background: ${(props) => (props.primary ? "#007bff" : "#ccc")};
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
`;

const OpenButton = styled.button`
  padding: 10px 20px;
  background: #fafafa;
  font-family: "Pretendard-Regular";
  color: black;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
`;

const terminals = ["서울경부", "강릉", "부산", "대전복합", "동대구"];

const StartTerminalList = () => {
  const [showModal, setShowModal] = useState(false);
  const selectedStartTerminal = useSelector(
    (state) => state.terminal.startTerminal
  );
  const dispatch = useDispatch();

  const ModalOpen = () => setShowModal(true);
  const ModalClose = () => setShowModal(false);

  const terminalClick = (terminal) => {
    dispatch(selectStartTerminal(terminal));
    ModalClose();
  };

  return (
    <div>
      <OpenButton onClick={ModalOpen}>
        {selectedStartTerminal ? selectedStartTerminal : "출발터미널 선택"}
      </OpenButton>
      <ModalBackground show={showModal}>
        <ModalContainer>
          <Header>출발터미널 선택</Header>
          <TerminalGrid>
            {terminals.map((terminal) => (
              <Terminallist
                key={terminal}
                onClick={() => terminalClick(terminal)}
              >
                {terminal}
              </Terminallist>
            ))}
          </TerminalGrid>
          <Footer>
            <CloseButton onClick={ModalClose}>닫기</CloseButton>
          </Footer>
        </ModalContainer>
      </ModalBackground>
    </div>
  );
};

export default StartTerminalList;
