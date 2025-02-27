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

const RoomReservation = async (x) => {
  try {
    const result = await fetch(`${BASE_URL}/reservation/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(x),
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

export {
  getRoomAttachmentList,
  getRoomListAll,
  getRoomDetail,
  RoomReservation,
};
