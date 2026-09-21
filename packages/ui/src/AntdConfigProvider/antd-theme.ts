import { type ThemeConfig } from "antd";
import { merge } from "lodash";

export const antdDefaultTheme: ThemeConfig = {
  token: {
    colorLink: "#F8285A",
    colorPrimary: "#F8285A",
  },
  components: {
    Slider: {
      colorBgContainer: "#fff",
    },
    Menu: {
      colorBgContainer: "#fff",
      colorPrimary: "#F8285A",
      itemSelectedBg: "#FEF6F6",
    },
    Button: {
      defaultBg: "#FFEEF3",
      defaultColor: "#F8285A",
      colorText: "#F8285A",
    },
    Table: {
      headerBg: "#FFFAFB",
    },
  },
};

export const getAntdTheme = (theme: ThemeConfig) => {
  return merge(antdDefaultTheme, theme);
};
