import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { BASE_URL } from "../../../components/service/config";
import { useLocation, useNavigate } from "react-router-dom";
import PagingDiv from "../../../components/paging/PagingDiv";
import PagingFooter from "../../../components/paging/PagingFooter";

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
    width: 555px;
    height: 30px;
    text-align: left;
    padding-left: 30px;
  }
  & > thead > tr:nth-child(1) > th:nth-child(3) {
    width: 250px;
    height: 30px;
  }
  & > tbody > tr:hover {
    color: #2b8c44;
  }
  & > tbody > tr > td {
    height: 40px;
    cursor: pointer;
  }
  & > tbody > tr > td:nth-child(2) {
    text-align: left;
    padding-left: 30px;
  }
`;

const CheckDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  & > input {
    visibility: hidden;
  }

  & > label {
    position: relative;
    width: 15px;
    height: 15px;
    cursor: pointer;
    margin-right: 10px;
    background: #fcfff4;
    border-radius: 4px;
    box-shadow: inset 0px 1px 1px white, 0px 1px 3px rgba(0, 0, 0, 0.5);

    &:after {
      content: "";
      width: 9px;
      height: 5px;
      position: absolute;
      top: 2px;
      left: 2px;
      border: 3px solid #333;
      border-top: none;
      border-right: none;
      background: transparent;
      opacity: 0;
      transform: rotate(-45deg);
    }

    &:hover:after {
      opacity: 0.5;
    }
  }

  & > input:checked + label:after {
    opacity: 1;
  }
`;

const ParentDiv = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 980px;
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

const AdminFAQ = () => {
  const [pageVo, setPageVo] = useState({});
  const [formData, setFormData] = useState([]);
  const location = useLocation();
  const navi = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  let pno = queryParams.get("pno");
  if (pno === null) {
    pno = 1;
  }
  useEffect(() => {
    fetch(`${BASE_URL}/api/admin/getFAQ?pno=${pno}`, {
      method: "POST",
    })
      .then((resp) => resp.json())
      .then((data) => {
        setFormData(data.voList);
        setPageVo(data.pageVo);
      });
  }, []);

  const changeCheck = (no, showYn) => {
    setFormData((prevData) =>
      prevData.map((item) =>
        item.no === no
          ? { ...item, showYn: item.showYn === "Y" ? "N" : "Y" }
          : item
      )
    );
    const fd = new FormData();
    fd.append("no", no);
    fd.append("showYn", showYn);
    fetch(`${BASE_URL}/api/admin/changeCheck`, {
      method: "POST",
      body: fd,
    });
  };

  const moveWrite = () => {
    navi("/adminMenu/faq/write");
    window.scrollTo(0, 0);
  };

  const moveDetail = (no) => {
    navi(`/adminMenu/faq/detail/${no}`);
  };

  return (
    <>
      <MainDiv>
        <div>
          <StatusSpan left="330px">FAQ 관리</StatusSpan>
        </div>

        <div>
          <StyledTable>
            <thead>
              <tr>
                <th>번호</th>
                <th>제목</th>
                <th>게시여부</th>
              </tr>
            </thead>
            <tbody>
              {formData.map((data, idx) => {
                return (
                  <tr key={idx}>
                    <td
                      onClick={() => {
                        moveDetail(data.no);
                      }}
                    >
                      {idx + 1}
                    </td>
                    <td
                      onClick={() => {
                        moveDetail(data.no);
                      }}
                    >
                      {data.title}
                    </td>
                    <td>
                      <CheckDiv>
                        <input
                          type="checkbox"
                          value={data.no}
                          id={data.no}
                          checked={data.showYn === "Y"}
                          onChange={() => changeCheck(data.no, data.showYn)}
                        />
                        <label for={data.no} />
                      </CheckDiv>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </StyledTable>
        </div>
      </MainDiv>
      <PagingDiv>
        <div></div>
        <PagingFooter pageVo={pageVo} url="/adminMenu/faq" />
        <div></div>
      </PagingDiv>
      <ParentDiv>
        <WriteSpan
          onClick={() => {
            moveWrite();
          }}
        >
          추가하기
        </WriteSpan>
      </ParentDiv>
    </>
  );
};

export default AdminFAQ;
