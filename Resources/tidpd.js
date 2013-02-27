dpd = require('dpd');

dpd.init({
  root:'http://localhost:2403'
});

/* 
 * Copy your collections info from generated dpd.js (found at bottom)
 * You will need to delete the .on, .once, and .off functions
 * as these are not supported at this time.
 */
dpd.YOURCUSTOMCOLLECTION = dpd("/YOURCUSTOMCOLLECTION");
dpd.YOURCUSTOMCOLLECTION.rename = function (path, body, fn) {
  dpd.YOURCUSTOMCOLLECTION.exec("rename", path, body, fn);
}

dpd.users.login = function(path, body, fn) {
	return dpd.users.exec("login", path, body, fn);
}
dpd.users.logout = function(path, body, fn) {
	return dpd.users.exec("logout", path, body, fn);
}
dpd.users.me = function(path, query, fn) {
	return dpd.users.get("me", path, query, fn);
}


module.exports = dpd;
