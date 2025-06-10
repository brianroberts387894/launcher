import React, { useRef, useState } from 'react';
import { Tabs, Input, ConfigProvider, theme, Button } from 'antd';
import { TabType } from "../types/TabContentTypes"

// OPENS ON NEW TAB //

interface SearchPageProps {
  setContentState: React.Dispatch<React.SetStateAction<TabType>>;
  setTarget: React.Dispatch<React.SetStateAction<string>>;
}
export const SearchPage: React.FC<SearchPageProps> = ({ setContentState, setTarget }) => {
  const [inputValue, setInputValue] = useState("");
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };
  const handleSubmission = (inputValue: string) => {    
    console.log(inputValue);
    setTarget(inputValue);
    setContentState(TabType.MAIN_WINDOW);
  }  
  return(
      <div style={{
      width: "50%",
      justifyContent: "center", 
      alignItems: "center", 
      margin: "0 auto", 
      marginTop: "150px"}}
    >
          <h1>UltraPro 2 Launcher</h1>
          <Input.Search 
            size="large" 
            placeholder="Enter Program IP Address or Localhost Port" 
            variant="filled"
            onChange={handleInputChange}
            onSearch={handleSubmission}
          />
    </div>
  )
}

// IFRAME CONTENT VIEW //

interface ContentPageProps {
  target: string
}
export const MainWindow: React.FC<ContentPageProps> = ({ target }) => {
    // TODO - CSS STYLE VVV
    return(
      <iframe src={ target } title="description" style={{width: "100%", height: "100%", border:"0px", marginTop: "0px", userSelect: "none", overflow: "hidden"}}></iframe>
    )
}

