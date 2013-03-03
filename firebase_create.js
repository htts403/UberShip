function go() {
  var userId = prompt('Username?', 'Guest');
  var userData = { name: userId };
  tryCreateUser(userId, userData);
}
 
var USERS_LOCATION = 'https://ubership-launch2013.firebaseio.com/users';
 
function userCreated(userId, success) {
  if (!success) {
    alert('user ' + userId + ' already exists!');
  } else {
    alert('Successfully created ' + userId);
  }
}
 
// Tries to set /users/<userId> to the specified data, but only
// if there's no data there already.
function tryCreateUser(userId, userData) {
  var usersRef = new Firebase(USERS_LOCATION);
  usersRef.child(userId).transaction(function(currentUserData) {
    if (currentUserData === null)
      return userData;
  }, function(error, committed) {
    userCreated(userId, committed);
  });
}