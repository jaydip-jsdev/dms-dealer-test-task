import { type MenuProps } from "antd";

type MenuItem = Required<MenuProps>["items"][number];

type hideMenuItemParams = {
  itemsToSplit: string[];
  menuItem: MenuItem[];
  path: Record<string, string>;
};

export const onUnauthorized = () => {
  localStorage.clear();
  window.location.href = "/login";
};

export const HideMenuItem = ({
  itemsToSplit,
  menuItem,
  path,
}: hideMenuItemParams) => {
  const itemsToHide = itemsToSplit
    .map((item) => item.trim())
    .filter((item) => item.length > 0);

  const routeToModuleKeyMap: Record<string, string> = Object.fromEntries(
    Object.entries(path).map(([key, value]) => [value, key]),
  );

  const filteredMenuItems: MenuItem[] = menuItem.filter((item) => {
    const key = item?.key;
    if (typeof key !== "string") {
      return true;
    }
    const moduleKey = routeToModuleKeyMap[key];
    return !moduleKey || !itemsToHide.includes(moduleKey);
  });

  return filteredMenuItems;
};
export const getCleanUrl = (
  params: Record<string, unknown>,
  endpoint: string,
) => {
  const cleanParams = Object.entries(params).reduce(
    (acc, [key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        acc[key] = String(value);
      }
      return acc;
    },
    {} as Record<string, string>,
  );

  const queryString = new URLSearchParams(cleanParams).toString();

  const url = queryString ? `/${endpoint}?${queryString}` : `/${endpoint}`;
  return url;
};
