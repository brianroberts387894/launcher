import { Tabs, ConfigProvider, theme } from 'antd';

// TODO: stupid type casting
const themeConfig = {
  algorithm: 'dark',
  components: {
    Tabs: {
      margin: 0,
      colorBorderSecondary: "rgb(126, 126, 126)",
      colorFillAlter: "rgb(126, 126, 126)",
      colorBgContainer: "rgb(47, 47, 47)",
      itemColor: "rgb(224, 224, 224)",
      itemSelectedColor: "rgb(255, 255, 255)",
      itemHoverColor: "rgb(255, 255, 255)",
      itemActiveColor: "rgb(126, 126, 126)",
    },
    Input: {
      activeBorderColor: "rgb(11, 148, 141)",
      hoverBorderColor: "rgb(17, 177, 150)",
      colorPrimaryActive: "rgb(11, 148, 141)",
      colorPrimaryHover: "rgb(11, 148, 141)",
      colorBorderSecondary: "rgb(11, 148, 141)",
      borderRadiusLG: 17,
    },
    Button: {
      colorPrimary: "rgb(17, 177, 150)",
      colorBgContainer: "rgb(17, 177, 150)",
      colorPrimaryHover: "rgb(176, 255, 242)",
      colorPrimaryActive: "rgb(217, 255, 249)",
      fontWeight: 700,
      borderRadius: 4,
    },
    Spin: {
      dotSizeLG: 200,
      colorPrimary: "rgb(10, 128, 122)",
      colorBgMask: "rgba(47, 47, 47, 0.79)",
      colorBgContainer: "rgb(47, 47, 47)",
    }
  }
};

export default themeConfig;