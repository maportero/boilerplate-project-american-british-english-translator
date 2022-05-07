const chai = require('chai');
const assert = chai.assert;

const testHighlightTtranslation = [
  [
    'american-to-british',
    'Mangoes are my favorite fruit.',
    'Mangoes are my <span class="highlight">favourite</span> fruit.'
  ],
  [
    'american-to-british',
    'I ate yogurt for breakfast.',
    'I ate <span class="highlight">yoghurt</span> for <span class="highlight">brekkie</span>.'
  ],
  [
    'british-to-american',
    'We watched the footie match for a while.',
    'We watched the <span class="highlight">soccer</span> match for a while.'
  ],
  [
    'british-to-american',
    'Paracetamol takes up to an hour to work.',
    '<span class="highlight">acetaminophen</span> takes up to an hour to work.'
  ],
];

const testBritishToAmerican = [
  [
    'We watched the footie match for a while.',
    'We watched the <span class="highlight">soccer</span> match for a while.'
  ],
  [
    'Paracetamol takes up to an hour to work.',
    '<span class="highlight">acetaminophen</span> takes up to an hour to work.'
  ],
  [
    'First, caramelise the onions.',
    'First, <span class="highlight">caramelize</span> the onions.'
  ],
  [
    'I spent the bank holiday at the funfair.',
    'I spent the <span class="highlight">public holiday</span> at the <span class="highlight">carnival</span>.'
  ],
  [
    'I had a bicky then went to the chippy.',
    'I had a <span class="highlight">cookie</span> then went to the <span class="highlight">fish-and-chip shop</span>.'
  ],
  [
    "I've just got bits and bobs in my bum bag.",
    `I've just got <span class="highlight">odds and ends</span> in my <span class="highlight">fanny pack</span>.`
  ],
  [
    "The car boot sale at Boxted Airfield was called off.",
    `The <span class="highlight">swap meet</span> at Boxted Airfield was called off.`
  ],
  [
    "Have you met Mrs Kalyani?",
    `Have you met <span class="highlight">Mrs.</span> Kalyani?`
  ],
  [
    "Prof Joyner of King's College, London.",
    `<span class="highlight">Prof.</span> Joyner of King's College, London.`
  ],
  [
    "Tea time is usually around 4 or 4.30.",
    `Tea time is usually around 4 or <span class="highlight">4:30</span>.`
  ],
];


const Translator = require('../components/translator.js');
/*
const Browser = require('zombie');
Browser.site = ("https://boilerplate-project-american-british-english-translator.marcoportero.repl.co");

suite('Unit Tests with Zombie.js', function () {

    this.timeout(5000);
    const browser = new Browser();
    suiteSetup( function(done){
     return browser.visit('/', done); 
    });
  */
    suite('Unit Tests', () => {
       test('Mangoes are my favorite fruit. to British English',(done) =>{
         let translator = new Translator();
         let mode = 'american-to-british';
         let text = 'Mangoes are my favorite fruit.'
         let result = translator.translate(mode, text);
         assert.equal(result,'Mangoes are my <span class="highlight">favourite</span> fruit.', 'Result should be Mangoes are my <span class="highlight">favourite</span> fruit.')
         done();
       });
      test('I ate yogurt for breakfast. to British English',(done) =>{
         let translator = new Translator();
         let mode = 'american-to-british';
         let text = 'I ate yogurt for breakfast.'
         let result = translator.translate(mode, text);
         assert.equal(result,'I ate <span class="highlight">yoghurt</span> for <span class="highlight">brekkie</span>.', 'I ate <span class="highlight">yoghurt</span> for <span class="highlight">brekkie</span>.')
         done();
       });
    
      test("We had a party at my friend's condo. to British English",(done) =>{
         let translator = new Translator();
         let mode = 'american-to-british';
         let text = "We had a party at my friend's condo."
         let result = translator.translate(mode, text);
         assert.equal(result,`We had a party at my friend's <span class="highlight">flat</span>.`, "Result should be We had a party at my friend's <span class='highlight'>flat</span>.");
         done();
       });
    
       test("Can you toss this in the trashcan for me? to British English",(done) =>{
         let translator = new Translator();
         let mode = 'american-to-british';
         let text = "Can you toss this in the trashcan for me?"
         let result = translator.translate(mode, text);
         assert.equal(result,'Can you toss this in the <span class="highlight">bin</span> for me?', 'Result should be Can you toss this in the <span class="highlight">bin</span> for me?');
         done();
       }); 
    
       test("The parking lot was full. to British English",(done) =>{
         let translator = new Translator();
         let mode = 'american-to-british';
         let text = "The parking lot was full."
         let result = translator.translate(mode, text);
         assert.equal(result,'The <span class="highlight">car park</span> was full.', 'Result should be The <span class="highlight">car park</span> was full.');
         done();
       }); 
    
       test("Like a high tech Rube Goldberg machine. to British English",(done) =>{
         let translator = new Translator();
         let mode = 'american-to-british';
         let text = "Like a high tech Rube Goldberg machine."
         let result = translator.translate(mode, text);
         assert.equal(result,'Like a high tech <span class="highlight">Heath Robinson device</span>.', 'Result should be Like a high tech <span class="highlight">Heath Robinson device</span>.');
         done();
       });   
    
       test("To play hooky means to skip class or work. to British English",(done) =>{
         let translator = new Translator();
         let mode = 'american-to-british';
         let text = "To play hooky means to skip class or work."
         let result = translator.translate(mode, text);
         assert.equal(result,'To <span class="highlight">bunk off</span> means to skip class or work.', 'Result should be To <span class="highlight">bunk off</span> means to skip class or work.');
         done();
       });  
    
       test("No Mr. Bond, I expect you to die. to British English",(done) =>{
         let translator = new Translator();
         let mode = 'american-to-british';
         let text = "No Mr. Bond, I expect you to die."
         let result = translator.translate(mode, text);
         assert.equal(result,'No <span class="highlight">Mr</span> Bond, I expect you to die.', 'Result should be No <span class="highlight">Mr</span> Bond, I expect you to die.');
         done();
       });  
    
       test("Dr. Grosh will see you now. to British English",(done) =>{
         let translator = new Translator();
         let mode = 'american-to-british';
         let text = "Dr. Grosh will see you now."
         let result = translator.translate(mode, text);
         assert.equal(result,'<span class="highlight">Dr</span> Grosh will see you now.', 'Result should be <span class="highlight">Dr</span> Grosh will see you now.');
         done();
       });
    
       test("Lunch is at 12:15 today. to British English",(done) =>{
         let translator = new Translator();
         let mode = 'american-to-british';
         let text = "Lunch is at 12:15 today."
         let result = translator.translate(mode, text);
         assert.equal(result,'Lunch is at <span class="highlight">12.15</span> today.', 'Result should be Lunch is at <span class="highlight">12.15</span> today.');
         done();
       });
    
       testBritishToAmerican.forEach( item => {
    
           test(item[0],(done) =>{
             let translator = new Translator();
             let mode = 'british-to-american';
             let text = item[0]
             let result = translator.translate(mode, text);
             assert.equal(result,item[1], 'Result should be ' + item[1]);
             done();
           });
       
       });
    
       testHighlightTtranslation.forEach( item => {
    
           test('Highlight translation in ' + item[1],(done) =>{
             let translator = new Translator();
             let mode = item[0];
             let text = item[1]
             let result = translator.translate(mode, text);
             assert.equal(result,item[2], 'Result should be ' + item[2]);
             done();
           });
       
       });
      
    });

//});
