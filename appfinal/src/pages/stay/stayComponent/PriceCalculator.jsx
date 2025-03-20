import React from "react";
import styled from "styled-components";

const PriceWrapper = styled.div`
  margin-top: 20px;
  padding: 10px;
  font-size: 1.2rem;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
`;

const TotalPrice = styled.div`
  font-size: 1.4rem;
  font-weight: 600;
  padding-top: 10px;
  display: flex;
  justify-content: space-between;
`;

const PriceCalculator = ({
  checkIn,
  checkOut,
  adult,
  child,
  roomPrice,
  maxAdults,
}) => {
  const [totalPrice, setTotalPrice] = useState(0);
  useEffect(() => {
    if (!checkIn || !checkOut) return;

    // 숙박 일수 계산
    const stayDays = Math.max((checkOut - checkIn) / (1000 * 60 * 60 * 24), 1);

    // 기본 객실 요금 계산
    let basePrice = stayDays * roomPrice;

    // 추가 인원 요금 계산 (성인 초과 시)
    const extraAdults = Math.max(adult - maxAdults, 0);
    const extraAdultFee = extraAdults * 20000 * stayDays;

    // 최종 요금 계산
    const finalPrice = basePrice + extraAdultFee;
    setTotalPrice(finalPrice);
  }, [checkIn, checkOut, adult, child, roomPrice, maxAdults]);

  return (
    <>
      <PriceWrapper>
        <Row>
          <span>객실 요금</span>
          <span>₩{roomPrice.toLocaleString()}</span>
        </Row>
        {checkIn && checkOut && (
          <>
            <Row>
              <span>{checkIn.toLocaleDateString()}</span>
              <span>₩{roomPrice.toLocaleString()}</span>
            </Row>
            <Row>
              <span>{checkOut.toLocaleDateString()}</span>
              <span>₩{roomPrice.toLocaleString()}</span>
            </Row>
          </>
        )}
        <TotalPrice>
          <span>총 금액</span>
          <span>₩{totalPrice.toLocaleString()}</span>
        </TotalPrice>
      </PriceWrapper>
    </>
  );
};

export default PriceCalculator;
