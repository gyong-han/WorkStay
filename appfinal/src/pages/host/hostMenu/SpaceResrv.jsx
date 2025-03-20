import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; // jwtDecode 추가
import SpaceReservationCard from "../../../components/reservationInfo/SpaceReservationCard";
import { BASE_URL } from "../../../components/service/config";

const MainDiv = styled.div`
  display: grid;
  grid-template-rows: 50px auto;
`;

const StatusSpan = styled.span`
  font-size: 25px;
  margin-left: ${(props) => props.left};
  color: ${(props) => props.color};
  cursor: pointer;
`;

const StayResrv = () => {
  const navigate = useNavigate();
  const [selectedMenu, setSelectedMenu] = useState("");
  const [status, setStatus] = useState("1");
  const [dataArr, setDataArr] = useState([]);
  const [email, setEmail] = useState(""); // email을 상태로 관리
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  });

  useEffect(() => {
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setEmail(decodedToken.email); // 상태 업데이트
      } catch (error) {
        console.error("토큰 디코딩 실패:", error);
      }
    }
  }, []);

  useEffect(() => {
    if (!email) return; // email이 없으면 요청하지 않음

    fetch(`${BASE_URL}/api/guest/spaceReserv`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }), // email을 포함하여 요청 전송
    })
      .then((resp) => resp.json())
      .then((data) => {
        setDataArr(data);
      })
      .catch((error) => {});
  }, [email, status]); // email 상태가 변경되면 다시 요청

  const moveDetail = (reno) => {
    navigate(`/hostMenu/spaceReserv/spacedetail?reno=${reno}`);
  };

  function movePath(e) {
    setSelectedMenu(e.target.id);
    navigate(`/hostMenu/${e.target.id}`);
  }

  return (
    <>
      <MainDiv>
        <div>
          <StatusSpan
            left="280px"
            id="spaceReserv"
            selected={selectedMenu === "spaceReserv"}
            color="#049dd9"
          >
            예약 내역
          </StatusSpan>
          <StatusSpan left="20px">|</StatusSpan>
          <StatusSpan
            left="20px"
            id="spaceCancleReserv"
            onClick={movePath}
            selected={selectedMenu === "spaceCancleReserv"}
            color="#202020"
          >
            취소 내역
          </StatusSpan>
        </div>
        <div>
          {dataArr.length > 0 ? (
            dataArr.map((reservation, index) => (
              <SpaceReservationCard
                key={index}
                hideDate={false}
                data={reservation}
                moveDetail={() => moveDetail(reservation.reno)}
              />
            ))
          ) : (
            <p>예약 내역이 없습니다.</p>
          )}
        </div>
      </MainDiv>
    </>
  );
};

export default StayResrv;
