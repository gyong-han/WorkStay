import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import HostBtn from "../../host/hostComponents/HostBtn";
import DataCard from "../../admin/adminComponents/DataCard";
import { jwtDecode } from "jwt-decode";
import { BASE_URL } from "../../../components/service/config";

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

const SpaceDetail = () => {
  const navi = useNavigate();
  const location = useLocation(); // 현재 경로 가져오기
  const [selectedMenu, setSelectedMenu] = useState("");
  const [params, setParams] = useState({ reno: "" });
  const [data, setData] = useState("");
  const [no, setNo] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setNo(decodedToken.no); // 상태 업데이트
      } catch (error) {
        console.error("토큰 디코딩 실패:", error);
      }
    }
  }, []);

  useEffect(() => {
    // Query Params 가져오기
    const queryParams = new URLSearchParams(location.search);
    const renoParam = queryParams.get("reno");

    setParams({ reno: renoParam });
  }, [location.search]);

  useEffect(() => {
    if (!params.reno) {
      console.log("필수 값이 누락됨:", { ...params });
      return;
    }

    fetch(`${BASE_URL}/api/guest/spaceDetailReserv?reno=${params.reno}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => {
        if (!resp.ok) {
          throw new Error(`서버 응답 오류: ${resp.status}`);
        }
        return resp.json();
      })
      .then((responseData) => {
        setData(responseData);
      })
      .catch((error) => {
        console.error("숙소 상세 정보 가져오기 실패:", error);
      });
  }, [params]);

  function movePath(e) {
    setSelectedMenu(e.target.id);

    // 현재 경로에 'staycancle' 추가
    const newPath =
      `${location.pathname}/spacecancle?no=${no}&reno=${params.reno}`.replace(
        /\/+/g,
        "/",
        "spacecancle"
      );

    navi(newPath);
  }

  const formatPrice = (price) => {
    if (price == null) return "가격 정보 없음"; // price가 undefined 또는 null이면 기본값 반환
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  //이용 안내 및 환불 규정 이동
  function moveDetail(spaceNo) {
    const newPath = `/findspace/detail/${spaceNo}`;

    navi(newPath);
  }

  return (
    <>
      <MainDiv>
        <HeaderDiv>
          <div>
            <StyleDiv>
              <StatusSpan size="15px" color="gray">
                예약 상세 ❯
              </StatusSpan>
              <StatusSpan size="15px"> {data.name}</StatusSpan>
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
              title={data.name}
              address={data.address}
              phone={data.phone}
              img={data.filePath}
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
              02. 스페이스
            </TitleDiv>
            <TitleDiv left="40px" bot="30px">
              03. 예약 인원
            </TitleDiv>
            <TitleDiv left="40px" bot="30px">
              04. 패키지상품
            </TitleDiv>
            <TitleDiv left="40px">05. 예약일</TitleDiv>
          </div>
          <div></div>
          <div>
            <TitleDiv left="5px" bot="30px">
              {data.reno}
            </TitleDiv>
            <TitleDiv left="5px" bot="30px">
              {data.name}
            </TitleDiv>
            <TitleDiv left="5px" bot="30px">
              총 {data.totalPerson}명 (성인 : {data.adult}명/ 아동 :{data.child}
              명 / 영아 : {data.baby}명)
            </TitleDiv>
            <TitleDiv left="5px" bot="30px">
              {data.packageName}패키지
            </TitleDiv>
            <TitleDiv left="5px" bot="30px">
              {data.useDay}
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
          <TextArea value={data.request} readOnly />
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
              공간 대여권의의 재판매, 양도, 양수, 교환을 금지합니다.
              <br />
              <br />
            </PTag>
            <PTag>
              예약자의 부득이한 사유로 인해 본인 이용이 어려울 경우 가족에 한해
              <br />
            </PTag>
            <PTag>
              해당스페이스에 가족관계임을 증명할 수 있는 서류(가족관계증명서
              등)와
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
              ₩{formatPrice(data.amount)}
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
            카드 결제 (결제 완료 : {data.reservationDate})
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
                border="none"
                f={movePath}
              />
            </div>
            <div>
              <HostBtn
                width="250px"
                height="50px"
                font="20px"
                backColor="#FAFAFA"
                color="#202020"
                str="이용 안내 및 환불 규정"
                border="1px solid #049DD9"
                top="100px"
                f={() => {
                  moveDetail(data.roomNo);
                }}
              />
            </div>
          </BtnDiv>
        </DataArea>
      </MainDiv>
    </>
  );
};

export default SpaceDetail;
