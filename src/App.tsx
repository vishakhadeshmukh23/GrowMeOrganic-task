import React from 'react';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import ArtTable from './ArtTable';  

function App() {
  return (
    <div className="App">
      <h2>Artworks Table</h2>
      <ArtTable />
    </div>
  );
}

export default App;
