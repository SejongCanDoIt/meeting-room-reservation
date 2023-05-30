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

const AnnouceContentBox = styled.div`
    overflow-wrap: break-word;
`

export default function Announcement() {
    const [announceDataList, setAnnounceDataList] = useState([]);

    useEffect(() => {
        axios.get('/notice/list')
            .then((res) => {
                setAnnounceDataList([...res.data]);
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
                {
                    announceDataList.map((it, idx) => (
                        <Accordion sx={{width: "100%", maxWidth: "520px"}}>
                    <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    >
                    <Typography>{it.title}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                    <Typography>
                        <AnnouceContentBox>
                            {it.content}
                        </AnnouceContentBox>
                    </Typography>
                    </AccordionDetails>
                </Accordion>
                    ))
                }
                
            </AccDiv>
        </div>

    );
}