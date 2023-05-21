var http = require('http');
var pdfkit = require('pdfkit');
var fs = require('fs');
var textEncoding = require('text-encoding');
var url = require("url")

function generateHr(doc, y) {
    doc
      .strokeColor("#aaaaaa")
      .lineWidth(1)
      .moveTo(50, y)
      .lineTo(550, y)
      .stroke();
  }

function generateHeader(doc) {
    doc
      .image("form_logo.png", 50, 45, { width: 50 })
      .fillColor("#444444")
      .fontSize(20)
      .text("Form Data", 110, 57)
      .fontSize(10)
      .moveDown();
  }

function generateCustomerInformation(doc, obj) {
  generateHr(doc, 185);

  const customerInformationTop = 200;

  doc
    .fontSize(20)
    .text("Name:", 150, customerInformationTop)
    .font("Helvetica-Bold")
    .text(obj.name, 350, customerInformationTop)
    .font("Helvetica")
    .text("Gender:", 150, customerInformationTop + 25)
    .text(obj.gender, 350, customerInformationTop + 25)
    .text("Email:", 150, customerInformationTop + 50)
    .text(obj.email, 350, customerInformationTop + 50)
    .text("Password:", 150, customerInformationTop + 75)
    .text(obj.password, 350, customerInformationTop + 75)

    .font("Helvetica-Bold")
    .moveDown();

  generateHr(doc, 310);
}
http.createServer((req,res) => {
    URL = url.parse(req.url,true);
    if (URL.pathname == '/formupload'){
        const doc = new pdfkit({ size: "A4", margin: 50 });
        doc.pipe(fs.createWriteStream('Output.pdf'));
        generateHeader(doc);
        generateCustomerInformation(doc,URL.query);
        doc.end();
        res.writeHead(200, {'Content-Type' : 'text/plain'});
        res.write(JSON.stringify(URL.query));
        res.end();
    }
    else if(URL.pathname == '/form_logo.png'){
        fs.readFile('./form_logo.png', (err,data) => {
            res.writeHead(200, {'Content-Type' : 'image/x-png'});
            res.write(data);
            res.end()
        })
    }
    else if(URL.pathname == '/script.js'){
        fs.readFile('./script.js', (err,data) => {
            res.writeHead(200, {'Content-Type' : 'application/javascript'});
            res.write(data);
            res.end()
        })
    }
    else{
        fs.readFile('./index.html', (err,data) => {
            res.writeHead(200, {'Content-Type' : 'text/html'});
            res.write(data);
            res.end()
        })
    }
}).listen(8080, () => {
    console.log('Server started at 8080');
});