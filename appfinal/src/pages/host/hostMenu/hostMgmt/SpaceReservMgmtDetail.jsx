import React, { useEffect, useState } from "react";
import styled from "styled-components";
import HostBtn from "../../hostComponents/HostBtn";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../../../../components/service/config";

const MainDiv = styled.div`
  display: grid;
  grid-template-rows: 50px auto;
`;

const StatusSpan = styled.span`
  font-size: ${(props) => props.size};
  margin-left: ${(props) => {
    return props.left;
  }};
  color: ${(props) => {
    return props.color || "black";
  }};
  margin-right: ${(props) => {
    return props.right;
  }};
`;

const HeaderDiv = styled.div`
  display: grid;
  grid-template-columns: 200px 1fr;
`;

const StyleDiv = styled.div`
  margin-top: 8px;
`;

const DataArea = styled.div`
  display: grid;
  grid-template-columns: 200px 50px 600px;
  grid-template-rows: 50px 40px 60px 120px 60px 40px 60px 220px 40px 90px 40px 110px 60px 40px 60px 20px 40px 20px 200px;
`;

const Hr = styled.hr`
  margin-top: ${(props) => props.top};
  width: ${(props) => props.width};
  background-color: ${(props) => {
    return props.color ? props.color : "black";
  }};
  height: ${(props) => props.height};
`;

const DataTitle = styled.div`
  border-left: 4px solid black;
  font-size: 25px;
  display: flex;
  align-items: center;
  padding-left: 18px;
  font-weight: 600;
`;

const TitleDiv = styled.div`
  font-size: 17px;
  margin-top: ${(props) => props.top};
  margin-left: ${(props) => props.left};
  margin-bottom: ${(props) => props.bot};
`;

const PTag = styled.span`
  margin: 0px;
  font-size: 15px;
`;

const HrDiv = styled.div`
  grid-column: span 3;
`;

const TextArea = styled.textarea`
  width: 550px;
  height: 45px;
  margin-top: 10px;
  border: none;
  resize: none;
  background-color: transparent;
  font-family: "Pretendard-Regular";
  font-size: 17px;
  outline: none;
`;

const AmountDiv = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  justify-content: space-between;
  width: 100%;
`;

const SpaceResrvMgmtDetail = () => {
  const { spaceReservNum } = useParams();
  const [guestVo, setGuestVo] = useState({});
  const [spaceVo, setSpaceVo] = useState({});

  const stayName = "온숲";

  const historyBack = () => {
    window.history.back();
  };

  const formatPhoneNumber = (phone) => {
    phone = String(phone);
    return phone.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3");
  };

  useEffect(() => {
    fetch(`${BASE_URL}/api/host/space/reservDetail`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(spaceReservNum),
    })
      .then((resp) => resp.json())
      .then((data) => {
        setGuestVo(data.guestVo);
        setSpaceVo(data.spaceVo);
      });
  }, []);

  return (
    <>
      <MainDiv>
        <HeaderDiv>
          <div>
            <StyleDiv>
              <StatusSpan size="15px" color="gray">
                예약 상세 ❯
              </StatusSpan>
              <StatusSpan size="15px"> {spaceVo.spaceName}</StatusSpan>
            </StyleDiv>
          </div>
          <div>
            <StatusSpan size="25px" left="130px">
              예약 정보
            </StatusSpan>
          </div>
        </HeaderDiv>
        <DataArea>
          <div></div>
          <div></div>
          <div></div>
          <DataTitle>게스트 안내</DataTitle>
          <div></div>
          <div></div>
          <div>
            <Hr height="2px" top="20px" width="80%" />
          </div>
          <div></div>
          <div>
            <Hr height="2px" top="20px" color="lightgray" />
          </div>
          <div>
            <TitleDiv left="40px" bot="30px">
              01. 이름
            </TitleDiv>
            <TitleDiv left="40px" bot="30px">
              02. 전화번호
            </TitleDiv>
            <TitleDiv left="40px" bot="30px">
              03. 이메일
            </TitleDiv>
          </div>
          <div></div>
          <div>
            <TitleDiv left="5px" bot="30px">
              {guestVo.name}
            </TitleDiv>
            <TitleDiv left="5px" bot="30px">
              {formatPhoneNumber(guestVo.phone)}
            </TitleDiv>
            <TitleDiv left="5px" bot="30px">
              {guestVo.email}
            </TitleDiv>
          </div>
          <HrDiv>
            <Hr top="30px" color="lightgray" />
          </HrDiv>
          <DataTitle>예약 안내</DataTitle>
          <div></div>
          <div></div>
          <div>
            <Hr height="2px" top="20px" width="80%" />
          </div>
          <div></div>
          <div>
            <Hr height="2px" top="20px" color="lightgray" />
          </div>
          <div>
            <TitleDiv left="40px" bot="30px">
              01. 예약번호
            </TitleDiv>
            <TitleDiv left="40px" bot="30px">
              02. 스페이스
            </TitleDiv>
            <TitleDiv left="40px" bot="30px">
              03. 예약 인원
            </TitleDiv>
            <TitleDiv left="40px" bot="30px">
              04. 예약일
            </TitleDiv>
            <TitleDiv left="40px">05. 패키지</TitleDiv>
          </div>
          <div></div>
          <div>
            <TitleDiv left="5px" bot="30px">
              {spaceReservNum}
            </TitleDiv>
            <TitleDiv left="5px" bot="30px">
              {spaceVo.spaceName}
            </TitleDiv>
            <TitleDiv left="5px" bot="30px">
              총 {spaceVo.totalPerson}명 (성인 : {spaceVo.adult}명/ 아동 :{" "}
              {spaceVo.child}명 / 영아 : {spaceVo.baby}명)
            </TitleDiv>
            <TitleDiv left="5px" bot="30px">
              {spaceVo.useDay}
            </TitleDiv>
            <TitleDiv left="5px" bot="30px">
              {spaceVo.packageName} 패키지
            </TitleDiv>
          </div>
          <div></div>
          <div></div>
          <div>
            <Hr top="20px" color="lightgray" height="1px" />
          </div>
          <TitleDiv left="40px" bot="30px" top="10px">
            06. 요청사항
          </TitleDiv>
          <div></div>
          <TextArea value={spaceVo.request} readOnly />
          <div></div>
          <div></div>
          <div>
            <Hr top="20px" color="lightgray" height="1px" />
          </div>
          <TitleDiv left="40px" bot="30px" top="10px">
            07. 금지조항
          </TitleDiv>
          <div></div>
          <TitleDiv top="10px">
            <PTag>
              숙박권의 재판매, 양도, 양수, 교환을 금지합니다.
              <br />
              <br />
            </PTag>
            <PTag>
              예약자의 부득이한 사유로 인해 본인 이용이 어려울 경우 가족에 한해
              <br />
            </PTag>
            <PTag>
              해당스테이에 가족관계임을 증명할 수 있는 서류(가족관계증명서 등)와
              <br />
            </PTag>
            <PTag>
              실제 이용하시는 분의 신분증을 제시 후 이용이 가능합니다.
            </PTag>
          </TitleDiv>
          <HrDiv>
            <Hr top="30px" color="lightgray" />
          </HrDiv>
          <DataTitle>결제 정보</DataTitle>
          <div></div>
          <div></div>
          <div>
            <Hr height="2px" top="20px" width="80%" />
          </div>
          <div></div>
          <div>
            <Hr height="2px" top="20px" color="lightgray" />
          </div>
          <TitleDiv left="40px">01. 결제 금액</TitleDiv>
          <div></div>
          <AmountDiv>
            <StatusSpan size="17px" left="5px">
              총 결제 금액
            </StatusSpan>
            <StatusSpan size="17px" right="10px">
              ₩{Number(spaceVo.amount).toLocaleString()}
            </StatusSpan>
          </AmountDiv>
          <div></div>
          <div></div>
          <div>
            <Hr top="20px" color="lightgray" height="1px" />
          </div>
          <TitleDiv left="40px">02. 결제 방법</TitleDiv>
          <div></div>
          <TitleDiv left="5px">
            {spaceVo.paymentName} (결제 완료 : {spaceVo.reservationDate})
          </TitleDiv>
          <div></div>
          <div></div>
          <div>
            <HostBtn
              border="none"
              width="400px"
              height="50px"
              font="25px"
              backColor="#2B8C44"
              str="목록가기"
              top="100px"
              color="white"
              f={historyBack}
            />
          </div>
        </DataArea>
      </MainDiv>
    </>
  );
};

export default SpaceResrvMgmtDetail;
