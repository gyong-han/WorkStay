import React, { Fragment, useEffect, useState } from "react";
import Display from "../../components/FilterBar/Display";
import styled from "styled-components";
import { IoMdSearch } from "react-icons/io";
import { CiFilter } from "react-icons/ci";
import { RiResetRightFill } from "react-icons/ri";
import StayListCard from "./stayComponent/StayListCard";
import SortDropdown from "../../components/listcomponents/SortDropdown";
import {
  getAttachment,
  getStayListAll,
} from "../../components/service/stayService";
import { setSort, setStayData } from "../../redux/staySlice";
import { useDispatch, useSelector } from "react-redux";

const Layout = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-rows: 100px 100px 80px 100px 1fr;

  & > h1 {
    text-align: center;
  }
`;

const InnerLayoutDiv = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 40px 1fr 100px 1fr;
  justify-content: center;
  align-items: center;

  & > div {
    margin: 50px;
    margin-bottom: 80px;
  }
`;
const SearchWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 40px;
`;
const FilterWrapper = styled.div`
  display: grid;
  grid-template-columns: 100px 1fr 100px 100px;
  grid-template-rows: 1fr;
  border-bottom: 2px solid #202020;
  margin-top: 70px;
`;

const SearchInput = styled.input`
  border: none;
  background-color: #fafafa;
  border-bottom: 1px solid #202020;
  width: 1000px;
  outline: none;
  font-size: 1.1rem;
  text-align: center;
`;

const Btn = styled.button`
  border: none;
  color: #202020;
  outline: none;
  background-color: inherit;
  cursor: pointer;
`;

const FilterText = styled.span`
  font-size: 1.1rem;
`;

const FilterTextMD = styled.span`
  font-size: 1.1rem;
  text-align: end;
`;

const FilterDiv = styled.div`
  margin-bottom: 20px;
  width: 500px;
`;

const FindStayList = () => {
  const [formData, setFormData] = useState({});
  const [stayVoList, setStayVoList] = useState([]);
  const [imgPath, setImgPath] = useState([]);
  const stayVo = useSelector((state) => state.stay);
  const roomVo = useSelector((state) => state.room);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const queryParams = new URLSearchParams({
    datedata: stayVo.reservationDate || "", // undefined 방지
    people: (roomVo.adult || 0) + (roomVo.child || 0) + (roomVo.baby || 0), // undefined 방지
    area: stayVo.address || "", // undefined 방지
    sort: stayVo.sort || "latest", // 기본값 설정
  }).toString();

  const AttachmentData = async () => {
    const attachmentData = await getAttachment();
    // console.log("먼저 가져와야할 데이터::",attachmentData);
    const listData = await getStayListAll(queryParams);
    // console.log(
    //   "보내는 요청 URL: ",
    //   `http://localhost:8080/stay/list?${queryParams}`
    // );
    // console.log("queryParams :: ", queryParams);
    // console.log("sort 값 확인: ", stayVo.sort);
    // console.log("꺼내온 데이터 ::", listData);
    setStayVoList(listData);
    dispatch(setStayData(listData));

    //
    const arr = listData.map((vo) => {
      const matchingAttachments = attachmentData.filter(
        (att) => att.stayNo === vo.no
      );
      // console.log("matchingAttachments::", matchingAttachments);
      // console.log(vo.filePath);

      const imgPaths =
        matchingAttachments.length > 0
          ? matchingAttachments.map((att) => att.filePath)
          : null;
      imgPaths.unshift(vo.filePath);
      const dataObject = {
        [vo.no]: imgPaths,
      };
      return dataObject;
    });
    // 리턴값을 저장
    setImgPath(arr);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // fetch("localhost:8080/findstay", {
    //   method: "GET",
    //   headers: { "content-type": "application/json" },
    //   body: JSON.stringify(formData),
    // })
    //   .then((resp) => resp.text())
    //   .then((data) => {
    //     // console.log("data : ", data);
    //   });
  };

  useEffect(() => {
    AttachmentData();
    // //숙소 목록에있는 파일들의 첨부파일 전부다 가져오기      <<<<<<<<<<<<        1번째 패치부분
    // fetch("http://localhost:8080/stay/attachmentlist", {
    //   // <<<<<<<<<<<<<<여기 주소 바꾸시고 attchment 백으로 가져오시면 됩니다!
    //   method: "GET",
    // })
    //   .then((resp) => resp.json())
    //   .then((data) => {
    //     setAttachmentVoList(data);
    //     setDataLoad((prev) => prev + 1);
    //   })
    //   .then(() => {});
  }, [stayVo.sort]);

  // useEffect(() => {
  //   // 스에디 목록 데이터 가져오기   <<<<<<<<<<<<<<<<<<<  2번째 패치 부분
  //   fetch("http://localhost:8080/stay/list", {
  //     //이부분 인데 목록조회 용 리스트 데이터 + 첨부파일 조인해서 첨부파일에 썸네일 Y로 되어있는것 까지 같이져와야합니다
  //     // 첨부파일용 썸네일은 StayVo << filepath 에 저장하시고 날리시면 됩니다
  //     method: "GET",
  //   })
  //     .then((resp) => resp.json())
  //     .then((data) => {
  //       if (attachmentVoList.length > 0) {
  //         setStayVoList(data);

  //         // map돌려서 필터링해서 맞춰주고 썸네일파일을 제일 앞으로보낸 배열 생성
  //         const arr = data.map((vo) => {
  //           const matchingAttachments = attachmentVoList.filter(
  //             (att) => att.stayNo === vo.no
  //           );
  //           console.log("oalsdfasodkfs", matchingAttachments);

  //           const imgPaths =
  //             matchingAttachments.length > 0
  //               ? matchingAttachments.map((att) => att.filePath)
  //               : null;

  //           imgPaths.unshift(vo.filePath); //필터링 부분 입니다
  //           const dataObject = {
  //             [vo.no]: imgPaths,
  //           };
  //           return dataObject;
  //         });

  //         // 리턴값을 저장
  //         console.log("imgPath 에 저장하는 arr : ", arr);

  //         setImgPath(arr);
  //         console.log(stayVoList);
  //       }
  //     });
  // }, [dataLoad]);

  // useEffect(() => {
  //   const changeOptionData = async () => {
  //     try {
  //       const response = await axios.get(
  //         `http://localhost:8080/stay/list?sort=${sortOption}`
  //       );
  //       setStayVoList(response.data);
  //     } catch (error) {
  //       console.error("숙소 데이터 불러오기 실패", error);
  //     }
  //   };
  //   changeOptionData();
  // }, [sortOption]);

  return (
    <>
      <Layout>
        <h1>FIND STAY</h1>
        <Display isTimeMode={false}></Display>
        <SearchWrapper>
          <form onSubmit={handleSubmit}>
            <SearchInput
              type="search"
              placeholder="원하는 숙소의 이름을 검색해보세요."
              onChange={handleChange}
            />
            <Btn type="submit">
              <IoMdSearch size={30} />
            </Btn>
          </form>
        </SearchWrapper>
        <FilterWrapper>
          <FilterDiv>
            <SortDropdown />
          </FilterDiv>
          <div></div>
          <div>
            <CiFilter size={18} />
            <FilterTextMD>필터</FilterTextMD>
          </div>
          <div>
            <Btn>
              <RiResetRightFill size={18} />
              <FilterText>초기화</FilterText>
            </Btn>
          </div>
        </FilterWrapper>

        <InnerLayoutDiv>
          {imgPath.length === 0 ? (
            <h1>imgPath 비어있음</h1>
          ) : (
            stayVoList.map((vo, idx) => {
              const voImgPaths = imgPath[idx][vo.no]; //<<<<<<<<<<<<<<객체로 담긴 배열을 풀어내는 과정입니다.

              return (
                <Fragment key={vo.no}>
                  <div></div>
                  <div>
                    <StayListCard
                      no={vo.no}
                      price={vo.price}
                      url={"findstay"}
                      imgPaths={voImgPaths}
                      //  clickHandler={clickHandler}
                      title={vo.name}
                      min={vo.standardGuest}
                      max={vo.maxGuest}
                      address={vo.address}
                    ></StayListCard>
                  </div>
                </Fragment>
              );
            })
          )}
        </InnerLayoutDiv>
      </Layout>
    </>
  );
};

export default FindStayList;
