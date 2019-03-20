/** File node data with possible child nodes. */
export interface BookNode {
  name: string;
  path: string;
  children?: BookNode[];
}
