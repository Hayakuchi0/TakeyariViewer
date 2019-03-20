export const FAVICON_PATH:string = "src/favicon.ico";
export const TOPIMAGE_PATH:string ="src/assets/topimage.png";
export const ABOUTIMAGE_PATH:string ="src/assets/aboutimage.png";
export abstract class AbstractSite {
  siteName:string;
  copyRight:string;
  about:string;
  abstract readconfig():void;
}
