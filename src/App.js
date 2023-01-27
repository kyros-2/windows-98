import React from "react";
import Desktop from "./components/desktop/Desktop";
import Taskbar from "./components/taskbar/Taskbar";
import './style.css';



function App() {
  document.documentElement.style.setProperty('--window-height', `${window.innerHeight}px`);
  window.onresize = () => {
    document.documentElement.style.setProperty('--window-height', `${window.innerHeight}px`);
  }
  return (
    <div className="window" >
      <Desktop />
      <Taskbar />
    </div>
  );
}

export default App;