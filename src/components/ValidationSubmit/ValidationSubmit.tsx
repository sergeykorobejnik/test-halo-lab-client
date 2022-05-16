import React, {SyntheticEvent, useContext} from 'react';
import styled from "styled-components";
import {ValidationContext} from "../../reactContext/reactContext";
import {IValidationContext} from "../../types/types";

interface IProps {
    type: "button" | "submit" | "reset",
}

const ValidationSubmitButton = styled.button`
  padding: 12px 10px;
  align-self: stretch;
  text-align: center;
  font-size: var(--text-small);
  font-weight: var(--default-weight);
  background: var(--color-buttons-primary);
  color: var(--color-buttons-secondary);
  border-radius: calc(var(--default-radius) * 0.75);
  border: none;
  cursor: pointer;
  @media only screen and (min-width: 1280px) {
    padding: 16px 10px;
    border-radius: var(--default-radius);
  }
`

const ValidationSubmit = ({type}: IProps): JSX.Element => {
    const validationContext = useContext<IValidationContext>(ValidationContext)

    return (
        <ValidationSubmitButton
            type={type}
        >ORDER</ValidationSubmitButton>
    );
};

export default ValidationSubmit;