import React from 'react';
import styled from "styled-components";
import {useAppSelector} from "../../hooks/redux/hooks";
interface IProps {
    clickHandler?: () => void
}

interface IStyledProps {
    isActive: boolean
}
const BodyOverlay = styled.div<IStyledProps>`
  position: fixed;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  z-index: ${({isActive}) => isActive ? 1 : -1};
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.8);
  opacity: ${({isActive}) => isActive ? 1 : 0};
  transition: 0.5s ease-in-out;
`

const Overlay = (props: IProps):JSX.Element => {
    const isOverlay = useAppSelector(({ui}) => ui.isOverlay)
    return (
        <>
            <BodyOverlay isActive={isOverlay} onClick={props.clickHandler}/>
        </>
    );
};

export default Overlay;