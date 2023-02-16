function getWinner(users) {
    return users.map(user => {
        return {
            username: user[0],
            time: user[1].timeCount + user[1].errors
        }
    }).sort((a, b) => a.time - b.time)[0].username;

}

module.exports = { getWinner };