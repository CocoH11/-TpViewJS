Vue.component("gameMaster", {
  data: function(){
    return {
      newItemName: '',
      newItemType: '',
      newItemPrice: '',
      newItemEffect: '',
      newPersoName: '',
      newPersoGold: ''
    }
  },
  props: ['itemCats'],
  template:
  `
  <div>
    <p>Create a new Item</p>
    <label for="newItemName">name: </label>
    <input id="newItemName" v-model="newItemName">
    <label for="newItemType">type: </label>
    <select id="newItemType" v-model="newItemType">
        <option v-for="cat in itemCats" :value="cat">{{cat}}</option>
    </select>
    <label for="newItemPrice">price: </label>
    <input v-model="newItemPrice" type="number">
    <label for="newItemEffect">effect: </label>
    <input v-model="newItemEffect">
    <button @click="createItem">Create Item {{newItemName}}</button>
    <br>

    <p>Create a new Perso</p>
    <label for="newPersoName">name: </label>
    <input id="newPersoName" v-model="newPersoName">
    <label for="newPersoGold">gold: </label>
    <input id="newPersoGold" v-model="newPersoGold" type="number">
    <button @click="createPerso">Create Perso {{newPersoName}}</button>
  </div>
  `,
  methods:{
    createItem : function() {
      console.log(this.itemCats);
      regex= new RegExp("^[ASL]{1}[+-]{1}[0-9]{1,3}$");
      if (!regex.test(this.newItemEffect)){
        alert("Bad effect!!!!!!!! "+this.newItemEffect);
        return;
      }
      this.newItemPrice=Math.abs(this.newItemPrice);
      console.log(this.newItemPrice);
      let data = {
        name:this.newItemName,
        type:this.newItemType,
        price: this.newItemPrice,
        effect: this.newItemEffect
      }
      axios.post("http://rpg.dut-info.cf/rpg/items/create",data)
      .then(response => {
        if (response.data.err == 1) {
          alert("cannot create an item");
        }
        else {
          alert("item creation: success");
          items.push(Item.fromObject(response.data.data));
          this.$emit("update:items", items);
        }
      })
    },

    createPerso: function(){
      this.newPersoGold=Math.abs(this.newPersoGold);
      let data={
        name: this.newPersoName,
        level: 1,
        gold: this.newPersoGold,
        strength:0,
        slots:[
          {name:'head', id:1, items:[]},
          {name:'body', id:2, items:[]},
          {name:'hands', id:3, items:[]},
          {name:'belt', id:4, items:[]},
          {name:'bag', id:5, items:[]}
        ],
        vitality: 0,
        life:0,
        armor: 0
        // TODO:change order nicholas
      }
      axios.post("http://rpg.dut-info.cf/rpg/persos/create", data)
      .then(response=>{
        if (response.data.err==1) {
          alert("cannot create a perso");
        }
        else{
          alert("perso creation: success");
          players.push(Perso.fromObject(response.data.data));
          this.$emit("update:players", players);
        }
      })
    }
  }
});
