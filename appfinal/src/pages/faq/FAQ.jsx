import React, { useEffect, useState } from "react";
import styled from "styled-components";
import FAQComponent from "./FAQComponent";
import { BASE_URL } from "../../components/service/config";

const Layout = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr 1fr;
  text-align: center;
  height: 100%;
`;

const MainDiv = styled.div`
  background-color: #fafafa;
  display: grid;
  grid-template-rows: 100px 1fr;
`;

const HeaderDiv = styled.div`
  display: grid;
  align-content: center;
  font-size: 30px;
  font-weight: 600;
`;

const FAQ = () => {
  const [faq, setFaq] = useState([]);

  useEffect(() => {
    fetch(`${BASE_URL}/home/faq`, {})
      .then((resp) => resp.json())
      .then((data) => {
        setFaq(data);
      });
  }, []);

  return (
    <>
      <Layout>
        <div></div>
        <MainDiv>
          <HeaderDiv>자주 묻는 질문(FAQ)</HeaderDiv>
          <div>
            {faq.map((faq, idx) => {
              return <FAQComponent faq={faq} key={idx} no={idx} />;
            })}
          </div>
        </MainDiv>
        <div></div>
      </Layout>
    </>
  );
};

export default FAQ;
