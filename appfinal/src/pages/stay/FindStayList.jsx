import React, { useState } from "react";
import Display from "../../components/FilterBar/Display";
import ListCard from "../../components/listcomponents/ListCard";
import styled from "styled-components";
import { IoMdSearch } from "react-icons/io";
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import { CiFilter } from "react-icons/ci";
import { RiResetRightFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";



const Layout = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-rows: 100px 100px 80px 100px 1fr;

  &>h1{
    text-align: center;
  }
`;

const InnerLayoutDiv = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns:40px 1fr 100px 1fr;
  justify-content: center;
  align-items: center;

&>div{
  margin: 50px;
  margin-bottom: 80px;
}
`;
const SearchWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 40px;
`;
const FilterWrapper = styled.div`
  display: grid;
  grid-template-columns: 100px 1fr 100px 100px;
  grid-template-rows: 1fr;
  border-bottom: 2px solid #202020;
  margin-top: 70px;
`;



const SearchInput = styled.input`
  border: none;
  background-color: #fafafa;
  border-bottom: 1px solid #202020;
  width: 1000px;
  outline: none;
  font-size: 1.1rem;
  text-align: center;
`;

const Btn = styled.button`
  border: none;
  color: #202020;
  outline: none;
  background-color: inherit;
  cursor: pointer;
`;

const FilterText = styled.span`
  font-size: 1.1rem;
`;

const FilterTextMD = styled.span`
  font-size: 1.1rem;
  text-align: end;
`;

const FindStayList = () => {

  // const navi=()=>{
  //   console.log("hello");
    
  // }
  const navigate = useNavigate();
  const clickHandler = (e)=>{
    console.log(e);
    // PARAM 변수 받아주는곳
    navigate("/findstay/detail/1");
    
  }

  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    setFormData((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("localhost:8080/findstay", {
      method: "GET",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((resp) => resp.text())
      .then((data) => {
        console.log("data : ", data);
      });
  };

 




  const items = [];
  for (let i = 0; i < 15; i++) {
    items.push(
        <>
          <div></div>
         <div key={i}>
          <ListCard morning={120000} night={150000}
           img1={"https://picsum.photos/300/200"} 
           img2={"https://picsum.photos/300/200"} 
           img3={"https://picsum.photos/300/200"} 
           img4={"https://picsum.photos/300/200"} 
           clickHandler={clickHandler}
           ></ListCard>
          </div>
         </>
         
      
    );
  }

  
  return(<> 
<Layout>
  <h1>FIND STAY</h1>
  <Display isTimeMode={false}></Display>

   <SearchWrapper>
          <form onSubmit={handleSubmit}>
            <SearchInput
              type="text"
              placeholder="원하는 숙소의 이름을 검색해보세요."
              onChange={handleChange}
            />
            <Btn type="submit">
              <IoMdSearch size={30} />
            </Btn>
          </form>
  </SearchWrapper>


  <FilterWrapper>
    <div>
    <Btn>
            <FilterText>최신순</FilterText>
            <IoCheckmarkCircleOutline size={18} />
          </Btn>
    </div>
    <div></div>
    <div>
    <Btn>
            <CiFilter size={18} />
            <FilterTextMD>필터</FilterTextMD>
          </Btn>
    </div>
    <div>
    <Btn>
            <RiResetRightFill size={18} />
            <FilterText>초기화</FilterText>
          </Btn>
    </div>
        </FilterWrapper>
        
  <InnerLayoutDiv>
    {items}
  </InnerLayoutDiv>
   </Layout>

   
  </>);
};

export default FindStayList;
