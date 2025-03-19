import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { FiAlignJustify } from "react-icons/fi";
import { CiTextAlignLeft } from "react-icons/ci";
import { FiItalic } from "react-icons/fi";
import { HiUnderline } from "react-icons/hi2";
import { BsTypeBold } from "react-icons/bs";
import { SlPicture } from "react-icons/sl";
import { IoVideocamOutline } from "react-icons/io5";
import { GoSmiley } from "react-icons/go";
import { TfiLayoutLineSolid } from "react-icons/tfi";
import { CiLocationOn } from "react-icons/ci";
import { IoIosLink } from "react-icons/io";
import { AiOutlineFileAdd } from "react-icons/ai";
import { AiOutlineTable } from "react-icons/ai";
import { FaRegTrashCan } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { addSlogVoList } from "../../redux/slogSlice";
import { BASE_URL } from "../../components/service/config";

const Container = styled.div`
  width: 100%;
  /* height: 100vh; */
  display: flex;
  flex-direction: column;
`;

const NavList = styled.nav`
  display: flex;
  gap: 20px;
  border-bottom: 2px solid #ccc;
  padding-bottom: 8px;
  flex-wrap: wrap;
  align-items: center;
  color: #555;

  .submit {
    padding: 8px 16px;
    font-size: 14px;
    border: none;
    border-radius: 4px;
    background-color: #049dd9;
    color: #ffffff;
    cursor: pointer;
  }

  .font-type {
    border: none;
    background-color: #fafafa;
  }

  .font-size {
    border: none;
    background-color: #fafafa;
  }
  .custom-file-upload {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 15px;
    background-color: #fafafa;
    font-size: 16px;
    border-radius: 5px;
    cursor: pointer;
    text-align: center;
  }

  .upload-icon {
    font-size: 24px;
    margin-bottom: 5px;
  }

  input[type="file"] {
    display: none;
  }
`;

const NavList2 = styled.nav`
  display: flex;
  gap: 12px;
  border-bottom: 2px solid #ccc;
  margin-top: 5px;
  padding-bottom: 8px;
  flex-wrap: wrap;
  align-items: center;
  color: #555;

  .submit {
    padding: 8px 16px;
    font-size: 14px;
    border: none;
    border-radius: 4px;
    background-color: #049dd9;
    color: #ffffff;
    cursor: pointer;
  }

  .font-type {
    border: none;
    background-color: #fafafa;
  }

  .font-size {
    border: none;
    background-color: #fafafa;
  }
  .custom-file-upload {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 15px;
    background-color: #fafafa;
    font-size: 16px;
    border-radius: 5px;
    cursor: pointer;
    text-align: center;
  }

  .upload-icon {
    font-size: 24px;
    margin-bottom: 5px;
  }

  input[type="file"] {
    display: none;
  }
`;

const Button = styled.button`
  padding: 8px 16px;
  font-size: 14px;
  border: none;
  border-radius: 4px;
  background-color: #fafafa;
  cursor: pointer;

  &:hover {
    background-color: #e0e0e0;
  }

  &:active {
    background-color: #d1d1d1;
  }

  &.active {
    background-color: #4caf50;
    color: white;
  }
`;

const Main = styled.div`
  display: grid;
  grid-template-columns: 2fr 5fr 2fr;
  grid-template-rows: 1fr;
  height: 100vh;
  position: relative;
`;

const Title = styled.div`
  width: 80%;
  padding: 15px;
  /* margin-top: 60px; */
  margin: 60px auto 0;
  border: none;
  outline: none;
  text-align: start;
  border-bottom: 2px solid #ccc;
  color: #555;

  .title {
    padding: 10px;
    min-width: 97%;
    font-size: 24px;
    border: none;
    outline: none;
    border-radius: 10px;
    background-color: #fafafa;
  }
  .font-type {
    border: none;
    background-color: #fafafa;
  }

  .font-size {
    border: none;
    background-color: #fafafa;
  }
  .custom-file-upload {
    display: flex;
    flex-direction: column;
    align-items: end;
    justify-content: center;
    padding: 15px;
    background-color: #fafafa;
    font-size: 16px;
    border-radius: 5px;
    cursor: pointer;
    text-align: center;
  }

  .upload-icon {
    font-size: 24px;
    margin-bottom: 5px;
  }

  input[type="file"] {
    display: none;
  }
`;

const Middle = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const LeftBlank = styled.div`
  background-color: #eeeeee;
  height: 100%;
`;

const RightBlank = styled.div`
  background-color: #eeeeee;
  height: 100%;
`;

const Tagline = styled.div`
  width: 80%;
  padding: 15px;
  margin-top: 30px;
  margin: 30px auto 0;
  border: none;
  outline: none;
  text-align: start;
  border-bottom: 2px solid #ccc;

  .tagline {
    padding: 10px;
    min-width: 97%;
    font-size: 15px;
    border: none;
    outline: none;
    border-radius: 10px;
    background-color: #fafafa;
  }
`;

const Editor = styled.div`
  width: 80%;
  margin: 30px auto 0;
  height: 100%;
  display: flex;
  flex-direction: column;
  /* text-align: start; */

  .content {
    flex-grow: 1;
    padding: 10px;
    border: 1px solid #ccc;
    outline: none;
    border: none;
    /* white-space: pre-wrap; */
    word-wrap: break-word;
  }

  .remove-image {
    width: 30px;
    height: 30px;
  }
`;

const SlogWrite = () => {
  const { no } = useParams();
  const titleFileUrl = useSelector((state) => state.slogDetail.titleFileUrl);
  const dispatch = useDispatch();
  const [backgroundImage, setBackgroundImage] = useState("");
  const [selectedImage, setSelectedImage] = useState("");
  const [buttonPosition, setButtonPosition] = useState({});
  const location = useLocation();
  const [content, setContent] = useState();
  const [originalNames, setOriginalNames] = useState([]);
  const [url, setUrl] = useState([]);
  const [formData, setFormData] = useState({
    title: location.state?.title || "",
    tagline: location.state?.tagline || "",
    content: location.state?.content || "",
    files: "",
    fileUrl: "",
    originalName: "",
    memberNo: "",
    reno: "",
  });
  const [fontStyle, setFontStyle] = useState("Pretendard-Regular");
  const [fontSize, setFontSize] = useState("16px");
  const [fontColor, setFontColor] = useState("#000000");
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [center, setCenter] = useState();
  const [left, setLeft] = useState();
  const navigate = useNavigate();
  // const [rows, setRows] = useState(4);
  // const [columns, setColumns] = useState(4);
  const [cellContent, setCellContent] = useState("");
  const rows = 4;
  const columns = 4;

  const handleInput = (e) => {
    setContent(e.target.cloneNode(true).innerHTML);
  };

  const handleGraphClick = (e) => {
    setCellContent("표 생성됨");
  };

  useEffect(() => {
    if (!cellContent) return;

    const contentDiv = document.querySelector(".content");
    if (!contentDiv) return;

    const tableElement = document.createElement("table");
    tableElement.style.border = "1px solid black";
    tableElement.style.marginTop = "10px";
    tableElement.style.width = "600px";
    tableElement.style.height = "200px";

    for (let i = 0; i < rows; i++) {
      const trElement = document.createElement("tr");

      for (let j = 0; j < columns; j++) {
        const tdElement = document.createElement("td");
        tdElement.style.width = "50px";
        tdElement.style.height = "50px";
        tdElement.style.textAlign = "center";
        tdElement.style.border = "1px solid black";

        trElement.appendChild(tdElement);
      }

      tableElement.appendChild(trElement);
    }

    contentDiv.appendChild(tableElement);
    setCellContent("");
  }, [cellContent]);

  const handleLineChange = () => {
    const contentDiv = document.querySelector(".content");
    if (!contentDiv) return;

    const hrElement = document.createElement("hr");
    hrElement.style.border = "2px solid #ccc";
    hrElement.style.margin = "30px auto";

    contentDiv.appendChild(hrElement);

    const newLine = document.createElement("br");
    contentDiv.appendChild(newLine);

    const range = document.createRange();
    const selection = window.getSelection();

    range.setStartAfter(newLine);
    range.collapse(true);

    selection.removeAllRanges();
    selection.addRange(range);
  };

  const handleFileChange = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      return;
    }

    const files = e.target.files;
    const fd = new FormData();

    for (let i = 0; i < files.length; i++) {
      fd.append("files", files[i]);
    }

    fetch(`${BASE_URL}/api/slog/upload`, {
      method: "POST",
      body: fd,
    })
      .then((resp) => resp.json())
      .then((data) => {
        setUrl((prevUrl) => [...prevUrl, ...data]);
        setOriginalNames((prevName) => [
          ...prevName,
          ...Array.from(files).map((file) => file.name),
        ]);

        const contentDiv = document.querySelector(".content");

        data.forEach((fileUrl, index) => {
          const file = files[index];
          const fileType = file.type.split("/")[0];

          if (fileType === "image") {
            const imgElement = document.createElement("img");
            imgElement.src = fileUrl;
            imgElement.style.maxWidth = "100%";
            imgElement.style.width = "600px";
            imgElement.style.margin = "10px 0";
            contentDiv.appendChild(imgElement);
          } else if (fileType === "video") {
            const videoContainer = document.createElement("div");
            videoContainer.style.position = "relative";
            videoContainer.style.width = "600px";
            // videoContainer.style.cursor = "pointer";
            videoContainer.style.margin = "10px 0";

            const videoElement = document.createElement("video");
            videoElement.src = fileUrl;
            videoElement.style.width = "100%";
            videoElement.controls = true;

            videoContainer.addEventListener("click", () => {
              videoElement.style.display = "block";
              videoElement.focus();
              videoElement.play();
            });

            videoContainer.appendChild(videoElement);
            contentDiv.appendChild(videoContainer);
          }
        });
        const newLine = document.createElement("br");
        contentDiv.appendChild(newLine);

        const range = document.createRange();
        const selection = window.getSelection();

        range.setStartAfter(newLine);
        range.collapse(true);

        selection.removeAllRanges();
        selection.addRange(range);
      });
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const reno = params.get("reno");
    const memberNo = params.get("memberNo");
    setFormData((prev) => {
      return { ...prev, reno: reno, memberNo: memberNo };
    });
  }, []);

  const handleTitleFileChange = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      return;
    }

    const files = e.target.files;
    const fd = new FormData();

    for (let i = 0; i < files.length; i++) {
      fd.append("files", files[i]);
    }

    fetch(`${BASE_URL}/api/slog/title/upload`, {
      method: "POST",
      body: fd,
    })
      .then((resp) => resp.json())
      .then((data) => {
        setUrl((prevUrl) => [...prevUrl, ...data]);
        setOriginalNames((prevName) => [
          ...prevName,
          ...Array.from(files).map((file) => file.name),
        ]);
        if (data.length > 0) {
          setBackgroundImage(data);
        }
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const contentHtml = document.querySelector(".content").innerHTML;
    const titleUrls = [];
    const isTitleFile = [];
    const normalUrls = [];

    const contentImages = Array.from(
      document.querySelector(".content").querySelectorAll("img")
    );

    const contentFileUrls = contentImages.map((img) => img.src);

    url.forEach((fileUrl) => {
      const isTitle = fileUrl.includes("TITLE");
      isTitleFile.push(isTitle);

      if (isTitle) {
        titleUrls.push(fileUrl);
      } else {
        normalUrls.push(fileUrl);
      }
    });

    const fd1 = new FormData();
    fd1.append("title", formData.title);
    fd1.append("content", contentHtml);
    fd1.append("tagline", formData.tagline);

    contentFileUrls.forEach((fileUrl) => fd1.append("fileUrl", fileUrl));
    fd1.append("titleFileUrl", titleUrls);
    fd1.append("reno", formData.reno);
    fd1.append("memberNo", formData.memberNo);
    fd1.append("originalName", originalNames.join(","));

    const fd2 = new FormData();
    fd2.append("title", formData.title);
    fd2.append("content", contentHtml);
    fd2.append("tagline", formData.tagline);

    contentFileUrls.forEach((fileUrl) => fd2.append("fileUrl", fileUrl));
    fd2.append("titleFileUrl", titleFileUrl);
    fd2.append("originalName", originalNames.join(","));

    if (no) {
      fetch(`${BASE_URL}/api/slog/edit/${no}`, {
        method: "PUT",
        body: fd2,
      })
        .then((resp) => resp.text())
        .then((data) => {
          navigate("/slog");
        });
    } else {
      fetch(`${BASE_URL}/api/slog/insert`, {
        method: "POST",
        body: fd1,
      })
        .then((resp) => resp.text())
        .then((data) => {
          dispatch(addSlogVoList(data));
          navigate("/slog");
        });
    }
  };
  const handleInputChange = (e) => {
    setFormData((prev) => {
      return {
        ...prev,
        [e.target.className]: e.target.value,
      };
    });
  };

  const temp = useRef(null);
  useEffect(() => {
    temp.current.innerHTML = formData.content;
  }, []);

  const handleRemoveImage = () => {
    if (selectedImage) {
      selectedImage.remove();
      setSelectedImage(null);

      for (let i = 0; i < url.length; ++i) {
        if (url[i].includes(selectedImage)) {
          url.splice(i);
          break;
        }
      }
    }
  };

  useEffect(() => {
    const editor = temp.current;
    if (!editor) return;

    const handleImageClick = (e) => {
      if (e.target.tagName === "IMG") {
        setSelectedImage(e.target);
        // e.target.style.border = "5px solid #04B2D9";

        const rect = e.target.getBoundingClientRect();
        setButtonPosition({
          top: rect.top + window.scrollY - 20,
          left: rect.left + window.scrollX + rect.width - 40,
        });
      }
    };

    editor.addEventListener("click", handleImageClick);

    // return () => {
    //   editor.removeEventListener("click", handleImageClick);
    // };
  }, []);

  const applyStyle = (type, value) => {
    const selection = window.getSelection();
    if (!selection.rangeCount) return;

    const range = selection.getRangeAt(0);
    const selectedText = range.toString();

    if (selectedText) {
      const span = document.createElement("span");

      if (type === "fontStyle") {
        span.style.fontFamily = value;
        // setFontStyle(value);
      } else if (type === "fontSize") {
        span.style.fontSize = value;
        // setFontSize(value);
      } else if (type === "fontColor") {
        span.style.color = value;
        // setFontColor(value);
      }

      span.textContent = selectedText;
      range.deleteContents();
      range.insertNode(span);
    }
  };

  const toggleBold = () => {
    document.execCommand("bold");
  };

  const toggleItalic = () => {
    document.execCommand("italic");
  };

  const toggleUnderline = () => {
    document.execCommand("underline");
  };
  const toggleCenter = () => {
    setCenter(true);
    setLeft(false);
  };
  const toggleLeft = () => {
    setLeft(true);
    setCenter(false);
  };

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <NavList>
          <label htmlFor="file-upload" className="custom-file-upload">
            <SlPicture className="upload-icon" />
            사진
          </label>
          <input
            id="file-upload"
            type="file"
            multiple
            onChange={handleFileChange}
          />
          <label htmlFor="file-upload" className="custom-file-upload">
            <IoVideocamOutline className="upload-icon" />
            동영상
          </label>
          <input
            id="file-upload"
            type="file"
            accept="video/mp4,video/mkv, video/x-m4v,video/*"
            onChange={handleFileChange}
          />
          <label htmlFor="file-upload" className="custom-file-upload">
            <GoSmiley className="upload-icon" />
            스티커
          </label>
          <input
            id="file-upload"
            type="file"
            multiple
            onChange={handleFileChange}
          />
          <label htmlFor="line-button" className="custom-file-upload">
            <TfiLayoutLineSolid
              className="upload-icon"
              onClick={handleLineChange}
            />
            구분선
          </label>

          <label htmlFor="file-upload" className="custom-file-upload">
            <CiLocationOn className="upload-icon" />
            장소
          </label>
          <input
            id="file-upload"
            type="file"
            multiple
            onChange={handleFileChange}
          />
          <label htmlFor="file-upload" className="custom-file-upload">
            <IoIosLink className="upload-icon" />
            링크
          </label>
          <input
            id="file-upload"
            type="file"
            multiple
            onChange={handleFileChange}
          />
          <label htmlFor="file-upload" className="custom-file-upload">
            <AiOutlineFileAdd className="upload-icon" />
            파일
          </label>
          <input
            id="file-upload"
            type="file"
            multiple
            onChange={handleFileChange}
          />
          <label htmlFor="graph-upload" className="custom-file-upload">
            <AiOutlineTable
              className="upload-icon"
              onClick={handleGraphClick}
            />
            표
          </label>

          <input type="submit" className="submit" value={"발행"} />
        </NavList>

        <NavList2>
          <select
            className="font-type"
            onChange={(e) => applyStyle("fontStyle", e.target.value)}
            value={fontStyle}
          >
            <option value="Pretendard-Regular">Pretendard-Regular</option>
            <option value="굴림체">굴림체</option>
            <option value="맑은 고딕">맑은 고딕</option>
            <option value="돋움체">돋움체</option>
            <option value="궁서체">궁서체</option>
          </select>

          <select
            className="font-size"
            onChange={(e) => applyStyle("fontSize", e.target.value)}
            value={fontSize}
          >
            <option value="10px">10px</option>
            <option value="12px">12px</option>
            <option value="14px">14px</option>
            <option value="16px">16px</option>
            <option value="18px">18px</option>
            <option value="20px">20px</option>
            <option value="24px">24px</option>
          </select>

          <input
            type="color"
            value={fontColor}
            onChange={(e) => applyStyle("fontColor", e.target.value)}
          />

          <Button
            type="button"
            onClick={toggleBold}
            style={{ fontWeight: isBold ? "bold" : "normal" }}
          >
            <BsTypeBold />
          </Button>
          <Button
            type="button"
            onClick={toggleItalic}
            style={{ fontStyle: isItalic ? "italic" : "normal" }}
          >
            <FiItalic />
          </Button>
          <Button
            type="button"
            onClick={toggleUnderline}
            style={{ textDecoration: isUnderline ? "underline" : "none" }}
          >
            <HiUnderline />
          </Button>
          <Button
            type="button"
            onClick={toggleCenter}
            style={{ textAlign: center ? "center" : "none" }}
          >
            <FiAlignJustify />
          </Button>
          <Button
            type="button"
            onClick={toggleLeft}
            style={{ textAlign: left ? "left" : "none" }}
          >
            <CiTextAlignLeft />
          </Button>
        </NavList2>

        <Main>
          <LeftBlank />
          <Middle>
            <Title>
              <label
                htmlFor="title-upload"
                className="title-upload-label"
                style={{
                  cursor: "pointer",
                }}
              >
                사진 선택
              </label>
              <input
                id="title-upload"
                type="file"
                onChange={handleTitleFileChange}
              />

              <div
                className="title-background"
                style={{
                  width: "100%",
                  height: "200px",
                  backgroundImage: titleFileUrl
                    ? `url(${titleFileUrl})`
                    : backgroundImage
                    ? `url(${backgroundImage})`
                    : "none",

                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "relative",
                }}
              >
                {!backgroundImage && <></>}

                <input
                  className="title"
                  contentEditable
                  suppressContentEditableWarning={true}
                  onInput={handleInput}
                  onChange={handleInputChange}
                  Value={formData.title}
                  placeholder="제목"
                  style={{
                    width: "80%",
                    padding: "10px",
                    fontSize: "24px",
                    fontWeight: "bold",
                    color: "white",
                    textAlign: "center",
                    backgroundColor: "rgba(0, 0, 0, 0.308)",
                    backdropFilter: "blur(5px)",
                    border: "none",
                    outline: "none",
                    position: "absolute",
                  }}
                ></input>
              </div>
            </Title>

            <Tagline>
              <input
                className="tagline"
                contentEditable
                suppressContentEditableWarning={true}
                onInput={handleInput}
                onChange={handleInputChange}
                value={formData.tagline}
                placeholder="태그라인"
              ></input>
            </Tagline>

            <Editor>
              <div
                ref={temp}
                className="content"
                contentEditable
                suppressContentEditableWarning={true}
                style={{
                  fontFamily: fontStyle,
                  fontSize: fontSize,
                  color: fontColor,
                  fontWeight: isBold ? "bold" : "normal",
                  fontStyle: isItalic ? "italic" : "normal",
                  textDecoration: isUnderline ? "underline" : "none",
                  textAlign: center ? "center" : left ? "left" : "initial",
                }}
                onInput={handleInput}
                onChange={handleInputChange}
                // dangerouslySetInnerHTML={{ __html: formData.content }}
                placeholder="저널을 입력하세요"
              />
              {selectedImage && (
                <button
                  className="Remove-Image"
                  style={{
                    top: `${buttonPosition.top}px`,
                    left: `${buttonPosition.left}px`,
                    position: "absolute",
                  }}
                  onClick={handleRemoveImage}
                >
                  <FaRegTrashCan />
                </button>
              )}
            </Editor>
          </Middle>
          <RightBlank />
        </Main>
      </form>
    </Container>
  );
};

export default SlogWrite;
