import { useNavigate } from 'react-router-dom';
import PictureSlide from './PictureSlide';
import styled from 'styled-components';

const Layout = styled.div`
  width: 616px;
  height: 235px;
  display: grid;
  grid-template-columns: 210px 406px;
  grid-template-rows: 1fr;
`;
const InerDiv =styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 50px 50px 1fr 1fr 1fr 1fr 1fr;
`;
const TitleDiv = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: start;
  align-items: center;
  font-size: 40px;
  font-weight:bold;
`;
const AreaDiv = styled.div`
  width: 100%;
  height: 100%;
  font-size: 20px;
  font-weight:600;
`;
const PeopleDiv = styled.div`
  width: 100%;
  height: 100%;
  font-size:20px;
  font-weight:600;
`;
const MorningPackagePriceDiv= styled.div`
  width: 100%;
  height: 100%;
  font-size:15px;
  display: flex;
  align-items: end;
`;
const NightPackagePriceDiv= styled.div`
  width: 100%;
  height: 100%;
  font-size:15px;
`;

const ReservationDiv = styled.div`
  width: 100%;
  height: 100%;
  padding-left: 5px;
  font-size: 18px;
  text-decoration: underline solid #000000;
  
`;


const ListCard = ({morning,night,key}) => {

  const navigate = useNavigate();
  const clickHandler = (e)=>{
    console.log(e);
    // PARAM 변수 받아주는곳
    navigate("/findspace/detail/1");
    
  }
  



  
  const morningPrice= morning.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  const nightPrice = night.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  
  return (
    <Layout>
      <InerDiv  onClick={clickHandler}>
        <TitleDiv>인더플럼</TitleDiv>
        <div></div>
        <AreaDiv>제주/제주시</AreaDiv>
        <PeopleDiv>기준 6명 (최대 12명)</PeopleDiv>
        <MorningPackagePriceDiv>낮패키지₩{morningPrice}</MorningPackagePriceDiv>
        <NightPackagePriceDiv>밤패키지₩{nightPrice}</NightPackagePriceDiv>
        <ReservationDiv>예약하기</ReservationDiv>
      </InerDiv>
      <PictureSlide w={''} h={'235'} 
      img1={'https://image.utoimage.com/preview/cp872722/2022/12/202212008462_500.jpg'}
      img2={'https://helpx.adobe.com/content/dam/help/en/photoshop/using/quick-actions/remove-background-before-qa1.png'}
      img3={'https://altools.co.kr/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fimg_feature_alsee_1.60428533.png&w=3840&q=75'}
      img4={'https://t1.daumcdn.net/thumb/R720x0/?fname=http://t1.daumcdn.net/brunch/service/user/14Fa/image/joib7vCDm4iIP7rNJR2ojev0A20.jpg'}
      main={false}
      >
      </PictureSlide>
    </Layout>
  );
};

export default ListCard;
