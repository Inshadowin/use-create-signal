import React from 'react';
import { createRoot } from 'react-dom/client';

import Component from './component';
import Parent from './child-components';
import MultipleInputs from './multiple-inputs';
import ParentBroken from './child-components-broken';
import MultipleInputsBroken from './multiple-inputs-broken';

function App() {
  return (
    <div className="App" style={{ display: 'flex', flexDirection: 'column' }}>
      <Component />
      <br />
      <br />
      <table style={{ width: 1200 }}>
        <tr>
          <td>
            <MultipleInputs />
          </td>
          <td>VS</td>
          <td style={{ textAlign: 'end' }}>
            <MultipleInputsBroken />
          </td>
        </tr>
        <tr>
          <td>
            <Parent />
          </td>
          <td>VS</td>
          <td style={{ textAlign: 'end' }}>
            <ParentBroken />
          </td>
        </tr>
      </table>
    </div>
  );
}

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);

export default App;
