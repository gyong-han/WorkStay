import React from "react";
import { styled } from "styled-components";
import { FiFileText, FiChevronRight } from "react-icons/fi";
import { BiSearch } from "react-icons/bi";
import { CiPen } from "react-icons/ci";
import HostBtn from "../hostComponents/HostBtn";
import { useNavigate } from "react-router-dom";

const HeaderDiv = styled.div`
  text-align: center;
  font-weight: ${(props) => {
    return props.weight;
  }};
  color: ${(props) => {
    return props.color;
  }};
  font-size: ${(props) => {
    return props.size;
  }};
  margin-top: ${(props) => {
    return props.margin;
  }};
  padding: 0px;
`;

const TagDiv = styled.div`
  text-align: center;
  font-size: 15px;
  margin-top: 40px;
`;

const Hr = styled.hr`
  width: 75%;
  margin-top: 50px;
  margin-bottom: 50px;
`;

const MainHeader = styled.div`
  margin-left: 320px;
  width: 500px;
  font-size: 20px;
  color: #2b8c44;
`;

const MainContent = styled.div`
  margin-left: 320px;
  color: #202020;
  font-size: 20px;

  p {
    margin-top: 10px;
  }
`;

const FooterContent = styled.div`
  margin-top: 20px;
  margin-left: 220px;
  margin-bottom: 25px;
  width: 1100px;
  height: 60px;
  display: grid;
  grid-template-columns: 0.5fr 2fr 1fr 0.5fr 2fr 1fr 0.5fr 2fr;
  text-align: center;
`;

const FooterDiv = styled.div`
  display: grid;
  grid-template-rows: 0.4fr 1fr;
  align-items: center;
  justify-content: center;
`;

const FooterContentTitle = styled.div`
  font-weight: ${(props) => {
    return props.weight;
  }};
  width: 200px;
  font-size: 15px;
  color: #2b8c44;
`;

const FooterContentText = styled.p`
  width: 200px;
  font-size: 12px;
  color: black;
`;

const IconDiv = styled.div`
  display: grid;
  align-items: center;
  justify-content: center;
`;

const FooterFoot = styled.div`
  text-align: center;
  font-size: 12px;
  color: #202020;
  font-weight: 400;
`;

const BtnArea = styled.div`
  margin-top: 80px;
  margin-bottom: 80px;
  display: grid;
  place-items: center;
`;

const FirstEnrollStay = () => {
  const navigate = useNavigate();

  function changePath() {
    navigate("/enroll/stay/second");
    window.scrollTo(0, 0);
  }

  return (
    <>
      <HeaderDiv size="50px" color="black" margin="20px" weight="600">
        Do you want to be a host?
      </HeaderDiv>
      <HeaderDiv size="40px" color="#2B8C44" weight="500">
        스테이 신청
      </HeaderDiv>
      <TagDiv>
        <p>
          워크스테이는 "일과 삶이 완벽히 공존하는 워케이션 공간"을 큐레이션하는
          플랫폼으로, <br />
          단순한 공간 제공을 넘어서 가치를 창출합니다.
        </p>
        <p>
          우리는 공간의 가치는 규모만이 아닌, 디자인, 운영 철학, 지역적 매력,{" "}
          <br />
          그리고 창의성을 기반으로 독창적 개성이 녹아 내쉬어야 한다고
          생각합니다.
        </p>
        <p>
          하나의 영감을 주는 제안은 하듯, 전 세계 곳곳의 숨겨진 워케이션에
          적합했던 소수의 공간을 소개하고 연결하며, <br />그 안에 담긴 이야기와
          가능성을 탐험자들에게 전달합니다.
        </p>
        <p>
          워크스테이는 단순한 인터페이스 넘어 새로운 아이디어와 에너지를 충전할
          수 있는 창조적인 공간들을 제공합니다.
        </p>
      </TagDiv>
      <Hr />
      <MainHeader>워크&라이프 밸런스(WORK & LIFE BALANCE)</MainHeader>
      <MainContent>
        <p>
          일과 쉼이 조화를 이루는 공간으로, 워케이션에 최적화된 환경을
          제공합니다. 효율적인 업무 수행과 온전한 휴식을 동시에 <br />
          누릴 수 있도록 설계된 공간을 선별합니다.
        </p>
      </MainContent>
      <MainHeader>창의적 영감 (CREATIVE INSPIRATION)</MainHeader>
      <MainContent>
        <p>
          생산성과 창의성을 높여주는 분위기와 디자인을 갖춘 공간. 각 장소가 가진
          독창적인 이야기와 지역적 매력을 통해 이용자
          <br />
          에게 영감을 제공합니다.
        </p>
      </MainContent>
      <MainHeader>커뮤니티와 연결 (COMMUNITY & CONNECTION)</MainHeader>
      <MainContent>
        <p>
          혼자만의 집중 시간은 물론, 같은 비전을 가진 사람들과의 네트워킹과
          교류가 가능한 환경. 협업과 교류를 통해 새로운 <br />
          가능성을 열어주는 공간을 소개합니다.
        </p>
      </MainContent>
      <MainHeader>맞춤형 가성비 (VALUE-BASED AFFORDABILITY)</MainHeader>
      <MainContent>
        <p>
          공간의 품질과 서비스, 워케이션 경험에 걸맞은 합리적이고 공정한 가격.
          이용자의 기대에 부합하는 가치를 제공하는
          <br /> 공간을 선별합니다.
        </p>
      </MainContent>
      <Hr />
      <HeaderDiv size="20px" color="black" margin="10px" weight="600">
        입점 절차 안내
      </HeaderDiv>
      <FooterContent>
        <IconDiv>
          <FiFileText size={50} />
        </IconDiv>
        <FooterDiv>
          <FooterContentTitle weight="600">
            입점 신청 작성 및 제출
          </FooterContentTitle>
          <FooterContentText>
            신청 양식에 맞춰 내용을 작성하신 후 제출하시면 신청이 완료됩니다.
          </FooterContentText>
        </FooterDiv>
        <IconDiv>
          <FiChevronRight size={50} />
        </IconDiv>
        <IconDiv>
          <BiSearch size={50} />
        </IconDiv>
        <FooterDiv>
          <FooterContentTitle weight="600">
            검토 및 가능여부 안내
          </FooterContentTitle>
          <FooterContentText>
            영업일 기준 14일 이내 기재해주신 담당자 메세지로 입점 가능 여부를
            안내 드립니다.
          </FooterContentText>
        </FooterDiv>
        <IconDiv>
          <FiChevronRight size={50} />
        </IconDiv>
        <IconDiv>
          <CiPen size={50} />
        </IconDiv>
        <FooterDiv>
          <FooterContentTitle weight="600">
            계약 및 입점 절차 안내
          </FooterContentTitle>
          <FooterContentText>
            입점 가능 여부에 따라 이후 계약 및 입점 절차를 안내해드리고
            있습니다.
          </FooterContentText>
        </FooterDiv>
      </FooterContent>
      <FooterFoot>
        ※ 고객센터 1:1 문의를 통해서는 입점 검토 및 가능 여부에 대해서 답변을
        드릴 수 없습니다.
      </FooterFoot>
      <FooterFoot>
        ※ 입점 신청을 위해 보내주신 정보는 검토 완료 후 3개월 간 보관하며 이후
        파기합니다.
      </FooterFoot>
      <BtnArea>
        <HostBtn
          border="none"
          width="400px"
          height="50px"
          backColor="#2B8C44"
          font="25px"
          color="white"
          str="가입하기"
          f={changePath}
        />
      </BtnArea>
    </>
  );
};

export default FirstEnrollStay;
