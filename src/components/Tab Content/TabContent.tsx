import React, { useRef, useState } from 'react';
import { SearchPage, MainWindow } from "./ContentDisplayed"
import { TabType } from "../../types/TabContentTypes"

const Content: React.FC = () => {
    const [contentState, setContentState] = useState(TabType.SEARCH_PAGE);
    const [target, setTarget] = useState("");
    let content_displayed;
    switch(contentState){
        case TabType.SEARCH_PAGE:
            content_displayed = <SearchPage setContentState={setContentState} setTarget={setTarget}/>;
            break;
        default:
            content_displayed = <MainWindow target={target}/>;
            break;
    }
    return( 
        <div className="content-tab-container" > 
            { content_displayed }
        </div>  
    )
}

export default Content;