import React, { useEffect, useState } from "react";
import styled from "styled-components";
import HostBtn from "../hostComponents/HostBtn";
import EnrollRoom from "../roomComponents/EnrollRoom";
import { useParams } from "react-router-dom";

const HomeDiv = styled.div`
  display: grid;
  grid-template-columns: 1fr 5fr 1fr;
`;

const MainDiv = styled.div`
  display: grid;
  grid-template-rows: 230px 4fr 100px 230px;
`;

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
  margin-bottom: ${(props) => {
    return props.marginBot;
  }};
  padding: 0px;
`;

const BtnArea = styled.div`
  margin-top: 80px;
  margin-bottom: 80px;
  display: grid;
  place-items: center;
`;

const AddBtnArea = styled.div`
  display: grid;
  place-items: end;
`;

const Hr = styled.hr`
  margin-top: 30px;
  margin-bottom: 30px;
  background-color: #d9d9d9;
`;

const ThirdEnrollStay = () => {
  const stayNum = useParams();
  const [formDataArr, setFormDataArr] = useState([]);

  const addRoom = () => {
    setFormDataArr((prev) => {
      return [...prev, { stayNo: stayNum.x }];
    });
  };

  useEffect(() => {
    addRoom();
  }, []);

  const f01 = () => {
    // console.log(stayNum.x);
    //fetch함수 날리기
    console.log(formDataArr);
  };

  return (
    <>
      <HomeDiv>
        <div></div>
        <MainDiv>
          <div>
            <HeaderDiv size="50px" color="black" margin="30px" weight="600">
              Do you want to be a host?
            </HeaderDiv>
            <HeaderDiv
              size="40px"
              color="#2B8C44"
              weight="500"
              margin="10px"
              marginBot="70px"
            >
              스테이 신청
            </HeaderDiv>
          </div>
          <div>
            {formDataArr.map((x, idx) => {
              return (
                <>
                  {idx === 0 ? <></> : <Hr />}
                  <EnrollRoom
                    key={idx}
                    formDataArr={formDataArr}
                    setFormDataArr={setFormDataArr}
                    no={idx}
                  />
                </>
              );
            })}
          </div>
          <AddBtnArea>
            <HostBtn
              width="100px"
              height="30px"
              font="15px"
              backColor="#2B8C44"
              str="독채 추가"
              f={addRoom}
            />
          </AddBtnArea>
          <BtnArea>
            <HostBtn
              width="400px"
              height="50px"
              font="25px"
              backColor="#2B8C44"
              str="제출하기"
              f={f01}
            />
          </BtnArea>
        </MainDiv>

        <div></div>
      </HomeDiv>
    </>
  );
};

export default ThirdEnrollStay;
