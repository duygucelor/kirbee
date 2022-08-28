<template>
  <div class="avatar">
    <font-awesome-icon
      v-show="isCurrentPlayer"
      icon="fa-solid fa-caret-down"
      :style="{color: playerName === 'Kirby' ? 'red' : 'blue'}"
    />
    <img
      :src="
        '../../images/' + playerName + '/' + playerName + '_' + stage + '.png'
      "
    />
  </div>
</template>

<script>
export default {
  name: "Player",
  props: ["playerName", "stage", "isCurrentPlayer"],
  data() {
    return {}
  },

  mounted() {},
  methods: {},
}
</script>

<style scoped>
.avatar {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}
</style>
