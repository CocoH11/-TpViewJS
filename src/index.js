var app = new Vue({
  el: '#mydiv',
  data: {
    idPlayer:'',
    players,  // to observe and have an access to players array
    shop, // to observe the shop
    idToBuy:'',
    idDrag : -1 // the id in boughtItems of the item currently dragged
  },
  computed : {
    player : function() {
      return players[this.idPlayer];
    }
  },
  methods: {
    /* NB : since shop defined in data observes shop defined in model.js
    any modification of the latter will be observed. Thus, we can
    use directly shop instead of this.shop in the following code.
    */
    buy : function() {
      if (shop[this.idToBuy].price > this.player.gold) {
        alert("Not enough gold");
      }
      else {
        let r = confirm("want to buy " + shop[this.idToBuy].name+" for "+shop[this.idToBuy].price+"gp ?");
        if (r == true) {
          this.player.buy(shop[this.idToBuy]);
          shop.splice(this.idToBuy,1);
          this.idToBuy='';
        }
      }
    },
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
  },
  watch: {
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
})
