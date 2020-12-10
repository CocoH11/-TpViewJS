Vue.component("mainComponent", {
  data: function(){
    return {
      idPlayer: -1
    }
  },
  props:['players', 'shops'],
  computed: {
    player: function(){
      return players[this.idPlayer];
    }
  },
  template:
  `
  <div>
    <label for="idPlayer">#player:</label><input id="idPlayer" v-model="idPlayer"><br> \
    <div v-if="player!==undefined"> \
      <my-player :player="this.player"></my-player> \
      <my-shop v-bind:shops.sync="this.shops"></my-shop>\
    </div>
  </div>
  `
});
