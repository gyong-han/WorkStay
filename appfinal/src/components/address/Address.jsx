import React, { useEffect } from "react";
import { styled } from "styled-components";
import { useState } from "react";

//npm install react-daum-postcode -> lib설치하기

const StyledInput = styled.input`
  width: ${(props) => {
    return props.width;
  }};
  height: 25px;
  border: none;
  border-bottom: 1px solid black;
  background-color: #fafafa;
  outline: none;
  font-size: 25px;
  font-weight: 400;
  line-height: 5;
  padding-left: 5px;
  margin-top: ${(props) => {
    return props.top;
  }};
`;

const StyledBtn = styled.button`
  width: 110px;
  height: 30px;
  border: none;
  border-radius: 5px;
  font-size: 15px;
  color: white;
  margin-left: 15px;
  background-color: #6bbf5e;
  margin-top: 40px;
  cursor: pointer;
`;

const Address = ({ w1, w2, t1, t2, setFormData }) => {
  const [address, setAddress] = useState("");

  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const addressSearch = () => {
    new window.daum.Postcode({
      oncomplete: function (data) {
        const roadAddr = data.roadAddress;
        const jibunAddr = data.jibunAddress;

        if (roadAddr) {
          document.querySelector("#roadAddress").value = roadAddr;
          setAddress(roadAddr);
          document.querySelector("#detailAddress").value = "";
        } else if (jibunAddr) {
          document.querySelector("#roadAddress").value = jibunAddr;
        }
      },
    }).open();
  };

  function combineAddress(value) {
    const roadAddress = document.querySelector("#roadAddress").value;

    let combinAddressValue = roadAddress + ", " + value;

    setAddress(combinAddressValue);
  }

  useEffect(() => {
    setFormData((prev) => {
      return {
        ...prev,
        address: address,
      };
    });
  }, [address]);

  return (
    <div>
      <StyledInput
        type="text"
        id="roadAddress"
        placeholder="주소를 입력해주세요."
        width={w1}
        top={t1}
        readOnly
      />
      <StyledBtn type="button" onClick={addressSearch}>
        주소 검색
      </StyledBtn>
      <br />
      <StyledInput
        type="text"
        id="detailAddress"
        placeholder="상세 주소를 입력해주세요."
        width={w2}
        top={t2}
        onChange={(e) => {
          return combineAddress(e.target.value);
        }}
      />
    </div>
  );
};

export default Address;
