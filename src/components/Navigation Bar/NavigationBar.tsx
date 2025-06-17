import React, { useEffect, useRef, useState, createContext } from 'react';
import Content from "../Page Content/PageContent";
import TabCard from "../Navigation Bar/Tab"
import Settings from "./Settings"
import { Tabs, ConfigProvider } from 'antd';
import { antdThemeConfig } from "../../config/themeConfig"
import { getCurrentWindow } from '@tauri-apps/api/window';

import {
  arrayMove,
  horizontalListSortingStrategy,
  SortableContext,
  useSortable,
} from '@dnd-kit/sortable';
import { monitorForElements } from '@atlaskit/pragmatic-drag-and-drop/element/adapter';

type TargetKey = React.MouseEvent | React.KeyboardEvent | string;

const initialItems = [
    { label: 'Silly Tab', children: <Content/>, key: 'tabNumber-1' },
];

interface DragContextType {
    isDraggingTab: boolean;
    setIsDraggingTab: React.Dispatch<React.SetStateAction<boolean>>;
}
export const DragContext = createContext<DragContextType>({
    isDraggingTab: false,
    setIsDraggingTab: () => {},
});

const App: React.FC = () => {
    const [activeKey, setActiveKey] = useState(initialItems[0].key);
    const [items, setItems] = useState(initialItems);
    const [tabCount, setTabCount] = useState<number>(1);
    const [isDraggingTab, setIsDraggingTab] = useState<boolean>(false);
    const newTabIndex = useRef(0);

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

    // Monitor for DnD //
    useEffect(() => {
        return monitorForElements({
            onDrop({ source, location }) {
                if(location.current.dropTargets.length <= 0 || location.current.dropTargets[0].data["typeOf"] != "drop_tab"){
                    return
                }
                const fromKey = source.data.key;
                const toKey = location.current.dropTargets[0].data["key"];
                const isRightSide = location.current.dropTargets[0].data["isRightSide"];
                
                swapTabs(toKey as string, fromKey  as string, isRightSide as boolean);
            },
        })
    });
    
    const onChange = (newActiveKey: string) => {
        setActiveKey(newActiveKey);
    };
    const add = () => {
        const newActiveKey = `tabNumber${newTabIndex.current++}`;
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
    function swapTabs(toKey: string, fromKey: string, isRightSide: boolean) {
        const fromIndex = items.findIndex(item => item.key === fromKey);
        const toIndex = items.findIndex(item => item.key === toKey);

        if (fromIndex === -1 || toIndex === -1) {
            console.log("error: element does not seem to exist when swapping tabs");
            return;
        }
        setItems(arrayMove(items, fromIndex, toIndex));
        console.log("huh")
    }


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
                destroyOnHidden={false} 
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
                                node={node}
                                swapTabs={swapTabs}
                                onChange={onChange}
                                {...tabBarProps}
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