import React, { useState } from "react";
import styled from "styled-components";
import TrainCalendar from "./TrainCalendar";
import TrafficPeople from "./TrafficPeople";
import StartTerminalList from "./StartTerminalList";
import ArrivalTerminalList from "./ArrivalTerminalList";
import { useDispatch, useSelector } from "react-redux";
import {
  selectEndTerminal,
  selectStartTerminal,
} from "../../redux/terminalSlice";
import { useNavigate } from "react-router-dom";
import BusCalendar from "./BusCalendar";
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

const Bus = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [data, setData] = useState({});

  const selectedStartTerminal = useSelector(
    (state) => state.terminal.startTerminal
  );
  const selectedEndTerminal = useSelector(
    (state) => state.terminal.endTerminal
  );
  const [selectedDate, setSelectedDate] = useState("");

  // const [tickets, setTickets] = useState([]);

  const SwapTerminal = () => {
    dispatch(selectStartTerminal(selectedEndTerminal));
    dispatch(selectEndTerminal(selectedStartTerminal));
  };

  const searchTickets = async () => {
    if (!selectedStartTerminal || !selectedEndTerminal || !selectedDate) {
      alert("출발지, 도착지, 날짜를 선택하세요.");
      return;
    }

    // const formattedDate = selectedDate.replace(
    //   /(\d{4})(\d{2})(\d{2})/,
    //   "$1-$2-$3"
    // );

    const dateStr = selectedDate;

    const formattedDate = `${dateStr.slice(0, 2)}/${dateStr.slice(
      2,
      4
    )}/${dateStr.slice(4, 6)}`;

    // const dateObj = new Date(formattedDate);
    const dateObj = formattedDate;

    // if (isNaN(dateObj)) {
    //   console.log("dateObj::::::::", dateObj);
    //   alert("유효한 날짜를 선택해주세요.");
    //   return;
    // }
    if (!dateObj) {
      alert("유효한 날짜를 선택해주세요.");
      return;
    }

    const requestData = {
      depPlaceNm: selectedStartTerminal,
      arrPlaceNm: selectedEndTerminal,
      depPlandTime: selectedDate,
      // depPlandTime: `${dateObj.getFullYear().toString().slice(2)}/${String(
      //   dateObj.getMonth() + 1
      // ).padStart(2, "0")}/${String(dateObj.getDate()).padStart(2, "0")}`,
    };

    fetch(`${BASE_URL}/api/busticket`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestData),
    })
      .then((resp) => resp.json())
      .then((data) => {
        setData(data);
        if (data.length > 0) {
          navigate("/traffic/bus/detail", { state: { tickets: data } });
        } else {
          alert("해당 조건에 맞는 승차권이 없습니다.");
        }
      })
      .catch((error) => {
        console.error("Request failed:", error);
      });
  };

  return (
    <Container>
      <FormRow>
        <div>출발역</div>
        <div></div>
        <div>도착역</div>
        <div className="startstation">
          <StartTerminalList />
        </div>
        <div className="swap" onClick={SwapTerminal}>
          ↔
        </div>
        <div className="arrivestation">
          <ArrivalTerminalList />
        </div>
        <hr />
        <hr />
        <hr />
      </FormRow>

      <InfoSection>
        <div className="info-row">
          <label>가는날</label>
          <div className="main-text">
            <BusCalendar
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

export default Bus;
