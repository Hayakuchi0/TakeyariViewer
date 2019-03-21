const fs = require("fs-extra");
const path = require("path");
const markdown = require("markdown");
const iconv = require("iconv-lite");
import { AbstractSite, FAVICON_PATH, TOPIMAGE_PATH, ABOUTIMAGE_PATH } from "../share_src/index";
export namespace StoreSite {
  const CONFIGFILE_FAVICON:string="favicon.ico";
  const CONFIGFILE_TOPIMAGE:string="topimage.png";
  const CONFIGFILE_ABOUTIMAGE:string="aboutimage.png";
  const CONFIGFILE_ABOUT:string="about.txt";
  const CONFIGFILE_SITENAME:string="sitename.txt";
  const CONFIGFILE_COPYRIGHT:string="copyright.txt";
  const CONFIGFILE_ENCODING:string="encoding.txt";
  const WRITETARGET_SITEINFOJS:string="src/app/outjs/siteinfo.js";
  const WRITETARGET_ABOUTHTML:string="src/app/about/about.component.html";
  export class SiteInfo extends AbstractSite {
    configdirpath:string;
    encoding:string;
    constructor(configdirpath:string) {
      super();
      this.configdirpath = configdirpath;
    }
    readconfig():void {
      this.siteName = this.readConfigFile(CONFIGFILE_SITENAME);
      this.copyRight = this.readConfigFile(CONFIGFILE_COPYRIGHT);
      this.about = "<div id=\"bgimg\"><div id=\"bgmask\">"+markdown.markdown.toHTML(this.readConfigFile(CONFIGFILE_ABOUT))+"<app-copyright></app-copyright></div></div>";
    }
    configCopy():void {
      this.readconfig();
      fs.copyFileSync(path.join(this.configdirpath,CONFIGFILE_FAVICON), FAVICON_PATH);
      fs.copyFileSync(path.join(this.configdirpath,CONFIGFILE_TOPIMAGE), TOPIMAGE_PATH);
      fs.copyFileSync(path.join(this.configdirpath,CONFIGFILE_ABOUTIMAGE), ABOUTIMAGE_PATH);
      let exportSiteName = "exports.sitename = \"" + this.siteName + "\";";
      let exportCopyRight = "exports.copyright = \"" + this.copyRight + "\";";
      let siteinfo = exportSiteName + "\n" + exportCopyRight;
      fs.writeFileSync(WRITETARGET_SITEINFOJS, siteinfo, "utf-8");
      fs.writeFileSync(WRITETARGET_ABOUTHTML, this.about, "utf-8");
    }
    private readConfigFile(filename:string,encoding?:string):string {
      if(!(encoding)) {
        encoding = this.readConfigFile(CONFIGFILE_ENCODING,"utf-8");
      }
      this.encoding = encoding;
      let buffer = fs.readFileSync(path.join(this.configdirpath,filename));
      let ret:string = iconv.decode(buffer,this.encoding);
      if(ret.endsWith("\n")) {
        ret = ret.slice(0,-1);
      }
      return ret;
    }
  }
}
