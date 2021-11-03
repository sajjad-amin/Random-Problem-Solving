const studentStr = `192002136 Md. Mannan Khan
201002120 Md. Masud
201002249 Amir Hamjah Prince
211002006 Md Arabia Hossain
211002008 Mehedi Hasan
211002015 Md. Mostak Shariar
211002023 Md. Arif Anjum
211002031 Md. Ashraf Uddin
211002037 Md. Jahidul Islam
211002038 Md. Didar Bhuiyan
211002039 Rakib-Al-Hasan
211002047 Khan Meyad Mohammad
211002070 Monjurul Islam Hasib
211002071 Kishor Kanto Debnath
211002073 Md. Abu Bakkar Siddik
211002074 Md. Rizwan Islam
211002075 Md. Shakawat Hossain Faravi
211002076 Md. Atik Hasan Emon
211002079 Saklain Ahmed
211002081 Muhammad Sajjad Amin
211002083 Tareq Hasan
211002084 Mahbubullah
211002085 Md. Mehedi Hasan
211002086 Raisul Islam
211002087 Mohitul Islam Bejoy
211002088 Mansur Alam Murad
211002090 Mamun Khan
211002091 Abu Rayhan Naeem
211002092 Md. Arman Akando
211002094 Md. Sifatul Islam
211002095 Suchona Akter Chadni
211002100 Nahidul Islam Swadhin
211002102 Md. Kawsar Ahamed
211002103 Sayon Kundu
211002105 Md. Inzamamul Kabir
211002106 Manik Shekh
211002108 Md. Ahasanul Habib
211002109 Aktaruzzaman Kowshik
211002111 Mohammad Afzal Hossain
211002121 Md. Yeasin Arafat
211002122 Iftekher Ahmed Ayan
211002135 Sagor Biswas
211002147 Radwan Al-Plabon
211002151 Jubair Hossen Raju`;

const fs = require('fs');
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
})
const shuffle = array => {
    let currentIndex = array.length,  randomIndex;
    while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    return array;
}
const stArr = shuffle(studentStr.split('\n'));
const studentArray = [];
stArr.forEach( item =>{
    let i = item.indexOf(' ');
    let id = item.slice(0, i).trim();
    let name = item.slice(i).trim();
    let obj = {id, name}
    studentArray.push(obj);
})
const p = new Promise(resolve => {
    console.log('\033[2J');
    readline.question('How much student should give presentation per day? ', quantity => {
        resolve(quantity);
        readline.close();
    })
})
p.then(quantity=>{
    const perDay = Number.parseInt(quantity);
    let flag = perDay;
    let i = 0;
    let nextClass = 1;
    let str = '';
    while( flag < studentArray.length + perDay ){
        str += `Class No. ${nextClass}\n------------------------------------------------------------\n`;
        for( ; i < flag; i++){
            if(studentArray[i] !== undefined){
                str += studentArray[i].name+` (${studentArray[i].id})\n`;
            }
        }
        str += '\n\n';
        i = flag;
        nextClass++;
        flag = flag+perDay;
    }
    fs.writeFile('schedule.txt', str.trim(), err=>{
        if(!err) {
            console.log('\033[2J');
            console.log('Student list has been created successfully!\nCheck the schedule.txt file to see the list.\n\n\n');
        }
    });
})