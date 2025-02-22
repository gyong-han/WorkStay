import { BASE_URL } from "./config";

const getAttachment = async () => {
  try {
    const result = await fetch(`${BASE_URL}/stay/attachmentlist`);
    const data = await result.json();
    return data;
  } catch (e) {
    console.log("error", e);
  }
};

const getStayListAll = async (paramData) => {
  try {
    const result = await fetch(`${BASE_URL}/stay/list?${paramData}`);
    const data = await result.json();
    return data;
  } catch (e) {
    console.log("error", e);
  }
};
export { getAttachment, getStayListAll };
