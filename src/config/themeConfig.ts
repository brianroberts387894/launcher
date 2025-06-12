import { ThemeConfig, theme } from 'antd';

export const antdThemeConfig: ThemeConfig = {
  algorithm: theme.darkAlgorithm,
  components: {
    Tabs: {
      margin: 0,
      cardHeightSM: 25,
      horizontalMargin: 	"0px 150px 0px 5px",
      colorBorderSecondary: "rgba(255, 255, 255, 0)",
      itemColor: "rgb(224, 224, 224)",
      colorFillAlter: "rgb(43, 43, 43)",
      colorBgContainer: "#555555",
      itemSelectedColor: "rgb(255, 255, 255)",
      itemActiveColor: "rgb(126, 126, 126)",
      itemHoverColor: "rgb(255, 255, 255)",
    },
    Input: {
      activeBorderColor: "#47979E",
      hoverBorderColor: "#47979E",
      colorPrimaryActive: "rgb(43, 43, 43)",
      colorPrimaryHover: "rgb(43, 43, 43)",
      colorBorderSecondary: "#47979E",
      borderRadiusLG: 17,
      colorBgContainer: "rgb(43, 43, 43)",
      
    },
    Spin: {
      dotSizeLG: 200,
      colorPrimary: "rgb(14, 209, 199)",
      colorBgMask: "rgba(47, 47, 47, 0.79)",
      colorBgContainer: "#555555",
    },
    Modal: {
      colorBgElevated: "#1d1d1d"
    }

  }
};

export const searchButtonTheme: ThemeConfig = {
  algorithm: theme.darkAlgorithm,
  components: {
    Button: {
      colorPrimary: "#47979E",
      colorBgContainer: "#47979E",
      colorPrimaryHover: "rgb(176, 255, 242)",
      colorPrimaryActive: "rgb(217, 255, 249)",
      colorBorder: "rgba(0, 92, 78, 0)",
      fontWeight: 700,
      borderRadius: 4,
    },
  }
};

