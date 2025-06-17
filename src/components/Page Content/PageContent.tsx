import React, { useState, memo } from 'react';
import SearchPage from "./SearchPage"
import { TabType } from "../../types/TabContentTypes"

interface ContentProps{
}
function Content({}: ContentProps){
    const [contentState, setContentState] = useState(TabType.SEARCH_PAGE);
    const [target, setTarget] = useState("");

    let content_displayed;
    switch(contentState){
        case TabType.SEARCH_PAGE:
            content_displayed = <SearchPage setContentState={setContentState} setTarget={setTarget}/>;
            break;
        default:
            content_displayed = <div/>
            break;
    }
    
    return( 
        <div className="content-tab-container" > 
            { content_displayed }
        </div>  
    )
}

export default Content;