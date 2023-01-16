//Darla Ward
//QAP 1 - Full-stack JavaScript
//Completed January 16, 2023

//nodemon Module installed aswell. Type "nodemon index.js" in terminal.
//If any changes made in the text, ports won't have to be killed in order to see the changes.
var http = require("http"); //HTTP Module
var fs = require("fs"); //File System Module
var url = require("url"); //URL Module
const express = require("express"); //Express Module

//create a server object on local host
http
  .createServer(function (req, res) {
    res.write("QAP 1 - HTTP Module"); //text on server
    res.end(); //end the response
    console.log("Opened local host 3001...");
  })
  .listen(3001);

//writes a new file with text in it
fs.writeFile("fswritefile.txt", "new text!", function (err) {
  if (err) throw err;
  console.log("Saved!");
});

http
  .createServer(function (req, res) {
    var q = url.parse(req.url, true);
    var filename = "." + q.pathname;
    //reads the files
    fs.readFile(filename, function (err, data) {
      if (err) {
        console.log("local host 3002 shown with error 404");
        res.writeHead(404, { "Content-Type": "text/html" });
        return res.end("404 Not Found");
      }
      //writes the text of what's in the files when typed in browser (http://localhost:3002/A.html OR http://localhost:3002/B.html)
      console.log("local host 3002 shown...");
      res.writeHead(200, { "Content-Type": "text/html" });
      res.write(data);
      return res.end();
    });
    console.log("local host 3002 shown...");
  })
  .listen(3002);

//using express to create another server like I did in the first function but express has made it more simple.
const app = express();
const port = 3003;
//this is route definition. Specifies a callback function whenever there is a HTTP get request with a path relative to the site root.
app.get("/", function (req, res) {
  res.send("Hello World using Express");
});
//starts up the server on the specified port.
app.listen(port, function () {
  console.log(`Example app listening on port ${port}!`);
});
