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
    <p>Bought items :
      <button draggable="true" v-for="(it,index) in player.boughtItems" @dragstart="dragStart(index)" @dragend="dragEnd()">{{it.name}}</button>
    </p>
    <br>
  </div>
  `,
  methods:{
    dragStart(index) {
      this.idDrag = index;
      console.log("start dragging "+this.player.boughtItems[this.idDrag].name);
    },
    dragEnd() {
      this.idDrag = -1;
      console.log("stop dragging");
    },
    drop(slot) {
      console.log("item dropped on "+slot);
      this.player.assign(this.idDrag,slot);
    }
  }
});
