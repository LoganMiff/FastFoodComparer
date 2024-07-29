import React from 'react'
import { useState } from 'react';

// eslint-disable-next-line
const FFRClicked = (selected, setSelected) => {
    setSelected(!selected)

    alert((selected) ? "Selected!" : "Not selected!!!")

}

const FFRSelection = ({img, name}) => {
    let [selected, setSelected] = useState(true)

    return (
        <button className="FFRS" style={{
                    backgroundImage: "url(" + img + ")"
                }} 
            onClick={() => FFRClicked(selected, setSelected)}>
        </button>
    )
}

export default FFRSelection