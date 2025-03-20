import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FaAngleDown } from "react-icons/fa6";
import CalendarTime from "../../components/FilterBar/CalendalTime";
import { useSelector } from "react-redux";
import SelectPeople from "./spaceComponents/SelectPeople";
import { useNavigate } from "react-router-dom";
import PaymentBtn from "../../components/payment/PaymentBtn";
import SpaceAccordion from "./spaceComponents/SpaceAccordion";
import { getMemberInfo } from "../../components/service/spaceServcie";
import { jwtDecode } from "jwt-decode";

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

const Booking = () => {
    useEffect(() => {
      window.scrollTo(0, 0);
  }, []);
  const spaceVo = useSelector((state) => state.space);
  const [loginMember, setLoginMember] = useState({});
  const [phoneNumber, setPhoneNumber] = useState();
  const [check, setCheck] = useState();
  const token = localStorage.getItem("token");
  const decodedToken = jwtDecode(token);

  useEffect(() => {
    const memberInfomation = async () => {
      const memberObj = await getMemberInfo(decodedToken.no);
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
      details: (
        <div>
          <p>
            (주)워크스테이는 예약 시스템 제공 과정에서 예약자 동의 하에 서비스
            이용을 위한 예약자 개인정보를 수집하며, 수집된 개인정보는 제휴
            판매자(공간)에게 제공됩니다. 정보 주체는 개인정보의 수집 및 이용
            동의를 거부할 권리가 있으나, 이 경우 상품 및 서비스 예약이
            제한됩니다.
          </p>
          <ul>
            <li>제공받는자 : {spaceVo.name}</li>
            <li>
              제공 목적: 제휴 판매자(공간)와 이용자(회원)의 예약에 대한 서비스
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

  // 개별 체크박스 클릭 시
  const handleSingleCheck = (checked, id) => {
    if (checked) {
      setCheckedItems((prev) => [...prev, id]);
    } else {
      setCheckedItems((prev) => prev.filter((item) => item !== id));
    }
  };

  // 전체 체크박스 클릭 시
  const handleAllCheck = (checked) => {
    if (checked) {
      setCheckedItems(termsData.map((item) => item.id));
      setCheck(checked);
    } else {
      setCheckedItems([]);
      setCheck(checked);
    }
  };

  // 개별 체크박스를 체크할 때 전체 체크 상태 업데이트
  useEffect(() => {
    if (checkedItems.length === termsData.length) {
      // 모든 체크박스가 체크되면 전체 체크박스도 체크됨
      setCheck(true);
    } else {
      setCheck(false);
    }
  }, [checkedItems]);

  // const navi = useNavigate();

  // 날짜 선택
  const [selectDate, setSelectDate] = useState("");
  const [request, setRequest] = useState("");

  const priceData =
    spaceVo.packageType === "낮 패키지"
      ? spaceVo.daytimePrice
      : spaceVo.nightPrice;
  const packageNo = spaceVo.packageType === "낮 패키지" ? 2 : 1;
  const price = priceData.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  const navi = useNavigate();

  //localstorge용 데이터 뭉치기
    const fd = {
      filePath : spaceVo.filePath,
      spaceNo: spaceVo.no,
      memberNo: spaceVo.memberNo,
      paymentNo: 1,
      packageNo: packageNo,
      adult: spaceVo.adult,
      child: spaceVo.child,
      baby: spaceVo.baby,
      request: request,
      amount: priceData,
      useDay: spaceVo.reservationDate,
      name : spaceVo.name,
      tagline: spaceVo.tagline,

  };

  // 이제 `fd` 객체는 로컬스토리지에 저장할 수 있습니다.
  localStorage.setItem("fd", JSON.stringify(fd));

  const fdData = {
    no: spaceVo.no,
    name: spaceVo.name,
    packageType: spaceVo.packageType,
    price: priceData,
  };

  return (
    <Layout>
      <BookingText>BOOKING</BookingText>
      <DateWrapper>
        <DateSpan>
          {!spaceVo.reservationDate ? (
            <CalendarTime type={"text"} setSelectDate={setSelectDate}>
              날짜 선택
            </CalendarTime>
          ) : (
            <CalendarTime type={"text"} setSelectDate={setSelectDate}>
              {spaceVo.reservationDate}
            </CalendarTime>
          )}
          <FaAngleDown />
        </DateSpan>
      </DateWrapper>
      <LineDiv />
      <ReservationText>Reservations</ReservationText>
      <TempLine />
      <ReservationWrapper>
        <ReservationDiv>
          <InfoText>예약 스페이스</InfoText>
          <Info>
            {spaceVo.name} / {spaceVo.packageType}
          </Info>
        </ReservationDiv>
        <ReservationLine />
        <ReservationDiv>
          <InfoText>예약일</InfoText>
          <Info>
            {!spaceVo.reservationDate ? (
              <CalendarTime type={"text"}>날짜를 입력해주세요.</CalendarTime>
            ) : (
              <CalendarTime type={"text"} position={true}>
                {spaceVo.reservationDate}
              </CalendarTime>
            )}
          </Info>
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
            <SelectPeople maxAdults={40} maxChildren={10} maxInfant={5} />
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
              <span>₩{price}</span>
            </ChargeText>
            <ChargeDate>
              <span>{spaceVo.reservationDate}</span>
              <span>₩{price}</span>
            </ChargeDate>
            <ChargeDate></ChargeDate>
            <ChargeLine />
          </div>
          <div></div>
          <ChargeText>
            <span></span>
            <span>₩{price}</span>
          </ChargeText>
        </ReservationDiv>
        <ReservationLine />
        <ReservationDiv>
          <InfoText>결제방법 선택</InfoText>
          <div>
            <RadioBtn checked name="kakao" />
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
            <SpaceAccordion
              termsData={termsData}
              checkedItems={checkedItems}
              handleSingleCheck={handleSingleCheck}
            />
          </div>
        </Agree>
      </UserAgreeWrapper>
      <PaddingDiv>
        {/* <Btn f={clickHandler} w={"500px"}>결제하기</Btn> */}
        <PaymentBtn reservationData={fdData} checkInfo={check} />
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

export default Booking;
