import './App.css';

import React, {useState} from 'react'

import FFRSelectionGen from './components/ffr_components/FFRSelectionGen';

import FFMacroSelection from './components/ffm_components/FFMacroSelection';

import FFItemGen from './components/ffi_components/FFItemGen';

const gatherFFItems = async (ffrs) => {
  const response = await fetch(`http://localhost:8080/data?tables=${ffrs}`, {
    method: "GET"
  });

  if (!response.ok) {
    console.error(`Failed to gather items: ${response.status}`)
    return []
  }

  return response.text();
}

const runQuery = (left, right, ffrs, setFFItems) => {
  if (ffrs.length === 0) {
    return;
  }

  left = left.toLowerCase();
  right = right.toLowerCase();

  const ff_restraunts = ffrs.join()

  const returned_items_object = gatherFFItems(ff_restraunts);

  returned_items_object.then((items_json) => {

    const items_object = JSON.parse(items_json);

    setFFItems(items_object.food_items);
  });
};

function App() {
  const [macroLeft, setLeft] = useState("Protein");
  const [macroRight, setRight] = useState("Calories");

  const [ff_restraunts, setFFRestraunts] = useState([]);
  const [ff_items, setFFItems] = useState([]);

  const [ffitem_view_start, setFFIViewStart] = useState(0);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Fast Food Ranker</h1>
        
        <div className="QUERY_SELECTION">
            <div id="FFMSelectors">
                <FFMacroSelection id="left" selection={macroLeft} other_selection={macroRight} setter={setLeft}></FFMacroSelection>
                <FFMacroSelection id="right" selection={macroRight} other_selection={macroLeft} setter={setRight}></FFMacroSelection>
            </div>
        </div>

        <FFItemGen view_start={ffitem_view_start} maximizer={macroLeft} minimizer={macroRight}>{ff_items}</FFItemGen>

        <div className="BUTTON_BAR">
          <button onClick={() => setFFIViewStart((prev_view_start) => {
            if (prev_view_start - 50 < 0) {
              return prev_view_start;
            }

            return prev_view_start - 50
          })}>
            {`#${(ffitem_view_start - 50 < 0) ? 0 : ffitem_view_start - 49} - #${ffitem_view_start} `}&#8592;
          </button>
          <button onClick={() => {
            runQuery(macroLeft, macroRight, ff_restraunts, setFFItems)
            setFFIViewStart(0);
          }}>
            COMPARE
          </button>
          <button onClick={() => setFFIViewStart((prev_view_start) => {
            if (prev_view_start + 50 > ff_items.length) {
              return prev_view_start;
            }

            return prev_view_start + 50
          })}>
            &#8594;{` #${ffitem_view_start + 51} - #${((ffitem_view_start + 100 > ff_items.length) ? ff_items.length : ffitem_view_start + 100)}`}
          </button>
        </div>

        <FFRSelectionGen setter={setFFRestraunts}/>
      </header>
    </div>
  );
}

export default App;
