import React, { useState } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { selectStartStation } from "../../redux/stationSlice";

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

const StationGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 40px;
  padding: 20px;
`;

const Stationlist = styled.div`
  width: 60px;
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

const stations = ["서울", "대전", "동대구", "부산", "전주"];

const StartStationList = () => {
  const [showModal, setShowModal] = useState(false);
  const selectedStartStation = useSelector(
    (state) => state.station.startStation
  );
  const dispatch = useDispatch();

  const ModalOpen = () => setShowModal(true);
  const ModalClose = () => setShowModal(false);

  const stationClick = (station) => {
    dispatch(selectStartStation(station));
    ModalClose();
  };

  return (
    <div>
      <OpenButton onClick={ModalOpen}>
        {selectedStartStation ? selectedStartStation : "출발역 선택"}
      </OpenButton>

      <ModalBackground show={showModal}>
        <ModalContainer>
          <Header>출발역 선택</Header>
          <StationGrid>
            {stations.map((station) => (
              <Stationlist key={station} onClick={() => stationClick(station)}>
                {station}
              </Stationlist>
            ))}
          </StationGrid>

          <Footer>
            <CloseButton onClick={ModalClose}>닫기</CloseButton>
          </Footer>
        </ModalContainer>
      </ModalBackground>
    </div>
  );
};

export default StartStationList;
