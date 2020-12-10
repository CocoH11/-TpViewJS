Vue.component("myItemList", {
  props: [ 'itemList','nbShow' ],
  template: `
  <div>\
  <ol> \
  <li v-for="(it,index) in itemList">
  <input type="radio" name="itemsToBuy" :id="'ittobuy'+index" :value="index"  @click="$emit('update:idToBuy', index)">
  <label :for="'ittobuy'+index">{{it.name}} : {{it.price}} gp </label>
  </li> \
  </ol> \
  </div>
  `,
});
