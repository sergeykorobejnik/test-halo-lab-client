import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import {useAppDispatch, useAppSelector} from "../../hooks/redux/hooks";
import {clearServerError} from "../../redux/actions/actions";


interface IStyledProps {
    isVisible: boolean
}
interface IProps {

}

const Error = styled.div<IStyledProps>`
  position: fixed;
  z-index: 5;
  left: 50%;
  transform: translateX(-50%) translateY(${({isVisible}) => 
          isVisible ? "50%" : "-101%"});
  top: 0;
  transition: transform .5s;
  color: var(--color-buttons-secondary);
  font-size: calc(var(--text-middle) * 0.5);
  background: var(--color--error);
  border-radius: calc(var(--default-radius) * 0.75);
  padding: 10px 15px;
`

const ErrorHandler = (props:IProps ): JSX.Element => {
    const error = useAppSelector(({error}) => error.serverError)
    const dispatch = useAppDispatch()
    useEffect(() => {
        setTimeout(() => dispatch(clearServerError()), 2e3)
    }, [error])

    return (
        <Error isVisible={error.errorState}>
            <span>{error.errorText}</span>
        </Error>
    );
};

export default ErrorHandler;