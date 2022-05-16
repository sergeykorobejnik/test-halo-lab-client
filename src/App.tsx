import React from 'react';
import styled from "styled-components";
import CardsContainer from "./components/CardsContainer/CardsContainer";
import ErrorHandler from "./components/ErrorMessage/ErrorHandler";
import ActionButton from "./components/ActionButton/ActionButton";
import OrderPopup from "./components/OrderPopup/OrderPopup";
import Overlay from "./components/Overlay/Overlay";
import {swapPopup} from "./redux/actions/actions";
import {useAppDispatch} from "./hooks/redux/hooks";

const Wrapper = styled.div`
  max-width: 320px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  padding: 30px 0 50px 0;
  opacity: 1;
  @media only screen and (min-width: 1280px) {
    max-width: 1136px;
    padding: 105px 0 115px 0;
  }
`

const App = (): JSX.Element => {
    const dispatch = useAppDispatch()
      return(
          <div className="Halo-test">
              <Wrapper>
                  <CardsContainer/>
                  <ActionButton
                      dispatchAction={swapPopup}
                      body={"Buy cheapest"}
                  />
              </Wrapper>
              <ErrorHandler/>
              <OrderPopup/>
              <Overlay clickHandler={
                  () => {
                      dispatch(swapPopup())
                  }
              }/>
          </div>
      )
}
export default App;
