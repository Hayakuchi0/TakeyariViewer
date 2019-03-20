import { AbstractBook } from "./abstractbook";
import { BookNode } from "./booknode";
export class BookSelf {
  private spacedir:{name:string,path:string}[];
  books:AbstractBook[];
  constructor() {
    this.spacedir = [];
    this.books=[];
    this.setSpaceDir("CONTENT","");
  }
  setSpaceDir(name:string,path:string){
    if(this.spacedir.filter(function(space){
      return (space.name == name);
    }).length == 0) {
      this.spacedir.push({name:name,path:path});
    }
  }
  toDataSource():BookNode[] {
    let dirNodes:BookNode[] = [];
    let bookNodes:BookNode[] = [];
    this.books.forEach(function(book:AbstractBook) {
      bookNodes.push({name:book.title,path:book.dirname});
    });
    this.spacedir.forEach(function(space) {
      dirNodes.push({name:space.name,path:space.path,children:[]});
    });
    let ret:BookNode = dirNodes.filter(function(node){
      return node.path === "";
    })[0];
    BookSelf.storeChildren(ret,dirNodes,dirNodes);
    BookSelf.storeChildren(ret,bookNodes,dirNodes);
    return [ret];
  }
  private static storeChildren(storeRoot:BookNode, children:BookNode[], dirNodes:BookNode[]):void {
    children.forEach(function(node){
      let parentNode = storeRoot;
      dirNodes.forEach(function(parentCanditate:BookNode){
        if((node!=parentCanditate) &&
          node.path.startsWith(parentCanditate.path) &&
          (parentNode.path.length<parentCanditate.path.length)) {
            parentNode = parentCanditate;
          }
      });
      if(node!=parentNode) {
        parentNode.children.push(node);
      }
    });
  }
}
