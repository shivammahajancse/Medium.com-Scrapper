const request = require('request');
const cheerio = require('cheerio');

var tag='angular';

const url = `https://medium.com/tag/${tag}/latest`;
request(url,cb);
function cb(err, response, html){
    if(err){
        console.log(err);
    }
    else{
        extractHtml(html);
    }
}

function extractHtml(html){
    let $ = cheerio.load(html);
    let elearrwriter = $('.ae.fu h4');
    let elearrhead = $('.ae.fu h2');
    let elearrdesc = $('.ae.fu h3');
    let elenewwrite=[];
    for(let i=0;i<elearrwriter.length;i++)
    {


        if($(elearrwriter[i]).text()=='in')
        {
            i++;
        }
        else{
            elenewwrite.push(elearrwriter[i]);
        }
    }
    for(let k=0;k<10;k++)
    {
        let tt=$(elenewwrite[k]).text();
        console.log(tt);
    }

    // for(let i=0;i<10;i++)
    // {
    //     let text1 = $(elearrwriter[i]).text();
    //     let text2 = $(elearrhead[i]).text();
    //     let text3 = $(elearrdesc[i]).text();
    //     console.log(text1);
    //     console.log(text2);
    //     console.log(text3);
    //     console.log('');
    // }


}