import React, { useEffect, useState } from 'react'
import FFRSelection from './FFRSelection'

async function gatherFFR() {
    const response = await fetch("http://localhost:8080/ffrs", {
        method: "GET"
    });

    if (!response.ok) {
        console.error(`Response status: ${response.status}`);
        return [];
    }

    return response.text()
}

const FFRSelectionGen = ({setter}) => {
    const [ff_restraunt_selections, setFFRS] = useState([]);

    useEffect(() => {
        const response = gatherFFR();
        response.then(res => {
            const ff_restraunts = res.split(",");

            setFFRS(ff_restraunts.map((ff_restraunt, i) => 
                (<FFRSelection key={i} img={"/images/" + ff_restraunt + ".jpg"} name={ff_restraunt} setFFSelect={setter}></FFRSelection>)
            ));
        })
    }, 
    // eslint-disable-next-line
    []);

    return (
        <div className="FFRSelectors">
            {ff_restraunt_selections}
        </div>
    );
}

export default FFRSelectionGen;