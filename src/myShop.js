Vue.component("myShop", {
  data: function() {
    return {
      idShop: 0,
      nbShow : 5,
      selNums : "",
      selItems : [],
      selNames : "",
      idToBuy: -1,
      currentShop: ''
    }
  },
  computed: {
    shop : function() {
      return shops[this.idShop];
    }
  },
  props: [],
  template: `
  <div>\
    <label for="idShop">#shop:</label><input id="idShop" v-model="idShop"><br> \
    <h1>{{shop.title}}</h1> \
    <label>show</label><input v-model="nbShow"> \
    <my-item-list :item-list="shop.items" :nb-show="nbShow" v-bind:id-to-buy.sync="idToBuy"></my-item-list> \
    <label for="select">#items :</label><input id="select" v-model="selNums"> \
    <button v-if="selItems.length>0" @click="remove">remove {{selNames}}</button> \
    <button v-if="idToBuy!=undefined && idToBuy>-1" @click="buy(this.shops)">buy {{shop.items[idToBuy].name}}</button> \
  </div>
  `,
  methods:
  {
    remove : function() {
      this.selItems.forEach(e=> { let idx=shop.items.indexOf(e); shop.items.splice(idx,1); });
      this.selNums="";
      this.$emit('items-removed',this.selNames); // send an event to parent.
    },
    buy : function(shops) {
      shops[this.idShop].items.splice(this.idToBuy, 1);
      this.$emit('update:shops', shops);

      // if (shop[this.idToBuy].price > this.player.gold) {
      //   alert("Not enough gold");
      // }
      // else {
      //   let r = confirm("want to buy " + shop[this.idToBuy].name+" for "+shop[this.idToBuy].price+"gp ?");
      //   if (r == true) {
      //     this.player.buy(shop[this.idToBuy]);
      //     shop.splice(this.idToBuy,1);
      //     this.idToBuy='';
      //   }
      // }
    }
  },
  watch:
  {
    selNums : function(newVal, oldVal) {
      let lst = newVal.split(",");
      this.selNames = "";
      this.selItems = [];
      lst.forEach(e => {if ((e-1<this.nbShow) && (shop.items[e-1] != undefined) && (this.selItems.indexOf(shop.items[e-1]) == -1)) {
        this.selNames += shop.items[e-1].name+" ";
        this.selItems.push(shop.items[e-1]);
      }});
    },
    idToBuy: function(newVal, oldVal){
        console.log(newVal);
    }
  }
});
