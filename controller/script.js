const request = require('request');
const cheerio = require('cheerio');

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
var tag;
function search(t)
{

    tag=t;
    elearrwriter.length=0;
    elearrhead.length=0;
    elearrdesc.length=0;
    relatedtopics2.length=0;
    date.length=0;
    time.length=0;
    link.length=0;
    elearrwriter2.length=0;
    elearrhead2.length=0;
    elearrdesc2.length=0;
    relatedtopics2.length=0;
    date2.length=0;
    link2.length=0;
    if(tag.length===0)return;
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

}

function extractHtml(html)
{
    elearrwriter.length=0;
    elearrhead.length=0;
    elearrdesc.length=0;
    relatedtopics2.length=0;
    date.length=0;
    time.length=0;
    link.length=0;
    elearrwriter2.length=0;
    elearrhead2.length=0;
    elearrdesc2.length=0;
    relatedtopics2.length=0;
    date2.length=0;
    link2.length=0;
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

module.exports = {search, getjson};
