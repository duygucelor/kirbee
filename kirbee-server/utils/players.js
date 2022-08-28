const players = []

const addPlayer = ({id}) => {
  if (players.length === 2) {
    return {
      error: "Full",
    }
  }
  let name
  if (players.length === 0) {
    name = "Kirby"
  }
  if (players.length === 1) {
    name = getPlayers()[0].name === "Kirby" ? "Knight" : "Kirby"
  }
  const player = {id, name}
  players.push(player)
  return {player}
}

const removePlayer = id => {
  const index = players.findIndex(player => player.id === id)

  if (index !== -1) {
    players.splice(index, 1)[0]
    return true
  }
  return false
}

const getPlayer = id => {
  return players.find(player => player.id === id)
}

const getWinner = id => {
  return players.find(player => player.id !== id)
}

const getPlayers = () => {
  return players
}

const removePlayers = () => {
  players.splice(0, 2)
}

module.exports = {
  addPlayer,
  removePlayer,
  getPlayer,
  getPlayers,
  getWinner,
  removePlayers,
}
