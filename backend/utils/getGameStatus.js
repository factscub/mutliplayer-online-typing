function getGameStatus(users) {
    return users.every((user) => user[1].finished);
}
module.exports = { getGameStatus };