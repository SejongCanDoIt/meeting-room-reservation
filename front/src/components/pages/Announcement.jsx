import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import styled from "styled-components";

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

export default function Announcement() {
    return (
        <div>
            <AnnounceDiv>
                <Intro>공지사항</Intro>
            </AnnounceDiv>

            <div>
                <Accordion>
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
            </div>
        </div>

    );
}