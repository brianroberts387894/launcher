import Tab from './components/Tabs'
import TitleBarElement from "./components/TitleBar"
import DragTabs from "./components/DraggableTabs"
import "./styles/App.css";
import "./styles/Custom.css";

function App() {
  return (
    <main style={{height: "100vh"}}>
      {/* <TitleBarElement/> */}
      <div style={{height: "3px"}} />
      <Tab/>
    </main>
  );
}

export default App;
