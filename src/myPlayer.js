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
    <div id="hiddenButtonDiv">
        <button name="hiddenButton" id="hiddenButton" @click="cheatMode">
            Mode Master activé
        </button>
    </div>
    <br>

    <h1>{{player.name}}, level {{player.level}}, vitality = {{player.vitality}}, strength =  {{player.strength}}, life {{player.life}}, gold {{player.gold}}, armor {{player.armor}}</h1> 

    <div id="cheatModeDiv" v-if="isCheatModeActived">
        <label>Modifier le level:
            <br>
            <input id="inputLVL" name="inputLVL" v-model="player.level" @change="changeStat"/>
        </label>
        <br>
        <label>Modifier les golds:
            <br>
            <input id="inputGold" name="inputGold" v-model="player.gold"/>
        </label>

    </div>
    <br v-if="isCheatModeActived">
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
      if (this.isCheatModeActived){
        this.isCheatModeActived=false;
      }else {
        this.isCheatModeActived=true;
      }
    },
    changeStat(){
      this.player.updateCaracs();
      this.$emit('update:player', this.player);
    }
  }
});
