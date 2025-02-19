import React from "react";
import styled from "styled-components";

const StyledTable = styled.table`
  margin-top: 10px;
  border: none;
  border-collapse: collapse;
  text-align: center;
  font-size: 20px;

  & > thead > tr:nth-child(1) > th {
    border-bottom: 3px solid black;
  }

  & > thead > tr:nth-child(1) > th:nth-child(1) {
    width: 150px;
    height: 35px;
  }
  & > thead > tr:nth-child(1) > th:nth-child(2) {
    width: 400px;
    height: 30px;
  }
  & > thead > tr:nth-child(1) > th:nth-child(3) {
    width: 250px;
    height: 30px;
  }
  & > thead > tr:nth-child(1) > th:nth-child(4) {
    width: 180px;
    height: 30px;
  }
  & > tbody > tr:hover {
    color: #2b8c44;
  }
  & > tbody > tr > td {
    height: 40px;
    cursor: pointer;
  }
`;

const Table = ({ th1, th2, th3, th4, dataArr }) => {
  return (
    <>
      <StyledTable>
        <thead>
          <tr>
            <th>{th1}</th>
            <th>{th2}</th>
            <th>{th3}</th>
            <th>{th4}</th>
          </tr>
        </thead>
        <tbody>
          {dataArr.map((data, idx) => {
            return (
              <tr
                key={idx}
                onClick={() => {
                  console.log(data.no);
                }}
              >
                <td>{data.hostName}</td>
                <td>{data.email}</td>
                <td>{data.phone}</td>
                <td>{data.name}</td>
              </tr>
            );
          })}
        </tbody>
      </StyledTable>
    </>
  );
};

export default Table;
