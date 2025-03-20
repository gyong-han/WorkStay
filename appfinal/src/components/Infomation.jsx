import React from 'react';
import styled from 'styled-components';


const InformationDiv = styled.div`
  width: 1500px;
  height: 650px;
  background-color: #202020;
  display: grid;
  grid-template-columns: 1fr 1300px;
  grid-template-rows: 80px 70px 150px 1fr 200px 30px;
  color: #FAFAFA;

 
  

  & > div > table {
  width: 90%;           /* 테이블 너비 */
  border-collapse: collapse; /* 테두리 겹치기 */
  border: 1px solid #FAFAFA; /* 테이블 전체 테두리 */
}

& > div > table th,
& > div > table td {
  border: 1px solid #FAFAFA; /* 개별 셀 테두리 */
  padding: 4px; /* 안쪽 여백 */
  text-align: center; /* 텍스트 가운데 정렬 */
}

&>div:nth-child(1){
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 30px;
  font-weight: 600;
  letter-spacing: 3px
}




&>div:nth-child(3),
&>div:nth-child(7),
&>div:nth-child(9){
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 17px;
}

&>div:nth-child(2),
&>div:nth-child(4){
  display: flex;
  align-items: center;
}


&>div:nth-child(4){
  font-size: 25px;
}
`;


const Infomation = (props) => {


  const morningPrice = props.morning.toLocaleString();
  const nightPrice = props.night.toLocaleString();

  return (
    <div>
      <InformationDiv>
          <div>안내사항</div>
          <div>공간 대여 시 이용에 대한 상세한 안내를 확인해 보세요.</div>
          <div>예약 안내</div>
          <div>예약 안내</div>
          <div></div>
          <div>
            요금기준<br></br>
            <table>
              <thead>
              <tr>
                <th>패키지</th>
                <th>시간</th>
                <th>요금</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <th>낮패키지</th>
                <td>09 : 00 ~ 18 : 00</td>
                <td>₩{morningPrice}</td>
              </tr>
              <tr>
                <th>밤패키지</th>
                <td>18 : 00 ~ 09 : 00</td>
                <td>₩{nightPrice}</td>
              </tr>
              </tbody>
            </table>
          </div>
          <div>이용안내</div>
          <div>
            <ul>
              <li>낮 패키지 -기준인원 {props.standard}인이며,최대인원 {props.max}인까지 이용가능합니다.</li>
              <li>기준인원 초과 시 1인 1만원의 추가 요금이 발생합니다.</li>
              <li>다른 사람과 함께 쓰는 건물이니 사용 중 현관물을 닫고 사용해주시고 복도 소란 행위를 피해주세요.</li>
              <li>만 19세 미만의 미성년자는 보호자 동의서(문자 전송)가 필요합니다.또 혼성 이용 및 22시 이후 이용이 불가합니다.</li>
            </ul>
          </div>
          <div>환불규정</div>
          <div>
            <table>
              <thead>
                <tr>
                  <th>기준일</th>
                  <th>환불금액</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>이용 10일 전까지</td>
                  <td>총 결제금액의 100%환불</td>
                </tr>
                <tr>
                  <td>이용 8~9일 전까지</td>
                  <td>총 결제금액의 90%환불</td>
                </tr>
                <tr>
                  <td>이용 5~7일 전까지</td>
                  <td>총 결제금액의 70%환불</td>
                </tr>
                <tr>
                  <td>이용 4일 전까지</td>
                  <td>총 결제금액의 50%환불</td>
                </tr>
                <tr>
                  <td>이용 3일 전까지</td>
                  <td>변경 / 환불 불가</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div></div>
          <div>문의하기&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 예약 및 이용 문의 050-1234-5678</div>
      </InformationDiv>
      
    </div>
  );
};

export default Infomation;