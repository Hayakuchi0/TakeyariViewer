import { ShareSource } from "../../share_src/abstractbook";
const path = require("path");
const books = require("./books.js");
export class Book extends ShareSource.AbstractBook {
  bookDirectoryPath:string
  readconfig(basepath:string):void {
    let me = books.booklist.filter(book => (path.join(book.dirname,".") === path.join(this.dirname,".")))[0];
    this.dirname = me.dirname;
    this.title = me.title;
    this.extname = me.extname;
    this.spindeg = me.spindeg;
    this.bookDirectoryPath = path.join(basepath, this.dirname);
  }
  getSrcName(page:number):string {
    return path.join(this.bookDirectoryPath, super.getSrcName(page));
  }
}
function allBooks(basepath:string):Book[] {
  let bookmap = new Map<string, Book>();
  books.booklist.forEach(function(book) {
    bookmap.set(book.dirname, new Book(book.dirname, basepath));
  });
  let ret:Book[] = [];
  bookmap.forEach(function(value:Book, index:string, map:Map<string, Book>) {
    ret.push(value);
  });
  return ret;
}
export interface BooksListener {
  onBookChanged(books:Books, beforebook:Book, afterbook:Book):void;
}
export class Books {
  books:Book[];
  private _nowbook:Book;
  listeners :BooksListener[];
  constructor(basepath:string, bookname?:string) {
    this.listeners = [];
    this.books = allBooks(basepath);
    if(bookname) {
      this.setNowBook(bookname);
    }
  }
  set nowbook(book:Book) {
    this._nowbook=book;
    let me = this;
    this.listeners.forEach(function(listener:BooksListener){
      if(listener) {
        listener.onBookChanged(me, me._nowbook, book);
      }
    });
  }
  get nowbook() {
    return this._nowbook;
  }
  setNowBook(bookname:string) {
    let dirname:string = path.join(bookname,".");
    let afterbook = this.books.filter(book => (book.dirname === dirname));
    if(afterbook.length > 0) {
      this.nowbook = afterbook[0];
    }
  }
}
