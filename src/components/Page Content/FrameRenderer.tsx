import { Button } from 'antd';
import React, { useEffect, useRef, useState, createContext } from 'react';

// interface FrameRendererType {
//     frameOnOff: (turnOn: boolean) => {}, 
//     frameIsActive: boolean, 
//     changeChannel: (key: string) => {},
// }
// export const DragContext = createContext<FrameRendererType>({
//     frameIsActive: false,
//     setIsDraggingTab: () => {},
// });

let frames = [
    <iframe src= "https://www.react.dev"/>,
    <iframe src= "https://www.google.com"/>,
]

type FrameRendererProps = {
    activeKey: string,
    globalFrames: string[],
    globalFrameDispatch: React.Dispatch<any>
}
function App({activeKey, globalFrames, globalFrameDispatch}: FrameRendererProps){

    useEffect(() => {
        
    },[activeKey, globalFrames]);

    const listItems = globalFrames.map(frame => <iframe src={frame as string} />);
    return(
        <div
            style={{zIndex: "1000", position: "fixed"}}
        >
            {listItems}
        </div>
        
    )
}

export default App;

// IFRAME CONTENT VIEW //

// interface ContentPageProps {
//   target: string
// }
// export const MainWindow: React.FC<ContentPageProps> = ({ target }) => {
//     const [loading, setLoading]= useState(true);
    
//     return(
//         <Spin 
//           indicator={<LoadingOutlined spin/>} 
//           spinning={loading} 
//           size="large"
//         >
//           <iframe 
//             src={ target } 
//             title="description"
//             onLoad={() => setLoading(false)}

//             className="content-iframe"
//           />
//         </Spin>
//     )
// }
