import AdminTopContainer from './AdminTopContainer';
import AdminSideBar from './AdminSideBar';
import styled from 'styled-components';
import axios from "axios"
import React, { useEffect, useState } from 'react';
import { Snackbar } from '@mui/material';
import MuiAlert from '@mui/lab/Alert';
import NoShowChart from './NoShowChart';
import background from "../../assets/background.jpg";

export default function AdminMainPage() {
    return (
        <>
            <AdminTopContainer />
            <AdminSideBar />
            <Background>
                <NoshowBackGround>
                    <StyledHeader>이번 달 노쇼 통계</StyledHeader>
                    <NoShowChart></NoShowChart>
                </NoshowBackGround>
            </Background>
        </>
    );
}

const Background = styled.div`
    position: relative;
    background-image: url(${background});
    background-size: cover;
    background-repeat: no-repeat;
    height: 96vh;
    width: 100%;
`;

const NoshowBackGround = styled.div`
    position: absolute;
    right: 10vw;
    top: 50%;
    transform: translateY(-50%);
    background: #ffffff;
    border-radius: 15px;
    padding: 20px;
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
`;

const StyledHeader = styled.h1`
    margin-bottom: 20px;
`;


