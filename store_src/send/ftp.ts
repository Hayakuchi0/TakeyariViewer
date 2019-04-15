const FtpDeploy = require('ftp-deploy');
const fs = require('fs-extra');
const path = require('path');
import { Sender } from './sender';

export class Ftp extends Sender {
  protocolName():string {
    return "ftp";
  }
  readconfig():void {
    this.config["localRoot"]=path.join(process.cwd(),"dist","TakeyariViewer");
    this.config["include"]=["*","**/*"];
    this.config["exclude"]=[];
    this.config["deleteRemote"]=true;
    this.config["forcePasv"]=true;
  }
  send():void {
    let ftp = new FtpDeploy();
    let conf = this.config;
    ftp.on('uploaded', function(data) {
      console.log(data);
    });
    ftp.deploy(conf, function(err,res){
      if(err) {
        console.log(err);
      } else {
        console.log('finished: uploaded');
      }
    });
  }
}
