import React from 'react'

const FFItem = (props) => {
    const objKeys = Object.keys(props.children);

    const units = {"calories":"", "fat":"g", "cholesterol":"mg", "sodium":"mg", "carbs":"g", "protein":"g"}

    const left = props.maximize.toLowerCase();
    const right = props.minimize.toLowerCase();

    objKeys.splice(0, 2);
    objKeys.splice(objKeys.indexOf(left), 1);
    objKeys.splice(objKeys.indexOf(right), 1);
    objKeys.splice(objKeys.indexOf("is_drink", 1));

    let itemProps = [
        <td key={0}>{`#${props.rank}`}</td>,
        <td key={1} className="FFR_IMAGE" style={{backgroundImage: `url(/images/${props.children.fast_food_restraunt}.jpg)`}} />,
        <td key={2}>{props.children.item_name}</td>,
        <td key={3}>{props.children[left] + units[left]}</td>,
        <td key={4}>{props.children[right] + units[right]}</td>
    ];

    for (let i = 0; i < objKeys.length; ++i) {
        itemProps.push(<td key={i + 5}>{props.children[objKeys[i]] + units[objKeys[i]]}</td>);
    }

    return (
        <tr>
            {itemProps}
        </tr>
    )
}

export default FFItem;