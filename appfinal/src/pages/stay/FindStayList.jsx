import React, { Fragment, useEffect, useState } from "react";
import Display from "../../components/FilterBar/Display";
import ListCard from "../../components/listcomponents/ListCard";
import styled from "styled-components";
import { IoMdSearch } from "react-icons/io";
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import { CiFilter } from "react-icons/ci";
import { RiResetRightFill } from "react-icons/ri";




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

const FindStayList = () => {

  const [formData, setFormData] = useState({});
  const [spaceVoList,setSpaceVoList] = useState([]);
  const [attachmentVoList,setAttachmentVoList]= useState([]);
  const [dataLoad,setDataLoad] = useState(1);
  const [imgPath,setImgPath]= useState([]);

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
        // console.log("data : ", data);
      });
  };
  
  useEffect(()=>{
    //숙소 목록에있는 파일들의 첨부파일 전부다 가져오기      <<<<<<<<<<<<        1번째 패치부분 
    fetch("http://127.0.0.1:8080/space/attachmentlist",{ // <<<<<<<<<<<<<<여기 주소 바꾸시고 attchment 백으로 가져오시면 됩니다!
      method:'GET'
    })
    .then((resp)=>resp.json())
    .then((data)=>{
      setAttachmentVoList(data);
      setDataLoad((prev)=>prev+1);
    })
    .then(()=>{})
  },[]);

  useEffect(()=>{
    // 스페이스 목록 데이터 가져오기        <<<<<<<<<<<<<<<<<<<        2번째 패치 부분 
    fetch("http://127.0.0.1:8080/space/list",{ //이부분 인데 목록조회 용 리스트 데이터 + 첨부파일 조인해서 첨부파일에 썸네일 Y로 되어있는것 까지 같이져와야합니다
                                              // 첨부파일용 썸네일은 StayVo << filepath 에 저장하시고 날리시면 됩니다
      method:'GET'
    })
    .then((resp)=>resp.json())
    .then((data)=>{
      if(attachmentVoList.length>0){
      // console.log("##### voListData : " , data);
      setSpaceVoList(data);
      // map돌려서 필터링해서 맞춰주고 썸네일파일을 제일 앞으로보낸 배열 생성
        const arr = data.map((vo)=>{
          const matchingAttachments = attachmentVoList.filter((att) => att.spaceNo === vo.no);
          const imgPaths =  matchingAttachments.length > 0 ? matchingAttachments.map((att) => att.filePath) : null;  
          imgPaths.unshift(vo.filePath);                                                                               //필터링 부분 입니다
          const dataObject = {
            [vo.no] : imgPaths,
          }
          return dataObject;      
          })
          // 리턴값을 저장
          setImgPath(arr);
          
      }
    })
  },[dataLoad]);



  
  
  return(<> 
<Layout>
  <h1>FIND STAY</h1>
  <Display isTimeMode={false}></Display>
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
            <FilterText>초기화</FilterText>
          </Btn>
    </div>
        </FilterWrapper>
        
  <InnerLayoutDiv>
    {spaceVoList.map((vo,idx)=>{
      
      const voImgPaths = imgPath[idx][vo.no];           //<<<<<<<<<<<<<<객체로 담긴 배열을 풀어내는 과정입니다.
      
      return(
      <Fragment key={vo.no}>
          <div></div>
         <div>
          <ListCard no={vo.no} morning={vo.daytimePrice} night={vo.nightPrice}
          url ={"findstay"}
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

export default FindStayList;
