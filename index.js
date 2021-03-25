const express = require('express')
const bodyParser = require('body-parser');
const app = express()
app.use(bodyParser.json());
const SerialPort = require('serialport');
const Readline = require('@serialport/parser-readline');
const port = new SerialPort('/dev/tty.usbserial-0001', { baudRate: 9600 });
const parser = port.pipe(new Readline({ delimiter: '\n' }));// Read the port data
global.globalString = "This can be accessed anywhere!";

port.on("open", () => {
  console.log('serial port open');
});

parser.on('data', data =>{
  str = data.toString(); //Convert to string
  str = str.replace(/\r?\n|\r/g, ""); //remove '\r' from this String

  str = str.replace(/\r?\n|\r/g, ""); //remove '\r' from this String
  str = str.replace("KG", "");
  str = str.split(' ').join('');
  //str = parseFloat(str).toFixed(1)
  
  //str = str * 10.0
  str = parseFloat(str).toFixed(1)
  console.log(str)
  global.globalString=str

});
app.get('/data', (req, res) => {
  
  let data = globalString;

    res.json({ menge: `${data}` })
    res.end() 

  
})

app.listen(3000, () => {
  console.log('Start server at port 3000.')
})

