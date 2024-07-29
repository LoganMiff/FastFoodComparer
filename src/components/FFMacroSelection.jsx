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

const FFMacroSelection = () => {
    const [macros, setMacros] = useState(null)

    const [macro, setMacro] = useState("Select Macro:")

    useEffect(() => {
        const response = gatherCols();
        
        response.then(res => {
            const cols = res.split(',');

            let col_names = cols.map((col) => (col[0].toUpperCase() + col.substring(1)));

            setMacros(col_names.map((col_name, i) =>
                (<p onClick={() => setMacro(col_name)}>{col_name}</p>)
            ));
        });
    }, []);

    return (
        <div className="macro_dropdown">
            <h2>{macro}</h2>
            <div className="dropdown_options">
                {macros}
            </div>
        </div>
    );
}

export default FFMacroSelection;