import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { setSlogVo } from "../../redux/slogDetailSlice";
import Map from "../../components/map/Map";
import { setRecVo } from "../../redux/slogRecSlice";
import MapRec from "../../components/map/MapRec";
import KakaoShare from "./KakaoShare";

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

const Title = styled.div`
  font-size: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  background-repeat: no-repeat;
  background-size: cover;
  min-height: 300px;
`;

const Main = styled.main`
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: 1fr 2fr 1fr;
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
  /* justify-content: center;
  align-items: center; */
  height: auto;
  margin-top: 100px;

  .img {
    /* text-align: center; */
    width: 500px;
    height: 400px;
  }
`;

const ButtonSection = styled.div`
  display: flex;
  /* flex-direction: column; */
  margin-top: 20px;
  gap: 50px;

  .recPlace {
    /* font-size: 30px; */
    font-weight: 400;
    width: 302px;
    min-height: 122px;
    height: 100%;
    padding: 16px 20px;
    border: 1px solid #e6e6e6;
    background-color: #fafafa;
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
    border-color: #049dd9;
    border-radius: 10px;
  }

  .delete {
    width: 150px;
    height: 35px;
    font-size: 20px;
    color: #fafafa;
    font-family: "Pretendard-Regular";
    background-color: #049dd9;
    border-radius: 10px;
  }

  .share {
    width: 150px;
    height: 35px;
    font-size: 20px;
    color: #fafafa;
    font-family: "Pretendard-Regular";
    background-color: #049dd9;
    border-radius: 10px;
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

const SlogDetail = () => {
  const { no } = useParams();
  const dispatch = useDispatch();
  const slogVo = useSelector((state) => state.slogDetail);
  const recVo = useSelector((state) => state.slogRec.recPlaces) || [];
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [selectedPlace, setSelectedPlace] = useState(null);

  // 처음 로드될 때 첫 번째 장소를 자동으로 선택
  useEffect(() => {
    if (recVo?.length > 0) {
      setSelectedPlace({ address: recVo[0].address, name: recVo[0].name });
    }
  }, [recVo]);

  useEffect(() => {
    fetch(`http://127.0.0.1:8080/api/slog/${no}`)
      .then((resp) => resp.json())
      .then((data) => {
        dispatch(setSlogVo(data));
      });
  }, [no, dispatch]);

  useEffect(() => {
    fetch(`http://127.0.0.1:8080/api/slog/rec?no=${no}`, {
      method: "GET",
    })
      .then((resp) => resp.json())
      .then((data) => {
        dispatch(setRecVo(data));
      });
  }, [no]);

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
      },
    });
  };

  const handleRemove = async () => {
    const response = await fetch(
      `http://127.0.0.1:8080/api/slog/delete/${no}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.ok) {
      alert("게시글이 삭제되었습니다.");
      navigate("/slog/list");
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
        {slogVo.title}
      </Title>
      <Main>
        <LeftBlank />
        <Content>
          <div dangerouslySetInnerHTML={{ __html: slogVo.content }}></div>

          {recVo && Array.isArray(recVo) && recVo.length > 0 ? (
            <>
              {selectedPlace && (
                <MapRec
                  address={selectedPlace.address}
                  name={selectedPlace.name}
                />
              )}

              <ButtonSection>
                {recVo.map((place, index) => (
                  <div key={index}>
                    <button
                      className="recPlace"
                      onClick={() =>
                        handleButtonClick(place.address, place.name)
                      }
                    >
                      {place.name}
                    </button>
                  </div>
                ))}
              </ButtonSection>
            </>
          ) : (
            <p>추천 장소가 없습니다.</p>
          )}
        </Content>
        <RightBlank />
      </Main>
      <EditDeleteBtn>
        <button className="edit" onClick={handleEdit}>
          수정하기
        </button>
        <button className="delete" onClick={handleRemove}>
          삭제하기
        </button>
        <button className="share" onClick={openKakaoModal}>
          트레블 공유하기
        </button>
      </EditDeleteBtn>

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
