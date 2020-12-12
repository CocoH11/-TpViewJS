var url = "http://rpg.dut-info.cf/rpg"
var app = new Vue({
  el: '#mydiv',
  data: {
    shops,
    players,
    items,
    gameMasterActivated: false
  },
  methods:{
    activateGameMaster(){
      this.gameMasterActivated = !this.gameMasterActivated;
    }
  },
  mounted(){
    axios.get(url+'/items/get')
    .then(response => {
      items.splice(0,items.length);
      response.data.forEach(e => {
        items.push(Item.fromObject(e));
      });
      shops=Shop.fillShops();
    });

    axios.get(url+'/persos/get')
    .then(response=>{
      players.splice(0, players.length);
      response.data.forEach(e => {
        players.push(Perso.fromObject(e));
      });
    });
  }
})
