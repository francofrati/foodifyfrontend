import React, { useEffect } from 'react'
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { Outlet, NavLink, Link, useNavigate } from "react-router-dom";
import { fetchUserById } from '../../Redux/thunks/userThunks'
import './Dashboard.css'
import jwt_decode from "jwt-decode"

const Dashboard = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleClick = () => {
    navigate("/")
    window.location.reload()
    localStorage.clear()
  }


  useEffect(() => {
    if (window.localStorage.token) {
      let info = jwt_decode(window.localStorage.token);
      let id = info.id
      dispatch(fetchUserById(id));
    }


  }, []);

  const { userById } = useSelector((state) => state.user);
  

  // if (!userById.isAdmin) return <p>Access denied. Not an Admin!</p>;

  return (
    <StyledDashboard>
      <SideNav>
        <h3>Quick Links</h3>
        <NavLink
          className={({ isActive }) =>
            isActive ? "link-active" : "link-inactive"
          }
          to="/admin/summary"
        >
          Summary
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive ? "link-active" : "link-inactive"
          }
          to="/admin/products-list"
        >
          Products
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive ? "link-active" : "link-inactive"
          }
          to="/admin/orders"
        >
          Orders
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive ? "link-active" : "link-inactive"
          }
          to="/admin/restaurants"
        >
          Restaurants
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive ? "link-active" : "link-inactive"
          }
          to="/admin/users"
        >
          Users
        </NavLink>
        <div>
              <Link to={'/'} onClick={handleClick}>Logout</Link>
        </div>
      </SideNav>
      <Content>
        <Outlet />
      </Content>
    </StyledDashboard>
  );
};

export default Dashboard;

const StyledDashboard = styled.div`
  display: flex;
  min-height: 120vh;
  background-color: white !important;
`;

const SideNav = styled.div`
  border-right: 1px solid gray;
  height: calc(100vh - 70px);
  position: fixed;
  overflow-y: auto;
  width: 150px;
  display: flex;
  flex-direction: column;
  padding: 2rem;
  h3 {
    margin: 0 0 1rem 0;
    padding: 0;
    text-transform: uppercase;
    font-size: 17px;
  }
  a {
    text-decoration: none;
    margin-bottom: 1rem;
    font-size: 14px;
  }
`;

const Content = styled.div`
  margin-left: 200px;
  padding: 2rem 3rem;
  width: 100%;
`;