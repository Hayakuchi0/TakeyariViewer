const fs = require('fs-extra');
const path = require('path');
export abstract class Sender {
  encoding:string;
  config:JSON;
  constructor() {
    this.encoding = fs.readFileSync(path.join(process.cwd(),'CONFIG','encoding.txt'),"utf-8").split("\n")[0];
    this.config = JSON.parse(fs.readFileSync(path.join(process.cwd(),'CONFIG','send',this.protocolName()+'.json'), this.encoding));
    this.readconfig();
  }
  abstract protocolName():string;
  abstract readconfig():void;
  abstract send():void;
}
