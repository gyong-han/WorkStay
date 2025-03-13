import React, { useState } from "react";
import styled from "styled-components";
import { BASE_URL } from "../../../components/service/config";
import { useNavigate } from "react-router-dom";
import Alert from "../../../components/Alert";

const MainDiv = styled.div`
  display: grid;
  grid-template-rows: 50px auto;
`;

const StatusSpan = styled.span`
  font-size: 25px;
  margin-left: ${(props) => {
    return props.left;
  }};
`;

const TitleArea = styled.textarea`
  height: 30px;
  margin-top: 20px;
  border-radius: 5px;
  resize: none;
  font-family: "Pretendard-Regular";
  font-size: 1.2rem;
  width: 940px;
  line-height: 30px;
  padding-left: 5px;
`;

const ContentArea = styled.textarea`
  height: 380px;
  margin-top: 20px;
  border-radius: 5px;
  resize: none;
  font-family: "Pretendard-Regular";
  font-size: 1.2rem;
  width: 940px;
  padding-left: 5px;
`;

const ParentDiv = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 950px;
  margin-top: 10px;
`;

const WriteSpan = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid white;
  background-color: #2b8c44;
  color: white;
  font-size: 1.2rem;
  cursor: pointer;
`;

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

const AdminFAQWrite = () => {
  const navi = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [isAlertOpen2, setIsAlertOpen2] = useState(false);

  const handleChange1 = (e) => {
    setTitle(e.target.value);
  };

  const handleChange2 = (e) => {
    setContent(e.target.value);
  };

  const enroll = () => {
    const fd = new FormData();
    fd.append("title", title);
    fd.append("content", content);
    fetch(`${BASE_URL}/api/admin/faqWrite`, {
      method: "POST",
      body: fd,
    })
      .then((resp) => resp.text())
      .then((data) => {
        if (data === "1") {
          setIsAlertOpen(true);
        } else {
          setIsAlertOpen2(true);
        }
      });
  };

  const handleAlertClose = () => {
    setIsAlertOpen(false);
    navi("/adminMenu/faq");
  };

  const handleAlertClose2 = () => {
    setIsAlertOpen2(false);
    navi("/adminMenu/faq");
  };

  return (
    <>
      <MainDiv>
        <div>
          <StatusSpan left="300px">신규 FAQ 추가</StatusSpan>
        </div>
      </MainDiv>
      <TitleArea placeholder="제목을 입력하세요" onChange={handleChange1} />
      <ContentArea placeholder="내용을 입력하세요." onChange={handleChange2} />
      <ParentDiv>
        <WriteSpan
          onClick={() => {
            enroll();
          }}
        >
          등록하기
        </WriteSpan>
      </ParentDiv>

      {isAlertOpen && (
        <Backdrop>
          <Alert
            title="FAQ 등록"
            titleColor="#049dd9"
            message="FAQ가 등록되었습니다."
            buttonText="확인"
            buttonColor="#049dd9"
            onClose={handleAlertClose}
          />
        </Backdrop>
      )}
      {isAlertOpen2 && (
        <Backdrop>
          <Alert
            title="FAQ 등록"
            titleColor="red"
            message="FAQ가 등록되지 않았습니다."
            buttonText="확인"
            buttonColor="#049dd9"
            onClose={handleAlertClose2}
          />
        </Backdrop>
      )}
    </>
  );
};

export default AdminFAQWrite;
