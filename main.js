const baseURL = "https://ci-swapi.herokuapp.com/api/";

function getData(type, cb) {
  var xhr = new XMLHttpRequest();
  // open a new connection, using the GET request on the URL endpoint and send request
  xhr.open("GET", baseURL+type+"/");
  xhr.send();

  xhr.onreadystatechange = function () {
    // if the request is complete and successful
    if (this.readyState == 4 && this.status == 200) {
      cb(JSON.parse(this.responseText));
    }
  };
}

function getTableHeader(obj){
    var tableHeaders = [];
    Object.keys(obj).forEach((key)=>{
        tableHeaders.push(`<td>${key}</td>`);
    });

    return `<tr>${tableHeaders}</tr>`;
}

function writeToDocument(type){
    var tableRows = [];
    var el = document.getElementById("data");
    el.innerHTML = "";
    getData(type, function(data) {
        data = data.results;
        var tableHeaders = getTableHeader(data[0]);
        data.forEach((item)=>{
            var tableRow =  [];
            Object.keys(item).forEach((key)=>{
                var rowData = item[key].toString();
                tableRow.push(`<td>${rowData.substring(0, 15)}</td>`);
            });
            tableRows.push(`<tr>${tableRow}</tr>`);
        });
        console.dir(data);

        el.innerHTML = `<table>${tableHeaders}${tableRows}</table>`;
    });
}

// getData(printDataToConsole);

