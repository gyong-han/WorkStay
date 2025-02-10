import React, { useState } from "react";
import Display from "../../components/FilterBar/Display";
import styled from "styled-components";
import { IoMdSearch } from "react-icons/io";
import { CiFilter } from "react-icons/ci";
import { RiResetRightFill } from "react-icons/ri";
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import { FaRegBookmark } from "react-icons/fa";

const SearchWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 40px;
`;

const FilterWrapper = styled.div`
  display: flex;
  border-bottom: 2px solid #202020;
  justify-content: space-between;
  align-items: center;
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

const FilterText = styled.span`
  font-size: 1.1rem;
`;

const Title = styled.div``;

const InfoText = styled.div``;

const Btn = styled.button`
  border: none;
  color: #202020;
  outline: none;
  background-color: inherit;
  cursor: pointer;
`;

const FindStay = () => {
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

  return (
    <>
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
        <Btn>
          <FilterText>최신순</FilterText>
          <IoCheckmarkCircleOutline size={18} />
        </Btn>
        <Btn>
          <CiFilter size={18} />
          <FilterText>필터</FilterText>
        </Btn>
        <Btn>
          <RiResetRightFill size={18} />
          <FilterText>초기화</FilterText>
        </Btn>
      </FilterWrapper>
      <StayWrapper>
        <div>감자</div>
        <FaRegBookmark />
        <div>사진</div>
        <div>설탕</div>
        <div>소금</div>
        <div>가격</div>
      </StayWrapper>
    </>
  );
};

export default FindStay;
