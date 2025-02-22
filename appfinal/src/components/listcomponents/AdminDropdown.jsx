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
    background: #f20530;
    color: #fafafa;
  }
`;

const AdminDropdown = () => {
  const menuItems = [
    { label: "관리자", path: "/adminMenu" },
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

export default AdminDropdown;
