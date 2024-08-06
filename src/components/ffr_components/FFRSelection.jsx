import React, { useState } from 'react'

const FFRSelection = ({img, name, setFFSelect}) => {
    const [className, setClassName] = useState("FFRS");

    return (
        <button 
            className={className} 
            style={{backgroundImage: "url(" + img + ")"}} 
            onClick={() => {
                let selected = !className.includes("SELECTED");

                setClassName((selected) ? "FFRS SELECTED" : "FFRS");
                
                setFFSelect((ff_restraunts) => {
                    if (selected) {
            
                        ff_restraunts.push(name);
                    } 
                    else if(ff_restraunts.indexOf(name) !== -1){
            
                        ff_restraunts.splice(ff_restraunts.indexOf(name), 1);
                    }

                    return ff_restraunts;
                });
            }}>
        </button>
    )
}

export default FFRSelection