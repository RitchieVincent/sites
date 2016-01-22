function test() {

    var xmlhttp = new XMLHttpRequest(),
        search = document.getElementById('search'),
        data = {
            "term": search.value
        };

    data.term = search.value;

    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            console.log(xmlhttp.responseText);
        }
    }

    xmlhttp.open("POST","/sites",true);
    xmlhttp.setRequestHeader("Content-type","application/json");
    console.log(data);
    console.log(JSON.stringify(data));
    xmlhttp.send(JSON.stringify(data));

}