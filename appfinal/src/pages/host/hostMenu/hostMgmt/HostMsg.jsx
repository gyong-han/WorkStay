import React from "react";
import styled from "styled-components";

const Img = styled.img`
  width: 500px;
  height: 500px;
  margin-left: 150px;
`;

const HostMsg = () => {
  return (
    <>
      <Img
        src="https://sgh-final-server.s3.ap-northeast-2.amazonaws.com/DALL%C2%B7E+2025-03-06+11.41.23+-+A+loading+or+'work+in+progress'+image+featuring+a+simple+animated-style+illustration.+The+image+should+include+a+progress+bar+or+a+spinning+gear+icon+.webp"
        alt="이미지"
      />
    </>
  );
};

export default HostMsg;
