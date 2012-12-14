var win
  , testingTimeout = 5000
  , tests = []
  , testPostID
  , dpd = require('dpd')
  , console;

var win = Titanium.UI.createWindow({  
    backgroundColor:'#fff',
    layout:'vertical'
});
win.open();

dpd.init({root:'http://localhost:2403'});

function logInfo(color, message) {
  var label = Titanium.UI.createLabel({
    color: color,
    text: message,
    font:{fontSize:14,fontFamily:'Helvetica Neue'},
    textAlign:'left',
    width:'100%'
  });  
  win.add(label);
}

function getMessageFromArguments () {
  args = Array.prototype.slice.call(arguments);
  var msg="";
  for (var i =0, l = args.length; i<l; i++) {
    m = args[i];
    switch (typeof m) {
      case "object":
        msg+= JSON.stringify(m);
        break;
      case "string":
        msg+= m;
      default:
        //no-op;
    }
  }
  
  return msg;
}

console = {
  success: function () {
    logInfo('#090', getMessageFromArguments.apply(this, arguments));
  },
  error: function () {
    logInfo('#900', getMessageFromArguments.apply(this, arguments));
  },
  log: function () {
    logInfo('#999', getMessageFromArguments.apply(this, arguments));
  }
}

/*dpd.on('newPost', function (msg) {
  console.log('new post emitted', msg);
});*/

function should (should, verb, args) {
  var testComplete
    , next = tests.shift();

  console.log('Testing: Should ',should);

  args.push(function (res, err) {
    if (err) console.error(new Error("Error testing"+should+':'+JSON.stringify(err)));
    console.success("Test passes:"+JSON.stringify(res));
    testComplete = true;
    if (!testPostID && res.id) testPostID = res.id;
    
    next && next();
  });
  dpd('collection')[verb].apply(dpd, args);
  
  setTimeout(function(){
    if (!testComplete) console.error(new Error("Test timed out for"+should));
  }, testingTimeout);
}

tests.push(function(){
  should(
    'POST an object',
    'post', 
    [{title: "Test POST", content: "Test post content", author:"jeffbcross"}]
  );
});

tests.push(function(){
  should(
    'PUT an object',
    'put', 
    [testPostID, {title: "Test PUT", content: "Test updated put content"}]
  );
});

tests.push(function(){
  should(
    'GET objects',
    'get',
    []
  )
});

tests.push(function(){
  should(
    'DELETE objects',
    'del',
    [testPostID]
  )
});

var test = tests.shift()
test && test();