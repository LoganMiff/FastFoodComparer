import React, { useEffect, useState } from 'react'
import FFRSelection from './FFRSelection'
import FFQueryButton from '../FFQueryButton';

async function gatherFFR() {
    const response = await fetch("http://localhost:8080/ffrs", {
        method: "GET"
    });

    if (!response.ok) {
        console.error(`Response status: ${response.status}`);
    }

    return response.text()
}

const FFRSelectionGen = () => {
    const [ff_restraunt_selections, setFFRS] = useState(null);

    useEffect(() => {
        const response = gatherFFR();
        response.then(res => {
            const ff_restraunts = res.split(",");

            setFFRS(ff_restraunts.map((ff_restraunt) => 
                (<FFRSelection img={"/images/" + ff_restraunt + ".jpg"} name={ff_restraunt}></FFRSelection>)
            ));
        })
    }, []);

    return (
        <div className="FFRSelectors">
            {ff_restraunt_selections}
        </div>
    );
}

export default FFRSelectionGen;