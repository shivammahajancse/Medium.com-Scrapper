const request = require('request');
const cheerio = require('cheerio');

var tag;
function search(t)
{
    tag=t;
    scrap();
}

function scrap()
{
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
let elearrwriter = [];
let elearrhead = [];
let elearrdesc = [];
let relatedtopics = [];
let date = [];
let time = [];
let link = [];
let elearrwriter2 = [];
let elearrhead2 = [];
let elearrdesc2 = [];
let relatedtopics2 = [];
let date2 = [];
let link2 = [];

function extractHtml(html){
    $ = cheerio.load(html);
    elearrhead = $('.ae.fu h2');
    elearrdesc = $('.ae.fu h3');
    elearrwriter = $('.ae.fu h4');
    relatedtopics = $('.eq.db.er.l div');
    date = $('.ae.t>p');
    link = $('.ae.fu .el.l a');
    elearrwriter2=[];

    for(let i=0;i<elearrwriter.length;i++)
    {


        if($(elearrwriter[i]).text()=='in')
        {
            i++;
        }
        else{
            elearrwriter2.push($(elearrwriter[i]).text());
        }
    }
    for(let j=0;j<10;j++)
    {
        elearrhead2.push($(elearrhead[j]).text());
        elearrdesc2.push($(elearrdesc[j]).text());
        relatedtopics2.push($(relatedtopics[j]).text());
        date2.push($(date[j]).text());
        link2.push($(link[j]).attr('href'));
    }

    $('span').each((i,el)=>{
        let temp=$(el).text();

        if($(el).attr().class!=undefined && $(el).attr().class.length==13 && temp.length>1)time.push(temp);  
    });
    // for(let k=0;k<10;k++)
    // {
        
    //     console.log(link2[k]);
    // }
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


    function getjson()
    {
        let object={
            "writer":elearrwriter2,
            "head": elearrhead2,
            "desc": elearrdesc2,
            "topics": relatedtopics2,
            "date": date2,
            "time": time,
            "link": link2
        };
        // console.log(object);
        return object;
    } 
}
module.exports = {search, getjson};

// search('node');