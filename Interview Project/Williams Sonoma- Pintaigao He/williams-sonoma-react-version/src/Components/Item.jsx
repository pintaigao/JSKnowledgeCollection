import React from 'react';
import "./Item.css"

let Item = (props) => {
    let img = props.item.hero.href
    let itemName = props.item.name

    let price = 0;
    if (props.item.price) {
        price = props.item.price.regular
    } else if (props.item.priceRange) {
        price = props.item.priceRange.regular.high;
    } else {
        price = 0;
    }

    return (
        <div className="item-container">
            <div className="item-container-image">
                <img src={img} alt={itemName} />
                <div className="item-container-price">
                    <p>$ {price}</p>
                </div>
            </div>
            <div className="item-name">
                <p>{itemName}</p>
            </div>
        </div>
    )
}

export default Item;

