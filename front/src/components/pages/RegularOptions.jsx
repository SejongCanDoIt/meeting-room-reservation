import styled from "styled-components";

export default function RegularOptions({month, date}) {
    return (
        <RegularContainer>
            <h3>{month}월 {date}일부터</h3>
            <SeletedTagBox>
                <SeletedTag name="times" id="times">
                    <option value="one">1화</option>
                    <option value="two">2회</option>
                    <option value="three">3회</option>
                </SeletedTag>
            </SeletedTagBox>
        </RegularContainer>

    );
}

const RegularContainer = styled.div`
    width: 100%;

    display: flex;
    justify-content: space-around;

    background-color: #95FFE6;
    max-width: 350px;

    border-radius: 8px;

    margin-top: 10px;
`
const SeletedTagBox = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;

    width: 100%;

    flex: 0.5;

    // background-color: red;
`

const SeletedTag = styled.select`
    width: 100px;
    height: 30px;

`