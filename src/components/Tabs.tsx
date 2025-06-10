import React, { useRef, useState } from 'react';
import Content from "./TabContent";
import { Tabs, ConfigProvider, theme } from 'antd';
type TargetKey = React.MouseEvent | React.KeyboardEvent | string;

const initialItems = [
  { label: 'New Tab', children: <Content/>, key: '1' }
];

const App: React.FC = () => {
  const [activeKey, setActiveKey] = useState(initialItems[0].key);
  const [items, setItems] = useState(initialItems);
  const newTabIndex = useRef(0);

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
  // TODO: Do I migrate theme stuff to css folder???
  return (
    <ConfigProvider
        theme={{
          algorithm: theme.darkAlgorithm,
          components: {
            Tabs: {
              "margin": 0,
              "colorBorderSecondary": "rgb(126, 126, 126)",
              "colorFillAlter" : "rgb(126, 126, 126)",
              "colorBgContainer" :"rgb(47, 47, 47)",
              "itemColor": "rgb(224, 224, 224)",
              "itemSelectedColor" : "rgb(255, 255, 255)",
              "itemHoverColor" : "rgb(255, 255, 255)",
              "itemActiveColor" : "rgb(126, 126, 126)",
            },
            Input: {
              "activeBorderColor": "rgb(11, 148, 141)",
              "hoverBorderColor": "rgb(17, 177, 150)",
              "colorPrimaryActive": "rgb(11, 148, 141)",
              "colorPrimaryHover": "rgb(11, 148, 141)",
              "colorBorderSecondary" : "rgb(11, 148, 141)",
              "borderRadiusLG" : 17

            },
            Button: {
              "colorPrimary" : "rgb(17, 177, 150)",
              "colorBgContainer" : "rgb(17, 177, 150)",
              "colorPrimaryHover" : "rgb(176, 255, 242)",
              "colorPrimaryActive" : "rgb(217, 255, 249)",
              "fontWeight" : 700,
              "borderRadius" : 4
            },
            Spin: {
              "dotSizeLG": 200,
              "contentHeight": 1000,
              "colorPrimary": "rgb(10, 128, 122)",
              "colorBgMask": "rgba(47, 47, 47, 0.79)",
              "colorBgContainer": "rgb(47, 47, 47)",
            }
          }
        }}
    >
        <Tabs
          type="editable-card"
          onChange={onChange}
          activeKey={activeKey}
          onEdit={onEdit}
          items={items}
          centered
          size={"small"}
          animated
          style={{marginBottom: "0px", height: "95%"}} // TODO - CSS STYLE
        />
    </ConfigProvider>
  );
};

export default App;