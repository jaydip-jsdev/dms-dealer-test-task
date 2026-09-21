"use client";

import { ConfigProvider, type ThemeConfig } from "antd";
import { type ReactNode } from "react";

import { getAntdTheme } from "./antd-theme";

// Centralized Ant Design theme configuration

interface AntdConfigProviderProps {
  children: ReactNode;
  theme?: ThemeConfig;
}

/**
 * Centralized Ant Design ConfigProvider
 * Use this in your apps to ensure consistent Ant Design theming
 */
function AntdConfigProvider({ children, theme = {} }: AntdConfigProviderProps) {
  const finalTheme = getAntdTheme(theme);
  return <ConfigProvider theme={finalTheme}>{children}</ConfigProvider>;
}

export default AntdConfigProvider;
