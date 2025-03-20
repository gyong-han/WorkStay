import React, { useState } from "react";
import styled from "styled-components";
import TrainCalendar from "./TrainCalendar";
import TrafficPeople from "./TrafficPeople";
import StartStationList from "./StartStationList";
import ArrivalStationList from "./ArrivalStationList";
import { useDispatch, useSelector } from "react-redux";
import { selectEndStation, selectStartStation } from "../../redux/stationSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../components/service/config";

const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  align-items: center;
  gap: 20px;
  margin-bottom: 30px;

  .startstation {
    display: flex;
    flex-direction: column;
    text-align: center;

    span {
      font-size: 16px;
      font-weight: bold;
      color: #333;
    }
  }

  .swap {
    font-size: 20px;
    cursor: pointer;
    color: #049dd9;
  }

  hr {
    border: none;
    border-top: 1px solid #eee;
    margin: 20px 0;
  }
`;

const InfoSection = styled.div`
  margin-bottom: 20px;
  text-align: left;

  .info-row {
    margin-bottom: 20px;

    label {
      display: block;
      font-size: 14px;
      font-weight: bold;
      color: #333;
      margin-bottom: 5px;
    }

    .main-text {
      font-size: 16px;
      font-weight: bold;
      color: #333;
    }

    .sub-text {
      font-size: 12px;
      color: #888;
    }
  }

  hr {
    border: none;
    border-top: 1px solid #eee;
    margin: 20px 0;
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 12px;
  font-size: 16px;
  color: #fafafa;
  background-color: #049dd9;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const Train = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [data, setData] = useState();

  const selectedStartStation = useSelector(
    (state) => state.station.startStation
  );
  const selectedEndStation = useSelector((state) => state.station.endStation);

  const [selectedDate, setSelectedDate] = useState("");

  const SwapStation = () => {
    dispatch(selectStartStation(selectedEndStation));
    dispatch(selectEndStation(selectedStartStation));
  };

  const searchTickets = () => {
    if (!selectedStartStation || !selectedEndStation || !selectedDate) {
      alert("출발지, 도착지, 날짜를 선택해주세요");
      return;
    }

    const requestData = {
      dptreStnNm: selectedStartStation,
      arvlStnNm: selectedEndStation,
      runYmd: selectedDate,
    };

    fetch(`${BASE_URL}/api/trainticket`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(requestData),
    })
      .then((resp) => resp.json())
      .then((data) => {
        setData(data);
        if (data.length > 0) {
          navigate("/traffic/train/detail", { state: { tickets: data } });
        } else {
          alert("해당 티켓 정보가 없습니다");
        }
      });
  };

  return (
    <Container>
      <FormRow>
        <div>출발역</div>
        <div></div>
        <div>도착역</div>
        <div className="startstation">
          <StartStationList />
        </div>
        <div className="swap" onClick={SwapStation}>
          ↔
        </div>
        <div className="arrivestation">
          <ArrivalStationList />
        </div>
        <hr />
        <hr />
        <hr />
      </FormRow>

      <InfoSection>
        <div className="info-row">
          <label>가는날</label>
          <div className="main-text">
            <TrainCalendar
              onSelectDate={(date) => {
                setSelectedDate(date);
              }}
            />
          </div>
          <div className="sub-text">
            승차권은 출발 시간 전까지 조회가 가능합니다.
          </div>
        </div>

        <hr />

        <div className="info-row">
          <label>인원</label>
          <div className="main-text">
            <TrafficPeople />
          </div>
        </div>
      </InfoSection>

      <SubmitButton onClick={searchTickets}>승차권 조회</SubmitButton>
    </Container>
  );
};

export default Train;
