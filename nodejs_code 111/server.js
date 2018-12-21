var http = require("http");
var fs = require("fs");

//const csv = require("csvtojson"); //convert csv to json object
var express = require("express"); //Express adds dead simple routing and support for Connect middleware
var app = express(); //constructor of express
const bodyParser = require("body-parser");
var cors = require("cors"); //installed cors because of No Access control policy
app.use(bodyParser.urlencoded({ extended: false })); //body-parser extract the entire body portion of an incoming request stream and exposes it on req.body

app.use(cors());
var port = 8085;
//var emp=require('../csv_files/emp.csv');
var sp = require("./dataScatterPlot.js"); //including fetchcsv file
//var p=sp.cj(app,emp);
//console.log(p);
var csvToJson = require('convert-csv-to-json');
let jsonEmp = csvToJson.fieldDelimiter(',').getJsonFromCsv("./csv_files/emp.csv");
//console.log(jsonEmp);

let jsonDept = csvToJson.fieldDelimiter(',').getJsonFromCsv("./csv_files/dept.csv");
//console.log(jsonDept);

let jsonPos = csvToJson.fieldDelimiter(',').getJsonFromCsv("./csv_files/pos.csv");
//console.log(jsonPos);

let jsonPosDept = csvToJson.fieldDelimiter(',').getJsonFromCsv("./csv_files/dept_pos.csv");
// console.log(jsonPosDept);

let jsonPosDeptSal = csvToJson.fieldDelimiter(',').getJsonFromCsv("./csv_files/dept_pos_sal1.csv");
// console.log(jsonPosDeptSal);

let jsonEmpDeptPos = csvToJson.fieldDelimiter(',').getJsonFromCsv("./csv_files/emp_dept_pos.csv");
//console.log(jsonEmpDeptPos);
app.post('/passDeptName', function (request, response) {
   console.log("depId" +request.body.depid);
   sp.arrange(parseInt(request.body.depid), jsonEmp, jsonDept, jsonPos, jsonPosDept, jsonPosDeptSal, jsonEmpDeptPos, app, response);
});

app.listen(port, function () {
   //binding server in port 8083
   console.log("Server started on port  " + port);
});
