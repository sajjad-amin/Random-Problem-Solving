let str = document.documentElement.innerHTML.split('short_name')[1];
let id_name = str.substring(str.indexOf('"')+3,str.indexOf('}')-1).toLowerCase();
let friends = [];
let frinedsDom = document.querySelectorAll('div[data-visualcompletion="ignore-dynamic"]');
frinedsDom.forEach(e=>{
    let name = e.querySelector('span').querySelector('span').innerText;
    let link = e.querySelector('a') != null ? e.querySelector('a').href : '';
    let img = e.querySelector('image').href.baseVal;
    friends.push({name, img, link});
})
let data = '';
friends.forEach((e,i)=>{
    let singleData = `<tr><td>${i+1}</td><td><img class="img" src="${e.img}"/></td><td>${e.name}</td><td><a href="${e.link}" target="_blank">${e.link}</a></td></tr>`;
    data += singleData;
});
let htmlString = `
<!DOCTYPE html>
<head>
    <meta charset="UTF-8">
    <title>${id_name}'s Facebook Friend List</title>
    <style>
        .img{
            width: 100px;
            heigth: 100px;
        }
        table tr td {
            padding: 1em;
        }
    </style>
</head>
<body>
    <h1>Hi ${id_name}!, It's Your Facebook Friend List</h1>
    <table border="1" cellspacing="0">
        <tr>
            <th>SL</th>
            <th>PP</th>
            <th>Name</th>
            <th>Profile Link</th>
        </tr>
        ${data}
    </table>
</body>
</html>
`;
let file = new Blob([htmlString], {type: 'text/html;charset=utf-8'});
let filename = id_name+'_friendlist.html';
if (window.navigator.msSaveOrOpenBlob){
    window.navigator.msSaveOrOpenBlob(file, filename);
} else {
    let a = document.createElement("a"),
    url = URL.createObjectURL(file);
    a.href = url;
    a.download = filename;
    a.click();
}