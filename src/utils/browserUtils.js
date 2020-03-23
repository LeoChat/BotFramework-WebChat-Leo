const { userAgent } = navigator;

// not DRY so that list can be alphabetical
export const isChromium = !/Edge\//u.test(userAgent) && /Chrome\//u.test(userAgent);
export const isEdgeAnaheim = /Edg\//u.test(userAgent);
export const isEdgeUWP = /Edge\//u.test(userAgent);
export const isFirefox = /Firefox\//u.test(userAgent);
export const isIE11 = /Trident\/7.0/u.test(userAgent);
export const isChrome = isChromium && !isEdgeAnaheim;
export const isSafari = !(isChrome || isEdgeUWP || isIE11 || isFirefox);
