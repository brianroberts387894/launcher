import React, { useRef, useState } from 'react';
import { Tabs, Input, Flex, Spin, ConfigProvider, theme, Button } from 'antd';
import { TabType } from "../types/TabContentTypes"
import { LoadingOutlined } from '@ant-design/icons';
import { LinkOutlined } from '@ant-design/icons';

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
          <Input
            size="large" 
            placeholder="Enter Program IP Address or Localhost Port" 
            variant="filled"
            onChange={handleInputChange}
          />
          <div style={{
            display: "flex",
            justifyContent: "center", 
            alignItems: "center", 
            margin: "0 auto", 
            marginTop: "5px"}}
          >
            <Button size="middle" variant="solid" icon={<LinkOutlined />}onClick={() => handleSubmission(inputValue)}>Link to Program</Button>
          </div>
    </div>
  )
}

// IFRAME CONTENT VIEW //

interface ContentPageProps {
  target: string
}
export const MainWindow: React.FC<ContentPageProps> = ({ target }) => {
    // TODO - CSS STYLE VVV
    const [loading, setLoading]= useState(true);
    return(
        <Spin indicator={<LoadingOutlined spin />} spinning={loading} size="large">
          <iframe 
            src={ target } 
            title="description"
            onLoad={() => setLoading(false)}
            style={{
              width: "100vw", 
              height: "calc(100vh - 43px)", 
              border:"0px", 
              marginTop: "0px", 
              userSelect: "none", 
              overflow: "hidden"
            }}>
          </iframe>
        </Spin>
    )
}

