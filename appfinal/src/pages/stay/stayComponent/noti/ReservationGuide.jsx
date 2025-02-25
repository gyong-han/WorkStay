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
    margin: 50px 50px 0px 0px;
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

const ReservationGuide = ({ rooms, stay }) => {
  return (
    <Layout>
      <TextWrapper>
        <Title>예약 안내</Title>
        <InfoWrapper>
          <div>요금기준</div>
          <TableTag>
            <thead>
              <tr>
                <th>객실</th>
                <th>인원(기준/최대)</th>
                <th>요금</th>
              </tr>
            </thead>
            <tbody>
              {rooms.map((room) => (
                <tr>
                  <td>{room.name}</td>
                  <td>
                    {room.standardGuest} / {room.maxGuest}
                  </td>
                  <td>₩{room.price}</td>
                </tr>
              ))}
            </tbody>
          </TableTag>
          <UlWrapper>
            <ul>
              <li>
                기준인원 {rooms[0].standardGuest}명이며, 최대인원
                {rooms[0].maxGuest}명(영유아 미포함)까지 이용 가능한 숙소입니다.
              </li>
              <li>
                기준인원 초과 시 1인 1박 당 3만원의 추가 요금이 발생합니다.
              </li>
              <li>
                추가 인원이 포함된 예약에는 1인 1세트 추가 침구(요, 이불)가
                제공됩니다.
              </li>
            </ul>
          </UlWrapper>
          <ExplainWrapper>
            <div>반려동물</div>
            <div>반려 동물 동반이 가능한 숙소입니다.</div>
          </ExplainWrapper>
          <ExplainWrapper>
            <div>문의하기</div>
            <div>예약 및 이용 문의 {stay.phone}</div>
          </ExplainWrapper>
        </InfoWrapper>
      </TextWrapper>
    </Layout>
  );
};

export default ReservationGuide;
