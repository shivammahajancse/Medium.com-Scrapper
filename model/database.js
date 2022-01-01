const mysql = require('mysql');

let tag=[];
let dates=[];
var conn = mysql.createConnection({
    host: "mediumscrap.mysql.database.azure.com",
    user: "mediumscrapper@mediumscrap",
    password: "mediumscrap@123",
    database: "mediumscrapper",
    port: 3306,
});

conn.connect(function(err){
    if(!!err){
        console.log('error occured');
    }
    else{
        console.log('connected');
    }
});

function performsqlquery()
{
    tag.length=0;
    dates.length=0;
    conn.query("select tag from scrap order by id desc", function(err, content){
        if(!!err){
            console.log('error in the query');
        }
        else {
            console.log('successful query');
            
            for(let i=0;i<content.length;i++)
            {
                tag.push(content[i].tag);
            }
         
        }
    });
    conn.query("select dates from scrap order by id desc", function(err, content){
        if(!!err){
            console.log('error in the query');
        }
        else {
            console.log('successful query');
            
            for(let i=0;i<content.length;i++)
            {
                dates.push(content[i].dates);
            }
         
        }
    });
}

function displaysqlquery()
{
    let object={
        "tag":tag,
        "dates":dates
    }
    return object;
}
function insertsqlquery(tag)
{
    console.log(tag);
    let datenew = new Date;
    let s = `insert into scrap (tag,dates) values (${JSON.stringify(tag)}, ${JSON.stringify(datenew).slice(0,11)+"\""})`;
    conn.query(s, function(err){
        if(!!err)
        {
            console.log('error in the query');
        }
        else 
        {
            console.log('successfully inserted');
        }
    });
}


module.exports = {performsqlquery, insertsqlquery, displaysqlquery};


