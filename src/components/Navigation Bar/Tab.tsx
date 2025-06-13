import React, { useEffect, useRef, useState, useContext } from 'react';
import Content from "../Page Content/PageContent";
import Settings from "./Settings"
import { Tabs, ConfigProvider, Button } from 'antd';
import { antdThemeConfig } from "../../config/themeConfig"
import { getCurrentWindow } from '@tauri-apps/api/window';
import invariant from "tiny-invariant";
import { draggable, dropTargetForElements } from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import { DragContext } from './NavigationBar';

type DraggableWrapperProps = {
    children: any
}
function DraggableWrapper({children}: DraggableWrapperProps){
    const ref = useRef(null);
    const DragState = useContext(DragContext);

    function handleDragStart(){
        console.log("Drag Start"); 
        DragState.setIsDraggingTab(true);
    }
    function handleLetGo(){
        console.log("Drag Let Go"); 
        DragState.setIsDraggingTab(false);
    }

    useEffect(() => {
        const el = ref.current;
        invariant(el);
        return draggable({
            element: el,
            onDragStart: () => handleDragStart(),
            onDrop: () => handleLetGo()
        });
    }, []);

    return(
        <div ref={ref}>
            {children}
        </div>
    );
}


type DroppableWrapperProps = {
    children: any | undefined
    Style: any
}
function DroppableWrapper({children, Style}: DroppableWrapperProps){

    const ref = useRef(null);
    const [isDraggedOver, setIsDraggedOver] = useState(false);

    function handleDragEnter(){
        setIsDraggedOver(true);
        console.log("Drag Enter");
    }

    function handleDragLeave(){
        setIsDraggedOver(false);
        console.log("Drag Leave");
    };
    function handleOnDrop(){
        setIsDraggedOver(false);
        console.log("Dropped");
    };

    useEffect(() => {
        const el = ref.current;
        invariant(el);

        return dropTargetForElements({
            element: el,
            onDragEnter: () => handleDragEnter(),
            onDragLeave: () => handleDragLeave(),
            onDrop: () => handleOnDrop(),
        });
    }, []);

    return(
        <div ref={ref} style={Style}>
            {children}
        </div>
    );
}

function HighlightBar(){
    return(<h1>Hello</h1>);
}

type TabCardProps = {
    onChange: (key: string) => void;
    node: React.ReactElement<any, string | React.JSXElementConstructor<any>>
};
function TabCard({ onChange, node }: TabCardProps){
    const [pointerState, setPointerState] = useState<string>("none");
    const DragState = useContext(DragContext);
        
    useEffect(() => {
        DragState.isDraggingTab ? setPointerState("auto") : setPointerState("none");
    }, [DragState]);

    return(
        <div style={{display: "flex", position: "relative"}}>
            <DroppableWrapper Style={{
                                backgroundColor: "rgba(255, 1, 1, 0.27)", 
                                width: "50%", height: "100%", pointerEvents: pointerState, 
                                position: "absolute", display: 'inline-block' , zIndex: 2
                            }}
            >
                <></>
            </DroppableWrapper>
            <DraggableWrapper>
                <Button style={{marginLeft: "0px", zIndex: "1"}} onClick={() => {onChange(node.key as string)}}>*Tab Name*</Button>
            </DraggableWrapper>
                        <DroppableWrapper Style={{
                                backgroundColor: "rgba(0, 38, 255, 0.27)", 
                                width: "50%", height: "100%",
                                position: "absolute", display: 'inline-block', pointerEvents: pointerState, 
                                right: 0, zIndex: 2
                            }}
            >
                <></>
            </DroppableWrapper>
        </div>
    );
}

export default TabCard;




