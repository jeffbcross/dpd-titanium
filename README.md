dpd.js for Appcelerator Titanium
==========

This is a Titanium JavaScript module that lets a Titanium app communicate with a (deployd)[http://www.deployd.com] backend. 

## usage

 * You'll need (deployd)[http://www.deployd.com] installed first.
 * You'll need Appcelerator Titanium installed, as well as either the iOS or Android SDK.

In your Titanium project, add dpd.js.
Include the dpd module in any JavaScript file in your project

```javascript
  dpd = require('dpd');
```

The dpd object implements the same API as described in the (deployd docs)[http://docs.deployd.com/docs/collections/reference/dpd-js.md], only difference being that all resources have to be accessed by calling the `dpd()` function with the Resource name, instead of the standard `dpd[resourceName]` convention.

```javascript
  dpd('collection').post({"title": "Test post"}, fn);
```


## try it

1. Create a new Titanium project from the included Resources directory
2. Start the deployd app from Terminal/Command Prompt, and open your dashboard. 

```bash
  cd /deploydapp
  dpd -d
```

3. From Titanium Studio, run the project in iOS simulator. 
4. Watch the test output in the app's main window.