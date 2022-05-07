const americanOnly = require('./american-only.js');
const americanToBritishSpelling = require('./american-to-british-spelling.js');
const americanToBritishTitles = require("./american-to-british-titles.js")
const britishOnly = require('./british-only.js')

class Translator {
  
  constructor() {
    
    this.translationList = [];
    let  keys;
   
    keys = Object.keys(americanOnly)
    keys.forEach( key => {
      this.translationList.push([key, americanOnly[key]])
    });
    
    keys = Object.keys(americanToBritishSpelling)
    //console.log(keys.length);
    keys.forEach( key => {
      this.translationList.push([key, americanToBritishSpelling[key]])
    });
    //console.log(this.translationList.length);
    keys = Object.keys(americanToBritishTitles)
    keys.forEach( key => {
      this.translationList.push([key, americanToBritishTitles[key]])
    });

    keys = Object.keys(britishOnly)
    keys.forEach( key => {
      this.translationList.push([britishOnly[key], key])
    });
    
    //console.log(this.translationList);
  }

  translate( mode, text) {
     let textTranslated = text;
     let textOrigin = text;
     let strSearch; 
 
     this.translationList.forEach((item) => {
            let exp;
            let matchExp;
            let iniSpace = '';
            let endSpace = '';
            let textToReplace;
            if ( mode === 'american-to-british' ) { 
              exp = new RegExp( ' ?' + item[0] + '[ \.]','gi');
              strSearch = `<span class="highlight">${item[0]}</span>`; 
              if (!textTranslated.includes(strSearch))
                matchExp = textOrigin.match(exp);    
                if (matchExp){
                  //console.log(matchExp);
                  textToReplace = matchExp[0].split('');
                  if (textToReplace[0] === ' ') iniSpace = ' ';
                  if (textToReplace[ textToReplace.length - 1 ] === ' ') endSpace = ' ';
                  if (textToReplace[ textToReplace.length - 1 ] === '.') endSpace = '.';
                  textTranslated = textOrigin.replace(exp, `${iniSpace}<span class="highlight">${item[1]}</span>${endSpace}`);
                }
            }else{
              exp = new RegExp( ' ?' + item[1] + '[ \.]' , 'gi');
              strSearch = `<span class="highlight">${item[1]}</span>`;
              if (!textTranslated.includes(strSearch)){
                 matchExp = textOrigin.match(exp);
                //console.log(matchExp);
                if (matchExp){
                  textToReplace = matchExp[0].split('');
                  //console.log(textToReplace);
                  if (textToReplace[0] === ' ') iniSpace = ' ';
                  if (textToReplace[ textToReplace.length - 1 ] === ' ') endSpace = ' ';
                  if (textToReplace[ textToReplace.length - 1 ] === '.') endSpace = '.';
                  textTranslated = textOrigin.replace(exp, `${iniSpace}<span class="highlight">${item[0]}</span>${endSpace}`);
                } 
              }
            }
            if (textTranslated !== '' && textTranslated !== textOrigin ) 
              textOrigin = textTranslated;
    });
    let exp;
    let xtime;
    let timeReplaced='';
    if (mode === 'american-to-british'){
      exp = /[0-9]{1,2}:[0-9]{1,2}/g
      xtime = textTranslated.match(exp);
      //console.log(xtime);
      if (Array.isArray(xtime) )
        timeReplaced = xtime[0].replace(':','.');
    }else { 
      exp = /[0-9]{1,2}\.[0-9]{1,2}/g
      xtime = textTranslated.match(exp);
      if (Array.isArray(xtime))
        timeReplaced = xtime[0].replace('.',':');
    }
    if (timeReplaced !== '')
      textTranslated = textTranslated.replace(xtime[0], `<span class="highlight">${timeReplaced}</span>`);
/*
    console.log(textTranslated.substr(textTranslated.length - 2,2));
    if (textTranslated.substr(textTranslated.length - 2,2) === ' .')
      textTranslated = textTranslated.substr(0,textTranslated.length - 2) + '.';
*/    
    return textTranslated;
  }
  
}

module.exports = Translator;