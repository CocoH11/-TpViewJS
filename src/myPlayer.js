Vue.component("myPlayer", {
  props:['player'],
  template:
  `
  <div> \
    <h1>{{player.name}}, level {{player.level}}, life = {{player.life}}, strength =  {{player.strength}}</h1> \
    <table border="1">
      <tr v-for="sl in player.slots">
        <td @dragover.prevent @drop="drop(sl.name)">{{sl.name}}</td>
        <td v-for="it in sl.items">{{it.name}}</td>
      </tr>
    </table>
    <br>
  </div>
  `
});
