import React from "react";
import styled from "styled-components";
import { CirclePlus } from "lucide-react";

const FileLabel = styled.label`
  display: flex;
  align-items: end;
  cursor: pointer;
`;

const FileDiv = styled.div`
  margin-top: 40px;
`;

const FileSpan = styled.span`
  margin-left: 10px;
  font-size: ${(props) => props.size};
  color: ${(props) => props.color};
`;

const AttachmentUpload = ({
  fileData,
  setFileData,
  name,
  isMultiple,
  func,
  no,
  isDisabled,
  color,
}) => {
  const handleFileChange = (event) => {
    const files =
      event.target.files.length === 1
        ? event.target.files[0]
        : Array.from(event.target.files);

    setFileData((prev) => {
      return {
        ...prev,
        [name]: files,
      };
    });
  };

  const handleFileChange2 = (event) => {
    const files =
      event.target.files.length === 1
        ? event.target.files[0]
        : Array.from(event.target.files);

    setFileData((prev) => {
      const updatedFileData = [...prev];

      if (!updatedFileData[no]) {
        updatedFileData[no] = {};
      }

      updatedFileData[no][name] = files;

      return updatedFileData;
    });
  };

  return (
    <FileDiv>
      <input
        id={no ? `${name}-${no}` : name}
        type="file"
        name={name}
        style={{ display: "none" }}
        onChange={func == "true" ? handleFileChange : handleFileChange2}
        multiple={isMultiple === "true"}
        disabled={isDisabled}
      />

      {func === "true" ? (
        <FileLabel htmlFor={no ? `${name}-${no}` : name}>
          <CirclePlus />
          <FileSpan size="20px" color={color}>
            {fileData?.[name] &&
            (Array.isArray(fileData[name])
              ? fileData[name].length > 0
              : fileData[name] instanceof File ||
                typeof fileData[name] === "object")
              ? "파일 다시 선택"
              : "이미지 첨부파일 올리기"}
          </FileSpan>
          <FileSpan size="15px" color={color}>
            {Array.isArray(fileData[name])
              ? fileData[name].map((file) => file.name).join(", ")
              : fileData[name]?.name}
          </FileSpan>
        </FileLabel>
      ) : (
        <FileLabel htmlFor={no ? `${name}-${no}` : name}>
          <CirclePlus />
          <FileSpan size="20px" color={color}>
            {fileData[no]?.[name] ? "파일 다시 선택" : "이미지 첨부파일 올리기"}
          </FileSpan>
          {fileData[no]?.[name] && (
            <FileSpan size="15px" color={color}>
              {Array.isArray(fileData[no][name])
                ? fileData[no][name].map((file) => file.name).join(", ")
                : fileData[no][name].name}
            </FileSpan>
          )}
        </FileLabel>
      )}
    </FileDiv>
  );
};

export default AttachmentUpload;
