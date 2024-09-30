import React, { useEffect, useState } from 'react';

async function gatherCols() {
    const response = await fetch("http://localhost:8080/macro_cols", {
        method: "GET"
    });

    if (!response.ok) {
        console.error(`Response status: ${response.status}`);
    }

    const text = await response.text();

    return text.substring(text.indexOf(",") + 1);
}

const FFMacroSelection = ({selection, other_selection, setter, id}) => {
    const [macros, setMacros] = useState(null)
    const [col_names, setColNames] = useState([]);

    useEffect(() => {
        const response = gatherCols();
        
        response.then(res => {
            const cols = res.split(',').map((col) => (col[0].toUpperCase() + col.substring(1)));

            setColNames(cols.concat([]));

            cols.splice(cols.indexOf(selection), 1);
            cols.splice(cols.indexOf(other_selection), 1);
            cols.splice(cols.indexOf("is_drink"), 1);

            setMacros(cols.map((col, i) =>
                (<p key={i} onClick={() => setter(col)}>{col}</p>)
            ));
        }); 
    }, 
    // eslint-disable-next-line
    []);

    useEffect(() => {
        const cols = col_names.concat([]);

        cols.splice(cols.indexOf(selection), 1);
        cols.splice(cols.indexOf(other_selection), 1);
        cols.splice(cols.indexOf("is_drink"), 1);

        setMacros(cols.map((col, i) =>
            (<li key={i} onClick={() => setter(col)}>{col}</li>)
        ));
    }, 
    // eslint-disable-next-line
    [selection, other_selection]);

    return (
        <div id={id} className="macro_dropdown">
            <label for={`touch_${id}`}>
                <span className="unselectable">
                    {selection}
                </span>
            </label>

            <input type="checkbox" id={`touch_${id}`} />

            <ul className="dropdown_options">
                {macros}
            </ul>
            
        </div>
    );
}

export default FFMacroSelection;