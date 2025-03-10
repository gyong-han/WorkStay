import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/memberSlice";

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
    color: #f20530;
  }
`;

const LogoutButton = styled.button`
  width: 100%;
  padding: 8px 16px;
  background: none;
  border: none;
  text-align: left;
  color: #202020;
  cursor: pointer;
  font-size: 15px;
  font-weight: 700;
  &:hover {
    color: #f20530;
  }
`;

const AdminDropdown = ({ setIsDropdownOpen }) => {
  const dispatch = useDispatch();
  const navi = useNavigate();

  const menuItems = [{ label: "관리자", path: "/adminMenu" }];

  return (
    <DropdownContainer>
      {menuItems.map((item, index) => (
        <DropdownItem
          key={index}
          to={item.path}
          onClick={() => {
            setIsDropdownOpen(false);
          }}
        >
          {item.label}
        </DropdownItem>
      ))}
      <LogoutButton
        onClick={() => {
          localStorage.removeItem("token");
          navi("/");
          dispatch(logout());
        }}
      >
        로그아웃
      </LogoutButton>
    </DropdownContainer>
  );
};

export default AdminDropdown;
