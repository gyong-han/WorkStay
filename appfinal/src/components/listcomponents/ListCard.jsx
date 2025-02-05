import React from 'react';
import PictureSlide from './PictureSlide';
import styled from 'styled-components';

const Layout = styled.div`
  width: 616px;
  height: 235px;
  border: 1px solid black;
  display: grid;
  grid-template-columns: 210px 406px;
  grid-template-rows: 1fr;


`;

const ListCard = () => {
  
  return (
    <Layout>
      <div></div>
      <PictureSlide w={''} h={''} 
      img1={'https://image.utoimage.com/preview/cp872722/2022/12/202212008462_500.jpg'}
      img2={'https://helpx.adobe.com/content/dam/help/en/photoshop/using/quick-actions/remove-background-before-qa1.png'}
      img3={'https://altools.co.kr/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fimg_feature_alsee_1.60428533.png&w=3840&q=75'}
      img4={'https://t1.daumcdn.net/thumb/R720x0/?fname=http://t1.daumcdn.net/brunch/service/user/14Fa/image/joib7vCDm4iIP7rNJR2ojev0A20.jpg'}
      >
      </PictureSlide>
    </Layout>
  );
};

export default ListCard;
