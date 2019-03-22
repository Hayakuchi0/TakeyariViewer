# TakeyariViewer

This is program for make protfolio site simply.


## Description

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.3.3.

If use this program, You can make the portfolio site simply.
How to make basic is here.

1. Store the directory containg the display files in the "CONTENT" directory.
2. Store the text file "bookinfo.txt", Which writed directory title for display in the directory, Which maked at procedure of 1.
3. Build in accordance with the procedure of "Build".
4. The portfolio site is then generated in "dist/TakeyariViewer" directory.

If "bookinfo.txt" and the display files exist in directory, and it in "CONTENT", Then the portfolio site show the display files.

If exist more than 1 directory, Which maked procedure 1, Then the portfolio site show list directory. ("bookinfo.txt" need exist in each direcotry.)

If directory in directory, Then The portfolio site show list structure, Do not show tree structure.


## Dependencies

npm nodejs


## Demonstration

This is demonstration in Ubuntu.
If run command of here, And Access to `http://localhost:4200` with web browser, Then you can view the example portfolio site.
Note that you need git, unzip and wget command to run this demonstration.

```
$ git clone https://github.com/Hayakuchi0/TakeyariViewer.git
$ cd TakeyariViewer
$ wget https://hinesm.info/TakeyariViewer/demo/example.zip
$ unzip example.zip
$ mv example CONTENT
$ ./build.sh
$ ng serve
```


## Build

### Linux

Run `./build.sh` to build the project. The build artifacts will be stored in the `dist/` directory.


## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.


## LICENSE

[MIT](https://github.com/Hayakuchi0/TakeyariViewer/blob/master/LICENSE)


## Author

[Hayakuchi0](https://github.com/Hayakuchi0/)
