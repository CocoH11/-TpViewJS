Vue.component("gameMaster", {
  data: function(){
    return {
      newItemName: '',
      newItemType: '',
      newItemPrice: '',
      newItemEffect: ''
    }
  },
  template:
  `
  <div>
    <p>Create a new Item</p>
    <label for="newItemName">name: </label>
    <input id="newItemName" v-model="newItemName">
    <label for="newItemType">type: </label>
    <input v-model="newItemType">
    <label for="newItemPrice">price: </label>
    <input v-model="newItemPrice" type="number">
    <label for="newItemEffect">effect: </label>
    <input v-model="newItemEffect">
    <button @click="createItem">Create Item {{newItemName}}</button>
    <br>
  </div>
  `,
  methods:{
    createItem : function() {
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
  }
});
