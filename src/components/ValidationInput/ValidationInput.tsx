import React, {ChangeEvent, SyntheticEvent, useContext, useEffect, useState} from 'react';
import styled from "styled-components";
import {ValidationContext} from "../../reactContext/reactContext";
import validationError from "../../assets/images/validationError.svg"
interface IProps {
    name: string
    placeholder: string,
    type?: string
}

interface IStyledInput {
    borderColor: BorderTypes
}

interface IVisible {
    isVisible: boolean
}

enum BorderTypes {
    default = "rgba(0, 0, 0, 0.2)",
    passed = "var(--color-buttons-primary)",
    error = "var(--color--error)"
}

const InputHolder = styled.div`
  position: relative;
  align-self: stretch;
  
`
const Input = styled.input<IStyledInput>`
  border: 1px solid ${({borderColor}) => borderColor};
  color: rgba(0, 0, 0, .5);
  font-size: var(--text-small);
  font-weight: var(--default-weight);
  width: 100%;
  padding: 16px;
  border-radius: calc(var(--default-radius) * 0.75);
  margin-bottom: 16px;
  transition: .3s ease-in-out;
  @media only screen and (min-width: 1280px) {
    border-radius: calc(var(--default-radius) / 1.5);
    margin-bottom: 16px;
  }
  &:focus {
    outline: none;
  }
  &:last-of-type {
    margin-bottom: 32px;
  }
`

const ErrorText = styled.span<IVisible>`
  position: absolute;
  color: var(--color--error);
  font-size: 12px;
  font-weight: var(--default-weight);
  bottom: 0;
  left: 0;
  transform: translateY(-100%);
  width: fit-content;
  opacity: ${({isVisible}) => isVisible ? "1" : "0"};
  transition: .3s ease-in-out;
`

const ValidationErrorImage = styled.img<IVisible>`
  position: absolute;
  right: 11px;
  top: 14px;
  width: 24px;
  height: 24px;
  opacity: ${({isVisible}) => isVisible ? "1" : "0"};
  transition: .3s ease-in-out;
`


const ValidationInput = ({placeholder, name, type}: IProps):JSX.Element => {

    const validationContext = useContext(ValidationContext)
    const {fields, errors, touched} = validationContext
    const [value, setValue] = useState(fields[name])
    const handleChanges = (event: ChangeEvent<HTMLInputElement>):void => {
        const {value} = event.target
        fields[name] = value
        setValue(value)
    }

    const handleInputState = (): BorderTypes => {
        if(errors?.[name]?.length === 0 && !touched?.[name]) return BorderTypes.default
        if(errors?.[name]?.length > 0) return BorderTypes.error
        if(errors?.[name]?.length === 0 && touched?.[name]) return BorderTypes.passed
        return BorderTypes.default
    }

    return (
        <InputHolder>
            <Input
                borderColor={handleInputState()}
                type={type ? type : "text"}
                placeholder={placeholder}
                value={value}
                onChange={handleChanges}
                onBlur={() => validationContext.validate(name)}
                onFocus={() => validationContext.focus(name)}
            />
            <ValidationErrorImage
                src={validationError}
                isVisible={handleInputState() === BorderTypes.error}
            />
            <ErrorText
                isVisible={handleInputState() === BorderTypes.error}
            >{errors?.[name]}</ErrorText>

        </InputHolder>
    );
};

export default ValidationInput;