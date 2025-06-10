import Tab from './components/Tabs'
import TitleBarElement from "./components/TitleBar"
import DragTabs from "./components/DraggableTabs"
import "./styles/App.css";

function App() {
  // TODO - CSS STYLE VVV
  return (
    <main style={{height: "100vh"}}>
      {/* <TitleBarElement/> */}
      <div style={{height: "3px"}} />
      <Tab/>
    </main>
  );
}

export default App;
