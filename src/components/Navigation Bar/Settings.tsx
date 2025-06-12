import React, { useState } from 'react';
import {  Modal } from 'antd';
import { SettingOutlined } from '@ant-design/icons';
// import { Button, ConfigProvider } from 'antd';
// import { searchButtonTheme } from '../../config/themeConfig';

const Settings: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return(
            <div>
                <SettingOutlined 
                    onClick={showModal}
                />
                <Modal
                    title="Launcher Settings"
                    closable={{ 'aria-label': 'Custom Close Button' }}
                    open={isModalOpen}
                    onOk={handleOk}
                    onCancel={handleCancel}
                    // cancelButtonProps={}
                    // okButtonProps={blue}
                >
                <p>default addresses?</p>
                <p>locking tabs?</p>
                <p>other stuff?</p>
            </Modal>
        </div>
    );
};

export default Settings;