var form = document.getElementById('delete');

var test = function(event) {
console.log(form);
    var req = new XMLHttpRequest(),
        data = new FormData(form);

        event.preventDefault();
console.log(data);
        req.open("POST", "/admin/delete", true);
        req.onload = function(res){
            console.log(res.target.responseText);
        };
        req.send(data);
};