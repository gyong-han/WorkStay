import React, { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  padding: 16px;
  max-width: 800px;
  height: 1020px;
  margin: 0 auto;
  border: 1px solid #ccc;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
`;

const NavList = styled.nav`
  margin-bottom: 16px;
  display: flex;
  gap: 12px;
  border-bottom: 2px solid #ccc;
  padding-bottom: 8px;
  flex-wrap: wrap;

  .submit {
    padding: 8px 16px;
    font-size: 14px;
    border: 1px solid #ccc;
    border-radius: 4px;
    background-color: #f7f7f7;
    cursor: pointer;
  }
`;

const Button = styled.button`
  padding: 8px 16px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #f7f7f7;
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

const Title = styled.div`
  margin-bottom: 14px;
  display: flex;
  /* border-bottom: 2px solid #ccc; */
  text-align: start;

  .title {
    padding: 10px;
    outline: none;
    min-width: 97%;
    border-radius: 10px;
  }
`;

const Tagline = styled.div`
  margin-bottom: 14px;
  display: flex;
  /* border-bottom: 2px solid #ccc; */
  text-align: start;

  .tagline {
    padding: 10px;
    min-width: 97%;
    border-radius: 10px;
  }
`;

const Editor = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  text-align: start;
  padding-bottom: 20px;

  .content {
    flex-grow: 1;
    padding: 10px;
    border: 1px solid #ccc;
    min-height: 800px;
    max-height: 800px;
    overflow-y: auto;
    outline: none;
    white-space: pre-wrap;
    word-wrap: break-word;
  }
`;

const SlogWrite = () => {
  const { no } = useParams();
  console.log("no::::", no);
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

  // useEffect(`127.0.0.1:8080/api/slog/edit/${no}`)
  //   .then((resp) => resp.json())
  //   .then((data) => {
  //     setFormData({
  //       title: data.title,
  //       content: data.content,
  //       tagline: data.tagline,
  //     });
  //   });

  const handleInput = (e) => {
    setContent(e.target.innerHTML);
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

    fetch("http://127.0.0.1:8080/api/slog/upload", {
      method: "POST",
      body: fd,
    })
      .then((resp) => resp.json())
      .then((data) => {
        setUrl((prevUrls) => [...prevUrls, ...data]);
        setOriginalNames((prevNames) => [
          ...prevNames,
          ...Array.from(files).map((file) => file.name),
        ]);

        const contentDiv = document.querySelector(".content");
        data.forEach((imgUrl) => {
          const imgElement = document.createElement("img");
          imgElement.src = imgUrl;
          imgElement.style.maxWidth = "100%";
          imgElement.style.margin = "10px 0";
          contentDiv.appendChild(imgElement);
        });
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const contentHtml = document.querySelector(".content").innerHTML;

    const fd = new FormData();
    fd.append("title", formData.title);
    fd.append("content", contentHtml);
    fd.append("tagline", formData.tagline);
    fd.append("fileUrl", url.join(","));
    fd.append("originalName", originalNames.join(","));

    if (no) {
      fetch(`http://127.0.0.1:8080/api/slog/edit/${no}`, {
        method: "PUT",
        body: fd,
      })
        .then((resp) => resp.text())
        .then((data) => {
          console.log("수정한 데이터 ::: ", data);
          navigate("/slog/list");
        });
    } else {
      fetch("http://127.0.0.1:8080/api/slog/insert", {
        method: "POST",
        body: fd,
      })
        .then((resp) => resp.text())
        .then((data) => {
          navigate("/slog/list");
          console.log("발행한 데이터 : ", data);
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

  // const handleRemoveImage = (index) => {
  //   const newUrls = [...url];
  //   const newOriginalNames = [...originalNames];

  //   newUrls.splice(index, 1);
  //   newOriginalNames.splice(index, 1);

  //   setUrl(newUrls);
  //   setOriginalNames(newOriginalNames);
  // };

  const applyStyle = (type, value) => {
    if (type === "fontStyle") {
      setFontStyle(value);
    } else if (type === "fontSize") {
      setFontSize(value);
    } else if (type === "fontColor") {
      setFontColor(value);
    }
  };

  const toggleBold = () => {
    setIsBold(!isBold);
  };

  const toggleItalic = () => {
    setIsItalic(!isItalic);
  };

  const toggleUnderline = () => {
    setIsUnderline(!isUnderline);
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
          <select
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
            B
          </Button>
          <Button
            type="button"
            onClick={toggleItalic}
            style={{ fontStyle: isItalic ? "italic" : "normal" }}
          >
            I
          </Button>
          <Button
            type="button"
            onClick={toggleUnderline}
            style={{ textDecoration: isUnderline ? "underline" : "none" }}
          >
            U
          </Button>
          <Button
            type="button"
            onClick={toggleCenter}
            style={{ textAlign: center ? "center" : "none" }}
          >
            가운데 정렬
          </Button>
          <Button
            type="button"
            onClick={toggleLeft}
            style={{ textAlign: left ? "left" : "none" }}
          >
            왼쪽 정렬
          </Button>
          <input type="submit" className="submit" value={"발행"} />
          <input
            type="file"
            className="files"
            multiple
            onChange={handleFileChange}
          ></input>
        </NavList>

        <Title>
          <input
            className="title"
            contentEditable
            suppressContentEditableWarning={true}
            onInput={handleInput}
            onChange={handleInputChange}
            Value={formData.title}
            placeholder="제목을 입력하세요"
          ></input>
        </Title>

        <Tagline>
          <input
            className="tagline"
            contentEditable
            suppressContentEditableWarning={true}
            onInput={handleInput}
            onChange={handleInputChange}
            value={formData.tagline}
            placeholder="태그라인을 입력하세요"
          ></input>
        </Tagline>

        <Editor>
          <div
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
            dangerouslySetInnerHTML={{ __html: formData.content }}
            placeholder="저널을 입력하세요"
          />
        </Editor>
      </form>
    </Container>
  );
};

export default SlogWrite;
