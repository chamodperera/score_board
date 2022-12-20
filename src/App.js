import Controls from './components/Controls';
import ScoreComponent from './components/ScoreComponent';
import './styles/App.scss';
import {DataProvider} from './Data.Context';

function App() {
  return (
    <div className="App">
      <DataProvider>
          <section className='position-relative'><ScoreComponent/></section>
          <section><Controls/></section>
      </DataProvider>
    </div>
  );
}

export default App;
