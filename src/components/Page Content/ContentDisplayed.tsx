import React, { useState } from 'react';
import { Input, Spin, Button, ConfigProvider, message } from 'antd';
import { LoadingOutlined, LinkOutlined } from '@ant-design/icons';
import { TabType } from "../../types/TabContentTypes";
import { searchButtonTheme } from "../../config/themeConfig"
// SEARCH PROGRAM VIEW (OPENS ON NEW TAB) //

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
    const isValidUrl = /^https?:\/\//i.test(inputValue);

    if (!isValidUrl) {
      message.open({
        type: 'error',
        content: 'Invalid URL',
      });
      return;
    }    
    setTarget(inputValue);
    setContentState(TabType.MAIN_WINDOW);
  }  

  return(
    <ConfigProvider theme={searchButtonTheme}>
      <div className="content-search-program">
        <h1>UltraPro 2 Launcher</h1>
        <Input
          size="large" 
          placeholder="Enter Program IP Address or Localhost Port" 
          onChange={handleInputChange}
          onPressEnter={() => handleSubmission(inputValue)}
        />
        <div className="content-search-program-button-container">
          <Button 
            size="middle" 
            variant="solid" 
            icon={<LinkOutlined />}
            onClick={() => handleSubmission(inputValue)}>
              Link to Program
          </Button>
        </div>
      </div>
    </ConfigProvider>
  )
}

// IFRAME CONTENT VIEW //

interface ContentPageProps {
  target: string
}
export const MainWindow: React.FC<ContentPageProps> = ({ target }) => {
    const [loading, setLoading]= useState(true);
    
    return(
        <Spin 
          indicator={<LoadingOutlined spin/>} 
          spinning={loading} 
          size="large"
        >
          <iframe 
            src={ target } 
            title="description"
            onLoad={() => setLoading(false)}

            className="content-iframe"
          />
        </Spin>
    )
}


