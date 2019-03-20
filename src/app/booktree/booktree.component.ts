import { Component } from '@angular/core';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { FlatTreeControl } from '@angular/cdk/tree';
import { BookSelf, BookNode } from './../../../share_src/index';
import { Books } from '../book';


/**
 * Flattened tree node that has been created from a BookNode through the flattener. Flattened
 * nodes include level index and whether they can be expanded or not.
 */
export interface FlatTreeNode {
  name: string;
  path: string;
  level: number;
  expandable: boolean;
}

@Component({
  selector: 'app-booktree',
  templateUrl: './booktree.component.html',
  styleUrls: ['./booktree.component.css']
})
export class BooktreeComponent {
  private bookself:BookSelf;
  private _books:Books;
  /** The TreeControl controls the expand/collapse state of tree nodes.  */
  treeControl: FlatTreeControl<FlatTreeNode>;

  /** The TreeFlattener is used to generate the flat list of items from hierarchical data. */
  treeFlattener: MatTreeFlattener<BookNode, FlatTreeNode>;

  /** The MatTreeFlatDataSource connects the control and flattener to provide data. */
  dataSource: MatTreeFlatDataSource<BookNode, FlatTreeNode>;

  constructor() {
    this.treeFlattener = new MatTreeFlattener(
      this.transformer,
      this.getLevel,
      this.isExpandable,
      node => node.children);

    this.treeControl = new FlatTreeControl(this.getLevel, this.isExpandable);
    this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
    this.bookself = new BookSelf();
    this.dataSource.data = [];
  }
  get books():Books {
    return this._books;
  }
  setBooks(books:Books) {
    this._books=books;
    this.bookself.books = books.books;
    let me = this;
    books.bookspace.forEach(function(space){
      me.bookself.setSpaceDir(space.name,space.path);
    });
    this.dataSource.data = this.bookself.toDataSource();
  }
  /** Transform the data to something the tree can read. */
  transformer(node: BookNode, level: number) {
    return {
      name: node.name,
      path: node.path,
      level: level,
      expandable: !!node.children
    };
  }

  /** Get the level of the node */
  getLevel(node: FlatTreeNode) {
    return node.level;
  }

  /** Get whether the node is expanded or not. */
  isExpandable(node: FlatTreeNode) {
    return node.expandable;
  }

  /** Get whether the node has children or not. */
  hasChild(index: number, node: FlatTreeNode) {
    return node.expandable;
  }
}
