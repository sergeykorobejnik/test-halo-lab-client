import React from 'react';

interface IProps {
    id: string,
    category: string,
    name: string,
    price: number,
}

const CardText = ({id, category, name, price}: IProps):JSX.Element => {
    return (
        <>
            <span className="card-category">{category}</span>
            <span className="card-name">{name}</span>
            <div className="card-footer">
                <div className="card-price-holder">
                    <span className="card-currency">$</span>
                    <span className="card-price">{price}</span>
                </div>
            </div>
        </>
    );
};

export default CardText;