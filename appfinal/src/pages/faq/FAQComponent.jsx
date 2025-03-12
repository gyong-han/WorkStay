import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import styled from "styled-components";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const CustomAccordion = styled(Accordion)(({ theme }) => ({
  backgroundColor: "#FAFAFA",
  color: "#333",
  borderTop: "1px solid #d9d9d9",
  borderBottom: "1px solid #d9d9d9",
  borderLeft: "none",
  borderRight: "none",

  "& .MuiAccordionSummary-root": {
    backgroundColor: "white",
    color: "black",
    display: "flex",
    fontFamily: "Pretendard-Medium",
  },
  "& .MuiAccordionDetails-root": {
    backgroundColor: "#eeeeee",
    textAlign: "left",
    wordBreak: "break-word", // 긴 단어 줄바꿈 (일부 브라우저에서 미적용 가능)
    overflowWrap: "break-word", // 긴 단어 줄바꿈 (대체 속성)
    whiteSpace: "normal",
    hyphens: "auto",
    fontFamily: "Pretendard-Medium",
    paddingBottom: "8px",
  },
}));

const FAQComponent = ({ faq, no }) => {
  const addBr = (text) => {
    return text.replace(/\./g, ".<br />"); // . 뒤에 <br /> 삽입
  };

  return (
    <>
      <div>
        <CustomAccordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography component="span">
              Q{no + 1}. {faq.title}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography
              component="div"
              dangerouslySetInnerHTML={{ __html: addBr(faq.content) }}
            />
          </AccordionDetails>
        </CustomAccordion>
      </div>
    </>
  );
};

export default FAQComponent;
