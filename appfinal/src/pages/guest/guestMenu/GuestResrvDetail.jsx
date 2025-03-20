import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import HostBtn from "../../host/hostComponents/HostBtn";
import DataCard from "../../admin/adminComponents/DataCard";

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

const BtnDiv = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-content: center;
  align-items: center;
`;

const ImgDiv = styled.div`
  margin-left: 100px;
`;

const LayoutDiv = styled.div`
  padding-bottom: 50px;
`;

const GuestResrvDetail = () => {
  //import하기
  const navi = useNavigate();
  const [selectedMenu, setSelectedMenu] = useState("");

  function movePath(e) {
    setSelectedMenu(e.target.id);
    navi(`/hostMenu/${e.target.id}`);
  }

  const stayName = "온숲";

  return (
    <>
      <MainDiv>
        <HeaderDiv>
          <div>
            <StyleDiv>
              <StatusSpan size="15px" color="gray">
                예약 상세 ❯
              </StatusSpan>
              <StatusSpan size="15px"> {stayName}</StatusSpan>
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
          <ImgDiv>
            <DataCard
              title={"온숲"}
              address={"경기도 양평군 지평면 학교담길 35-33"}
              phone={"0504-0903-2641"}
              email={"onsoup@gmail.com"}
              img={
                "https://images.stayfolio.com/system/pictures/images/000/242/946/original/6ccc6545741b3626b8ab3f6679276176cb2be9e7.jpg?1730794640"
              }
            />
          </ImgDiv>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <LayoutDiv></LayoutDiv>
          <HrDiv></HrDiv>
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
              02. 스테이 및 객실
            </TitleDiv>
            <TitleDiv left="40px" bot="30px">
              03. 예약 인원
            </TitleDiv>
            <TitleDiv left="40px" bot="30px">
              04. 체크인
            </TitleDiv>
            <TitleDiv left="40px">05. 체크 아웃</TitleDiv>
          </div>
          <div></div>
          <div>
            <TitleDiv left="5px" bot="30px">
              20250101
            </TitleDiv>
            <TitleDiv left="5px" bot="30px">
              온숲 / Room A1
            </TitleDiv>
            <TitleDiv left="5px" bot="30px">
              총 2명 (성인 : 2명/ 아동 : 0명 / 영아 : 0명)
            </TitleDiv>
            <TitleDiv left="5px" bot="30px">
              2025-01-21 16:00
            </TitleDiv>
            <TitleDiv left="5px" bot="30px">
              2025-01-22 11:00
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
          <TextArea value={stayName} readOnly />
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
              ₩360,000
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
            카드 결제 (결제 완료 : 2025-01-01 11:23)
          </TitleDiv>
          <div></div>
          <div></div>
          <BtnDiv>
            <div>
              <HostBtn
                width="250px"
                height="50px"
                font="20px"
                backColor="#049DD9"
                color="#FAFAFA"
                str="예약취소"
                top="100px"
                id="staycancle"
                onClick={movePath}
                selected={selectedMenu === "staycancle"}
              />
            </div>
            <div>
              <HostBtn
                width="250px"
                height="50px"
                font="20px"
                backColor="#FAFAFA"
                color="#049DD9"
                str="이용 안내 및 환불 규정"
                top="100px"
              />
            </div>
          </BtnDiv>
        </DataArea>
      </MainDiv>
    </>
  );
};

export default GuestResrvDetail;
