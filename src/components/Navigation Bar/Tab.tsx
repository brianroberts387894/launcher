import React, { useEffect, useRef, useState, useContext } from 'react';
import Content from "../Page Content/PageContent";
import Settings from "./Settings"
import { Tabs, ConfigProvider, Button } from 'antd';
import { antdThemeConfig } from "../../config/themeConfig"
import { getCurrentWindow } from '@tauri-apps/api/window';
import invariant from "tiny-invariant";
import { draggable, dropTargetForElements } from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import { DragContext } from './NavigationBar';



// Draggable Tab Card //

type DraggableTabProps = {
    node: React.ReactElement<any, string | React.JSXElementConstructor<any>>,
    children: any
};
function DraggableTab({node, children}: DraggableTabProps){
    const ref = useRef(null);
    const DragState = useContext(DragContext);

    function handleDragStart(){
        DragState.setIsDraggingTab(true);
    }
    function handleLetGo(){
        DragState.setIsDraggingTab(false);
    }

    useEffect(() => {
        const el = ref.current;
        invariant(el);
        return draggable({
            element: el,
            getInitialData: () => ({ key: node.key, typeOf: "drag"}),
            onDragStart: () => handleDragStart(),
            onDrop: () => handleLetGo(),
        });
    }, []);

    return(
        <div ref={ref}>
            {children}
        </div>
    );
};

// Tab Card Dropping Points //

function HighlightBar(isRightSide: boolean){
    if(isRightSide == false){
        return(
            <div style={{
                height: "33px",
                width: "2px",
                backgroundColor: "white"}}
            />);
    }
    return(
        <div style={{
            height: "33px",
            width: "2px",
            backgroundColor: "white",
            marginLeft: "100%"}}
        />
    );
};
type DroppableWrapperProps = {
    isRightSide: boolean,
    PointerState: string,
    node: React.ReactElement<any, string | React.JSXElementConstructor<any>>,
};
function DroppableTabSide({isRightSide, PointerState, node}: DroppableWrapperProps){
    const StyleLeft: React.CSSProperties = {
        width: "50%",
        height: "100%",
        pointerEvents: PointerState as React.CSSProperties['pointerEvents'],
        position: "absolute",
        display: 'inline-block',
        zIndex: 2
    }
    const StyleRight: React.CSSProperties = {
        ...StyleLeft,
        right: 0
    }
    const ref = useRef(null);
    const [isDraggedOver, setIsDraggedOver] = useState(false);

    
    function handleDragEnter(){
        setIsDraggedOver(true);
    }
    function handleDragLeave(){
        setIsDraggedOver(false);
    };
    function handleOnDrop(){
        setIsDraggedOver(false);
    };

    useEffect(() => {
        const el = ref.current;
        invariant(el);

        return dropTargetForElements({
            element: el,
            onDragEnter: () => handleDragEnter(),
            onDragLeave: () => handleDragLeave(),
            onDrop: () => handleOnDrop(),
            getData: () => ({key: node.key, isRightSide: isRightSide, typeOf: "drop_tab"}),
        });
    }, []);

    return(
        <div ref={ref} style={isRightSide ? StyleRight : StyleLeft}>
            {isDraggedOver ? HighlightBar(isRightSide) :  <></>}
        </div>
    );
};

// Complete Package //

type TabCardProps = {
    node: React.ReactElement<any, string | React.JSXElementConstructor<any>>,
    onChange: (newActiveKey: string) => void
    [key: string]: any
};
function TabCard({ onChange, node, ...tabBarProps }: TabCardProps){
    const [pointerState, setPointerState] = useState<string>("none");
    const DragState = useContext(DragContext);
        
    useEffect(() => {
        DragState.isDraggingTab ? setPointerState("auto") : setPointerState("none");
    }, [DragState]);

    return(
        <div style={{display: "flex", position: "relative"}}>
            <DroppableTabSide 
                node={node}
                isRightSide={false}
                PointerState={pointerState}
            />
            <DraggableTab node={node}>
                <Button 
                    style={{marginLeft: "0px", zIndex: "1"}} 
                    onClick={() => {onChange(node.key as string)}}
                >
                    {node.key}
                </Button>
            </DraggableTab>

            <DroppableTabSide 
                node={node}
                isRightSide={true}
                PointerState={pointerState}
            />
        </div>
    );
};

export default TabCard;