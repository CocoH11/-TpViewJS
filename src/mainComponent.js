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
    <label for="idPlayer">#player:</label><input list="playerslist" id="idPlayer" v-model="idPlayer"><br> \
    <datalist id="playerslist">
      <option v-for="p in players">{{p.name}}</option>
    </datalist>
    <div v-if="player!==undefined"> \
      <my-player v-bind:player.sync="this.player"></my-player> \
      <my-shop v-bind:shops.sync="this.shops" :player="player"></my-shop>\
    </div>
  </div>
  `,
  watch:{
    idPlayer: function (newVal, oldVal){
      if(isNaN(newVal)){
        for (let i=0; i<players.length;i++){
          if (players[i].name==newVal){
            this.idPlayer = i;
          }
        }
      }
    }
  }
});
