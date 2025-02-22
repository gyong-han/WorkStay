import styled from "styled-components";
import { Link } from "react-router-dom";

const DropdownContainer = styled.div`
  position: absolute;
  margin-top: 8px;
  width: 192px;
  background: #fafafa;
  border: 1px solid #d9d9d9;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  border-radius: 4px;
`;

const DropdownItem = styled(Link)`
  display: block;
  padding: 8px 16px;
  color: #202020;
  text-decoration: none;
  &:hover {
    background: #2b8c44;
    color: #fafafa;
  }
`;

const HostDropdown = () => {
  const menuItems = [
    { label: "숙소 예약 정보", path: "/hostMenu" },
    { label: "공간 예약 정보", path: "/hostMenu/spaceReserv" },
    { label: "S-LOG 관리", path: "/hostMenu/slogMgmt" },
    { label: "북마크", path: "/hostMenu/bookmark" },
    { label: "메시지", path: "/hostMenu/message" },
    { label: "회원 정보 수정", path: "/hostMenu/editHost" },
    { label: "호스트 관리", path: "/hostMenu/hostMgmtMenu" },
    { label: "로그아웃", path: "#" },
  ];

  return (
    <DropdownContainer>
      {menuItems.map((item, index) => (
        <DropdownItem key={index} to={item.path}>
          {item.label}
        </DropdownItem>
      ))}
    </DropdownContainer>
  );
};

export default HostDropdown;
