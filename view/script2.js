var tag;

function onSearch() {
    console.log("hi");
    tag = document.getElementById('s1').value;
    console.log(tag);
    postreq(tag);
}

function pending() {
    document.getElementById("component").innerHTML = "";
    document.getElementById("tags").innerHTML = "";
    var global = document.getElementById("component");

    for (let i = 0; i < 10; i++) {
        var a1 = document.createElement("div");
        a1.classList.add("card");
        a1.classList.add("center");

        var b1 = document.createElement("div");
        b1.classList.add("card-body");

        var c1 = document.createElement("p");
        c1.classList.add("card-text");
        c1.innerText = "Pending...";

        var c2 = document.createElement("h5");
        c2.classList.add("card-title");
        c2.innerText - "Pending..."

        var c3 = document.createElement("p");
        c3.classList.add("card-text");
        c3.innerText = "Pending...";

        var c4 = document.createElement("div");
        c4.classList.add("details");

        var c6 = document.createElement("h5");
        c6.classList.add("card-title");
        c6.innerText = "Pending...";

        var d1 = document.createElement("div");
        d1.classList.add("idetails");
        d1.innerText = "Pending...";

        var d2 = document.createElement("div");
        d2.classList.add("idetails");
        d2.innerText = "Pending...";

        c4.appendChild(d1);
        c4.appendChild(d2);

        var c5 = document.createElement("a");
        c5.innerText = "Read";
        c5.classList.add("btn");
        c5.classList.add("btn-primary");
        c5.classList.add("bttn");
        c5.setAttribute("target", "_blank");


        b1.appendChild(c1);
        b1.appendChild(c6);
        b1.appendChild(c2);
        b1.appendChild(c3);
        b1.appendChild(c4);
        b1.appendChild(c5);

        a1.appendChild(b1);
        var a2 = document.createElement("br");

        global.appendChild(a1);
        global.appendChild(a2);
    }
}
async function postreq(tag) {
    pending();
    let contag = "";
    for (let i = 0; i < tag.length; i++) {
        if (tag[i] === " ") contag = contag + "-";
        else contag = contag + tag[i];
    }
    console.log(contag);
    let j = {
        "tagname": contag
    }

    $.ajax({
        type: 'post',
        url: '/api',
        data: j,
        async: false
    });


    await new Promise((resolve) =>
        setTimeout(() => {
            resolve();
        }, 500)
    );


    let obj = {};
    $.ajax({
        type: 'get',
        url: '/api2',
        async: false,
        success: function(data) {
            obj = data;
        }
    });

    if (obj.head.length == 0) {
        document.getElementById("component").innerHTML = "";
        var global = document.getElementById("tags");
        var a1 = document.createElement("h4");
        a1.classList.add("head");
        a1.innerText = "Page not Found";
        global.appendChild(a1);
        return;
    }

    var global = document.getElementById("tags");
    var a1 = document.createElement("h4");
    a1.classList.add("head");
    a1.innerText = "Related Tags:";
    global.appendChild(a1);

    for (let i = 0; i < obj.topics.length; i++) {
        var b1 = document.createElement("button");
        b1.classList.add("newbtn");
        b1.classList.add("btn");
        b1.classList.add("btn-outline-success");
        b1.innerText = obj.topics[i];
        global.appendChild(b1);
    }

    for (let j = 0; j < obj.head.length; j++) {
        let a = document.getElementsByClassName('card-body');
        a[j].getElementsByClassName('card-text')[0].innerText = "Loading..";
        a[j].getElementsByClassName('card-title')[0].innerText = "Loading..";
        a[j].getElementsByClassName('card-text')[1].innerText = "Loading..";
        a[j].getElementsByClassName('idetails')[0].innerText = "Loading..";
        a[j].getElementsByClassName('idetails')[1].innerText = "Loading..";

        await new Promise((resolve) =>
            setTimeout(() => {
                resolve();
            }, 500)
        );

        a[j].getElementsByClassName('card-text')[0].innerText = obj.writer[j];
        a[j].getElementsByClassName('card-title')[0].innerText = obj.head[j]
        a[j].getElementsByClassName('card-text')[1].innerText = obj.desc[j];
        a[j].getElementsByClassName('idetails')[0].innerText = obj.date[j];
        a[j].getElementsByClassName('idetails')[1].innerText = obj.time[j];

        if (obj.link.length > 0 && obj.link[j][0] == '/') {
            a[j].getElementsByTagName('a')[0].href = `https://medium.com${obj.link[j]}`;
        } else a[j].getElementsByTagName('a')[0].href = obj.link[j];

    }
}