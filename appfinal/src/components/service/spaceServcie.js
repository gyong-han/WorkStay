import {BASE_URL} from './config';

const getAttachmentAll = async ()=>{
  try{
    const result = await fetch((`${BASE_URL}/space/attachmentlist`));
    const data = await result.json();
    return data;
  }catch(e){
    console.log("error",e);
  }
}

const getSpaceListAll = async (paramData)=>{
  // console.log("넘어온 데이터",paramData);
  try{
    const result =await fetch(`${BASE_URL}/space/list?${paramData}`);
    const data = await result.json();
    return data;
  }catch(e){
    console.log("error",e);
  }
}


const inputReservation = async (fdData)=>{
  try{
    const result = await fetch((`${BASE_URL}/space/reservation`),{
      method : "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(fdData),}
     );
    const data = await result.text();
    return data;
  }catch(e){
    console.log("error",e);
  }
}

const getInfomation = async(fd)=>{
  // console.log("fd",fd);
  try{
    const result = await fetch((`${BASE_URL}/space/getTimeNow`),{
      method:"POST",
      body:fd,
    });
    const data = await result.json();
    return data;
  }catch(e){  
    console.log("error",e);
  }
}

const getBookmarkInfo =async (dataObj)=>{
  try{
    const result = await fetch((`${BASE_URL}/space/getbookmarkInfo`),{
      method :"POST",
      headers : {
        "content-type" : "application/json",
      },
      body : JSON.stringify(dataObj),
      
    })
    const data = await result.text();
    return data;
  }catch(e){
    console.log("error",e);
    
  }
}
const getMemberInfo = async (no)=>{
  // console.log("넘어온 숫자:::",no);
  
  try{
    const result = await fetch(`${BASE_URL}/space/memberInfo`,{
      method :"POST",
      body:no,
    });
    const data = await result.json();
    return data ;
  }catch(e){console.log("error ::",e);
  }
}



export {getAttachmentAll,getSpaceListAll,inputReservation,getInfomation,getBookmarkInfo,getMemberInfo};