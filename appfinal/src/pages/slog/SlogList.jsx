import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import {
  addSlogVoList,
  plusPno,
  resetPno,
  setLoading,
} from "../../redux/slogSlice";
import SlogCard from "./SlogCard";
import { BASE_URL } from "../../components/service/config";

const Layout = styled.div`
  display: flex;
  width: 100%;
`;

const Main = styled.main`
  display: grid;
  grid-template-columns: 1fr 5fr 1fr;
  width: 100%;
  min-height: 100vh;
`;

const LeftBlank = styled.div`
  background-color: #fafafa;
`;

const RightBlank = styled.div`
  background-color: #fafafa;
`;

const CardContainer = styled.div`
  grid-column: 2 / 3;
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  width: 100%;
`;

const CardWrapper = styled.div`
  flex: 1 0 200px;
  width: 100%;
  cursor: pointer;
`;

const SlogList = () => {
  const bottomTarget = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { voList, pno, isLoading } = useSelector((state) => state.slog);

  useEffect(() => {
    dispatch(resetPno());
  }, [dispatch]);

  const showSlogDetail = (no) => {
    navigate(`/slog/detail/${no}`);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          dispatch(plusPno());
        }
      },
      { threshold: 0.1 }
    );

    if (bottomTarget.current) {
      observer.observe(bottomTarget.current);
    }

    return () => observer.disconnect();
  }, [dispatch]);

  useEffect(() => {
    if (pno * 6 <= voList.length) {
      return;
    }
    if (pno > 0 && pno * 6 > voList.length) {
      dispatch(setLoading(true));

      fetch(`${BASE_URL}/api/slog/list?pno=${pno}`)
        .then((resp) => resp.json())
        .then((data) => {
          dispatch(addSlogVoList(data));
          dispatch(setLoading(false));
        });
    }
  }, [pno, dispatch]);

  return (
    <Layout>
      <Main>
        <LeftBlank />
        <CardContainer>
          {voList.map((vo) => (
            <CardWrapper
              key={vo.no}
              onClick={() => {
                showSlogDetail(vo.no);
              }}
            >
              <SlogCard vo={vo} />
            </CardWrapper>
          ))}
          {isLoading ? (
            <h1>로딩 중...</h1>
          ) : (
            <h1 ref={bottomTarget}>더 보기</h1>
          )}
        </CardContainer>
        <RightBlank />
      </Main>
    </Layout>
  );
};

export default SlogList;
