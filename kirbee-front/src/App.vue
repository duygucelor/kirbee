<template>
  <div class="App" id="app" v-touch:tap="attack" tabindex="0">
    <div class="game">
      <div class="demo-scene">
        <Status
          :playerStatus="playerStatus"
          :player="player"
          :winner="winner"
          :game="game"
        ></Status>
        <div class="avatars-div">
          <div
            :class="
              winner && playerStatus === 'joined'
                ? 'avatars-reverse'
                : 'avatars'
            "
          >
            <Player
              playerName="Kirby"
              :isCurrentPlayer="(player && player.name === 'Kirby') ?? true"
              :stage="
                winner && playerStatus === 'joined'
                  ? winner.name === 'Kirby'
                    ? 'win'
                    : 'lose'
                  : 'start'
              "
            ></Player>
            <Player
              playerName="Knight"
              :stage="
                winner && playerStatus === 'joined'
                  ? winner.name === 'Knight'
                    ? 'win'
                    : 'lose'
                  : 'start'
              "
              :isCurrentPlayer="(player && player.name === 'Knight') ?? true"
            ></Player>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import io from "socket.io-client"
import Player from "./components/Player.vue"
import Status from "./components/Status.vue"

const socket = io(`${location.protocol}//${location.hostname}:3006`)

export default {
  name: "App",
  components: {
    Player,
    Status,
  },
  data() {
    return {
      playerStatus: "connecting",
      game: "",
      player: null,
      winner: null,
    }
  },

  mounted() {
    window.addEventListener("keypress", this.attack.bind(this))
    socket.on("connect", () => {
      this.playerStatus = "connected"
    })
    socket.on("joined", player => {
      this.player = player
      this.playerStatus = "joined"
    })
    socket.on("full", () => {
      this.game = "full"
    })
    socket.on("started", () => {
      this.game = "counterStarted"
    })
    socket.on("attack", () => {
      this.game = "canAttack"
    })
    socket.on("finished", player => {
      this.game = "finished"
      this.winner = player
    })
    socket.on("disconnected", () => {
      if (!this.winner) {
        this.game = ""
        this.winner = null
        this.playerStatus = "joined"
      }
    })
    socket.on("restarted", () => {
      this.restartGame()
    })
  },
  methods: {
    join() {
      socket.emit("join")
    },
    attack() {
      if (this.game === "counterStarted" || this.game === "canAttack") {
        socket.emit("attacked")
      }
    },
    restartGame() {
      this.playerStatus = "connected"
      this.game = ""
      this.player = null
      this.winner = null
    },
  },
}
</script>

<style scoped>
.App {
  width: 100%;
  height: 100%;
  background: url(/images/background.png) center center;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
}

.game {
  width: 512px;
  max-width: 90%;
  height: 444px;
  max-height: 90%;
  background: url(/images/background.png) center center;
  box-shadow: 0 0 9px rgb(0 0 0 / 60%), 0 0 0 9999px rgb(255 255 255 / 40%);
  border-radius: 5px;
  overflow: hidden;
}

.demo-scene {
  height: 100%;
  padding: 0.7rem;
  text-align: center;
  color: yellow;
  display: flex;
  flex-direction: column;
}

.avatars {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}
.avatars-reverse {
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-around;
}
.avatars-div {
  position: relative;
  top: 25%;
}
</style>
