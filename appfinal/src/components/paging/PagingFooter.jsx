import React from "react";
import styled from "styled-components";
import PagingButton from "./PagingButton";
import { Link } from "react-router-dom";

const Layout = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const PagingFooter = ({ pageVo: pvo, url }) => {
  const pageNoArr = [];
  let isPrevPageExist = false;
  let isNextPageExist = false;
  if (pvo.startPage !== 1) {
    isPrevPageExist = true;
  }
  for (let i = pvo.startPage; i <= pvo.endPage; ++i) {
    pageNoArr.push(i);
  }
  if (pvo.endPage !== pvo.maxPage) {
    isNextPageExist = true;
  }

  return (
    <Layout>
      {isPrevPageExist ? (
        <Link to={`${url}?pno=${pvo.startPage - 1}`}>
          <PagingButton width={"50px"} height={"50px"}>
            ❮
          </PagingButton>
        </Link>
      ) : (
        ""
      )}
      {pageNoArr.map((no) => {
        return (
          <Link to={`${url}?pno=${no}`}>
            <PagingButton width={"50px"} height={"50px"}>
              {no}
            </PagingButton>
          </Link>
        );
      })}
      {isNextPageExist ? (
        <Link to={`${url}?pno=${pvo.endPage + 1}`}>
          <PagingButton width={"50px"} height={"50px"}>
            ❯
          </PagingButton>
        </Link>
      ) : (
        ""
      )}
    </Layout>
  );
};

export default PagingFooter;
