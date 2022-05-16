import React from 'react';
import {AppDispatch} from "../../redux/store";
import {useAppDispatch} from "../../hooks/redux/hooks";
import styled from "styled-components";

interface IProps {
    dispatchAction: () => any,
    body: string
}

const StyledActionButton = styled.button`
  padding: 16px 48px;
  font-size: calc(var(--text-small) * 1.5);
  font-weight: var(--default-weight);
  text-transform: capitalize;
  background: var(--color-buttons-primary);
  color: var(--color-buttons-secondary);
  border-radius: calc(var(--default-radius) / 1.5);
  border: none;
  align-self: center;
  cursor: pointer;
`

const ActionButton = (props: IProps): JSX.Element => {
    const dispatch = useAppDispatch()
    return (
        <StyledActionButton
            onClick={() => {dispatch(props.dispatchAction())}}
        >{props.body}</StyledActionButton>
    );
};

export default ActionButton;