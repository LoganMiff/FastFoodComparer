import React, { useEffect, useState } from 'react'
import FFItem from './FFItem';

const FFItemGen = (props) => {
    const [ff_items, setFFItems] = useState(props.children);
    const [ff_headers, setFFHeaders] = useState([]);

    useEffect(() => {
        const left = props.maximizer.toLowerCase();
        const right = props.minimizer.toLowerCase();
        
        const unsorted_items = ((!props.drinks_shown) ? props.children.filter((item) => (!item.is_drink)) : props.children);

        const items = unsorted_items.toSorted((smaller_obj, larger_obj) => {
            if (smaller_obj[left] === larger_obj[left] && larger_obj[left] === 0) {
              return smaller_obj[right] - larger_obj[right];
            }
      
            const smaller_ratio = smaller_obj[left] / ((smaller_obj[right] === 0) ? 1 : smaller_obj[right]);
            const larger_ratio = larger_obj[left] / ((larger_obj[right] === 0) ? 1 : larger_obj[right]);
            
            return larger_ratio - smaller_ratio;
        }).slice(props.view_start, props.view_start + 50);

        setFFItems(items.map((item, rank) => (<FFItem rank={props.view_start + rank + 1} maximize={props.maximizer} minimize={props.minimizer}>{item}</FFItem>)));
    },
    // eslint-disable-next-line 
    [props]);

    useEffect(() => {
        const default_headers = ["Calories",
            "Fat",
            "Cholesterol",
            "Sodium",
            "Carbs",
            "Protein"];

        setFFHeaders([<th>{props.maximizer}</th>, <th>{props.minimizer}</th>]);

        default_headers.splice(default_headers.indexOf(props.maximizer), 1)
        default_headers.splice(default_headers.indexOf(props.minimizer), 1)

        setFFHeaders((ffhs) => ffhs.concat(default_headers.map((header) => (<th>{header}</th>))));
    }, [props.maximizer, props.minimizer]);

    if (props.children.length === 0) {
        return;
    }

    return (
        <table className="FFI_TABLE">
            <thead>
                <tr>
                    <th>Rank</th>
                    <th>Restaurant</th>
                    <th>Item Name</th>
                    {ff_headers}
                </tr>
            </thead>
            <tbody>
                {ff_items}
            </tbody>
        </table>
    );
}

export default FFItemGen;