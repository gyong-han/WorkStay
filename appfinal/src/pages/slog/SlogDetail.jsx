import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { setSlogVo } from "../../redux/slogDetailSlice";
import Map from "../../components/map/Map";
import { setRecVo } from "../../redux/slogRecSlice";
import MapRec from "../../components/map/MapRec";
import KakaoShare from "./KakaoShare";
import { jwtDecode } from "jwt-decode";
import { SiNaver } from "react-icons/si";
import { RiInstagramLine } from "react-icons/ri";
import Alert from "../../components/Alert";
import KakaoMap from "../../components/map/KaKaoMap";
import { BASE_URL } from "../../components/service/config";

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

const Middle = styled.div`
  display: grid;
  place-items: center;
  text-align: center;
`;

const Title = styled.div`
  font-size: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fafafa;
  background-repeat: no-repeat;
  background-size: cover;
  min-height: 300px;
  flex-direction: column;
  position: relative;
  font-weight: 900;

  .nick {
    font-size: 16px;
    position: absolute;
    bottom: 10px;
  }
`;

const Main = styled.main`
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: 1fr 1fr 1fr;
`;

const LeftBlank = styled.div`
  background-color: #fafafa;
`;

const RightBlank = styled.div`
  background-color: #fafafa;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  height: auto;
  margin-top: 100px;
  margin-bottom: 100px;
  max-width: 600px;
  line-height: 200%;

  .img {
    min-width: 500px;
    height: 400px;
  }
`;

const ButtonSection = styled.div`
  display: flex;
  flex-flow: wrap;
  gap: 200px;
  justify-content: center;
  align-items: center;
  margin-top: 50px;

  .recPlace {
    /* font-size: 30px; */
    border-top: 5px solid #049dd9;
    border-bottom: 1px solid #e6e6e6;
    font-weight: 400;
    width: 350px;
    min-height: 122px;
    height: 100%;
    padding: 16px 20px;
    /* border: 1px solid #e6e6e6; */
    background-color: #fafafa;
  }
`;

const StyledButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;

  padding: 10px;
  background-color: #049dd9;
  color: #fff;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  position: relative;
  min-width: 200px;
  margin: 5px;
`;

const Badge = styled.span`
  position: absolute;
  left: -10px;
  top: 50%;
  transform: translateY(-50%);
  background-color: #049dd9;
  color: white;
  padding: 5px 10px;
  border-radius: 5px;
  font-weight: bold;
`;

const ButtonContent = styled.div`
  margin-left: 20px;
  color: black;
  strong {
    display: block;
  }
  p {
    margin: 0;
    font-size: 12px;
    color: #e0e0e0;
  }
`;

const EditDeleteBtn = styled.div`
  display: flex;
  gap: 30px;
  margin-top: 300px;
  margin-bottom: 100px;
  justify-content: center;
  align-items: center;

  .edit {
    width: 150px;
    height: 35px;
    font-size: 20px;
    font-family: "Pretendard-Regular";
    background-color: #fafafa;
    /* border-color: #049dd9; */
    border-radius: 5px;
    border: 1px solid #202020;
  }

  .delete {
    width: 150px;
    height: 35px;
    font-size: 20px;
    color: #fafafa;
    font-family: "Pretendard-Regular";
    background-color: #049dd9;
    border-radius: 5px;
    border: none;
  }

  .share {
    width: 150px;
    height: 35px;
    font-size: 20px;
    font-family: "Pretendard-Regular";
    background-color: #fafafa;
    /* border-color: #049dd9; */
    border-radius: 5px;
    border: 1px solid #202020;
    cursor: pointer;
  }

  .reservation {
    width: 150px;
    height: 35px;
    font-size: 20px;
    color: #fafafa;
    font-family: "Pretendard-Regular";
    background-color: #049dd9;
    border-radius: 10px;
    border: none;
    cursor: pointer;
  }
`;

const ModalContainer = styled.div`
  display: ${(props) => (props.isOpen ? "flex" : "none")};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  width: 400px;
  text-align: center;
  position: relative;

  .close-btn {
    position: absolute;
    top: 10px;
    right: 10px;
    background: none;
    border: none;
    font-size: 20px;
    cursor: pointer;
  }
`;

const AlertContent = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

const InfoDiv = styled.div`
  width: 270px;
  height: 270px;
  background-color: white;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 1fr 1fr 25px 25px 1fr;
  z-index: 999;
  margin-right: 950px;
  margin-bottom: 200px;
  position: absolute;
  justify-items: center;
  text-align: start;

  & > div {
    width: 80%;
    height: 90%;
    display: flex;
    align-items: center;
  }
  & > div:nth-child(1) {
    padding-top: 10px;
    font-size: 25px;
    font-weight: 600;
  }
  & > div:nth-child(2) {
    font-size: 15px;
  }
  & > div:nth-child(3),
  & > div:nth-child(4),
  & > div:nth-child(5) {
    display: flex;
    align-items: end;
    color: #999;
  }
`;

const InfomationDiv = styled.div`
  width: 100%;
  height: 100%;
  gap: 20px;
  & > svg {
    color: #999;
  }
  & > svg:hover {
    color: black;
  }
  & > svg:nth-child(1) {
    width: 20px;
    height: 20px;
  }
`;

const SlogDetail = () => {
  const { no } = useParams();
  const dispatch = useDispatch();
  const slogVo = useSelector((state) => state.slogDetail);
  const recVo = useSelector((state) => state.slogRec.recPlaces) || [];
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userNo, setUserNo] = useState(null);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const slogDetailVo = useSelector((state) => state.slog);
  const [stayData, setStayData] = useState(null);
  const [alertOpen, setAlertOpen] = useState(false);

  const filteredList = slogDetailVo.voList
    .filter((vo) => vo.no === no)
    .map((vo) => ({ ...vo }));

  const stayNo = filteredList.length > 0 ? filteredList[0].stayNo : null;

  useEffect(() => {
    if (stayNo) {
      fetch(`${BASE_URL}/api/slog/stay/${stayNo}`)
        .then((resp) => resp.json())
        .then((data) => {
          setStayData(data);
        })
        .catch((error) => console.error("Error fetching stay data:", error));
    }
  }, [stayNo]);

  // 처음 로드될 때 첫 번째 장소를 자동으로 선택
  useEffect(() => {
    if (recVo?.length > 0) {
      setSelectedPlace({ address: recVo[0].address, name: recVo[0].name });
    }
  }, [recVo]);

  useEffect(() => {
    fetch(`${BASE_URL}/api/slog/${no}`)
      .then((resp) => resp.json())
      .then((data) => {
        dispatch(setSlogVo(data));
      });
  }, [no, dispatch]);

  useEffect(() => {
    fetch(`${BASE_URL}/api/slog/rec?no=${no}`, {
      method: "GET",
    })
      .then((resp) => resp.json())
      .then((data) => {
        dispatch(setRecVo(data));
      });
  }, [no]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setUserNo(decodedToken.no); // 상태 업데이트
      } catch (error) {
        console.error("토큰 디코딩 실패:", error);
      }
    }
  }, []);

  const handleButtonClick = (address, name) => {
    setSelectedPlace({ address, name });
  };

  const handleEdit = () => {
    navigate(`/slog/edit/${no}`, {
      state: {
        title: slogVo.title,
        tagline: slogVo.tagline,
        content: slogVo.content,
        fileUrl: slogVo.fileUrl,
        originalName: slogVo.originalName,
        titleFileUrl: slogVo.titleFileUrl,
      },
    });
  };

  const stayReservation = () => {
    navigate(`/findstay/detail/${stayNo}/refund-policy`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleRemove = async () => {
    const isDelete = window.confirm("정말 게시글을 삭제하시겠습니까?");

    if (!isDelete) {
      return;
    }

    const response = await fetch(`${BASE_URL}/api/slog/delete/${no}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      setAlertOpen(true);
    } else {
      alert("게시글 삭제에 실패했습니다.");
    }
  };

  const openKakaoModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const closeAlertModal = () => {
    setAlertOpen(false);
    navigate("/slog");
  };

  return (
    <Container>
      <Title
        style={{
          backgroundImage: `url(${slogVo.titleFileUrl})`,
          width: "100%",
          height: "100%",
          objectFit: "contain",
        }}
      >
        <div>{slogVo.title}</div>
        <div className="nick">
          {new Date(slogVo.enrollDate)
            .toLocaleDateString("ko-KR")
            .replace(/-/g, ".")}
          <span style={{ marginRight: "20px" }}></span>
          by.{slogVo.nick}{" "}
        </div>
      </Title>
      <Main>
        <LeftBlank />
        <Content>
          <div dangerouslySetInnerHTML={{ __html: slogVo.content }}></div>
        </Content>
        <RightBlank />
      </Main>
      <Middle>
        {recVo && Array.isArray(recVo) && recVo.length > 0 ? (
          <>
            {selectedPlace && (
              <div>
                <div style={{ position: "relative", height: "500px" }}>
                  <MapRec
                    address={selectedPlace.address}
                    name={selectedPlace.name}
                  />
                  <div
                    style={{
                      position: "absolute",
                      top: "20px",
                      left: "20px",
                      padding: "10px",
                      borderRadius: "5px",
                      zIndex: 10,
                    }}
                  >
                    <InfoDiv>
                      <div>HELLO.</div>
                      <div>{stayData?.address}</div>
                      <div>{stayData?.name}</div>
                      <div>{stayData?.phone}</div>
                      <div>{stayData?.sns}</div>
                      <InfomationDiv>
                        <RiInstagramLine />
                        <SiNaver />
                      </InfomationDiv>
                    </InfoDiv>
                  </div>
                </div>
              </div>
            )}

            <ButtonSection>
              {recVo.map((place, index) => (
                <div key={index}>
                  <StyledButton
                    className="recPlace"
                    onClick={() => handleButtonClick(place.address, place.name)}
                  >
                    <Badge>{index + 1}</Badge>
                    <ButtonContent>{place.name}</ButtonContent>
                  </StyledButton>
                </div>
              ))}
            </ButtonSection>
          </>
        ) : (
          <p>추천 장소가 없습니다.</p>
        )}
      </Middle>
      <KakaoMap />

      <EditDeleteBtn>
        {userNo === slogVo?.memberNo || userNo === "1" ? (
          <>
            <button className="edit" onClick={handleEdit}>
              수정하기
            </button>
            <button className="delete" onClick={handleRemove}>
              삭제하기
            </button>
          </>
        ) : (
          <>
            <button className="share" onClick={openKakaoModal}>
              트래블 공유하기
            </button>
            <button className="reservation" onClick={stayReservation}>
              스테이 예약하기
            </button>
          </>
        )}
      </EditDeleteBtn>

      {alertOpen && (
        <AlertContent>
          <Alert
            title="S-LOG 삭제"
            titleColor="#049dd9"
            message="삭제되었습니다."
            buttonText="확인"
            buttonColor="#049dd9"
            onClose={closeAlertModal}
          />
        </AlertContent>
      )}

      <ModalContainer isOpen={isModalOpen}>
        <ModalContent>
          <button className="close-btn" onClick={closeModal}>
            ×
          </button>
          <h2>공유하기</h2>
          <KakaoShare no={no} />
        </ModalContent>
      </ModalContainer>
    </Container>
  );
};

export default SlogDetail;
