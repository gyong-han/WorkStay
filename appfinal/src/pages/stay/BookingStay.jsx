import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FaAngleDown } from "react-icons/fa6";
import Btn from "../../components/Btn";
import { useNavigate } from "react-router-dom";
import Accordion from "./stayComponent/Accordion";
import Calendar from "../../components/FilterBar/Calendal";
import SelectPerson from "./stayComponent/SelectPerson";
import { useDispatch, useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { getMemberNo } from "../../components/service/roomService";
import PaymentButton from "../../components/payment/PaymentButton";
import { format } from "date-fns";
import { setStayReservationDate } from "../../redux/roomSlice";

const Layout = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto;
  place-items: center;
  padding: 100px;
`;

const BookingText = styled.div`
  letter-spacing: 10px;
  font-size: 3rem;
  font-weight: 700;
`;

const DateWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 70px;
`;

const DateSpan = styled.span`
  display: flex;
  align-items: center;
  font-size: 1.5rem;
  gap: 5px;
`;

const LineDiv = styled.div`
  border: 1px solid #d9d9d9;
  width: 1400px;
  margin-top: 20px;
`;

const ReservationText = styled.div`
  font-size: 2rem;
  font-weight: 500;
  margin-top: 40px;
`;

const TempLine = styled.div`
  border-bottom: 3px solid #202020;
  width: 1270px;
  text-align: center;
  margin-top: 20px;
`;

const ReservationLine = styled.div`
  border-bottom: 1px solid #d9d9d9;
  width: 1200px;
`;

const ReservationWrapper = styled.div`
  width: 1250px;
  padding: 30px;
  box-sizing: border-box;
`;

const ReservationDiv = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 500px 1fr;
  place-content: center;
  align-items: center;
  padding: 15px;
`;

const InfoText = styled.span`
  font-size: 1.5rem;
  font-weight: 500;
`;
const Info = styled.span`
  font-size: 1.2rem;
`;

const Request = styled.textarea`
  width: 650px;
  height: 250px;
  border: 1px solid #d9d9d9;
  border-radius: 10px;
  background-color: #fafafa;
  padding: 10px;
  font-family: "Pretendard-Regular";
  font-size: 1.2rem;
  resize: none;
`;

const ChargeText = styled.div`
  display: grid;
  width: 650px;
  grid-template-columns: 1fr 1fr;
  font-size: 1.2rem;
  padding: 5px;
  & > span:nth-child(2) {
    text-align: end;
  }
`;

const ChargeDate = styled.div`
  display: grid;
  width: 640px;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto;
  color: #bbbbbb;
  padding: 5px;
  font-size: 1.1rem;
  font-weight: 200;
  & > span:nth-child(2) {
    text-align: end;
  }
`;

const ChargeLine = styled.div`
  border-bottom: 1px solid #202020;
  width: 680px;
`;

const RadioBtn = styled.input.attrs({ type: "radio" })`
  width: 20px;
  height: 20px;
  border: 1px solid #202020;
  background-color: #fafafa;
  border-color: #202020;
  font-size: 1.2rem;
  border-radius: 50%;
  outline: none;
  accent-color: #202020;
  cursor: pointer;
  margin-right: 10px;

  &:checked {
    background-color: #fafafa;
    border-color: #202020;
    accent-color: #202020;
  }
`;

const UserAgreeWrapper = styled.div`
  display: grid;
  align-items: center;
  width: 1000px;
`;

const UserAgree = styled.div`
  font-size: 1.8rem;
  font-weight: 500;
  text-align: center;
`;

const AllAgree = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.5rem;
  font-weight: 500;
  padding: 10px;
`;

const Agree = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.3rem;
  padding: 10px;
  cursor: pointer;
`;

const CheckBtn = styled.input.attrs({ type: "checkbox" })`
  width: 25px;
  height: 25px;
  border: 1px solid #202020;
  background-color: #fafafa;
  accent-color: #202020;
  cursor: pointer;
  margin-right: 10px;
`;

const ProvisionDiv = styled.div`
  display: grid;
  grid-template-rows: auto;
  width: 1000px;
`;

const ProvisionSpan = styled.span`
  width: 1000px;
  text-align: center;
`;

const PaddingDiv = styled.div`
  padding: 30px;
`;

const UlTag = styled.ul`
  list-style-type: decimal; /* 숫자로 표시 */
`;

const TableWrapper = styled.div`
  width: 1000px;
  max-width: 600px;
  margin: 20px auto;
  border-collapse: collapse;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  text-align: left;
`;

const Th = styled.th`
  padding: 8px;
  border: 1px solid #d9d9d9;
  font-weight: 600;
  text-align: center;
`;

const Td = styled.td`
  padding: 8px;
  border: 1px solid #d9d9d9;
  text-align: center;
`;

const Ptag = styled.p`
  font-weight: 600;
`;

const DateSpanTag = styled.span`
  color: #bbbbbb;
  font-size: 15px;
`;

const BookingStay = () => {
  const token = localStorage.getItem("token");
  const decodedToken = jwtDecode(token);

  const [loginMember, setLoginMember] = useState({});
  const [phoneNumber, setPhoneNumber] = useState();
  const [check, setCheck] = useState();

  useEffect(() => {
    const memberInfomation = async () => {
      const memberObj = await getMemberNo(decodedToken.no);
      setLoginMember(memberObj);
      const cleaned = memberObj.phone?.replace(/\D/g, "") || "";
      const formattedPhoneNumber = cleaned.replace(
        /(\d{3})(\d{4})(\d{4})/,
        "$1-$2-$3"
      );
      setPhoneNumber(formattedPhoneNumber);
    };
    memberInfomation();
  }, []);

  const termsData = [
    {
      id: 1,
      text: "(필수) 개인정보 제 3자 제공 동의",
      details: () => (
        <div>
          <p>
            (주)워크스테이는 예약 시스템 제공 과정에서 예약자 동의 하에 서비스
            이용을 위한 예약자 개인정보를 수집하며, 수집된 개인정보는 제휴
            판매자(숙소)에게 제공됩니다. 정보 주체는 개인정보의 수집 및 이용
            동의를 거부할 권리가 있으나, 이 경우 상품 및 서비스 예약이
            제한됩니다.
          </p>
          <ul>
            <li>제공받는자 : {roomVo.stayName}</li>
            <li>
              제공 목적: 제휴 판매자(숙소)와 이용자(회원)의 예약에 대한 서비스
              제공, 계약의 이행(예약확인, 이용자 확인), 민원 처리 등 소비자 분쟁
              해결을 위한 기록 보존
            </li>
            <li>
              제공 정보: 예약번호, 아이디, 성명, 휴대전화 번호, 이메일, 인원
              정보, 생년월일(필요한 경우), 동행 투숙객 정보(필요한 경우)
            </li>
            <li>보유 및 이용 기간 : 5년</li>
          </ul>
        </div>
      ),
    },
    {
      id: 2,
      text: "(필수) 미성년자(청소년) 투숙 기준 동의",
      details: (
        <div>
          <Ptag>스테이 소재지 : 대한민국</Ptag>
          <UlTag>
            <li>
              만 19세 미만 미성년자(청소년)의 경우 예약 및 투숙이 불가합니다.
            </li>
            <li>
              만 19세 미만 미성년자(청소년)가 투숙을 원하는 경우
              보호자(법정대리인)가 필수 동행해야 합니다.
            </li>
            <li>
              이용일 당일 미성년자(청소년) 투숙 기준 위반이 확인되는 경우
              환불없이 퇴실 조치됩니다.
            </li>
          </UlTag>
        </div>
      ),
    },
    {
      id: 3,
      text: "(필수) 환불 규정에 동의",
      details: (
        <TableWrapper>
          <Ptag>환불규정</Ptag>
          <Table>
            <thead>
              <tr>
                <Th>기준일</Th>
                <Th>환불 금액</Th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <Th>체크인 10일 전까지</Th>
                <Td>총 결제금액의 100% 환불</Td>
              </tr>
              <tr>
                <Th>체크인 8~9일 전까지</Th>
                <Td>총 결제금액의 90% 환불</Td>
              </tr>
              <tr>
                <Th>체크인 5~7일 전까지</Th>
                <Td>총 결제금액의 70% 환불</Td>
              </tr>
              <tr>
                <Th>체크인 4일 전까지</Th>
                <Td>총 결제금액의 50% 환불</Td>
              </tr>
              <tr>
                <Th>체크인 3일 전까지</Th>
                <Td>변경 / 환불 불가</Td>
              </tr>
            </tbody>
          </Table>
        </TableWrapper>
      ),
    },
  ];
  const [checkedItems, setCheckedItems] = useState([]);

  // 전체 체크박스 클릭 시
  const handleAllCheck = (checked) => {
    if (checked) {
      setCheckedItems(termsData.map((item) => item.id));
      setCheck(checked);
    } else {
      setCheckedItems([]);
    }
  };

  // 개별 체크박스 클릭 시
  const handleSingleCheck = (checked, id) => {
    if (checked) {
      setCheckedItems((prev) => [...prev, id]);
      setCheck(true);
    } else {
      setCheckedItems((prev) => prev.filter((item) => item !== id));
      setCheck(false);
    }
  };

  // const navi = useNavigate();

  // 날짜 선택
  const roomVo = useSelector((state) => state.room);
  const [dateRange, setDateRange] = useState(
    roomVo.reservationDate || [null, null]
  );
  const reservationDate = roomVo.reservationDate || [];
  const reservationDone = useSelector((state) => state.room.reservationDone);
  const [checkIn, checkOut] = dateRange;
  const dispatch = useDispatch();
  const [request, setRequest] = useState("");

  const priceWon = roomVo.price
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  useEffect(() => {
    if (dateRange[0] !== null && dateRange[1] !== null) {
      const formattedDates = dateRange.map((date) =>
        format(date, "yyyy-MM-dd")
      );
      dispatch(setStayReservationDate(formattedDates));
    }
  }, [dateRange, dispatch]);

  // const dates = roomVo.reservationDate;

  // const date1 = new Date(dates[0]);
  // const date2 = new Date(dates[1]);

  // const diffInTime = date2.getTime() - date1.getTime();
  // const diffInDays = diffInTime / (1000 * 60 * 60 * 24);

  // const totalPrice = (roomVo.price * diffInDays)
  // .toString()
  // .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  // 날짜 포맷 함수
  const formatDate = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = (d.getMonth() + 1).toString().padStart(2, "0");
    const day = d.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  // 체크인 ~ 체크아웃 전 날까지 날짜 리스트 생성
  const getDateList = (startDate, endDate) => {
    const dateArray = [];
    let currentDate = new Date(startDate);
    const lastDate = new Date(endDate);

    while (currentDate < lastDate) {
      dateArray.push(formatDate(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return dateArray;
  };

  // 기준인원 및 추가 요금 기본값
  const basePeople = roomVo.standardGuest || 2;
  const extraFeePerPerson = roomVo.extraGuestFee || 30000;
  const adultCnt = roomVo.adult || 1;

  // 초과 인원 수
  const extraPeople = Math.max(adultCnt - basePeople, 0);

  // 날짜 리스트
  const isDateSelected =
    reservationDate &&
    reservationDate.length === 2 &&
    reservationDate[0] &&
    reservationDate[1];

  const dates = isDateSelected
    ? getDateList(reservationDate[0], reservationDate[1])
    : [];
  const stayDays = dates.length;

  // 날짜 별 기본 요금 배열 생성
  const dailyPrices = dates.map((date) => ({
    date,
    basePrice: Number(roomVo.price),
  }));

  // 기본 객실 요금 총합 계산
  const basePriceTotal = dailyPrices.reduce(
    (acc, curr) => acc + curr.basePrice,
    0
  );

  // 추가 인원 요금 총합 계산 (초과인원 * 1인당 추가요금 * 숙박일수)
  const extraPeopleTotalFee = extraPeople * extraFeePerPerson * stayDays;

  // 전체 합계
  const grandTotal = basePriceTotal + extraPeopleTotalFee;

  // 포맷
  const basePriceTotalWon = basePriceTotal
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  const extraPeopleTotalFeeWon = extraPeopleTotalFee
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  const grandTotalWon = grandTotal
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  const rd = {
    roomNo: roomVo.no,
    memberNo: loginMember.no,
    stayNo: roomVo.stayNo,
    stayName: roomVo.stayName,
    paymentNo: 1,
    adult: roomVo.adult,
    child: roomVo.child,
    baby: roomVo.baby,
    request: request,
    amount: grandTotalWon,
    checkIn: roomVo.reservationDate[0],
    checkOut: roomVo.reservationDate[1],
    useDay: roomVo.reservationDate,
    name: roomVo.name,
    filePath: roomVo.filePath,
  };

  const rData = {
    no: roomVo.no,
    name: roomVo.name,
    price: grandTotalWon,
  };

  localStorage.setItem("roomdata", JSON.stringify(rd));

  return (
    <Layout>
      <BookingText>BOOKING</BookingText>
      <DateWrapper>
        <DateSpan>
          {!reservationDate || reservationDate.length === 0 ? (
            <Calendar type={"text"} reservationDone={reservationDone}>
              날짜를 입력해주세요.
            </Calendar>
          ) : (
            <Calendar type={"text"} reservationDone={reservationDone}>
              {`${reservationDate[0]} ~ ${reservationDate[1]}`}
            </Calendar>
          )}
        </DateSpan>
      </DateWrapper>
      <LineDiv />
      <ReservationText>Reservations</ReservationText>
      <TempLine />
      <ReservationWrapper>
        <ReservationDiv>
          <InfoText>예약 스테이</InfoText>
          <Info>
            {roomVo.stayName} / {roomVo.name}
          </Info>
        </ReservationDiv>
        <ReservationLine />
        <ReservationDiv>
          <InfoText>예약일</InfoText>
          <div>
            <Info>
              {!roomVo.reservationDate ? (
                <Calendar type={"text"} reservationDone={reservationDone}>
                  날짜를 입력해주세요.
                </Calendar>
              ) : (
                <Calendar
                  type={"text"}
                  position={true}
                  reservationDone={reservationDone}
                >{`${roomVo.reservationDate[0]}~${roomVo.reservationDate[1]}`}</Calendar>
              )}
            </Info>
          </div>
        </ReservationDiv>
        <ReservationLine />
        <ReservationDiv>
          <InfoText>이름</InfoText>
          <Info>{loginMember.name}</Info>
        </ReservationDiv>
        <ReservationLine />
        <ReservationDiv>
          <InfoText>휴대전화</InfoText>
          <Info>{phoneNumber}</Info>
        </ReservationDiv>
        <ReservationLine />
        <ReservationDiv>
          <InfoText>이메일</InfoText>
          <Info>{loginMember.email}</Info>
        </ReservationDiv>
        <ReservationLine />
        <ReservationDiv>
          <InfoText>인원</InfoText>
          <Info>
            <SelectPerson
              maxAdults={roomVo.maxGuest}
              maxChildren={4}
              maxInfant={4}
            />
          </Info>
        </ReservationDiv>
        <ReservationLine />
        <ReservationDiv>
          <InfoText>요청사항</InfoText>
          <Request
            onChange={(e) => {
              setRequest(e.target.value);
            }}
            placeholder="사전에 협의되지 않은 상업 사진 및 영상 촬영은 불가합니다.
상업적 용도의 촬영은 별도 대관료를 책정하여 운영하고 있습니다."
          />
        </ReservationDiv>
        <ReservationLine />
        <ReservationDiv>
          <div>
            <InfoText>요금상세</InfoText>
          </div>
          <div>
            <ChargeText>
              <span>객실요금</span>
              <span>₩{basePriceTotalWon}</span>
            </ChargeText>
            {dailyPrices.map((item, index) => (
              <ChargeText>
                <DateSpanTag>{item.date}</DateSpanTag>
                <DateSpanTag>
                  ₩
                  {item.basePrice
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                </DateSpanTag>
              </ChargeText>
            ))}
            {extraPeople > 0 && (
              <ChargeText>
                <span>추가 인원 요금</span>
                <span>₩{extraPeopleTotalFeeWon}</span>
              </ChargeText>
            )}
            <ChargeLine />
          </div>
          <div></div>
          <ChargeText>
            <span>총 합계</span>
            <span>₩{grandTotalWon}</span>
          </ChargeText>
        </ReservationDiv>
        <ReservationLine />
        <ReservationDiv>
          <InfoText>결제방법 선택</InfoText>
          <div>
            <RadioBtn checked name="payment" />
            <Info>카카오페이</Info>
          </div>
        </ReservationDiv>
        <ReservationLine />
      </ReservationWrapper>
      <UserAgreeWrapper>
        <UserAgree>
          <span>사용자 약관 동의</span>
        </UserAgree>
        <AllAgree>
          <CheckBtn
            name="agreement"
            onChange={(e) => handleAllCheck(e.target.checked)}
            checked={checkedItems.length === termsData.length}
          />
          <span>사용자 전체 약관 동의</span>
        </AllAgree>
        <Agree>
          <div>
            <Accordion
              termsData={termsData}
              checkedItems={checkedItems}
              handleSingleCheck={handleSingleCheck}
            />
          </div>
        </Agree>
      </UserAgreeWrapper>
      <PaddingDiv>
        <PaymentButton reservationData={rData} checkInfo={check} />
      </PaddingDiv>
      <ProvisionDiv>
        <ProvisionSpan>
          (주) 워크스테이는 통신판매중개업자로서 통신판매의 당사자가 아니며
          상품의 예약, 이용 및 환불 등과 관련한 의무와 책임은 각 판매자에게
          있습니다.
        </ProvisionSpan>
        <ProvisionSpan>
          예약 전 각 스테이의 이용규칙, 취소 및 환불 규정을 반드시 확인 하시기
          바랍니다.
        </ProvisionSpan>
      </ProvisionDiv>
    </Layout>
  );
};

export default BookingStay;
