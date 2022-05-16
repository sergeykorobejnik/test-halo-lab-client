import React from 'react';
import styled from "styled-components";
import CardText from "./components/CardText";

interface IProps {
    id: string,
    category: string,
    name: string,
    price: number,
}

const StyledCard = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 20px;
    width: 100%;
    color: var(--color-card-primary);
    font-weight: var(--default-weight);
    background: var(--color-card-background);
    border-radius: var(--default-radius);
    user-select: none;
    @media only screen and (min-width: 1280px) {
      padding: 32px;
    }
    &:hover {
      .card-buy-btn {
        background: var(--color-buttons-primary);
        color: var(--color-buttons-secondary);
        border: 1px solid var(--color-buttons-primary);
      }
    }
  .card-col {
    display: flex;
    flex-direction: column;
    &:last-of-type {
      justify-content: flex-end;
    }
  }
  .card-category {
      font-size: var(--text-small);
      color: var(--color-card-secondary);
      text-transform: uppercase;
      margin-bottom: 8px;
    }
      .card-name {
        font-size: var(--text-middle);
        margin-bottom: 15px;
        text-transform: capitalize;
        flex-grow: 1;
        white-space: nowrap;
        @media only screen and (min-width: 1280px) {
          margin-bottom: 40px;
        }
      }
      
      .card-footer {
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
      .card-price-holder {
        display: flex;
      }
      .card-currency {
        display: block;
        font-size: calc(var(--text-middle) - 10px);
        margin-top: 13px;
      }
      .card-price {
        font-size: var(--text-large);
        margin-left: 4px;
      }
      .card-buy-btn {
        border-radius: calc(var(--border-buttons-default) * 0.75);
        padding: 10px;
        text-transform: uppercase;
        border: 1px solid rgba(0, 0, 0, 0.1);
        background: var(--color-buttons-secondary);
        font-weight: var(--regular-weight);
        color: var(--color-buttons-primary);
        transition: .3s ease-in-out;
        cursor: pointer;
        @media only screen and (min-width: 1280px) {
          padding: 16px;
          border-radius: var(--border-buttons-default)
        }
      }
`

const Card = ({id, category, name, price}: IProps): JSX.Element => {
    return (
        <StyledCard>
            <div className="card-col">
                <CardText
                    id={id}
                    category={category}
                    name={name}
                    price={price}/>
            </div>
            <div className="card-col">
                <button
                    className="card-buy-btn"
                >Buy</button>
            </div>
        </StyledCard>
    );
};

export default Card;