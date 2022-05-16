import React from 'react';
import styled from "styled-components";
import {useAppDispatch, useAppSelector} from "../../hooks/redux/hooks";
import Card from "../Card/Card";
import {fetchCards} from "../../redux/actions/actions";

import {useFirstRenderEffect} from "../../hooks/useFirstRenderEffect";

interface IProps {

}

const StyledContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  margin-bottom: 30px;
  gap: 20px 5px;
  @media only screen and (min-width: 1280px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 40px 32px;
    margin-bottom: 69px;
  }
`

const CardsContainer = (props: IProps): JSX.Element => {
    const productArr = useAppSelector(({content}) => content.productArr)
    const dispatch = useAppDispatch()

    useFirstRenderEffect(async () => {
        dispatch(fetchCards())
    })

    return (
        <StyledContainer>
            { productArr.length > 0 &&
                productArr.map(product =>
                    <Card
                        key={product._id}
                        id={product._id}
                        category={product.category}
                        name={product.name}
                        price={product.price}
                    />)
            }
        </StyledContainer>
    );
};

export default CardsContainer;