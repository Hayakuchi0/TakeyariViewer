const fs = require("fs-extra");
import { StoreBook } from "./books";
import { StoreSite } from "./siteinfo";
let basedirpath = "./CONTENT";
let storedirpath = "./src/assets/CONTENT/";
let scriptdirpath = "./src/app/outjs/";
let configdirpath = "./CONFIG";
fs.mkdirsSync(basedirpath);
fs.mkdirsSync(configdirpath);
if(fs.exists(scriptdirpath)) {
  fs.removeSync(scriptdirpath);
}
fs.mkdirsSync(scriptdirpath);
let siteinfo = new StoreSite.SiteInfo(configdirpath);
siteinfo.configCopy();
StoreBook.BOOK_ENCODE = siteinfo.encoding;
console.log(siteinfo.encoding);
let args = StoreBook.Books.getArgFromDir(basedirpath);
let books = new StoreBook.Books(args,basedirpath);
books.storeImages(basedirpath, storedirpath);
books.storeJS(basedirpath,scriptdirpath);
