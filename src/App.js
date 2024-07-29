import './App.css';

import FFRSelectionGen from './components/ffr_components/FFRSelectionGen';

import FFMacroSelection from './components/FFMacroSelection';
import FFQueryButton from './components/FFQueryButton';

import FFItemGen from './components/ffi_components/FFItemGen';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Fast Food Comparer</h1>

        <div id="FFMSelectors">
          <FFMacroSelection id="left"></FFMacroSelection>
          <FFMacroSelection id="right"></FFMacroSelection>
        </div>

        <FFRSelectionGen />
      </header>
    </div>
  );
}

export default App;
