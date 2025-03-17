import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import styled from "styled-components";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const CustomAccordion = styled(Accordion)(({ theme }) => ({
  backgroundColor: "#FAFAFA",
  color: "#BBBBBB",
  borderTop: "1px solid #d9d9d9",
  borderBottom: "1px solid #d9d9d9",
  borderLeft: "none",
  borderRight: "none",

  "& .MuiAccordionSummary-root": {
    backgroundColor: "#FAFAFA",
    color: "#202020",
    display: "flex",
    fontFamily: "Pretendard-Medium",
  },
  "& .MuiAccordionDetails-root": {
    backgroundColor: "#d9d9d9",
    textAlign: "left",
    fontFamily: "Pretendard-Medium",
    paddingBottom: "8px",
  },
}));

const FAQComponent = ({ faq, no }) => {
  const addBr = (text) => {
    return text.replace(/\.(?![^.]*$)/g, ".<br /><br/>");
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
