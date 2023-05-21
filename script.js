let blob;
let myImage;
let oReq = new XMLHttpRequest();
oReq.open("GET", "form_logo.png", true);
oReq.responseType = "arraybuffer";
oReq.onload = function(oEvent) 
{
  myImage = oReq.response;
};
oReq.send(null)

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
      .image(myImage, 50, 45, { width: 50 })
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

const exportpdf = () => {

}

function createpdf(query){
    const doc = new PDFDocument({ size: "A4", margin: 50 });
    const stream = doc.pipe(blobStream());
    generateHeader(doc);
    generateCustomerInformation(doc,query);
    doc.save();
    doc.end();
    stream.on('finish', () => {
        const url = stream.toBlobURL("application/pdf");
        open(url);
    });
}

const pdfgenerate = () => {
    query = {
        "name" : document.getElementsByName("name")[0].value,
        "gender" : document.getElementsByName("gender")[0].value,
        "email" : document.getElementsByName("email")[0].value,
        "password" : document.getElementsByName("password")[0].value
    }
    createpdf(query);
}