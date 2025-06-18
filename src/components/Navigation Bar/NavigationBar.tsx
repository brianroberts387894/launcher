import React, { useEffect, useRef, useState, createContext, useReducer } from 'react';
import { getCurrentWindow } from '@tauri-apps/api/window';
import { Tabs, ConfigProvider } from 'antd';
import { antdThemeConfig } from "../../config/themeConfig"
import Content from "../Page Content/PageContent";
import GlobalFrameRenderer from "../Page Content/FrameRenderer";
import TabCard from "../Navigation Bar/Tab"
import Settings from "./Settings"
import { TabType } from "../../types/TabContentTypes"
import { arrayMove } from '@dnd-kit/sortable';
import { monitorForElements } from '@atlaskit/pragmatic-drag-and-drop/element/adapter';

type TabItem = {
    label: string;
    children: React.ReactNode;
    key: string;
    pageContext: any; // You can replace `any` with a more specific type if you know it
};
type Frame = {
  display: string;
  target: string;
  key: string;
}

// TAB - IRREVELANT CONTEXT, MIGRATE TO TAB.TSX - TODO // 
interface DragContextType {
    isDraggingTab: boolean;
    setIsDraggingTab: React.Dispatch<React.SetStateAction<boolean>>;
}
export const DragContext = createContext<DragContextType>({
    isDraggingTab: false,
    setIsDraggingTab: () => {},
});

const App: React.FC = () => {

    // INITIAL //
    const initialKey = 'tabNumber-1';
    const initialPageContext = { 
        type: TabType.SEARCH_PAGE, target: ""
    };
    const initialItems = [
        { label: 'Silly Tab', children: <Content onSearch={handleOnSearch} assignedKey={initialKey}/>, key: initialKey, pageContext: initialPageContext},
    ];

    // State //
    const [activeKey, setActiveKey] = useState(initialKey);
    const newTabIndex = useRef(0);
    const [isDraggingTab, setIsDraggingTab] = useState<boolean>(false);

    // Controls Iframe View //
    function framesReducer(prevState: Frame[], action: any){
        switch(action.type){
            case "add": 
                const newFramesAdd = [...prevState];
                // console.log(action.key);
                newFramesAdd.push({display: "none", target: action.target, key: action.key});
                return(newFramesAdd);
            case "remove":
                const newFramesRmv = prevState.filter(item => item.key !== action.key);
                console.log(newFramesRmv);
                return(newFramesRmv);
            case "switch":
                const newFramesSwt = prevState.map(item => ({ ...item, display: item.key === activeKey ? "block" : "none", }));
                return(newFramesSwt);
            default:
                console.log("error: frame reducer has unknown command");
                return(prevState);
        }
        
    }; const [globalFrames, globalFrameDispatch] = useReducer(framesReducer, []);

    // Tab State //
    function tabsReducer(prevState: TabItem[], action:any): any{
        switch(action.type) {
            case 'add':
                const newActiveKeyAdd = `tabNumber${newTabIndex.current++}`;
                const newPanesAdd = [...prevState];    /*content insert below TODO */
                newPanesAdd.push({ label: 'New Tab', children: <Content onSearch={handleOnSearch} assignedKey={newActiveKeyAdd}/>, key: newActiveKeyAdd, pageContext: initialPageContext });
                setActiveKey(newActiveKeyAdd);
                return newPanesAdd;

            case 'remove':
                let newActiveKeyRmv = activeKey;
                let lastIndex = -1;
                prevState.forEach((item: any, i: any) => {
                    if (item.key === action.targetKey) {
                        lastIndex = i - 1;
                    }
                });
                const newPanesRmv = prevState.filter((item: any) => item.key !== action.targetKey);
                if (newPanesRmv.length && newActiveKeyRmv === action.targetKey) {
                    if (lastIndex >= 0) {
                        newActiveKeyRmv = newPanesRmv[lastIndex].key;
                    } else {
                        newActiveKeyRmv = newPanesRmv[0].key;
                    }
                }
                setActiveKey(newActiveKeyRmv);
                return newPanesRmv;

            case 'swap':
                const fromIndex = prevState.findIndex(item => item.key === action.fromKey);
                const toIndex = prevState.findIndex(item => item.key === action.toKey);
                if (fromIndex === -1 || toIndex === -1) {
                    console.log("error: element does not seem to exist when swapping tabs");
                    return;
                }
                return arrayMove(prevState, fromIndex, toIndex);

            case 'change':
                return [prevState];
            
            case 'search':
                return [prevState];

            default: 
                console.log("error: tab reducer has unknown command");
                return [prevState];
        }
    }; const [tabs, tabsDispatch] = useReducer(tabsReducer, initialItems);
    
    // Stuff //
    useEffect(() => { 
        // Allows the entire black bar at the top of the page to be dragged //
        const navWrap = document.querySelector('.ant-tabs-nav-wrap');
        if (navWrap) {
            navWrap.setAttribute('data-tauri-drag-region', '');
        }
    }, []);
    useEffect(() => {
        // Closes window if no tabs open //
        if(tabs.length == 0){
        const appWindow = getCurrentWindow();
        appWindow.close();
        };
    });
    useEffect(() => {
        // Monitor for DnD //
        return monitorForElements({
            onDrop({ source, location }) {
                if(location.current.dropTargets.length <= 0 || location.current.dropTargets[0].data["typeOf"] != "drop_tab"){
                    return
                }
                const fromKey = source.data.key;
                const toKey = location.current.dropTargets[0].data["key"];
                const isRightSide = location.current.dropTargets[0].data["isRightSide"];
                
                // swapTabs(toKey as string, fromKey  as string, isRightSide as boolean);
                tabsDispatch({type: "swap", toKey: toKey, fromKey: fromKey, isRightSide: isRightSide});
            },
        })
    });
    useEffect(() => {
        globalFrameDispatch({ type: "switch", key: activeKey });
    }, [activeKey]);
    
    // Handler Functions //
    function handleOnClick(newActiveKey: string){
        setActiveKey(newActiveKey);
        globalFrameDispatch({type: "switch", key: activeKey});
    };
    function handleOnEdit(key: React.MouseEvent | React.KeyboardEvent | string, action: 'add' | 'remove'){
        switch(action){
            case 'add':
                tabsDispatch({type: 'add' });
                return;
            case 'remove':
                tabsDispatch({type: 'remove', targetKey: key });
                globalFrameDispatch({type: 'remove', key: key});
                return;
            default:
                console.log("error: onEdit has unknown command");
                return;
    }};
    function handleOnSearch(key: string, target: string){
        globalFrameDispatch({type: "add", key: key, target: target});
        globalFrameDispatch({ type: "switch", key: key });
        return;
    }

    // Render Stuff //
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
            <GlobalFrameRenderer activeKey={activeKey} globalFrames={globalFrames} globalFrameDispatch={globalFrameDispatch}/>
            <Tabs
                className="navigation-tabs"
                type="editable-card"
                size={"small"}
                onChange={handleOnClick}
                onEdit={handleOnEdit}
                destroyOnHidden={false} 
                activeKey={activeKey}
                animated={false}
                items={tabs}
                tabBarExtraContent={tabBarExtraContent}
                renderTabBar={(tabBarProps, DefaultTabBar) => (
                    <DefaultTabBar {...tabBarProps}>
                        {(node) => (
                            <DragContext.Provider value={{ isDraggingTab, setIsDraggingTab }}>
                            <TabCard 
                                node={node}
                                onChange={handleOnClick}
                                onEdit={handleOnEdit}
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