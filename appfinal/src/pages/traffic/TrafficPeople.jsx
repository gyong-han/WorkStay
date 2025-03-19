import React, { useState } from "react";
import styled from "styled-components";

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
  width: 500px;
  height: 250px;
`;

const Header = styled.div`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 20px;
  text-align: center;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
`;

const Label = styled.div`
  font-size: 16px;
`;

const Counter = styled.div`
  display: flex;
  align-items: center;
`;

const Button = styled.button`
  width: 30px;
  height: 30px;
  border: none;
  background: ${(props) => (props.disabled ? "#ccc" : "#007bff")};
  color: white;
  font-size: 18px;
  font-weight: bold;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: ${(props) => (props.disabled ? "#ccc" : "#0056b3")};
  }
`;

const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
`;

const ActionButton = styled.button`
  background: ${(props) => (props.primary ? "#007bff" : "#ccc")};
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background: ${(props) => (props.primary ? "#0056b3" : "#aaa")};
  }
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

const TrafficPeople = () => {
  const [showModal, setShowModal] = useState(false);
  const [adultCount, setAdultCount] = useState([0]);
  const [childCount, setChildCount] = useState([0]);
  const [infantCount, setinfantCount] = useState([0]);

  const ModalOpen = () => setShowModal(true);
  const ModalClose = () => setShowModal(false);

  const AdultChange = (num) => {
    setAdultCount((props) => Math.max(0, Math.min(5, props + num)));
  };

  const ChildChange = (num) => {
    setChildCount((props) => Math.max(0, Math.min(5, props + num)));
  };

  const InfantChange = (num) => {
    setinfantCount((props) => Math.max(0, Math.min(5, props + num)));
  };

  return (
    <div>
      <OpenButton onClick={ModalOpen}>
        성인 {adultCount}명, 아동 {childCount}명, 유아{infantCount}명
      </OpenButton>

      <ModalBackground show={showModal}>
        <ModalContainer>
          <Header>인원 선택</Header>

          <Row>
            <Label>성인</Label>
            <Counter>
              <Button
                onClick={() => {
                  AdultChange(-1);
                }}
                disabled={adultCount <= 0}
              >
                -
              </Button>
              <span style={{ margin: "0 10px" }}>{adultCount}</span>
              <Button
                onClick={() => {
                  AdultChange(1);
                }}
                disabled={adultCount === 5}
              >
                +
              </Button>
            </Counter>
          </Row>

          <Row>
            <Label>아동</Label>
            <Counter>
              <Button
                onClick={() => ChildChange(-1)}
                disabled={childCount <= 0}
              >
                -
              </Button>
              <span style={{ margin: "10px" }}>{childCount}</span>
              <Button
                onClick={() => ChildChange(1)}
                disabled={childCount === 5}
              >
                +
              </Button>
            </Counter>
          </Row>

          <Row>
            <Label>유아</Label>
            <Counter>
              <Button
                onClick={() => InfantChange(-1)}
                disabled={infantCount <= 0}
              >
                -
              </Button>
              <span style={{ margin: "10px" }}>{infantCount}</span>
              <Button
                onClick={() => InfantChange(1)}
                disabled={infantCount === 5}
              >
                +
              </Button>
            </Counter>
          </Row>

          <Footer>
            <ActionButton onClick={ModalClose}>닫기</ActionButton>
            <ActionButton
              primary
              onClick={() => {
                ModalClose();
              }}
            >
              확인
            </ActionButton>
          </Footer>
        </ModalContainer>
      </ModalBackground>
    </div>
  );
};

export default TrafficPeople;
