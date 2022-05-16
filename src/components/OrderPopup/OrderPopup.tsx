import React from 'react';
import styled from "styled-components";
import CardText from "../Card/components/CardText";
import {useAppDispatch, useAppSelector} from "../../hooks/redux/hooks";
import ValidationInput from "../ValidationInput/ValidationInput";
import Validator from "../Validator/Validator";
import closeIcon from "../../assets/images/closeIcon.svg"
import {swapPopup} from "../../redux/actions/actions";
import ValidationSubmit from "../ValidationSubmit/ValidationSubmit";
import {api} from "../../api/api";

interface IStyledProps {
    isVisible: boolean
}

interface IProps extends IStyledProps{
    category: string,
    name: string,
    price: number,
    id: string
}



const StyledOrderPopup = styled.div<IStyledProps>`
  position: fixed;
  width: 80%;
  top: ${({isVisible}) => isVisible? "50%" : "-100%"};
  left: 50%;
  transform: translateY(-50%) translateX(-50%);
  transition: .3s ease-in-out;
  padding: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 2;
  background: var(--color-popup-primary);
  border-radius: var(--default-radius);
  font-weight: var(--default-weight);
  @media only screen and (min-width: 1280px) {
    width: 384px;
    padding: 54px 50px 66px 50px;
  }
  .card-category {
    margin-bottom: 8px;
    font-size: var(--text-small);
    text-transform: uppercase;
  }
  .card-name {
    margin-bottom: 16px;
    font-size: var(--text-middle);
    text-transform: capitalize;
  }
  .card-footer {
    margin-bottom: 32px;
    font-size: var(--text-large);
  }
  .card-price {
    font-size: var(--text-large);
    margin-left: 4px;
  }
  .card-price-holder {
    display: flex;
  }
  .card-currency {
    display: block;
    font-size: calc(var(--text-middle) - 10px);
    margin-top: 13px;
  }
  .close-icon {
    background: #F2F2F2;
    padding: 10px;
    border-radius: 50%;
    position: absolute;
    right: 0;
    top: 0;
    cursor: pointer;
    transform: translateX(30%) translateY(-30%);
    transition: 0.3s ease-in-out;
    &:hover {
      background: var(--color-buttons-primary);
    }
  }
`


const OrderPopup = ():JSX.Element => {
    const ui = useAppSelector(({ui}) => ui)
    const {_id, category, price, name} = useAppSelector(({content}) => content.cheapestProduct)
    const dispatch = useAppDispatch()

    return (
        <StyledOrderPopup isVisible={ui.isPopup}>
            <img
                src={closeIcon}
                className="close-icon"
                onClick={() => dispatch(swapPopup())}
            />
            <CardText
                id={_id}
                category={category}
                name={name}
                price={price}/>
            <Validator
                fields={{
                    name: '',
                    phone: ''
                }}
                validateByField={{
                    name: (fields, errors) => {
                        if(fields.name.trim().length === 0)  errors.name = "This field is required"
                        if(/\d/g.test(fields.name)) errors.name = "Only letters allowed"
                        return errors
                    },
                    phone: (fields, errors) => {
                        if(fields.phone.trim().length === 0) {
                            errors.phone = "This field is required"
                        }
                        if(/[^\d]+/g.test(fields.phone)) {
                            errors.phone = "Only numbers allowed"
                        }
                        if(fields.phone.length !== 12) {
                            errors.phone = "Should contain 12 characters"
                        }
                        return errors
                    }
                }}
                onSubmit={fields => {
                    console.log(fields)
                    api.apiPostCheapest(fields)
                }}
            >
                <ValidationInput
                    name={"name"}
                    placeholder={"Name"}/>
                <ValidationInput
                    name={"phone"}
                    placeholder={"Number"}/>
                <ValidationSubmit type={"submit"}/>
            </Validator>
        </StyledOrderPopup>
    )
};

export default OrderPopup;