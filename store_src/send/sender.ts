const fs = require('fs-extra');
const path = require('path');
const iconv = require('iconv-lite');
export abstract class Sender {
  encoding:string;
  config:JSON;
  constructor() {
    this.encoding = fs.readFileSync(path.join(process.cwd(),'CONFIG','encoding.txt'),"utf-8").split("\n")[0];
    let buffer = fs.readFileSync(path.join(process.cwd(),'CONFIG','send',this.protocolName()+'.json'));
    this.config = JSON.parse(iconv.decode(buffer, this.encoding));
    this.readconfig();
  }
  abstract protocolName():string;
  abstract readconfig():void;
  abstract send():void;
}
