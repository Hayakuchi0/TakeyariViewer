import { StoreBook } from "./books";
let basedirpath = "../books";
let storedirpath = "./src/assets/books/";
let scriptdirpath = "./src/app/"
let args = StoreBook.Books.getArgFromDir(basedirpath);
let books = new StoreBook.Books(args,basedirpath);
books.storeImages(basedirpath, storedirpath);
books.storeJS(scriptdirpath);
console.log(books);
