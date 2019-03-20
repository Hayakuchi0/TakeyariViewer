const fs = require("fs-extra");
const path = require("path");
import { AbstractBook,BookSelf, FILENAME_BOOKSLIST, FILENAME_BOOKSLISTJS, FILENAME_BOOKSPACEJS } from "../share_src/index";
export namespace StoreBook {
  const FILENAME_BOOKINFO:string = "bookinfo.txt";
  const FILENAME_BOOKJSON:string = "bookinfo.json";
  const FILENAME_BOOKSPACE:string = "bookspace.txt"
  export var BOOK_ENCODE:string = "utf-8";
  class Book extends AbstractBook {
    readconfig(basepath:string):void {
      let directoryAbsolutePath:string = path.resolve(path.join(basepath, this.dirname));
      let titlePath:string = path.join(directoryAbsolutePath, FILENAME_BOOKINFO);
      let jsonPath:string = path.join(directoryAbsolutePath, FILENAME_BOOKJSON);
      if(fs.existsSync(jsonPath)) {
        let jsonString:string = fs.readFileSync(jsonPath, BOOK_ENCODE);
        let json = JSON.parse(jsonString);
        if(json["title"]) {
          this.title = json["title"];
        }
        if(json["spindeg"]) {
          this.spindeg = json["spindeg"];
        }
      } else if(fs.existsSync(titlePath)) {
        let title:string = fs.readFileSync(titlePath, BOOK_ENCODE);
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
      fs.writeFileSync(path.join(storedirpath, FILENAME_BOOKSLIST),JSON.stringify(this.getBookListJson()), BOOK_ENCODE);
    }
    storeJS(scriptdirpath,basedirpath):void {
      this.storeBookList(scriptdirpath);
      this.storeBookSpace(scriptdirpath,basedirpath);
    }
    private storeBookList(scriptdirpath):void {
      let booklist = this.getBookListJson();
      let outjson = "exports.booklist = "+ JSON.stringify(booklist) + ";";
      fs.mkdirsSync(scriptdirpath);
      fs.writeFileSync(path.join(scriptdirpath, FILENAME_BOOKSLISTJS),outjson, BOOK_ENCODE);
    }
    private storeBookSpace(scriptdirpath,basedirpath):void {
      let bookSpaceList:{name:string,path:string}[] = [];
      let bookSpaceDirs:string[] = [];
      let baseDirPathLength:number = path.join(basedirpath,".").length+1;
      let storeBookSelf = new BookSelf();
      Books.searchDirRoot(bookSpaceDirs, basedirpath,[FILENAME_BOOKSPACE]);
      bookSpaceDirs.forEach(function(bookSpacePath){
        let spaceName:string = fs.readFileSync(path.join(path.join(basedirpath,bookSpacePath),FILENAME_BOOKSPACE),BOOK_ENCODE);
        if(spaceName.endsWith("\n")) {
          spaceName = spaceName.slice(0, -1);
        }
        bookSpaceList.push({name:spaceName,path:bookSpacePath});
      });
      let outjson = "exports.bookSpaceList = "+ JSON.stringify(bookSpaceList)+";";
      fs.writeFileSync(path.join(scriptdirpath, FILENAME_BOOKSPACEJS),outjson, BOOK_ENCODE);
      this.books.forEach(function(value,key,map) {
        storeBookSelf.books.push(value);
      });
      bookSpaceList.forEach(function(bookSpace){
        storeBookSelf.setSpaceDir(bookSpace.name,bookSpace.path);
      });
      storeBookSelf.toDataSource();
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
      Books.searchDirRoot(ret, basedirpath,[FILENAME_BOOKINFO,FILENAME_BOOKJSON]);
      return ret;
    }
    private static searchDirRoot(ret:string[], basedirpath:string, targets:string[]) {
      let baseDirPathLength:number = path.join(basedirpath,".").length+1;
      Books.searchDir(ret,basedirpath,targets);
      for(let i=0;i<ret.length;i++) {
        ret[i] = ret[i].slice(baseDirPathLength);
      }
    }
    private static searchDir(ret: string[], basepath:string, targets:string[])
    {
      let files:string[] = fs.readdirSync(basepath);
      if((files.filter(function(file) {
        let ret:boolean = false;
        targets.forEach(function(target) {
          ret = ret || (file===target);
        });
        return ret;
      })).length === 0 ) {
        let dirs:string[] = files.filter(file => (fs.statSync(path.join(basepath, file)).isDirectory()));
        dirs.forEach(dir => {
          Books.searchDir(ret, path.join(basepath,dir),targets)
        });
      } else {
        ret.push(basepath);
      }
    }
  }
}
