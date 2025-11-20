
import {UAParser} from "ua-parser-js";
export function getClientDeviceInfo() {
  const parser = new UAParser();
  const info = parser.getResult();

  const deviceName = info.device.model || info.browser.name || "Unknown";
  const platform = info.os.name + " " + (info.os.version || "");
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  return { deviceName, platform, timezone };
}