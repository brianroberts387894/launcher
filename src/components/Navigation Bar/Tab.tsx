import React, { useEffect, useRef, useState } from 'react';
import Content from "../Page Content/PageContent";
import Settings from "./Settings"
import { Tabs, ConfigProvider, Button } from 'antd';
import { antdThemeConfig } from "../../config/themeConfig"
import { getCurrentWindow } from '@tauri-apps/api/window';


type TabCardProps = {
    onChange: (key: string) => void;
    node: React.ReactElement<any, string | React.JSXElementConstructor<any>>
};
function TabCard({ onChange, node }: TabCardProps){
    return(
        <div>
            <Button onClick={() => {onChange(node.key as string)}}>New Tab</Button>
        </div>
    );
}

export default TabCard;