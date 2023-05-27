import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import { useState, useEffect, useReducer } from "react";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import styled from "styled-components";
import axios from 'axios';

const AnnounceDiv = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;

    height: 40%;
    // background-color: gray;
`

const Intro = styled.h2`
    // font-weight: bold;
    // font-size: 1.5em;
    display: flex;
    justify-content: center;
    // background-color: gray;
`
const AccDiv = styled.div`
    display: flex;
    flex-direction: column;

    align-items: center;
    width: 100%;
`

export default function Announcement() {

    useEffect(() => {
        axios.get('/notice/list')
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            })
    }, [])

    return (
        <div>
            <AnnounceDiv>
                <Intro>공지사항</Intro>
            </AnnounceDiv>

            <AccDiv>
                <Accordion sx={{width: "100%", maxWidth: "520px"}}>
                    <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    >
                    <Typography>회의실 이용시 주의사항</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                    <Typography>
                        <ul>
                            <li>회의실에서 담배를 피우지 마세요.</li>
                            <li>회의실에서 음식이나 음료를 섭취하지 마세요..</li>
                            <li>회의실에서 소란을 피우지 마세요.</li>
                            <li>회의가 끝나면 회의실을 원래 상태로 되돌리세요.</li>
                        </ul>
                    </Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion sx={{width: "100%", maxWidth: "520px"}}>
                    <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    >
                    <Typography>AI센터 회의실이 오픈하였습니다.</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                    <Typography>
                        <ul>
                            <li>835호 836호 두개의 회의실이 운영중입니다.</li>
                            <li>추가적인 문의사항은 컴퓨터공학과 조교에게 연락주세요.</li>
                        </ul>
                    </Typography>
                    </AccordionDetails>
                </Accordion>
            </AccDiv>
        </div>

    );
}