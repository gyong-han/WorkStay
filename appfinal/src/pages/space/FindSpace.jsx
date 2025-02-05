import React, { useState } from "react";
import Display from "../../components/FilterBar/Display";
import PackageDisplay from "../../components/package/PackageDisplay";
import ListCard from "../../components/listcomponents/ListCard";
import styled from "styled-components";
import { IoMdSearch } from "react-icons/io";
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import { CiFilter } from "react-icons/ci";
import { RiResetRightFill } from "react-icons/ri";



const FindSpace = () => {
  const navi=()=>{
    console.log("hello");
    
  }

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
  grid-template-columns:200px 1fr 100px 1fr 200px;
  justify-content: center;
  align-items: center;
  margin-bottom: 1400px;

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

const StayWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 0.5fr 2fr;
  grid-template-rows: auto;
  width: 620px;
  height: 235px;
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


  return(<> 
<Layout>
  <h1>FIND SPACE</h1>
  <Display></Display>

   <SearchWrapper>
          <form onSubmit={handleSubmit}>
            <SearchInput
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
    <div></div>
    <ListCard ></ListCard>
    <div></div>
    <ListCard ></ListCard>
    <div></div>
    <div></div>
    <ListCard ></ListCard>
    <div></div>
    <ListCard ></ListCard>
    <div></div>
    <div></div>
    <ListCard ></ListCard>
    <div></div>
    <ListCard ></ListCard>
    <div></div>
    <div></div>
    <ListCard ></ListCard>
    <div></div>
    <ListCard ></ListCard>
    <div></div>
    <div></div>
    <ListCard ></ListCard>
    <div></div>
    <ListCard ></ListCard>
    <div></div>
    <div></div>
    <ListCard ></ListCard>
    <div></div>
    <ListCard ></ListCard>
    <div></div>
    <br></br>
    <PackageDisplay img={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAwcf09BODgX7VbhRf07dq9mBKXiQwQxzG-Q&s"}
   title={"낮 패키지"} standard={"6"} max={"12"} price={"120000"} navigatorHandler={navi} ></PackageDisplay>
   <PackageDisplay img={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPVr3w8Pov0BQ0sJlrmKaS-P8Nz8ONNF-VUQ&s"}
   title={"밤 패키지"} standard={"4"} max={"8"} price={"150000"} navigatorHandler={navi} ></PackageDisplay>
  </InnerLayoutDiv>
   </Layout>
  </>);
};

export default FindSpace;
