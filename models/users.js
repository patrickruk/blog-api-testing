let users = [];

function getUsers() {
  return users;
}

function addUser(username) {
  const user = { id: users.length + 1, username };
  users.push(user);
  return user;
}

module.exports = { getUsers, addUser };
