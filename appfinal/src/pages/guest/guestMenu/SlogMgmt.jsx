import { jwtDecode } from "jwt-decode";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { BASE_URL } from "../../../components/service/config";

const MainDiv = styled.div`
  display: flex;
  place-content: center;
  width: 800px;
`;

const MainSpanDiv = styled.div`
  font-weight: 700;
  font-size: 25px;
  color: #202020;
`;

const MainWrapper = styled.div`
  width: 1000px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin-top: 20px;
  margin-bottom: 50px;
`;

const SlogDiv = styled.div`
  display: grid;
  grid-template-rows: 2fr 1fr 1fr 1fr;
  width: 300px;
  height: 400px;
  margin-top: 5px;
  margin-bottom: 30px;
`;

const ImgTag = styled.img`
  width: 300px;
  height: 300px;
`;

const TitleDiv = styled.div`
  font-size: 1rem;
  font-weight: 500;
  color: #202020;
`;

const NameDiv = styled.div`
  font-size: 20px;
  font-weight: 500;
  color: #202020;
`;

const AddressDiv = styled.div`
  font-size: 15px;
  font-weight: 400;
  color: #202020;
`;

const TagDiv = styled.div`
  font-size: 10px;
  font-weight: 400;
  color: #202020;
`;

const SlogMgmt = () => {
  const navi = useNavigate();
  const [slogListVo, setSlogListVo] = useState({});
  const [dataArr, setDataArr] = useState([]);

  const token = localStorage.getItem("token");

  //토큰 정보 없으면 로그인 페이지로 보내기
  useEffect(() => {
    if (!token) {
      navi("/login");
    }
  });

  useEffect(() => {
    if (token) {
      const decodedToken = jwtDecode(token);
      setSlogListVo((prev) => ({
        ...prev,
        no: decodedToken.no,
      }));

      fetch(`${BASE_URL}/api/guest/slogList?memberNo=${decodedToken.no}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((resp) => resp.json())
        .then((data) => {
          setSlogListVo(data);
          setDataArr(data);
        })
        .catch((err) => console.error("회원 정보 불러오기 실패:", err));
    }
  }, [token]);

  const handleClick = (slogNo) => {
    navi(`/slog/detail/${slogNo}`);
  };

  return (
    <>
      <MainDiv>
        <MainSpanDiv>S-Log 관리</MainSpanDiv>
      </MainDiv>
      <MainWrapper>
        {dataArr.length > 0 ? (
          dataArr.map((slogListVo) => (
            <>
              <SlogDiv
                onClick={() => handleClick(slogListVo.no)}
                style={{ cursor: "pointer" }}
              >
                <ImgTag src={slogListVo.titleFileUrl} />
                <TitleDiv>{slogListVo.title}</TitleDiv>
                <NameDiv>{slogListVo.name}</NameDiv>
                <AddressDiv>{slogListVo.address}</AddressDiv>
                <TagDiv>{slogListVo.tagline}</TagDiv>
              </SlogDiv>
            </>
          ))
        ) : (
          <p>리뷰 작성 내역이 없습니다.</p>
        )}
      </MainWrapper>
    </>
  );
};

export default SlogMgmt;
