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

type Frame = {
  display: string;
  target: string;
  key: string;
}

type FrameRendererProps = {
    activeKey: string,
    globalFrames: Frame[],
    globalFrameDispatch: React.Dispatch<any>
}
function App({activeKey, globalFrames, globalFrameDispatch}: FrameRendererProps){

    useEffect(() => {
        
    },[activeKey, globalFrames]);
    
    const listItems = globalFrames.map(frame => <iframe key={frame.key} style={{height: "calc(100vh - 55px)", width: "100vw", display: frame.display}} src={frame.target as string} />);
    return(
        <div
            style={{zIndex: "1000", position: "fixed", bottom: "0"}}
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
