import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useDispatch } from "react-redux";
import { setSlogVoList } from "../../../redux/slogSlice";
import { getSlogReviewList } from "../../../components/service/stayService";
import { useNavigate } from "react-router-dom";

const OuterWrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 1300px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  max-width: 1200px;
  height: 400px;
  align-items: center;
  justify-content: center;
  background-color: #f8f8f8;
  overflow: hidden;
`;

const ContentWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  cursor: pointer;
`;

const ImgWrapper = styled.div`
  width: 400px;
  height: 100%;
  background-image: ${(props) => `url(${props.bgImage})`};
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
`;

const TextWrapper = styled.div`
  flex: 1;
  height: 100%;
  padding: 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border: 1px solid #d9d9d9;

  & h3 {
    font-size: 24px;
    margin-bottom: 10px;
  }

  & p {
    font-size: 16px;
    line-height: 1.5;
    margin-bottom: 10px;
  }
`;

const OuterArrowButton = styled.button`
  position: absolute;
  background: none;
  top: 50%;
  width: 50px;
  height: 50px;
  font-size: 24px;
  color: #049dd9;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 10;
  border: none;
  transform: translateY(-50%);

  &:disabled {
    border-color: #ccc;
    color: #ccc;
    cursor: default;
  }

  ${(props) => (props.left ? "left: -100px;" : "right: -100px;")}
`;

const SlogReview = ({ stay, slogReview }) => {
  const dispatch = useDispatch();
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSlog = async () => {
      if (!stay.no) return;

      const reviews = await getSlogReviewList(stay.no);

      if (Array.isArray(reviews)) {
        dispatch(setSlogVoList(reviews));
      } else if (reviews) {
        dispatch(setSlogVoList([reviews]));
      } else {
        dispatch(setSlogVoList([]));
      }
    };

    fetchSlog();
  }, [stay.no]);

  const filteredReviews = slogReview.voList.filter(
    (review) => String(review.stayNo) === String(stay.no)
  );

  if (!stay.no || filteredReviews.length === 0) {
    return <div>등록된 리뷰가 없습니다.</div>;
  }

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? filteredReviews.length - 1 : prev - 1
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prev) =>
      prev === filteredReviews.length - 1 ? 0 : prev + 1
    );
  };

  const currentReview = filteredReviews[currentIndex];

  const stripHtmlTags = (htmlString) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, "text/html");
    return doc.body.textContent || "";
  };

  const textOnlyContent = stripHtmlTags(currentReview.content);

  const handleClick = () => {
    navigate(`/slog/detail/${currentReview.no}`);
  };

  return (
    <OuterWrapper>
      <OuterArrowButton left onClick={prevSlide}>
        <IoIosArrowBack />
      </OuterArrowButton>

      <Wrapper>
        <ContentWrapper onClick={handleClick}>
          <ImgWrapper bgImage={currentReview.titleFileUrl} />
          <TextWrapper>
            <h3>{currentReview.title}</h3>
            <p>{currentReview.tagline}</p>
            <p>by. {currentReview.nick}</p>
          </TextWrapper>
        </ContentWrapper>
      </Wrapper>

      <OuterArrowButton right onClick={nextSlide}>
        <IoIosArrowForward />
      </OuterArrowButton>
    </OuterWrapper>
  );
};

export default SlogReview;
