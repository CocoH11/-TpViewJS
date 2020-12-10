Vue.component("myPlayer", {
  data: function(){
    return {
      idPlayer: -1
    }
  },
  props:['players'],
  computed:{
    player: function(){
      return players[this.idPlayer];
    }
  },
  template:
  `
  <div> \
    <label for="idPlayer">#player:</label><input id="idPlayer" v-model="idPlayer"><br> \
    <div v-if="player !== undefined"> \
      <h1>{{player.name}}, level {{player.level}}, life = {{player.life}}, strength =  {{player.strength}}</h1> \
    </div> \
  </div>
  `
});
