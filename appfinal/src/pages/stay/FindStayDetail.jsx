import styled from "styled-components";
import { BiMessageAltDetail } from "react-icons/bi";
import { RxShare2 } from "react-icons/rx";
import { IoBookmarkOutline } from "react-icons/io5";
import { IoBookmark } from "react-icons/io5";
import PictureSlide from "../../components/listcomponents/PictureSlide";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import PackageDisplay from "../../components/package/PackageDisplay";
import Map from "../../components/map/Map";
import Infomation from "../../components/Infomation";
import { useParams } from "react-router-dom";
import { useState } from "react";
import Calendar from "../../components/FilterBar/Calendal";

const Layout = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 120px 550px 100px 700px 450px 100px 549px 50px 650px;

  & > div:nth-child(3) {
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: 1fr 1500px 1fr;
    grid-template-rows: 1fr;

    font-size: 18px;
    font-weight: 400;
  }
  & > div:nth-child(5) {
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: 1fr 1500px 1fr;
    grid-template-rows: 450px;

    & > div:nth-child(2) {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #2b8c437b;
      color: #fafafa;
    }
  }

  & > div:nth-child(6) {
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: 1fr 700px 1fr;
    grid-row: 1fr;

    & > div:nth-child(2) {
      display: flex;
      align-items: end;
      justify-content: center;
      text-align: center;
      font-size: 20px;
    }
  }
  & > div:nth-child(7) {
    width: 1500px;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const TitleDiv = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 275px 1fr 250px;
  grid-template-rows: 1fr;
  & > div:nth-child(1) > span {
    font-size: 18px;
  }
`;
const InconTitleDiv = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 3fr 1fr;

  & > div:nth-child(1),
  & > div:nth-child(2),
  & > div:nth-child(3) {
    display: flex;
    align-items: end;
    justify-content: center;
    font-size: 35px;
  }
  & > div:nth-child(4),
  & > div:nth-child(5),
  & > div:nth-child(6) {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
const DateDiv = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: end;
  border-bottom: 2px solid #d9d9d9;
`;

const PackageDiv = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 300px 450px 50px 450px 200px;
  grid-template-rows: 1fr;
  justify-content: center;
  align-items: center;

  & > div:nth-child(1) {
    width: 100%;
    height: 100%;
    margin-top: 240px;
    font-size: 40px;
    font-weight: 600;
  }
`;

const FindStayDetail = () => {
  const [bookMark, setBookMark] = useState();
  const [result, setResult] = useState([]);

  const { x } = useParams();
  console.log(x);

  const park = "4";
  let parking = "";
  if (park === "4") {
    parking = "스페이스 건물 외부 전용 주차장에 주차 가능합니다";
  } else {
    parking = "스페이스 공간 주차불가능";
  }

  const name = "인터플럼";
  const adress = "서울특별시 강남구 테헤란로 130";

  const navi = () => {
    console.log("hello");
  };

  return (
    <Layout>
      <TitleDiv>
        <div>
          <h1>인더플럼</h1>
          <span>제주 / 제주시</span>
        </div>
        <div></div>
        <InconTitleDiv>
          <div>
            <BiMessageAltDetail />
          </div>
          <div>
            <RxShare2 />
          </div>

          <div onClick={() => setBookMark(!bookMark)}>
            {bookMark ? <IoBookmark /> : <IoBookmarkOutline />}
          </div>
          <div>메세지</div>
          <div>공유하기</div>
          <div>북마크</div>
        </InconTitleDiv>
      </TitleDiv>
      <div>
        {/* <PictureSlide w={'1500'} h={'500'} 
      img1={'https://image.utoimage.com/preview/cp872722/2022/12/202212008462_500.jpg'}
      img2={'https://helpx.adobe.com/content/dam/help/en/photoshop/using/quick-actions/remove-background-before-qa1.png'}
      img3={'https://altools.co.kr/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fimg_feature_alsee_1.60428533.png&w=3840&q=75'}
      img4={'https://t1.daumcdn.net/thumb/R720x0/?fname=http://t1.daumcdn.net/brunch/service/user/14Fa/image/joib7vCDm4iIP7rNJR2ojev0A20.jpg'}
      main={true}
      >
      </PictureSlide> */}
      </div>
      <div>
        <div></div>
        <DateDiv>
          <Calendar type={"input"} setResult={setResult}></Calendar>
        </DateDiv>
        <div></div>
      </div>
      <PackageDiv>
        <div>ROOM</div>
        <div>
          <PackageDisplay
            img={
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiwna3CDoRLFRenf20hQXtKMU59zeuOksm1Q&s"
            }
            title={"Room A1"}
            standard={"6"}
            max={"12"}
            price={"120000"}
            navigatorHandler={navi}
            url={"/findstay/staybooking/1"}
            titleHandler={() => {}}
          ></PackageDisplay>
        </div>
        <div></div>
        <div>
          <PackageDisplay
            img={
              "https://www.agoda.com/wp-content/uploads/2019/04/Where-to-stay-in-Seoul-South-Korea-Shilla-Stay-Seocho.jpg"
            }
            title={"Room A2"}
            standard={"4"}
            max={"8"}
            price={"150000"}
            navigatorHandler={navi}
            url={"/findstay/staybooking/2"}
            titleHandler={() => {}}
          ></PackageDisplay>
        </div>
        <div></div>
      </PackageDiv>
      <div>
        <div></div>
        <div>소개글내용 ~~~~~</div>
        <div></div>
      </div>
      <div>
        <div></div>
        <div>
          {name}의 위치는 [{adress}]입니다.
          <br></br>
          {parking}
        </div>
        <div></div>
      </div>
      <div>
        <Map adress={adress} name={name}>
          {" "}
          stay
        </Map>
      </div>
      <div></div>
      <Infomation
        morning={150000}
        night={820000}
        standard={10}
        max={20}
      ></Infomation>
    </Layout>
  );
};

export default FindStayDetail;
