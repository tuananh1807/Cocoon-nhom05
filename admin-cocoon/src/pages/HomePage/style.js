import { Row } from "antd";
import { styled } from "styled-components";

export const TextHeader = styled.span`
    color:#000;
    font-family: Nunito;
    text-align: center;
    cursor: pointer;
    &:hover {
        text-decoration: underline;
    }
`

export const WrapperHeader = styled(Row)`

    border-bottom: 1px solid #ede0cc;
`