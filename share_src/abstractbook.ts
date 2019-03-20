export const FILENAME_BOOKSLIST:string = "books.json";
export const FILENAME_BOOKSLISTJS:string = "books.js";
export const FILENAME_BOOKSPACEJS:string = "bookSpaces.js";
export const PADDING_ZERO:string = "00000000";
export abstract class AbstractBook {
  title: string;
  dirname: string;
  extname: string[];
  spindeg: number;
  constructor(dirname:string, basepath?:string) {
    this.dirname = dirname;
    this.title = "タイトル未定義";
    this.spindeg = 0;
    this.extname = [];
    if(basepath) {
      this.readconfig(basepath);
    }
  }
  abstract readconfig(basepath:string):void;
  static numberPadding(num:number):string {
    return (PADDING_ZERO + num.toString()).slice(num.toString().length);
  }
  getNowExtName(page:number):string {
    return this.extname[page - 1];
  }
  getSrcName(page:number):string {
    return AbstractBook.numberPadding(page) + this.extname[page - 1];
  }
  getPageNumber():number {
    return this.extname.length;
  }
}
