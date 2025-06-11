import React, { useEffect, useRef, useState } from 'react';
import Content from "../Tab Content/TabContent";
import { Tabs, ConfigProvider, Button } from 'antd';
import { SettingOutlined } from '@ant-design/icons';
import antdThemeConfig from "../../config/themeConfig"
type TargetKey = React.MouseEvent | React.KeyboardEvent | string;

const initialItems = [
  { label: 'New Tab', children: <Content/>, key: '2' }
];

const App: React.FC = () => {
  const [activeKey, setActiveKey] = useState(initialItems[0].key);
  const [items, setItems] = useState(initialItems);
  const newTabIndex = useRef(0);

  useEffect(() => {
    const navWrap = document.querySelector('.ant-tabs-nav-wrap');
    if (navWrap) {
      navWrap.setAttribute('data-tauri-drag-region', '');
    }
  }, []);

  const onChange = (newActiveKey: string) => {
    setActiveKey(newActiveKey);
  };
  const add = () => {
    const newActiveKey = `newTab${newTabIndex.current++}`;
    const newPanes = [...items];
    newPanes.push({ label: 'New Tab', children: <Content/>, key: newActiveKey });
    setItems(newPanes);
    setActiveKey(newActiveKey);
  };
  const remove = (targetKey: TargetKey) => {
    let newActiveKey = activeKey;
    let lastIndex = -1;
    items.forEach((item, i) => {
      if (item.key === targetKey) {
        lastIndex = i - 1;
      }
    });
    const newPanes = items.filter((item) => item.key !== targetKey);
    if (newPanes.length && newActiveKey === targetKey) {
      if (lastIndex >= 0) {
        newActiveKey = newPanes[lastIndex].key;
      } else {
        newActiveKey = newPanes[0].key;
      }
    }
    setItems(newPanes);
    setActiveKey(newActiveKey);
  };
  const onEdit = (
    targetKey: React.MouseEvent | React.KeyboardEvent | string,
    action: 'add' | 'remove',
  ) => {
    if (action === 'add') {
      add();
    } else {
      remove(targetKey);
    }
  };
  return (
    <ConfigProvider theme={ antdThemeConfig }>
        <Tabs
          type="editable-card"
          onChange={onChange}
          activeKey={activeKey}
          onEdit={onEdit}
          items={items}
          // centered
          size={"small"}
          animated
          className="navigation-tabs"
          tabBarExtraContent={{
            left: (
              <div style={{marginRight: "15px", marginLeft: "10px"}}>
                <SettingOutlined onClick={() => {console.log("bruhhhh")}}/>
                
              </div>
            ),
            right: (
              <div>
              </div>
            ),
  }}
        />
    </ConfigProvider>
  );
};

export default App;