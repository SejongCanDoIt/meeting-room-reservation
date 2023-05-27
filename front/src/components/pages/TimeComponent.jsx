import styled from "styled-components"
import { useState } from "react";

const BaseBox = styled.div`
  display: flex;

  margin: 10px 0px;
`

const CompleteBtn = styled.button`
    width: 100%;
    height: 30px;

    font-weight: bold;


    border-radius: 5px;
    background-color: #343a40;
    color: white;
`

const DayOrNightBtnBox = styled.button`
    border-radius: 5px;
    border:none;
    // background-color: #343a40;
    background-color: ${(props) => (props.selected === props.timeSelected) ? "#02c39a"  : "#343a40"};
    color: white;

    height: 30px;

    margin: 1px;
    font-weight: bold;
    flex: 1;
`

const HourBtnBox = styled.button`
    border-radius: 5px;
    border:none;
    // background-color: #343a40;
    background-color: ${(props) => (props.selected === props.hourSelected) ? "#02c39a"  : "#343a40"};
    color: white;

    height: 30px;

    margin: 1px;
    font-weight: bold;
    flex: 1;
`

const MinuteBtnBox = styled.button`
    border-radius: 5px;
    border:none;
    // background-color: #343a40;
    background-color: ${(props) => (props.selected === props.minuteSelected) ? "#02c39a"  : "#343a40"};
    color: white;

    height: 30px;

    margin: 1px;
    font-weight: bold;
    flex: 1;
`

const LabelBox = styled.div`
    flex: 0.4;
    font-weight: bold;
`
const DayAndNightContentBox = styled.div`
    flex: 1;
    display: flex;
    justify-content: space-between;
`

const TimeContentBox = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
`

const InnerTimeBox = styled.div`
    display: flex;
    justify-content: space-between;
`


export default function TimeComponent({handleClose, selectMorningHandler, selectHourHandler, selectMinuteHandler}) {
    
    const [timeSelected, setTimeSelected] = useState();
    const [hourSelected, setHourSelected] = useState();
    const [minuteSelected, setMinuteSelected] = useState();

    const onTimeHandler = (time) => {
        setTimeSelected(time);
        selectMorningHandler(time);
        console.log(time);
    }

    const onHourHandler = (hour) => {
        setHourSelected(hour);
        selectHourHandler(hour);
    }

    const onMinuteHandler = (minute) => {
        setMinuteSelected(minute);
        selectMinuteHandler(minute);
    }

    return (
        <div>
            <BaseBox>
                <LabelBox>오전/오후</LabelBox>
                <DayAndNightContentBox>
                    <DayOrNightBtnBox selected="오전" timeSelected={timeSelected} onClick={() => {onTimeHandler("오전")}}>오전</DayOrNightBtnBox>
                    <DayOrNightBtnBox selected="오후" timeSelected={timeSelected} onClick={() => {onTimeHandler("오후")}}>오후</DayOrNightBtnBox>
                </DayAndNightContentBox>
            </BaseBox>
            <BaseBox>
                <LabelBox>시</LabelBox>
                <TimeContentBox>
                    <InnerTimeBox>
                        <HourBtnBox selected="1" hourSelected={hourSelected} onClick={() => {onHourHandler("1")}}>1</HourBtnBox>
                        <HourBtnBox selected="2" hourSelected={hourSelected} onClick={() => {onHourHandler("2")}}>2</HourBtnBox>
                        <HourBtnBox selected="3" hourSelected={hourSelected} onClick={() => {onHourHandler("3")}}>3</HourBtnBox>
                        <HourBtnBox selected="4" hourSelected={hourSelected} onClick={() => {onHourHandler("4")}}>4</HourBtnBox>
                        <HourBtnBox selected="5" hourSelected={hourSelected} onClick={() => {onHourHandler("5")}}>5</HourBtnBox>
                        <HourBtnBox selected="6" hourSelected={hourSelected} onClick={() => {onHourHandler("6")}}>6</HourBtnBox>
                    </InnerTimeBox>
                    <InnerTimeBox>
                        <HourBtnBox selected="7" hourSelected={hourSelected} onClick={() => {onHourHandler("7")}}>7</HourBtnBox>
                        <HourBtnBox selected="8" hourSelected={hourSelected} onClick={() => {onHourHandler("8")}}>8</HourBtnBox>
                        <HourBtnBox selected="9" hourSelected={hourSelected} onClick={() => {onHourHandler("9")}}>9</HourBtnBox>
                        <HourBtnBox selected="10" hourSelected={hourSelected} onClick={() => {onHourHandler("10")}}>10</HourBtnBox>
                        <HourBtnBox selected="11" hourSelected={hourSelected} onClick={() => {onHourHandler("11")}}>11</HourBtnBox>
                        <HourBtnBox selected="12" hourSelected={hourSelected} onClick={() => {onHourHandler("12")}}>12</HourBtnBox>
                    </InnerTimeBox>
                </TimeContentBox>
            </BaseBox>
            <BaseBox>
                <LabelBox>분</LabelBox>
                <TimeContentBox>
                    <InnerTimeBox>
                        <MinuteBtnBox selected="00" minuteSelected={minuteSelected} onClick={() => {onMinuteHandler("00")}}>00</MinuteBtnBox>
                        <MinuteBtnBox selected="05" minuteSelected={minuteSelected} onClick={() => {onMinuteHandler("05")}}>05</MinuteBtnBox>
                        <MinuteBtnBox selected="10" minuteSelected={minuteSelected} onClick={() => {onMinuteHandler("10")}}>10</MinuteBtnBox>
                        <MinuteBtnBox selected="15" minuteSelected={minuteSelected} onClick={() => {onMinuteHandler("15")}}>15</MinuteBtnBox>
                        <MinuteBtnBox selected="20" minuteSelected={minuteSelected} onClick={() => {onMinuteHandler("20")}}>20</MinuteBtnBox>
                        <MinuteBtnBox selected="25" minuteSelected={minuteSelected} onClick={() => {onMinuteHandler("25")}}>25</MinuteBtnBox>
                    </InnerTimeBox>
                    <InnerTimeBox>
                        <MinuteBtnBox selected="30" minuteSelected={minuteSelected} onClick={() => {onMinuteHandler("30")}}>30</MinuteBtnBox>
                        <MinuteBtnBox selected="35" minuteSelected={minuteSelected} onClick={() => {onMinuteHandler("35")}}>35</MinuteBtnBox>
                        <MinuteBtnBox selected="40" minuteSelected={minuteSelected} onClick={() => {onMinuteHandler("40")}}>40</MinuteBtnBox>
                        <MinuteBtnBox selected="45" minuteSelected={minuteSelected} onClick={() => {onMinuteHandler("45")}}>45</MinuteBtnBox>
                        <MinuteBtnBox selected="50" minuteSelected={minuteSelected} onClick={() => {onMinuteHandler("50")}}>50</MinuteBtnBox>
                        <MinuteBtnBox selected="55" minuteSelected={minuteSelected} onClick={() => {onMinuteHandler("55")}}>55</MinuteBtnBox>
                    </InnerTimeBox>
                </TimeContentBox>
            </BaseBox>
            <BaseBox>
                <CompleteBtn onClick={handleClose}>완료</CompleteBtn>
            </BaseBox>

        </div>

    );
}