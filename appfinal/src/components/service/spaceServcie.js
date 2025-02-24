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
  console.log("넘어온 데이터",paramData);
  try{
    const result =await fetch(`${BASE_URL}/space/list?${paramData}`);
    const data = await result.json();
    return data;
  }catch(e){
    console.log("error",e);
  }
}
export {getAttachmentAll,getSpaceListAll};