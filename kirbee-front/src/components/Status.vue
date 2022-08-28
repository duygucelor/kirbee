<template>
  <div>
    <div v-if="playerStatus === 'joined'">
      <p>{{ "Joined as " + player.name }}</p>
      <div v-if="winner && player">
        <p v-if="winner.id === player.id">You win</p>
        <p v-else>You lose</p>
      </div>
    </div>
    <p v-else>{{ getStatusLabel(playerStatus) }}</p>
    <button
      v-if="playerStatus === 'connected' && game !== 'full'"
      @click="this.$parent.join"
    >
      Join
    </button>
    <p v-if="game === 'full'">Full</p>
    <div v-if="playerStatus === 'joined'">
      <p v-if="!game">Waiting for a player</p>
      <p v-if="game === 'counterStarted'">Wait..</p>
      <img v-if="game === 'canAttack'" :src="'../images/action-mark.png'" />
    </div>
  </div>
</template>

<script>
export default {
  name: "Status",
  props: ["game", "playerStatus", "winner", "player"],
  methods: {
    getStatusLabel(status) {
      switch (status) {
        case "connecting":
          return "Connecting..."
        case "connected":
          return "Connected"
        default:
          return ""
      }
    },
  },
}
</script>

<style scoped>
img {
  float: center;
  width: 10%;
  height: 10%;
}
</style>
