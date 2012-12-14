# dpd.js for Appcelerator Titanium

This is a Titanium JavaScript module that lets a Titanium app communicate with a [deployd](http://www.deployd.com) backend. 

## prerequisites

 * You'll need [deployd](http://www.deployd.com) installed first.
 * You'll need Appcelerator Titanium installed, as well as either the iOS or Android SDK.

## usage

(Make sure your deployd app is running, and has a resource to communicate with.)



```javascript
  // Init deployd module and create an object in a collection.
  dpd = require('dpd');
  dpd.init({root:'http://localhost:2403'});
  dpd('collectionName').post({"title":"I <3 deployd"}, function (res, err){
    if (err) Ti.API.error(err);
    Ti.API.debug('Object created'+JSON.stringify(res));
  });

  // Get an object from a collection
  dpd('collectionName').get({"comments":{"$gte":5}}, fn);
  
  // Update an object in a collection
  dpd('collectionName').put("1a2b3c", {"title": "New Title"}, fn);

  // Delete an object in a collection
  dpd('collectionName').del("1a2b3c", fn)

  // Execute an arbitrary function, such as login.
  dpd('users').exec('login', {"username":"jeffbcross", "password":"cats"}, fn);
```

The dpd object mostly implements the same API as described in the [deployd docs](http://docs.deployd.com/docs/collections/reference/dpd-js.md), the main difference being that all resources have to be accessed by calling the `dpd('resourceName')` function with the Resource name, instead of the standard `dpd['resourceName']` convention.

```javascript
  dpd('collection').post({"title": "Test post"}, fn);
```


## example app

1. Create a new Titanium project from the included Resources directory
2. Start the deployd app from Terminal/Command Prompt, and open your dashboard. 

```bash
  cd /deploydapp
  dpd -d
```

3. From Titanium Studio, run the project in iOS simulator. 
4. Watch the test output in the app's main window.

## todo

1. Implement socket.io
2. Implement login methods
3. Make a login window?