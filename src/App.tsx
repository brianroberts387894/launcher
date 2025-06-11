import Tab from './components/Navigation Bar/Tabs'
import TitleBarElement from "./components/Title Bar/TitleBar"
import DragTabs from "./components/Navigation Bar/DraggableTabs"
import "./styles/App.css";
import "./styles/Custom.css";

function App() {
  return (
    <main style={{height: "100vh"}}>
      <TitleBarElement/>
      <div style={{height: "4px"}} data-tauri-drag-region/>
      <Tab/>
    </main>
  );
}

export default App;
