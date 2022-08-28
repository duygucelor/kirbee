const {
  addPlayer,
  removePlayer,
  getPlayer,
  getPlayers,
  getWinner,
  removePlayers,
} = require("./utils/players")

const io = require("socket.io")(3006, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
})

let gameStatus = ""

let counter

io.on("connection", function (socket) {
  console.log("client connect - ", socket.id)

  socket.on("join", () => {
    const {error, player} = addPlayer({id: socket.id})
    if (error) {
      socket.emit("full")
      return error
    } else {
      socket.emit("joined", player)
    }

    if (getPlayers().length === 2) {
      io.emit("started")
      gameStatus = "counterStarted"
      counter = setTimeout(function () {
        gameStatus = "canAttack"
        io.emit("attack")
      }, (Math.floor(Math.random() * 5) + 2) * 1000)
    }
  })

  socket.on("disconnect", () => {
    console.log("client disconnect - ", socket.id)
    if (getPlayers().length === 1) {
      removePlayer(socket.id)
      gameStatus = ""
    }
    if (getPlayers().length === 2) {
      if (gameStatus === "counterStarted") {
        if (removePlayer(socket.id)) {
          clearTimeout(counter)
          io.emit("disconnected")
          gameStatus = ""
        }
      }
      if (gameStatus === "canAttack") {
        if (removePlayer(socket.id)) {
          io.emit("disconnected")
          gameStatus = ""
        }
      }
    }
  })

  socket.on("attacked", () => {
    if (gameStatus === "canAttack") {
      gameStatus = "finished"
      io.emit("finished", getPlayer(socket.id))
      setTimeout(function () {
        removePlayers()
        io.emit("restarted")
      }, 6000)
    } else if (gameStatus === "counterStarted") {
      clearTimeout(counter)
      gameStatus = "finished"
      io.emit("finished", getWinner(socket.id))
      setTimeout(function () {
        removePlayers()
        io.emit("restarted")
      }, 6000)
    }
  })
})
