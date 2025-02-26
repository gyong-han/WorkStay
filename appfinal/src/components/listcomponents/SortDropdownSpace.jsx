import React, { useState } from "react";
import styled from "styled-components";
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { setOrderByStandard } from "../../redux/spaceSlice";

const DropdownContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const DropdownButton = styled.button`
  background: none;
  border: none;
  font-size: 15px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 5px;
`;

const DropdownMenu = styled.ul`
  position: absolute;
  top: 100%;
  left: 0;
  width: 160px;
  background: white;
  border-radius: 12px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  list-style: none;
  padding: 8px 0;
  margin: 5px 0 0;
  display: ${({ isOpen }) => (isOpen ? "block" : "none")};
  z-index: 10;
`;

const DropdownItem = styled.li`
  padding: 12px 16px;
  font-size: 14px;
  cursor: pointer;
  color: #202020;
  display: flex;
  align-items: center;

  &:hover {
    color: #049dd9;
    font-weight: 600;
  }

  &:not(:last-child) {
    border-bottom: 1px solid #d9d9d9;
  }
`;

const SortDropdownSpace = ({}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("최신순");
  const dispatch = useDispatch();

  const options = [
    { value: "latest", label: "최신순" },
    { value: "popular", label: "인기순" },
    { value: "highPrice", label: "높은 가격순" },
    { value: "lowPrice", label: "낮은 가격순" },
  ];

  const handleSelect = async (option) => {
    setSelectedOption(option.label);
    setIsOpen(false);

    try {
      dispatch(setOrderByStandard(option.value));
    } catch (error) {
      console.error("정렬 옵션 변경 실패", error);
    }
  };

  return (
    <DropdownContainer>
      <DropdownButton onClick={() => setIsOpen(!isOpen)}>
        {selectedOption} <IoCheckmarkCircleOutline size={18} />
      </DropdownButton>
      <DropdownMenu isOpen={isOpen}>
        {options.map((option) => (
          <DropdownItem key={option.value} onClick={() => handleSelect(option)}>
            {option.label}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </DropdownContainer>
  );
};

export default SortDropdownSpace;
