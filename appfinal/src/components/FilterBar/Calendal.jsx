import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { ko } from "date-fns/locale";
import "react-datepicker/dist/react-datepicker.css";
import Form from "react-bootstrap/Form";
import { format } from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import { setStayReservationDate } from "../../redux/roomSlice";
import Alert from "../Alert";
import styled from "styled-components";

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

const Calendar = ({ children, type, w, position, reservationDone }) => {
  const [dateRange, setLocalDateRange] = useState([null, null]);
  const [checkIn, checkOut] = dateRange;
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [isAlertOpen2, setIsAlertOpen2] = useState(false);
  const dispatch = useDispatch();
  const roomVo = useSelector((state) => state.room);

  useEffect(() => {
    if (dateRange[0] !== null && dateRange[1] !== null) {
      const formattedDates = dateRange.map((date) =>
        format(date, "yyyy-MM-dd")
      );
      // console.log(formattedDates);
      dispatch(setStayReservationDate(formattedDates));
    }
  }, [dateRange]);

  const handleAlertClose = () => {
    setIsAlertOpen(false);
  };

  const handleAlertClose2 = () => {
    setIsAlertOpen2(false);
  };

  return (
    <>
      <DatePicker
        locale={ko}
        selectsRange={true}
        startDate={checkIn}
        minDate={new Date()}
        endDate={checkOut}
        onChange={(update) => {
          // update가 배열 [checkIn, checkOut] 형태
          const [start, end] = update;

          // 날짜가 둘 다 선택됐을 때만 검증
          if (start && end) {
            const startDate = new Date(start);
            const endDate = new Date(end);

            // 체크인, 체크아웃 날짜가 같거나 체크아웃이 이전이면 경고창 띄우기
            if (startDate.getTime() === endDate.getTime()) {
              setIsAlertOpen(true);
              return; // 여기서 return하면 setLocalDateRange 실행 안 됨
            }

            if (endDate.getTime() < startDate.getTime()) {
              setIsAlertOpen2(true);
              return;
            }
          }

          // 유효한 경우에만 상태 변경
          setLocalDateRange(update);
        }}
        monthsShown={2}
        withPortal
        filterDate={(date) => {
          const formattedDate = format(date, "yyyy-MM-dd"); // date-fns 사용
          return !reservationDone.includes(formattedDate);
        }}
        customInput={
          <Form.Control
            as={type}
            style={{
              width: w || "500px",
              height: "50px",
              border: "none",
              backgroundColor: "#F9F9F9",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              justifyContent: position ? "start" : "center",
            }}
            inline
          >
            {children}
          </Form.Control>
        }
      />
      {isAlertOpen && (
        <Backdrop>
          <Alert
            title="DATE"
            titleColor="#049dd9"
            message="체크인과 체크아웃 날짜를 다르게 선택해 주세요."
            buttonText="확인"
            buttonColor="#049dd9"
            onClose={handleAlertClose}
          />
        </Backdrop>
      )}
      {isAlertOpen2 && (
        <Backdrop>
          <Alert
            title="DATE"
            titleColor="#049dd9"
            message="체크아웃 날짜가 체크인 날짜보다 빠를 수 없습니다."
            buttonText="확인"
            buttonColor="#049dd9"
            onClose={handleAlertClose2}
          />
        </Backdrop>
      )}
    </>
  );
};

export default Calendar;
