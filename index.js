
/* this application stores radomly generated numbers 
to compare against later when user pushes the 
buttons */
const btn = ["-1"];
var btnCntr = 0;
var deCntr = 0;

/* rest the game */
function resetGame(){

 /*    clearTimeout(changeColors);
    clearTimeout(play);
    clearTimeout(chkDeCntr); */

    setInterval(setDate, 1000);
    setDate();

    /* reset the globals and array */
    btnCntr = 0;  
    deCntr = 0; 
    btn.length = 0; 

    for (var i = 0; i <=3 ; i++)
    {
        disableBtns(i, true);
    }

    disableBtns(4, false);
    
    btn[0] = "-1"; 

    setUpButtons();

    // hack to let timer settle
    // probabaly there's a timer rest function.
    /* if (semiph){
        semiph = false;
        resetGame();  
    }
    */
    console.log("game initialized");
}

function setUpButtons(){

    btnDimentions.btnW = 10;
    btnDimentions.btnH = 10;


    var w = btnDimentions.btnWidth;
    var h = btnDimentions.btnHeight;

    /* reset all background colors to original values */
    /* and set button height and width */
    for (var i = 0; i <=3; i++)
    {
        document.getElementById(i).style.width = w + "rem";
        document.getElementById(i).style.height = h + "rem";

        chgClrs(i);
    }

}

async function play(){

    console.log("In play");

    disableBtns(4, true);

    await new Promise(res => { setTimeout(res, waitTime(2)); });
    start();
}

function start(){
    setRandomClrs(); 
    changeColors();
}

/* change colors wait a bit and change back 
gives the sense that colors are changing. */
function setRandomClrs(){

    var rndBtn = getRandomNum();

    for (var i = 0; i <= 3 ; i++)
    {
        disableBtns(i, true);
    }

    if (btn[0] == "-1"){

        btn[0] = rndBtn;
       /*  console.log("btnID initial " + btn[0]); */
    }
    else{

        btn.push(rndBtn);
    }

    deCntr = btn.length;

    /* for (var i = 0; i <=3 ; i++){
        disableBtns(i, false);
    } */

    return;
}

async function changeColors(){

    var wt = 0;

    for (var i = 0; i < btn.length; i++) {

        chgClrs(btn[i], true);

        /* wait */
        await new Promise(res => { setTimeout(res, waitTime(2)); });

        chgClrs(btn[i]);

        /* wait */
        await new Promise(res => { setTimeout(res, waitTime(1)); });    
    }

    for (var i = 0; i <=3 ; i++){
        disableBtns(i, false);
    }

    return;

}

function compare(btnID){

    /* console.log("ComparedID = " + btnCntr + " Pushed ID = " + currentid + " btn ComapredID = " + btn[btnCntr]);
 */
    if( btn[btnCntr] != btnID ){
        alert("Ha! Ha! You lose! Your score is " + btnCntr + " button matche(s)");
        resetGame();
    }
   
    btnCntr++;

    deCntr--;

    chkDeCntr(deCntr);
}

async function chkDeCntr(dc){

    await new Promise(res => { setTimeout(res, waitTime(3)); });
    if(dc <= 0){
        btnCntr = 0;
        start();
    }
}

function disableBtns(i, bool){
    document.getElementById(i).disabled = bool;
}

/* get a random button number from 0 - 3 */
function getRandomNum(){
    return Math.floor(Math.random() * 4);
}

/* function restoreBtnClr(id){

    //var newID = id;
    chgClrs(id);
} */

function chgClrs(id, acID = false){
    
    var altClrID;
   /*  console.log("newClorID = " + newClrID); */
    if(acID)
        altClrID = id + 4;
    else
        altClrID = id;

    document.getElementById(id).style.backgroundColor = getClr(selectColor(altClrID));
}

function waitTime(wait){

    /* wait1 = 1000;
    wait2 = 800;
    wait3 = 1500;
     */

    switch(wait) {

        case 0:
            wait = 500;
            return;

        case 1:
            wait = 800;
            break;

        case 2:
            wait = 1000;
            break;

        case 3:
            wait = 1500;
            break;

        default:
            alert("OOPS not a time allowed!");
            return;
    }

    speedUp(wait);

    return wait;

}

function speedUp(wt){
    /* speed up the game */
    if ( btn.length == 5 || btn.length == 10 || btn.length == 15 )
        wt = wt * .85;
}

/* you would think this would work? */
/* async function waiting(ms) {

    console.log("waiting... " + ms);

     // WAIT 1 SECOND
     await new Promise(res => { setTimeout(res, ms); });

} */

function selectColor(id){

    /* console.log("in Select Color " + id); */

    var btnClr;

    switch(id) {

        case 0:
            btnClr = "--blue1";
            break;

        case 1:
            btnClr = "--red1";
            break;

        case 2:
            btnClr = "--yellow1";
            break;

        case 3:
            btnClr = "--green1";
            break;

        case 4:
            btnClr = "--blue2";
            break;

        case 5:
            btnClr = "--red2";
            break;

        case 6:
            btnClr = "--yellow2";
            break;

        case 7:
            btnClr = "--green2";
            break;

        default:
            alert("An error has occured");
            return;
    } 

    return btnClr;
}

//get a variable value from css root.
function getClr(clr) {

    var r = document.querySelector(':root');

    // Get the styles (properties and values) for the root
    var rs = getComputedStyle(r);
    
    // output color variable
    return rs.getPropertyValue(clr);
}

const btnDimentions = {

    btnWidth: 0,
    btnHeight: 0,

    /**
     * @param {number} w
     */
    set btnW(w) {
        this.btnWidth = w;
    },

    /**
     * @param {number} h
     */
    set btnH(h) {
        this.btnHeight = h;
    }
};

/*  I thought this clock looked cool as part of my project. 
    I copied it from GitHub -- 
    the license file is included with my project and I also included it here 

    /* **************************************************************************

     MIT License

    Copyright (c) 2018 Swasti Ranjan Senapati

    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the "Software"), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in all
    copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
    SOFTWARE. 

    ************************************************************************** */

/* clock */
function setDate() {

    /* clock */
    var secondHand = document.querySelector('.second-hand');
    var minsHand = document.querySelector('.min-hand');
    var hourHand = document.querySelector('.hour-hand');

    const now = new Date();

    const seconds = now.getSeconds();
    const secondsDegrees = ((seconds / 60) * 360) + 90;
    secondHand.style.transform = `rotate(${secondsDegrees}deg)`;

    const mins = now.getMinutes();
    const minsDegrees = ((mins / 60) * 360) + ((seconds/60)*6) + 90;
    minsHand.style.transform = `rotate(${minsDegrees}deg)`;

    const hour = now.getHours();
    const hourDegrees = ((hour / 12) * 360) + ((mins/60)*30) + 90;
    hourHand.style.transform = `rotate(${hourDegrees}deg)`;
}
