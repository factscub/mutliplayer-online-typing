
function homePageRoom(io, socket) {
  // creates room for every loggedin user on the clientside 
  //so that we can send notification if opponent sends invitation
  socket.on('homePageRoom', ({ username }) => {
    socket.join(username)
  })

}

module.exports = { homePageRoom }