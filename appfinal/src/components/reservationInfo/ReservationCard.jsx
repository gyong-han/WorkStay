import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";

const DataDiv = styled.div`
  width: 850px;
  height: 300px;
  border: 1px solid black;
  display: grid;
  grid-template-columns: 400px 450px;
  margin-top: 50px;
  margin-left: 50px;
  margin-bottom: 30px;
  border: none;
`;

const DataArea = styled.div`
  background-color: transparent;
  display: grid;
  grid-template-rows: 40px 30px 20px 20px 145px 45px;
  color: #202020;
  align-items: center;
`;

const TextDiv = styled.div`
  font-size: ${(props) => props.size};
  font-weight: ${(props) => props.weight};
  cursor: pointer;
`;

const ImgTag = styled.img`
  width: 450px;
  height: 300px;
`;

const PriceDiv = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-content: space-between;
  align-items: center;
  width: 100%;

  & > div:nth-child(2) {
    text-align: right;
    padding-right: 60px;
  }
`;

const SLogButton = styled.button`
  background-color: #fafafa;
  color: #f20530;
  border: none;
  padding: 10px 15px;
  font-size: 14px;
  font-weight: 800px;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
`;

const ReservationCard = ({ data, hideDate, moveDetail }) => {
  const navi = useNavigate();
  const location = useLocation(); // 현재 경로 가져오기

  function movePath() {
    const isSpaceReserv = location.pathname.includes("spaceReserv");
    const detailPath = isSpaceReserv ? "spacedetail" : "staydetail";
    const basePath = location.pathname.replace(/\/$/, "");
    const finalPath = `${basePath}/${detailPath}`.replace(/([^:]\/)\/+/g, "$1");

    navi(finalPath);
  }

  // S-Log 작성 버튼 클릭 시 이동 (reno + 회원번호 포함)
  function handleSLogWrite() {
    const userToken = localStorage.getItem("token"); // 토큰에서 회원 정보 가져오기
    if (!userToken) {
      alert("로그인이 필요합니다.");
      navi("/login");
      return;
    }
    const memberNo = JSON.parse(atob(userToken.split(".")[1])).no; // JWT에서 no 추출
    const reno = data.reno; // 예약 번호

    navi(`/slog/write?reno=${reno}&memberNo=${memberNo}`);
  }

  return (
    <>
      <DataDiv>
        <DataArea>
          <TextDiv size="15px">{data.progressState}</TextDiv>
          <TextDiv size="25px" weight="600">
            {data.name}
          </TextDiv>
          <TextDiv size="15px">
            {data.checkIn} - {data.checkOut}
          </TextDiv>
          <TextDiv size="13px">
            {data.roomName} / 성인 {data.adult}명
          </TextDiv>
          <div></div>
          <PriceDiv>
            <div>
              {data.progressState === "이용완료" && (
                <SLogButton onClick={handleSLogWrite}>S-Log 작성</SLogButton>
              )}
            </div>
            {!hideDate && (
              <TextDiv onClick={moveDetail} size="15px">
                예약 상세 확인
              </TextDiv>
            )}
            <TextDiv size="20px">₩{data.amount}</TextDiv>
          </PriceDiv>
          {/* 🔥 progressState가 4 (이용완료)일 때 S-Log 작성 버튼 표시 */}
        </DataArea>
        <ImgTag src={data.filePath} alt="숙소 이미지" />
      </DataDiv>
    </>
  );
};

export default ReservationCard;
