'use strict';

const Translator = require('../components/translator.js');

module.exports = function (app) {
  
  const translator = new Translator();

  app.route('/api/translate')
    .post((req, res) => {
      let text = req.body.text;
      let mode = req.body.locale;
      //console.log('mode: ' + mode + ' text: '+ text);
      let result = {}
      if (text === undefined || mode === undefined )
        result = { error: 'Required field(s) missing' }
      else if (text === '' )
        result = { error: 'No text to translate' };
      else if ( mode !== 'american-to-british' && mode !== 'british-to-american' )
        result = { error: 'Invalid value for locale field' };
      else {
        let textTranslated = translator.translate( mode, text);
        result.text = text;
        if (textTranslated === text)
          result.translation = 'Everything looks good to me!' ;
        else 
          result.translation = textTranslated ;
      }
      //console.log(result);
      res.json(result);
      
    });
};
