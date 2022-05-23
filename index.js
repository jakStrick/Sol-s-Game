
/* this application stores radomly generated numbers 
to compare against later when user pushes the 
buttons */
const btn = ["-1"];
var comparedID = 0;
var deCntr = 0;
var semif = false;


/* rest the game */
function resetGame(){

    /* reset the globals and array */
    comparedID = 0; 
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
    if (semif == true){
        resetGame();
        semif = false;
    }
   
    console.log("game initialized");
}

function setUpButtons(){

    btnDimentions.btnW = 10;
    btnDimentions.btnH = 10;


    var w = btnDimentions.btnWidth;
    var h = btnDimentions.btnHeight;

    /* reset all background colors to original values */
    for (var i = 0; i <=3; i++)
    {
        document.getElementById(i).style.width = w + "rem";
        document.getElementById(i).style.height = h + "rem";

        restoreBtnClr(i);
    }

}

async function play(){

    /* console.log("In play"); */

    disableBtns(4, true);
    
    await new Promise(res => { setTimeout(res, 500); });

    doRandomClrs(); 
}

/* change colors wait a bit and change back 
gives the sense that colors are changing. */
function doRandomClrs(){
    
    var rndBtn = rndomize();

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

    doTimeouts();

    /* for (var i = 0; i <=3 ; i++){
        disableBtns(i, false);
    } */
}

async function doTimeouts(){

    for (var i = 0; i < btn.length; i++) {

        clrID = btn[i] + 4;
        chgClrs(btn[i], clrID);

        /* wait */
        await new Promise(res => { setTimeout(res, 1000); });

        restoreBtnClr(btn[i]);

        /* wait */
        await new Promise(res => { setTimeout(res, 800); });    
    }

    for (var i = 0; i <=3 ; i++){
        disableBtns(i, false);
    }

}

function compare(btnID){

    currentid = btnID;

    console.log("ComparedID = " + comparedID + " Pushed ID = " + currentid + " btn ComapredID = " + btn[comparedID]);

    if( btn[comparedID] != currentid ){
        alert("Ha! Ha! You lose! Your score is " + btn.length + " button matche(s)");
        comparedID = 0;
        btn.length = 0;
        semif = true;
        resetGame();
    }
   
    comparedID++;
    deCntr--;

    chkDeCntr(deCntr);
}

async function chkDeCntr(dc){

    await new Promise(res => { setTimeout(res, 1500); });
    if(dc <= 0){
        comparedID = 0;
        doRandomClrs();
    }
}

function disableBtns(i, bool){
    document.getElementById(i).disabled = bool;
}

/* get a random button number */
function rndomize(){

    var rn = Math.floor(Math.random() * 4);
    return rn;
}

function restoreBtnClr(id){

    var newID = id;
    chgClrs(id, newID);
}

function chgClrs(id, newClrID){

   /*  console.log("newClorID = " + newClrID); */
    if(newClrID < 4)
        newClrID = id;

    document.getElementById(id).style.backgroundColor = getClr(selectColor(newClrID));
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


