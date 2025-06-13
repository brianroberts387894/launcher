import React, { useEffect, useRef, useState, createContext } from 'react';
import Content from "../Page Content/PageContent";
import TabCard from "../Navigation Bar/Tab"
import Settings from "./Settings"
import { Tabs, ConfigProvider } from 'antd';
import { antdThemeConfig } from "../../config/themeConfig"
import { getCurrentWindow } from '@tauri-apps/api/window';

type TargetKey = React.MouseEvent | React.KeyboardEvent | string;

const initialItems = [
  { label: 'New Tab', children: <Content/>, key: '0' }
];

export const DragContext = createContext<{
                                isDraggingTab: boolean; 
                                setIsDraggingTab: React.Dispatch<React.SetStateAction<boolean>>;}
                                        >({
    isDraggingTab: false, setIsDraggingTab: () => {}
});

const App: React.FC = () => {
    const [activeKey, setActiveKey] = useState(initialItems[0].key);
    const [items, setItems] = useState(initialItems);
    const newTabIndex = useRef(0);

    const [isDraggingTab, setIsDraggingTab] = useState<boolean>(false);


    // Allows the entire black bar at the top of the page to be dragged //
    useEffect(() => {
        const navWrap = document.querySelector('.ant-tabs-nav-wrap');
        if (navWrap) {
        navWrap.setAttribute('data-tauri-drag-region', '');
        }
    }, []);

    // Closes window if no tabs open //
    useEffect(() => {
        if(items.length == 0){
        const appWindow = getCurrentWindow();
        appWindow.close();
        };
    });
    
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

    const tabBarExtraContent = {
        left: (
            <div style={{marginRight: "15px", marginLeft: "10px"}}>
                <Settings/>
            </div>
        ),
        right: (
            <div style={{}}></div>
        ),
    };
    
    return (
        <ConfigProvider theme={ antdThemeConfig }>
            <Tabs
                type="editable-card"
                onChange={onChange}
                activeKey={activeKey}
                onEdit={onEdit}
                items={items}
                size={"small"}
                animated
                className="navigation-tabs"
                tabBarExtraContent={tabBarExtraContent}
                renderTabBar={(tabBarProps, DefaultTabBar) => (
                    <DefaultTabBar {...tabBarProps}>
                        {(node) => (
                            <DragContext.Provider value={{ isDraggingTab, setIsDraggingTab }}>
                            <TabCard 
                                onChange={onChange} 
                                node={node}
                            />
                            </DragContext.Provider>
                        )}
                    </DefaultTabBar>
                )}
            />
        </ConfigProvider>
    );
};

export default App;