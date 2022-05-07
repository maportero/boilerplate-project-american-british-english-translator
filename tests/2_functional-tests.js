const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server.js');

chai.use(chaiHttp);

let Translator = require('../components/translator.js');
/*
const Browser = require('zombie');
Browser.site = ("https://boilerplate-project-american-british-english-translator.marcoportero.repl.co");

suite('Functional Tests with Zombie.js', function () {
  
    this.timeout(5000);
    const browser = new Browser();
    suiteSetup( function(done){
     return browser.visit('/', done); 
    });
*/
    suite('Functional Tests', () => {
  
       test('Translation with text and locale fields', function(done) {
          chai.request(server)
          .post('/api/translate')
          .set('content-type', 'application/json')
          .send({
             text :  "Mangoes are my favorite fruit.",
             locale : "american-to-british"
          })
          .end( (err, res) => {
            assert.equal(res.status, 200, 'status should be 200');
            assert.equal(res.type, 'application/json','Type should be application/json');
            assert.equal(res.body.text, 'Mangoes are my favorite fruit.','Respond should Mangoes are my favorite fruit.');
            assert.equal(
              res.body.translation, 
              'Mangoes are my <span class="highlight">favourite</span> fruit.',
              'Translation should be ' + 'Mangoes are my <span class="highlight">favourite</span> fruit.'
            );
            done();     
          });
        });
    
       test('Translation with text and invalid locale field', function(done) {
          chai.request(server)
          .post('/api/translate')
          .set('content-type', 'application/json')
          .send({
             text :  "Mangoes are my favorite fruit.",
             locale : "american-to-italian"
          })
          .end( (err, res) => {
            assert.equal(res.status, 200, 'status should be 200');
            assert.equal(res.type, 'application/json','Type should be application/json');
            assert.equal(
              res.body.error, 
              'Invalid value for locale field','Error should be Invalid value for locale field'
            );
            done();     
          });
        }); 
    
       test('Translation with text and invalid locale field', function(done) {
          chai.request(server)
          .post('/api/translate')
          .set('content-type', 'application/json')
          .send({
             locale : "american-to-british"
          })
          .end( (err, res) => {
            assert.equal(res.status, 200, 'status should be 200');
            assert.equal(res.type, 'application/json','Type should be application/json');
            assert.equal(
              res.body.error, 
              'Required field(s) missing',
              'Error should be Required field(s) missing'
            );
            done();     
          });
        }); 
    
       test('Translation with missing locale field:', function(done) {
          chai.request(server)
          .post('/api/translate')
          .set('content-type', 'application/json')
          .send({
             text :  "Mangoes are my favorite fruit."
          })
          .end( (err, res) => {
            assert.equal(res.status, 200, 'status should be 200');
            assert.equal(res.type, 'application/json','Type should be application/json');
            assert.equal(
              res.body.error, 
              'Required field(s) missing',
              'Error should be Required field(s) missing'
            );
            done();     
          });
        }); 
    
       test('Translation with missing locale field:', function(done) {
          chai.request(server)
          .post('/api/translate')
          .set('content-type', 'application/json')
          .send({
             text :  "",
             locale : "american-to-british"
             
          })
          .end( (err, res) => {
            assert.equal(res.status, 200, 'status should be 200');
            assert.equal(res.type, 'application/json','Type should be application/json');
            assert.equal(
              res.body.error, 
              'No text to translate',
              'Error should be No text to translate'
            );
            done();     
          });
        }); 
    
       test('Translation with text that needs no translation', function(done) {
          chai.request(server)
          .post('/api/translate')
          .set('content-type', 'application/json')
          .send({
             text :  "This is a ordinary sentence",
             locale : "american-to-british"
             
          })
          .end( (err, res) => {
            assert.equal(res.status, 200, 'status should be 200');
            assert.equal(res.type, 'application/json','Type should be application/json');
            assert.equal(
              res.body.text, 
              'This is a ordinary sentence',
              'Text should be This is a ordinary sentence'
            );
            assert.equal(
              res.body.translation, 
              'Everything looks good to me!',
              'Text should be Everything looks good to me!'
            );
            done();     
          });
        }); 

  
    });

//});
