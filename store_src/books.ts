const fs = require("fs-extra");
const path = require("path");
import { ShareSource } from "../share_src/abstractbook";
export namespace StoreBook {
  const FILENAME_BOOKINFO:string = "bookinfo.txt";
  const FILENAME_BOOKJSON:string = "bookinfo.json";
  class Book extends ShareSource.AbstractBook {
    readconfig(basepath:string):void {
      let directoryAbsolutePath:string = path.resolve(path.join(basepath, this.dirname));
      let titlePath:string = path.join(directoryAbsolutePath, FILENAME_BOOKINFO);
      let jsonPath:string = path.join(directoryAbsolutePath, FILENAME_BOOKJSON);
      if(fs.existsSync(jsonPath)) {
        let jsonString:string = fs.readFileSync(jsonPath, "utf-8");
        let json = JSON.parse(jsonString);
        if(json["title"]) {
          this.title = json["title"];
        }
        if(json["spindeg"]) {
          this.spindeg = json["spindeg"];
        }
      } else if(fs.existsSync(titlePath)) {
        let title:string = fs.readFileSync(titlePath,"utf-8");
        this.title = title;
        if(this.title.endsWith("\n")) {
          this.title = this.title.slice(0, -1);
        }
      }
    }
    storeCopyBook(basedirpath: string, storedirpath:string):void {
      let srcdir:string = path.resolve(path.join(basedirpath, this.dirname));
      let destdir:string = path.resolve(path.join(storedirpath, this.dirname));
      let dir:string[] = fs.readdirSync(srcdir);
      fs.mkdirsSync(destdir);
      fs.emptyDirSync(destdir);
      for(let i=0,index=0;i<dir.length;i++) {
        let filename:string = dir[index];
        if((filename!=FILENAME_BOOKINFO)&&(filename!=FILENAME_BOOKJSON)) {
          index++;
          this.extname[i] = path.extname(filename);
          let pagename:string = this.getSrcName(index);
          let srcpath:string = path.join(srcdir, filename);
          let destpath:string = path.join(destdir, pagename);
          fs.copyFileSync(srcpath, destpath);
        }
      }
    }
    createConfigJson():string {
      return JSON.stringify(this);
    }
  }
  export class Books {
    books: Map<string, Book>;
    constructor(dirlist:string[],basedirpath:string) {
      this.books = new Map<string,Book>();
      dirlist.forEach( dirname=> {
        let book = new Book(dirname,basedirpath);
        this.books.set(dirname, book);
      });
    }
    storeImages(basedirpath:string, storedirpath:string):void {
      this.books.forEach(function(value, key, map) {
        value.storeCopyBook(basedirpath,storedirpath);
      });
      fs.writeFileSync(path.join(storedirpath, ShareSource.FILENAME_BOOKSLIST),JSON.stringify(this.getBookListJson()), "utf-8");
    }
    storeJS(scriptdirpath):void {
      let booklist = this.getBookListJson();
      let outjson = "exports.booklist = "+ JSON.stringify(booklist) + ";";
      fs.writeFileSync(path.join(scriptdirpath, ShareSource.FILENAME_BOOKSLISTJS),outjson, "utf-8");
    }
    private getBookListJson():Book[] {
      let booklist:Book[] = [];
      this.books.forEach(function(value, key, map) {
        booklist.push(value);
      });
      return booklist;
    }
    static getArgFromDir(basedirpath:string): string[] {
      let ret:string[] = [];
      let baseDirPathLength:number = path.join(basedirpath,".").length+1;
      Books.searchDir(ret, basedirpath);
      for(let i=0;i<ret.length;i++) {
        ret[i] = ret[i].slice(baseDirPathLength);
      }
      return ret;
    }
    private static searchDir(ret: string[], basepath:string)
    {
      let files:string[] = fs.readdirSync(basepath);
      if((files.filter(function(file) {
        let ret:boolean = false;
        ret = ret || (file===FILENAME_BOOKINFO);
        ret = ret || (file===FILENAME_BOOKJSON);
        return ret;
      })).length === 0 ) {
        let dirs:string[] = files.filter(file => (fs.statSync(path.join(basepath, file)).isDirectory()));
        dirs.forEach(dir => {
          Books.searchDir(ret, path.join(basepath,dir))
        });
      } else {
        ret.push(basepath);
      }
    }
  }
}
