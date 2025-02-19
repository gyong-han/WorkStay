import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { setArea } from "../../redux/spaceSlice";

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
`;
const Modal = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 773.5px;
  height: 374.47px;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 2fr 1fr;
  z-index: 2;

  & > div > span {
    color: #049dd9;
    font-size: 30px;
    font-weight: 700;
  }
  & > div:nth-child(1) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr;
    justify-content: start;
    align-items: center;
    height: 80%;
    border-bottom: 1px solid #d9d9d9;
  }
  & > div:nth-child(1)>button {
    width: 40px;
    height: 40px;
    margin-left: auto;
    margin-bottom: auto;
    background-color: white;
    border: none;
  }
`;
const SelectDivOuter = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 1fr;
`;
const SelectDiv = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: auto;
  grid-template-rows: 1fr;
  justify-content: center;
  align-items: center;
  grid-auto-flow: column;

  & > div {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 30px;
    margin-right: 30px;
    margin-bottom: 20px;
    width: 80px;
    height: 50px;

    border: none;
    font-size: 23px;
  }

  & > div > label > input[type="radio"] {
    display: none;
    opacity: 0;
    pointer-events: none;
  }
  & > div > label:has(input[type="radio"]:checked) {
  background-color: #04b2d9; /* 선택된 라벨 스타일 */
  color:white;
}
  

 
  & > div > label {
    border-radius: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
  }
  & > div > label:hover {
    color: white;
    background-color: #04b2d9;
  }

 
`;
const FooterDiv = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  & > div {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr;
    justify-items: center;
    align-items: center;
    width: 400px;
    height: 80px;
  }
  & > div > button:nth-child(1) {
    width: 60px;
    height: 60px;
    border: none;
    background-image: url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTk-eoAWRZdo8KMKu65ebE8CvWkCFmsx9HqeQ&s);
    background-size: cover;
  }
  & > div > button:nth-child(2) {
    width: 145px;
    height: 45px;
    border: none;
    background-color: #049dd9;
    color: white;
    border-radius: 5px;
  }
`;

const Area = ({ isOpen, onClose }) => {
  const [areaState, setAreaState] = useState();
  const dispatch = useDispatch();
 
  useEffect(() => {}, [areaState]);
  if (!isOpen) return null;
  function ClickHandler(e) {
    console.log(e.target.value);
    
    dispatch(setArea(e.target.value));
  }
 

  function uncheckAllRadios() {
    document.querySelectorAll('input[type="radio"]').forEach(radio => {
        radio.checked = false;
    });
}

  const submitBtn = () => {
    onClose()
  };
  return (
    <Overlay>
      <Modal>
        <div>
          <span>장소를 선택해주세요.</span> <button onClick={()=>{onClose();}}>X</button>
        </div>
        <SelectDivOuter>
          <SelectDiv>
            <div>
              <label>서울
                <input
                  type="radio"
                  name="area"
                  value={"서울"}
                  onClick={ClickHandler}
                />
                </label>
              
            </div>
            <div>
              <label>
                부산
                <input
                  type="radio"
                  name="area"
                  value={"부산"}
                  onClick={ClickHandler}
                />
              </label>
            </div>
            <div>
              <label>
                경기
                <input
                  type="radio"
                  name="area"
                  value={"경기"}
                  onClick={ClickHandler}
                />
              </label>
            </div>
            <div>
              <label>
                인천
                <input
                  type="radio"
                  name="area"
                  value={"인천"}
                  onClick={ClickHandler}
                />
              </label>
            </div>
          </SelectDiv>
          <SelectDiv>
            <div>
              <label>
                강원
                <input
                  type="radio"
                  name="area"
                  value={"강원"}
                  onClick={ClickHandler}
                />
              </label>
            </div>
            <div>
              <label>
                경상
                <input
                  type="radio"
                  name="area"
                  value={"경상"}
                  onClick={ClickHandler}
                />
              </label>
            </div>
            <div>
              <label>
                전라
                <input
                  type="radio"
                  name="area"
                  value={"전라"}
                  onClick={ClickHandler}
                />
              </label>
            </div>
            <div>
              <label>
                춘천
                <input
                  type="radio"
                  name="area"
                  value={"춘천"}
                  onClick={ClickHandler}
                />
              </label>
            </div>
            <div>
              <label>
                제주
                <input
                  type="radio"
                  name="area"
                  value={"제주"}
                  onClick={ClickHandler}
                />
              </label>
            </div>
          </SelectDiv>
        </SelectDivOuter>
        <FooterDiv>
          <div>
            <button onClick={uncheckAllRadios}></button>
            <button onClick={submitBtn}>Search</button>
          </div>
        </FooterDiv>
      </Modal>
    </Overlay>
  );
};

export default Area;