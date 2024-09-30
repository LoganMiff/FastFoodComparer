import './App.css';

import React, {useState, useRef } from 'react'

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
  const [ff_drinks_shown, setDrinksShown] = useState(false);

  // eslint-disable-next-line
  const tableRef = useRef(null);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Fast Food Ranker</h1>
        
        <div className="QUERY_SELECTION">
            <div ref={tableRef} id="FFMSelectors">
                <FFMacroSelection id="left" selection={macroLeft} other_selection={macroRight} setter={setLeft}></FFMacroSelection>
                <img id="greater_than" src="/images/greater_than_ff.png" alt="greater than sign"></img>
                <FFMacroSelection id="right" selection={macroRight} other_selection={macroLeft} setter={setRight}></FFMacroSelection>
            </div>
        </div>

        <button onClick={() => {
          setDrinksShown(!ff_drinks_shown);
          
          setFFIViewStart((prev_view_start) => {
            const filtered_ff_items = ((ff_drinks_shown) ? ff_items.filter((item) => (!item.is_drink)) : ff_items);

            if (prev_view_start > filtered_ff_items.length) {
              console.log(((filtered_ff_items.length % 50 > 0) ? filtered_ff_items.length - (filtered_ff_items.length % 50) : filtered_ff_items - 50));
              return ((filtered_ff_items.length % 50 > 0) ? filtered_ff_items.length - (filtered_ff_items.length % 50) : filtered_ff_items - 50);
            }

            return prev_view_start
          });
        }}>
          DRINKS {((ff_drinks_shown) ? "SHOWN" : "HIDDEN")}
        </button>

        <div className="BUTTON_BAR">

          <button onClick={(event) => {
            event.preventDefault();
            event.stopPropagation();

            setFFIViewStart((prev_view_start) => {
              if (prev_view_start - 50 < 0) {
                return prev_view_start;
              }

              return prev_view_start - 50
            });
          }}>
            {`#${(ffitem_view_start - 50 < 0) ? 0 : ffitem_view_start - 49} - #${ffitem_view_start} `}&#8592;
          </button>
          
          <button onClick={(event) => {
            event.preventDefault();
            event.stopPropagation();

            runQuery(macroLeft, macroRight, ff_restraunts, setFFItems)
            setFFIViewStart(0);
          }}>
            COMPARE
          </button>
          
          <button onClick={(event) => {
            event.preventDefault();
            event.stopPropagation();

            setFFIViewStart((prev_view_start) => {
              const filtered_ff_items = ((!ff_drinks_shown) ? ff_items.filter((item) => (!item.is_drink)) : ff_items);

              if (prev_view_start + 50 > filtered_ff_items.length) {
                return prev_view_start;
              }

              return prev_view_start + 50
            })
          }}>
            &#8594;{` #${((ffitem_view_start + 51 > ((!ff_drinks_shown) ? ff_items.filter((item) => (!item.is_drink)).length : ff_items.length)) ? ((!ff_drinks_shown) ? ff_items.filter((item) => (!item.is_drink)).length : ff_items.length) : ffitem_view_start + 51)} - #${((ffitem_view_start + 100 > ((!ff_drinks_shown) ? ff_items.filter((item) => (!item.is_drink)).length : ff_items.length)) ? ((!ff_drinks_shown) ? ff_items.filter((item) => (!item.is_drink)).length : ff_items.length) : ffitem_view_start + 100)}`}
          </button>
        </div>

        <FFItemGen view_start={ffitem_view_start} drinks_shown={ff_drinks_shown} maximizer={macroLeft} minimizer={macroRight}>{ff_items}</FFItemGen>
        
        <button onClick={(event) => {
          event.preventDefault();
          event.stopPropagation();

          tableRef.current.scrollIntoView()
        }}>
          BACK TO TOP
        </button>

        <FFRSelectionGen setter={setFFRestraunts}/>
      </header>
    </div>
  );
}

export default App;
