// import Tab from './components/Navigation Bar/NavCards'
import NavigationContent from './components/Navigation Bar/NavigationBar'
import TitleBarElement from "./components/Title Bar/TitleBar"
import "./styles/App.css";
import "./styles/Custom.css";

function App() {
  return (
    <main style={{height: "100vh"}}>
      <TitleBarElement/>
      <div style={{height: "4px"}} data-tauri-drag-region/>
      <NavigationContent/>
    </main>
  );
}

export default App;
