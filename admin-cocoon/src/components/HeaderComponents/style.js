import { Row } from "antd";
import { styled } from "styled-components";

export const WrapperHeader = styled(Row)`
    padding: 0px 60px;
    background-color:#fefbf4;background-color:#fefbf4;
    border-bottom: 1px solid #ede0cc;
`

export const TextHeader = styled.span`
    font-size:20px;
    color:#000;
    font-family: Nunito;
    text-align: center;
    cursor: pointer;
    &:hover {
        text-decoration: underline;
    }
`

export const ContentPopup = styled.p`
    font-family: Nunito;
    cursor: pointer;
    &:hover {
        color:#00bfa5;
        background-color:#fafafa;
    }
`

export const Span = styled.span`
    font-size: 18px;
    font-family: Nunito;
    cursor: pointer;
    &:hover {
        text-decoration: underline;
    }
`


export const TextHeaderH1 = styled.span`
    font-size:20px;
    color:#000;
    font-family: Nunito;
    text-align: center;
    
`
export const AccoutHeader = styled.div`
    display: flex;
    align-items: center;
    color: #000;
    gap: 10px;
    font-size:12px;
`