const request = require('request');
const cheerio = require('cheerio');

var elearrwriter = [];
var elearrhead = [];
var elearrdesc = [];
var relatedtopics = [];
var date = [];
var time = [];
var link = [];
var elearrwriter2 = [];
var head = [];
var elearrdesc2 = [];
var relatedtopics2 = [];
var date2 = [];
var link2 = [];
var tag;

function search(t) {

    tag = t;
    elearrwriter.length = 0;
    elearrhead.length = 0;
    elearrdesc.length = 0;
    relatedtopics2.length = 0;
    date.length = 0;
    time.length = 0;
    link.length = 0;
    elearrwriter2.length = 0;
    head.length = 0;
    elearrdesc2.length = 0;
    relatedtopics2.length = 0;
    date2.length = 0;
    link2.length = 0;
    if (tag.length === 0) return;
    scrap();
}

function scrap() {
    const url = `https://medium.com/tag/${tag}/latest`;
    request(url, cb);

    function cb(err, response, html) {
        if (err) {
            console.log(err);
        } else {
            extractHtml(html);
        }
    }

}

function extractHtml(html) {
    elearrwriter.length = 0;
    elearrhead.length = 0;
    elearrdesc.length = 0;
    relatedtopics2.length = 0;
    date.length = 0;
    time.length = 0;
    link.length = 0;
    elearrwriter2.length = 0;
    head.length = 0;
    elearrdesc2.length = 0;
    relatedtopics2.length = 0;
    date2.length = 0;
    link2.length = 0;
    $ = cheerio.load(html);
    elearrhead = $('div>a>div>h2');
    elearrdesc = $('.ae h3');
    elearrwriter = $('.ae h4');
    relatedtopics = $('.eq.db.er.l div');
    date = $('.ae.t>p');
    link = $('.ae .el.l a');
    elearrwriter2 = [];


    for (let i = 0; i < elearrwriter.length; i++) {


        if ($(elearrwriter[i]).text() == 'in') {
            i++;
        } else {
            elearrwriter2.push($(elearrwriter[i]).text());
        }
    }
    for (let j = 0; j < 10; j++) {
        if ($(elearrhead[j]).text() != '') {
            head.push($(elearrhead[j]).text());
        }
        if ($(elearrdesc[j]).text() != '') {
            elearrdesc2.push($(elearrdesc[j]).text());
        }
        if ($(date[j]).text() != '') {
            // relatedtopics2.push($(relatedtopics[j]).text());
            date2.push($(date[j]).text());
            console.log(date2[j]);
        }


    }

    $('span').each((i, el) => {
        let temp = $(el).text();

        if ($(el).attr().class != undefined && $(el).attr().class.length == 13 && temp.length > 1) time.push(temp);
    });
    $('a').each((i, el) => {

        if ($(el).attr().class != undefined && $(el).attr().class.length == 44 && $(el).children().length == 1 && $(el).children().children().length == 2) {
            link2.push($(el).attr('href'));
            // console.log($(el).children().length);
        }
    });
    $('a').each((i, el) => {
        if ($(el).attr().class != undefined && $(el).attr().class.length == 2 && $(el).children().length == 1 && relatedtopics2.includes($(el).text()) == false) {
            relatedtopics2.push($(el).text());
        }
    });
    for (let i = 0; i < head.length; i++) {
        console.log(head[i]);
    }

}



function getjson() {
    let object = {
        "writer": elearrwriter2,
        "head": head,
        "desc": elearrdesc2,
        "topics": relatedtopics2,
        "date": date2,
        "time": time,
        "link": link2
    };
    // console.log(object);
    return object;
}

module.exports = {
    search,
    getjson
};
