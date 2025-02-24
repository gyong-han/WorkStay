import React from 'react';
import styled from 'styled-components';

const Layout = styled.div`
width: 100%;
height: 100%;
display: grid;
grid-template-columns: 1fr;
grid-template-rows: 300px 150px;

&>a{
  text-decoration: none;
}
`;

const BackImgDiv = styled.div`
width: 450px;
height: 450px;
background-image: url(${props => props.img});
background-position: center;
background-size: cover;
`;


const PackageReservationDone = ({img}) => {


  


  return (
    <BackImgDiv img={img}>
      <Layout>
        <div></div>
      
     
      </Layout>
    </BackImgDiv>
    
  );
};

export default PackageReservationDone;