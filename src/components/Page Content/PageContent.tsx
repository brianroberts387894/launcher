import React, { useState, memo, useEffect } from 'react';
import SearchPage from "./SearchPage"
import { TabType } from "../../types/TabContentTypes"

interface ContentProps{
    onSearch: (key: string, target: string) => void,
    assignedKey: string,
}
function Content({onSearch, assignedKey}: ContentProps){
    // TODO - Redo this part
    const [contentDisplayed, setContentDisplayed] = useState(<div/>)
    const [contentState, setContentState] = useState(TabType.SEARCH_PAGE);
    const [target, setTarget] = useState("");

    useEffect(() => {
         switch(contentState){
        case TabType.SEARCH_PAGE:
            setContentDisplayed(<SearchPage onSearch={onSearch} assignedKey={assignedKey} setContentState={setContentState} setTarget={setTarget}/>);
            break;
        default:
            setContentDisplayed(<div/>);
            break;
    }
    }, [contentState]);
   
    
    return( 
        <div className="content-tab-container" > 
            { contentDisplayed }
        </div>  
    )
}

export default Content;