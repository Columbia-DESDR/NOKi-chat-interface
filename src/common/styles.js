import {css} from "@emotion/react";
import styled from "@emotion/styled";

const inputBox = props => css`
  height: ${props.height ? props.height : 36}px;
  padding: 0 10px;
  font-size:  ${props.fontSize ? props.fontSize : 18}px;
  color: #4c4c4c;
`


export const InputBox = styled.input`
  ${inputBox}
`

const button = css`
  width: fit-content;
  padding: 10px;
  height: 40px;
  background: #4f4f4f;
  color: white;
  border: 0;
  cursor: pointer;
  font-size: 15px;
  text-transform: uppercase;
`

export const Button = styled.button`
  ${button}
`

export const overlayStyle = css`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const dialogBoxStyle = css`
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  text-align: center;
  max-width: 400px;
  width: 90%;
`;

export const buttonsContainerStyle = css`
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
`;

export const confirmButtonStyle = css`
  background-color: #6c757d;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  cursor: pointer;
  margin: 0 5px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #4f4f4f;
  }
`;
