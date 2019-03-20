import { StoreBook } from "./books";
import { StoreSite } from "./siteinfo";
if( process && (process.argv.length > 2)) {
  let basedirpath = "./CONTENT";
  let storedirpath = "./src/assets/CONTENT/";
  let scriptdirpath = "./src/app/outjs/";
  StoreBook.BOOK_ENCODE = process.argv[2];
  let args = StoreBook.Books.getArgFromDir(basedirpath);
  let books = new StoreBook.Books(args,basedirpath);
  books.storeImages(basedirpath, storedirpath);
  books.storeJS(scriptdirpath,basedirpath);
  let configdirpath = "./CONFIG";
  let siteinfo = new StoreSite.SiteInfo(configdirpath, process.argv[2]);
  siteinfo.configCopy();
} else {
  console.log("文字コードを指定してください。");
}
