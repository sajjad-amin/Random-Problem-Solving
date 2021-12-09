let friends = [];
let frinedsDom = document.querySelectorAll('div[data-visualcompletion="ignore-dynamic"]');
frinedsDom.forEach(e=>{
    let name = e.querySelector('span').querySelector('span').innerText;
    let link = e.querySelector('a') != null ? e.querySelector('a').href : '';
    friends.push({name, link});
})
let data = '';
friends.forEach((e,i)=>{
    let singleData = `${i+1}.\n\tName : ${e.name}\n\tLink : ${e.link}\n\n`;
    data += singleData;
});
let file = new Blob([data], {type: 'text/plain;charset=utf-8'});
let str = document.documentElement.innerHTML.split('short_name')[1];
let id_name = str.substr(str.indexOf('"')+3,str.indexOf('}')-4).toLowerCase();
let filename = id_name+'_friendlist.txt';
if (window.navigator.msSaveOrOpenBlob){
    window.navigator.msSaveOrOpenBlob(file, filename);
} else {
    let a = document.createElement("a"),
    url = URL.createObjectURL(file);
    a.href = url;
    a.download = filename;
    a.click();
}
