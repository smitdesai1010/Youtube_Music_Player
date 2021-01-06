const fetch = require('node-fetch');
const fs = require('fs');

//https://www.yt-download.org/api/button/mp3/AgX2II9si7w
//id = 'AgX2II9si7w'
//node my_modules/getaudio.js
const getdata = async(id,download) => {

    const response = await fetch('https://www.yt-download.org/api/button/mp3/'+id);
    const text = await response.text();
    const link = await parsecontent(text);
    
    if (link.includes('HTTP 429'))
        return {Data: "HTTP 429" , Error: true}

    if (download)
        return {Data: link , Error: false};
        
   
    const res = await fetch(link);
    console.log('got file')    
    var buffer = await res.buffer()
    console.log(buffer.length)

    return {Data: buffer , Error: false};
}

async function parsecontent(html){

    if (html.includes('HTTP 429'))
        return "HTTP 429: Too many requests"

    html = html.slice( html.indexOf('div') )
    html = html.slice( html.lastIndexOf('https') )
    link = html.split('"',1)
    return String(link[0]);
}

//getdata(id,false)

exports.getdata = getdata