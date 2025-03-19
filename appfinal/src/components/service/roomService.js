import { BASE_URL } from "./config";

const getRoomAttachmentList = async () => {
  try {
    const result = await fetch(`${BASE_URL}/room/attachmentlist`);
    const data = await result.json();
    return data;
  } catch (e) {
    console.log("error", e);
  }
};

const getRoomListAll = async (x) => {
  const stayNo = Number(x); // ✅ 숫자로 변환 (필요한 경우)

  try {
    const result = await fetch(`${BASE_URL}/room/list?no=${stayNo}`, {
      // ✅ GET 요청에서 쿼리 파라미터 사용
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!result.ok) {
      throw new Error(`HTTP error! Status: ${result.status}`);
    }

    const data = await result.json();
    return data;
  } catch (e) {
    console.log("getRoomListAll Error", e);
  }
};

const getRoomDetail = async (x) => {
  try {
    const result = await fetch(`${BASE_URL}/room/detail`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(x),
    });
    if (!result.ok) {
      throw new Error(`HTTP error! Status: ${result.status}`);
    }
    const data = await result.json();
    return data;
  } catch (e) {
    console.log("getRoomDetail Error", e);
  }
};

const roomReservation = async (rData) => {
  try {
    const result = await fetch(`${BASE_URL}/reservation`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(rData),
    });
    if (!result.ok) {
      throw new Error(`HTTP error! Status: ${result.status}`);
    }
    const data = await result.json();
    return data;
  } catch (e) {
    console.log("Room Reservation Error", e);
  }
};

const getReservationInfo = async (rd) => {
  try {
    const result = await fetch(`${BASE_URL}/reservation/getReservationInfo`, {
      method: "POST",
      body: rd,
    });
    if (!result.ok) {
      throw new Error(`HTTP error! Status: ${result.status}`);
    }
    const data = await result.json();
    return data;
  } catch (e) {
    console.log("Room Reservation Info ERROR", e);
  }
};

const getMemberNo = async (no) => {
  try {
    const result = await fetch(`${BASE_URL}/room/memberInfo`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(no),
    });
    if (!result.ok) {
      throw new Error(`HTTP error! Status: ${result.status}`);
    }
    const data = await result.json();
    return data;
  } catch (e) {
    console.log("getMemberNo ERROR", e);
  }
};

export {
  getRoomAttachmentList,
  getRoomListAll,
  getRoomDetail,
  roomReservation,
  getReservationInfo,
  getMemberNo,
};
