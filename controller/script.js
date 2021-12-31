const request = require('request');
const cheerio = require('cheerio');

var tag;

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
    let relatedtopics = $('.eq.db.er.l div');
    let date = $('.ae.t>p').text();
    let time = [];
    let link = $('.ae.fu .el.l a');
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

    $('span').each((i,el)=>{
        let temp=$(el).text();

        if($(el).attr().class!=undefined && $(el).attr().class.length==13 && temp.length>1)time.push(temp);  
    });
    for(let k=0;k<10;k++)
    {
        
        console.log(date[k]);
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

    function getjson()
    {
        let object={
            "writer":elenewwrite,
            "head": elearrhead,
            "desc": elearrdesc,
            "topics": relatedtopics,
            "date": date,
            "time": time,
            "link": link
        };
        console.log(object);
        return object;
    } 
}
module.exports = {search,getjson};