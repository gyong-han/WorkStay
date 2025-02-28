import { useState } from "react";
import styled from "styled-components";

const AccordionWrapper = styled.div`
  padding: 10px;
`;

const AccordionItemWrapper = styled.div`
  padding: 10px;
  display: grid;
  align-items: center;

  & > div {
    display: grid;
    grid-template-columns: 30px 1fr;
    grid-template-rows: 1fr;
    align-items: center;
  }
`;

const AccordionButton = styled.button`
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  cursor: pointer;
  padding: 10px;
  font-size: 1.3rem;
`;

const AccordionContentWrapper = styled.div`
  display: grid;
`;

const AccordionContent = styled.div`
  display: grid;
  grid-column: span 2;
  background-color: #f2f2f2;
  padding: 10px;
  font-size: 1.1rem;
`;

const CheckBtn = styled.input.attrs({ type: "checkbox" })`
  width: 25px;
  height: 25px;
  border: 1px solid #202020;
  background-color: #fafafa;
  accent-color: #202020;
  cursor: pointer;
  margin-right: 10px;
`;

const AccordionItem = ({
  item,
  checkedItems,
  handleSingleCheck,
  toggleDetails,
  openDetails,
  hotelName,
}) => {
  return (
    <AccordionItemWrapper>
      <div>
        <div>
          <CheckBtn
            onChange={(e) => handleSingleCheck(e.target.checked, item.id)}
            checked={checkedItems.includes(item.id)}
          />
        </div>
        <div>
          <AccordionButton onClick={() => toggleDetails(item.id)}>
            {item.text} {openDetails === item.id ? "▲" : "▼"}
          </AccordionButton>
        </div>
      </div>
      <AccordionContentWrapper>
        {openDetails === item.id && (
          <AccordionContent>
            {typeof item.details === "function"
              ? item.details(hotelName)
              : item.details}
          </AccordionContent>
        )}
      </AccordionContentWrapper>
    </AccordionItemWrapper>
  );
};

const SpaceAccordion = ({
  termsData,
  checkedItems,
  handleSingleCheck,
  hotelName,
}) => {
  const [openDetails, setOpenDetails] = useState(null);

  const toggleDetails = (id) => {
    setOpenDetails((prev) => (prev === id ? null : id));
  };

  return (
    <AccordionWrapper>
      {termsData.map((item) => (
        <AccordionItem
          key={item.id}
          item={item}
          checkedItems={checkedItems}
          handleSingleCheck={handleSingleCheck}
          toggleDetails={toggleDetails}
          openDetails={openDetails}
          hotelName={hotelName}
        />
      ))}
    </AccordionWrapper>
  );
};

export default SpaceAccordion;
