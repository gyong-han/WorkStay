import styled from "styled-components";
import Card from "./Card";

const Layout = styled.div`
  margin-left: 50px;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(${(props) => props.len}, 35px 500px 30px);
  grid-template-rows: 1fr;
`;
const BlackDiv = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 250px 130px;
  border: 2px #d9d9d9 solid;
  border-radius: 10px;
  width: 400px;
  height: 370px;

  & > div:nth-child(2) {
  }
`;

const ImgDiv = styled.img`
  border-top-right-radius: 5px;
  border-top-left-radius: 5px;
  width: 100%;
  height: 250px;
  background-position: center;
`;

const SecondDiv = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-template-rows: 1fr 1.5fr 1fr;
  margin-left: 10px;
  & > div:nth-child(1) {
    display: flex;
    align-items: center;
    font-size: 20px;
    font-weight: 700;
  }
  & > div:nth-child(2) > svg {
    width: 30px;
    height: 30px;
  }
  & > div:nth-child(2) {
    display: flex;
    justify-content: end;
  }

  & > div:nth-child(3) {
    display: flex;
    gap: 10px;
  }
  & > div:nth-child(5) {
    display: flex;
    font-size: 20px;
    font-weight: 700;
    padding-bottom: 20px;
  }
`;

const HomeCard = ({ imgPath }) => {
  return (
    <Layout len={imgPath.length}>
      {imgPath.map((vo) => {
        return (
          <>
            <div></div>
            <Card vo={vo}></Card>
            <div></div>
          </>
        );
      })}
    </Layout>
  );
};

export default HomeCard;
