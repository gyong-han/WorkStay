import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BASE_URL } from "../../../components/service/config";
import styled from "styled-components";
import { Title } from "@mui/icons-material";
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
  margin-left: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid ${(props) => props.border};
  background-color: ${(props) => props.backColor};
  color: ${(props) => props.color};
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

const AdminFAQDetail = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isAlertOpen1, setIsAlertOpen1] = useState(false);
  const [isAlertOpen2, setIsAlertOpen2] = useState(false);
  const [isAlertOpen3, setIsAlertOpen3] = useState(false);
  const [isAlertOpen4, setIsAlertOpen4] = useState(false);
  const navi = useNavigate();

  const { no } = useParams();
  useEffect(() => {
    fetch(`${BASE_URL}/api/admin/getFAQDetail`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(no),
    })
      .then((resp) => resp.json())
      .then((data) => {
        setTitle(data.title);
        setContent(data.content);
      });
  }, []);

  const handleChange1 = (e) => {
    setTitle(e.target.value);
  };

  const handleChange2 = (e) => {
    setContent(e.target.value);
  };

  const deleteFAQ = () => {
    fetch(`${BASE_URL}/api/admin/deleteFAQ`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(no),
    })
      .then((resp) => resp.text())
      .then((data) => {
        if (data > 0) {
          setIsAlertOpen1(true);
        } else {
          setIsAlertOpen2(true);
        }
      });
  };

  const editFAQ = () => {
    const fd = new FormData();
    fd.append("title", title);
    fd.append("content", content);
    fd.append("no", no);
    fetch(`${BASE_URL}/api/admin/editFAQ`, {
      method: "POST",
      body: fd,
    })
      .then((resp) => resp.text())
      .then((data) => {
        if (data > 0) {
          setIsAlertOpen3(true);
        } else {
          setIsAlertOpen4(true);
        }
      });
  };

  const handleAlertClose1 = () => {
    setIsAlertOpen1(false);
    navi("/adminMenu/faq");
  };

  const handleAlertClose2 = () => {
    setIsAlertOpen2(false);
    navi("/adminMenu/faq");
  };

  const handleAlertClose3 = () => {
    setIsAlertOpen3(false);
    navi("/adminMenu/faq");
  };

  const handleAlertClose4 = () => {
    setIsAlertOpen4(false);
    navi("/adminMenu/faq");
  };

  return (
    <>
      <MainDiv>
        <div>
          <StatusSpan left="330px">FAQ 상세</StatusSpan>
        </div>
      </MainDiv>
      <TitleArea value={title} onChange={handleChange1} />
      <ContentArea value={content} onChange={handleChange2} />
      <ParentDiv>
        <WriteSpan
          backColor="#2b8c44"
          color="white"
          border="white"
          onClick={() => {
            deleteFAQ();
          }}
        >
          삭제하기
        </WriteSpan>
        <WriteSpan
          backColor="white"
          color="black"
          border="#2b8c44"
          onClick={() => {
            editFAQ();
          }}
        >
          수정하기
        </WriteSpan>
      </ParentDiv>
      {isAlertOpen1 && (
        <Backdrop>
          <Alert
            title="FAQ 삭제"
            titleColor="#049dd9"
            message="FAQ가 삭제되었습니다."
            buttonText="확인"
            buttonColor="#049dd9"
            onClose={handleAlertClose1}
          />
        </Backdrop>
      )}
      {isAlertOpen2 && (
        <Backdrop>
          <Alert
            title="FAQ 삭제"
            titleColor="red"
            message="FAQ가 삭제되지 않았습니다."
            buttonText="확인"
            buttonColor="#049dd9"
            onClose={handleAlertClose2}
          />
        </Backdrop>
      )}
      {isAlertOpen3 && (
        <Backdrop>
          <Alert
            title="FAQ 수정"
            titleColor="#049dd9"
            message="FAQ가 수정되었습니다."
            buttonText="확인"
            buttonColor="#049dd9"
            onClose={handleAlertClose3}
          />
        </Backdrop>
      )}
      {isAlertOpen4 && (
        <Backdrop>
          <Alert
            title="FAQ 등록"
            titleColor="red"
            message="FAQ가 수정되지 않았습니다."
            buttonText="확인"
            buttonColor="#049dd9"
            onClose={handleAlertClose4}
          />
        </Backdrop>
      )}
    </>
  );
};

export default AdminFAQDetail;
