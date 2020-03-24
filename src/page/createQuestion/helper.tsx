import { AppInfo } from "../../types/declations";

// 앱인포 반환
export const getAppInfo = (): AppInfo => {
  const appInfoString = localStorage.getItem("appInfo");

  const appInfo = appInfoString ? JSON.parse(appInfoString) : null;

  const defaultAppInfo: AppInfo = {
    needGuid: true
  };

  if (!appInfo) {
    localStorage.setItem("appInfo", JSON.stringify(defaultAppInfo));
  }

  return appInfo || defaultAppInfo;
};

export default "";
