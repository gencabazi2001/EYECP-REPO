const users = [];

// Join user to chat

function userJoin(id, username, room) {
    const user = {id, username, room};

    users.push(user);

    return user;
};

//Get Current user
function getCurrentUser(username){
    return users.find(user=> user.username === username);
}

function userLeave(id){
    const index = users.findIndex(user => user.id === id);
    if(index !== -1){
        return users.splice(index,1)[0];
    }
}

function getRoomUsers(room){
    return users.filter(user => user.room === room);
}

module.exports = {
    userJoin,
    getCurrentUser,
    userLeave,
    getRoomUsers
}