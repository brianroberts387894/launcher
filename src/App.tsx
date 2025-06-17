// import Tab from './components/Navigation Bar/NavCards'
import DragTab from './components/Navigation Bar/NavigationBar'
import TitleBarElement from "./components/Title Bar/TitleBar"
import {useState} from 'react';
import "./styles/App.css";
import "./styles/Custom.css";

function App() {
  // const [currentTab, setCurrentTab] = useState<number>(1);
  return (
    <main style={{height: "100vh"}}>
      <TitleBarElement/>
      <div style={{height: "4px"}} data-tauri-drag-region/>
      <DragTab/>
      {/* <FrameRenderer/> */}
    </main>
  );
}

export default App;
