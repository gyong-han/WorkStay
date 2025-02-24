import React, { Fragment, useEffect, useState } from "react";
import Display from "../../components/FilterBar/Display";
import ListCard from "../../components/listcomponents/ListCard";
import styled from "styled-components";
import { IoMdSearch } from "react-icons/io";
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import { CiFilter } from "react-icons/ci";
import { RiResetRightFill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { setReset } from "../../redux/spaceSlice";
import { getAttachmentAll, getSpaceListAll } from "../../components/service/spaceServcie";



const Layout = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-rows: 100px 100px 80px 100px 1fr;

  &>h1{
    text-align: center;
  }
`;

const InnerLayoutDiv = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns:40px 1fr 100px 1fr;
  justify-content: center;
  align-items: center;

&>div{
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

const FindSpaceList = () => {

  
  const dispatch = useDispatch();
  const currentUrl = window.location.href;
  const spaceVo = useSelector((state)=>state.space);
  
  // useEffect(()=>{
  //   // console.log("현재 URL 은 :::::",currentUrl);
    
  //   if(currentUrl == "http://localhost:3000/findspace"){
  //     dispatch(setReset());
  //   }
  // },[])

  
  const [formData, setFormData] = useState({});
  const [spaceVoList,setSpaceVoList] = useState([]);
  const [imgPath,setImgPath]= useState([]);
 

  const queryParams = new URLSearchParams({
    datedata: spaceVo.reservationDate,
    people: spaceVo.adult+spaceVo.child+spaceVo.baby,
    area: spaceVo.area,  
}).toString();


// async 사용하여 데이터값 추출해보기
  const AttachmentData = async ()=>{
    const attachmentData = await getAttachmentAll();
    // console.log("먼저 가져와야할 데이터::",attachmentData);
     const listData = await getSpaceListAll(queryParams);
    //  console.log("꺼내온 데이터 ::",listData );
     setSpaceVoList(listData);

     //
     const arr = listData.map((vo)=>{
      const matchingAttachments = attachmentData.filter((att) => att.spaceNo === vo.no);
      // console.log("matchingAttachments::",matchingAttachments);
      // console.log(vo.filePath);
      
      const imgPaths =  matchingAttachments.length > 0 ? matchingAttachments.map((att) => att.filePath) : null;  
      imgPaths.unshift(vo.filePath);
      const dataObject = {
        [vo.no] : imgPaths,
      }
      return dataObject;      
      })
      // 리턴값을 저장
      setImgPath(arr);
  }
  



  const handleChange = (e) => {
    setFormData((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("localhost:8080/findspace", {
      method: "GET",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((resp) => resp.text())
      .then((data) => {
      });
  };
  //spaceService.js 활용하여 async 사용해보기
  useEffect(()=>{
    AttachmentData();

  },[queryParams])




  // useEffect(()=>{
  //   // 스페이스 목록 데이터 가져오기
  //   getSpaceListAll(queryParams).then((data)=>{
  //     console.log("LISTDATA::::",data);
      
    
  //   })
  // },[dataLoad,queryParams]);



  
  
  return(<> 
<Layout>
  <h1>FIND SPACE</h1>
  <Display isTimeMode={true}></Display>
   <SearchWrapper>
          <form onSubmit={handleSubmit}>
            <SearchInput
              type="text"
              placeholder="원하는 숙소의 이름을 검색해보세요."
              onChange={handleChange}
            />
            <Btn type="submit">
              <IoMdSearch size={30} />
            </Btn>
          </form>
  </SearchWrapper>
  <FilterWrapper>
    <div>
    <Btn>
            <FilterText>최신순</FilterText>
            <IoCheckmarkCircleOutline size={18} />
          </Btn>
    </div>
    <div></div>
    <div>
    <Btn>
            <CiFilter size={18} />
            <FilterTextMD>필터</FilterTextMD>
          </Btn>
    </div>
    <div>
    <Btn>
            <RiResetRightFill size={18} />
            <FilterText onClick={()=>{
              dispatch(setReset());
            }}>초기화</FilterText>
          </Btn>
    </div>
        </FilterWrapper>
        
  <InnerLayoutDiv>
    {spaceVoList.map((vo,idx)=>{
      
      const voImgPaths = imgPath[idx][vo.no];
      // console.log("vo IMG :: ",voImgPaths);
      
      return(
      <Fragment key={vo.no}>
          <div></div>
         <div>
          <ListCard no={vo.no} morning={vo.daytimePrice} night={vo.nightPrice} 
           url ={"findspace"}
           imgPaths={voImgPaths}
          //  clickHandler={clickHandler}
           title={vo.name}
           min={vo.standardGuest}
           max={vo.maxGuest}
           address={vo.address}
           ></ListCard>
          </div>
         </Fragment>
         
      )
    })}
  </InnerLayoutDiv>
   </Layout>
  </>);
};

export default FindSpaceList;
