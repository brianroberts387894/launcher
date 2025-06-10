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

  return (
    <ConfigProvider
        theme={{
          algorithm: theme.darkAlgorithm,
          components: {
            Tabs: {
              margin: 0,
            },
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