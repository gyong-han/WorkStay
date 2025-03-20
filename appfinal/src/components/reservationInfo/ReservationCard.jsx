import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { BASE_URL } from "../service/config";
import Alert from "../Alert";
import ConfirmModal from "../table/ConfirmModal";

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
  text-decoration: ${(props) => props.deco};
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
  /* color: #f20530; */
  color: ${(props) => props.c};
  border: none;
  /* padding: 10px 15px; */
  font-size: 14px;
  font-weight: bold;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
  margin-bottom: 10px;
`;

const ReservationCard = ({ data, hideDate, moveDetail }) => {
  const navi = useNavigate();
  const location = useLocation(); // 현재 경로 가져오기
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [progressState, setProgressState] = useState(data.progressState);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

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

  const handleUpdateStay = (event) => {
    event.preventDefault();
    setIsConfirmOpen(true); // 먼저 ConfirmModal을 띄움
  };

  const handleConfirmUpdateStay = () => {
    const userToken = localStorage.getItem("token");
    const no = JSON.parse(atob(userToken.split(".")[1])).no;

    const reno = data.reno; // 예약 번호

    fetch(`${BASE_URL}/api/guest/updateStay?no=${no}&reno=${reno}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ no, reno }),
    })
      .then((resp) => {
        if (!resp.ok) throw new Error("서버 응답 오류");
        return resp.json();
      })
      .then(() => {
        setProgressState("이용완료");
        setIsAlertOpen(true);
        setIsConfirmOpen(false);
      })
      .catch((error) => {
        console.error("이용 완료 실패:", error);
        alert("이용 완료에 실패했습니다.");
      });
  };

  const handleAlertClose = () => {
    setIsAlertOpen(false);
    navi("/hostMenu");
  };

  const formatPrice = (price) => {
    if (price == null) return "가격 정보 없음"; // price가 undefined 또는 null이면 기본값 반환
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <>
      <DataDiv>
        <DataArea>
          <TextDiv size="15px">{progressState}</TextDiv>
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
              {progressState === "이용완료" && (
                <SLogButton c="#049dd9" onClick={handleSLogWrite}>
                  S-Log 작성
                </SLogButton>
              )}
              {progressState === "예약완료" && (
                <SLogButton c="#f20530" onClick={handleUpdateStay}>
                  이용 완료
                </SLogButton>
              )}
            </div>
            {!hideDate && (
              <TextDiv onClick={moveDetail} size="15px" deco="underline">
                예약 상세 확인
              </TextDiv>
            )}
            <TextDiv size="20px">₩{formatPrice(data.amount)}</TextDiv>
          </PriceDiv>
          {/*progressState가 4 (이용완료)일 때 S-Log 작성 버튼 표시 */}
        </DataArea>
        <ImgTag src={data.filePath} alt="숙소 이미지" />
      </DataDiv>
      {isAlertOpen && (
        <Backdrop>
          <Alert
            title="이용완료"
            titleColor="#049dd9"
            message="이용확정 되었습니다."
            buttonText="확인"
            buttonColor="#049dd9"
            onClose={handleAlertClose}
          />
        </Backdrop>
      )}
      {isConfirmOpen && (
        <ConfirmModal
          title="이용 완료"
          message="이용 완료시 환불이 불가합니다. 계속 진행하시겠습니까?"
          onConfirm={handleConfirmUpdateStay} // 확인 버튼 클릭 시 API 호출
          onCancel={() => setIsConfirmOpen(false)} // 취소 버튼 클릭 시 닫기
        />
      )}
    </>
  );
};

export default ReservationCard;
