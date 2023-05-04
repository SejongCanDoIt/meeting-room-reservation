import styled from "styled-components";

export default function TimeSelect({onSelectHandler, selectData, dataType}) {
    return (
        <SelectTag onChange={onSelectHandler}>
            {selectData.map((it, idx) => <option key={it} value={it}>{it}{dataType}</option>)}
        </SelectTag>

    );
}

const SelectTag = styled.select`
    width: 40%;
    border: none;

    font-size: 17px;
    color: black;

    -webkit-border-radius: 10px;
    
`