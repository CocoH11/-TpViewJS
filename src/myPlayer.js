Vue.component("myPlayer", {
  props:['player'],
  data: function() {
    return {
      isCheatModeActived:false
    }
  }
  ,
  template:
  `
  <div> 
    
    <h1>{{player.name}}, level {{player.level}}, life = {{player.life}}, strength =  {{player.strength}}</h1> 
    <div id="hiddenButtonDiv"> 
        <button name="hiddenButton" id="hiddenButton" @click="cheatMode">
            Mode Master activé
        </button> 
    </div>
    <div id="cheatModeDiv" v-if="isCheatModeActived">
        <label for="inputLVL">Modifier le level</label>
        <input  id="inputLVL" name="inputLVL" />
        
        <label for="inputGold">Modifier les golds</label>
        <input  id="inputGold" name="inputGold" />
    </div>
    
    <table border="1">
      <tr v-for="sl in player.slots">
        <td @dragover.prevent @drop="drop(sl)">{{sl.name}}</td>
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
      console.log("item dropped on "+slot.name);
      if (this.player.assign(this.idDrag,slot.name)) {
        this.updateSlot(slot);
      }
    },
    updateSlot(slot){
      data={
        id:this.player._id,
        slotName: slot.name,
        items: slot.items
      }
      axios.put("http://rpg.dut-info.cf/rpg/persos/updateslot", data)
      .then(response => {
        if (response.data.err == 1) {
          alert("cannot update the slot shop");
        }
        else {
          alert("slot updated");
        }
      })
      console.log("item dropped on "+slot);
      this.player.assign(this.idDrag,slot);
    },
    cheatMode(){

    }
  }
});
