import { Ftp } from './index';

export var main = function(protocol:string) {
  switch(protocol) {
    case "ftp":
      let ftp:Ftp = new Ftp();
      ftp.send();
      break;
    default:
      console.log(protocol + "is invalid protocol");
  }
}
