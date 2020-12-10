var url = "http://rpg.dut-info.cf/rpg"
var app = new Vue({
  el: '#mydiv',
  data: {
    shops,
    players
  },
  mounted(){
    axios.get(url+'/items/get')
    .then(response => {
      items.splice(0,items.length);
      response.data.forEach(e => {
        items.push(Item.fromObject(e));
      });
      shops=Shop.fillShops();
    })
  }
})
