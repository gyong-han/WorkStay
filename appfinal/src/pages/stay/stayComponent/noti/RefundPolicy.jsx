import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";

const Layout = styled.div`
  display: grid;
  grid-template-rows: auto;
  color: #fafafa;
  padding: 30px;
  min-height: 300px;
`;

const TextWrapper = styled.div`
  display: grid;
  grid-template-rows: 50px 1fr;
`;

const InfoWrapper = styled.div`
  display: grid;
  margin-left: 25px;

  & > div:nth-child(1) {
    margin-bottom: 20px;
  }
`;

const UlWrapper = styled.div`
  display: grid;
  grid-template-rows: auto;

  & > ul,
  li {
    margin-top: 10px;
  }
`;

const ExplainWrapper = styled.div`
  display: flex;

  & > div {
    margin: 50px 50px 50px 0px;
  }
`;

const Title = styled.div`
  font-size: 1.5rem;
  font-weight: 500;
`;

const TableTag = styled.table`
  width: 1000px;
  border-collapse: collapse;
  border: 1px solid #fafafa;
  text-align: center;

  & > thead th,
  & > tbody td {
    border: 1px solid #fafafa; /* 개별 셀 테두리 */
    padding: 5px; /* 안쪽 여백 */
  }
`;

const RefundPolicy = (rooms) => {
  return (
    <Layout>
      <TextWrapper>
        <Title>환불 규정</Title>
        <InfoWrapper>
          <div>환불 규정</div>
          <TableTag>
            <thead>
              <tr>
                <th>기준일</th>
                <th>환불금액</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>체크인 10일 전까지</td>
                <td>총 결제금액의 100%환불</td>
              </tr>
              <tr>
                <td>체크인 8-9일 전까지</td>
                <td>총 결제금액의 90%환불</td>
              </tr>
              <tr>
                <td>체크인 5-7일 전까지</td>
                <td>총 결제금액의 70%환불</td>
              </tr>
              <tr>
                <td>체크인 4일 전까지</td>
                <td>총 결제금액의 50%환불</td>
              </tr>
              <tr>
                <td>체크인 3일 전까지</td>
                <td>변경 / 환불 불가</td>
              </tr>
            </tbody>
          </TableTag>
          <UlWrapper>
            <ul>
              <li>
                결제 당일 취소하는 경우에도 예약 확정 후에는 동일한 환불 규정이
                적용됩니다.
              </li>
              <li>
                천재 지변으로 이용일 당일의 교통편이 취소된 경우, 결항 확인서를
                보내주시면 전체 환불해드립니다.
              </li>
            </ul>
          </UlWrapper>
          <ExplainWrapper>
            <div>숙박권 양도</div>
            <div>숙박권의 재판매를 비롯하여 양도, 양수, 교환을 금지합니다.</div>
          </ExplainWrapper>
        </InfoWrapper>
      </TextWrapper>
    </Layout>
  );
};

export default RefundPolicy;
