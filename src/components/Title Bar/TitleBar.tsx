import React, {useEffect, useState} from 'react';
import { MinusOutlined, BorderOutlined, CloseOutlined, CompressOutlined } from '@ant-design/icons';
import { getCurrentWindow } from '@tauri-apps/api/window';

const TitleBarElement = () => {
    const [expandedState, setExpandedState] = useState<boolean>(false)

    useEffect(() => {
        const appWindow = getCurrentWindow();
        const checkMaximized = async () => {
            const isMaximized = await appWindow.isMaximized();
            isMaximized ? setExpandedState(true) : setExpandedState(false);
        }; 
        appWindow.onResized(() => {checkMaximized();});
    }, []);

    const handleMinimize = async () => {
        const appWindow = getCurrentWindow();
        await appWindow.minimize();
    };
    const handleMaximize = async () => {
        const appWindow = getCurrentWindow();
        await appWindow.toggleMaximize();
        setExpandedState(prev => !prev);
    };
    const handleClose = async () => {
        const appWindow = getCurrentWindow();
        await appWindow.close();
    };
    
    return(
        <div data-tauri-drag-region className="titlebar">
            <div className="titlebar-button" id="titlebar-minimize" onClick={handleMinimize}>
                <MinusOutlined/>
            </div>
            <div className="titlebar-button" id="titlebar-maximize" onClick={handleMaximize}>
                {expandedState ? <CompressOutlined /> : <BorderOutlined />}
            </div>
            <div className="titlebar-button" id="titlebar-close" onClick={handleClose}>
                <CloseOutlined/>
            </div>
        </div>
    )
}

export default TitleBarElement;
