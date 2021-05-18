/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import * as RiIcons from 'react-icons/ri';
import styled from 'styled-components';
import { IconContext } from 'react-icons/lib';
import { Link } from 'react-router-dom';

const Nav = styled.div`
  background: #15171c;
  height: 80px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const NavIcon = styled(Link)`
  margin-left: 2rem;
  font-size: 2rem;
  height: 80px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const SidebarNav = styled('nav') <{ sidebar: boolean }>`
  background: #15171c;
  width: 250px;
  height: 100vh;
  display: flex;
  justify-content: flex-start;
  position: fixed;
  top: 0px;
  left: ${({ sidebar }) => (sidebar ? '0' : '-100%')};
  transition: 350ms;
  z-index: 10;
`;

const SidebarWrap = styled.div`
  width: 100%;
`;

const SubMenu = ({ item, showSidebar }) => {
    const [subnav, setSubnav] = React.useState(false);
    const showSubnav = () => setSubnav(!subnav);
    const SidebarLink = styled(Link)`
    display: flex;
    color: #e1e9fc;
    justify-content: space-around;
    align-items: center;
    padding: 20px;
    list-style: none;
    height: 60px;
    text-decoration: none;
    font-size: 18px;
    &:hover {
      background: #252831;
      border-left: 4px solid #632ce4;
      cursor: pointer;
    }
  `;
    const SidebarLabel = styled.span`
    margin-left: 16px;
  `;
    const DropDownLink = styled(Link)`
    background: #414757;
    height: 60px;
    padding-left: 1.5rem !important;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    text-decoration: none;
    color: #f5f5f5;
    font-size: 18px;
    &:hover {
      background: #632ce4;
      cursor: pointer;
    }
  `;
    return (
        <>
            <IconContext.Provider value={{ color: 'red' }}>
                <SidebarLink to={item.path} onClick={item.subNav && showSubnav}>
                    <div>
                        {item.icon}
                        <SidebarLabel>{item.title}</SidebarLabel>
                    </div>
                    <div className="">
                        {item.subNav && subnav ? (
                            <span className="bg-white">{item.iconOpened}</span>
                        ) : item.subNav ? (
                            <span className="bg-white">{item.iconClosed}</span>
                        ) : null}
                    </div>
                </SidebarLink>

                {subnav &&
                    item.subNav.map((item, index) => {
                        return (
                            <DropDownLink onClick={showSidebar} to={item.path} key={index}>
                                {item.icon}
                                <SidebarLabel>{item.title}</SidebarLabel>
                            </DropDownLink>
                        );
                    })}
            </IconContext.Provider>
        </>
    );
};
const sidebarData = [
    {
        title: 'Users',
        path: '/admin',
        icon: <AiIcons.AiFillHome className="mr-2" size={25} />,
        iconClosed: <RiIcons.RiArrowDownSFill />,
        iconOpened: <RiIcons.RiArrowUpSFill />,
        subNav: [
            {
                title: 'Add User',
                path: '/admin/add-user',
                icon: <IoIcons.IoIosPaper className="mr-2" size={20} />,
            },
            {
                title: 'All Users',
                path: '/admin/all-users',
                icon: <IoIcons.IoIosPaper className="mr-2" size={20} />,
            },
        ],
    },
    {
        title: 'Twitter',
        path: '/admin',
        icon: <AiIcons.AiFillHome className="mr-2" size={25} />,
        iconClosed: <RiIcons.RiArrowDownSFill />,
        iconOpened: <RiIcons.RiArrowUpSFill />,
        subNav: [
            {
                title: 'Tweets Targets ',
                path: '/admin/twitter/all-tweets-targets',
                icon: <IoIcons.IoIosPaper className="mr-2" size={20} />,
            },
            {
                title: 'Profile Targets ',
                path: '/admin/twitter/all-profile-targets',
                icon: <IoIcons.IoIosPaper className="mr-2" size={20} />,
            },
        ],
    },
];
export default function Sidebar() {
    const [sidebar, setSideBar] = React.useState(false);
    const showSidebar = () => {
        setSideBar(!sidebar);
    };
    const SidebarWrapper = styled.div`
    background: #d61212;
    width: 100%;
    height: 100%;
  `;
    return (
        <>
            {' '}
            <Nav>
                <NavIcon to="#">
                    <FaIcons.FaBars onClick={showSidebar} />
                </NavIcon>
            </Nav>
            <SidebarNav sidebar={sidebar}>
                <SidebarWrap>
                    <NavIcon to="#">
                        <AiIcons.AiOutlineClose onClick={showSidebar} />
                    </NavIcon>
                    {sidebarData.map((item, index) => {
                        return (
                            <SubMenu showSidebar={showSidebar} item={item} key={index} />
                        );
                    })}
                </SidebarWrap>
            </SidebarNav>
        </>
    );
}
