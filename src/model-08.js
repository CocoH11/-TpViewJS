function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

var nbItemBoutique = 10;

var itemCats = [ 'helmet', 'crown', 'armor', 'clothes', 'weapon', 'lighter', 'purse', 'potion', 'spell', 'food'];

var itemLimits = [
  {slot:'head', limit:1, types: [ 'helmet' , 'crown' ]},
  {slot:'body', limit:1, types: [ 'armor', 'clothes' ]},
  {slot:'hands', limit:2, types: [ 'weapon', 'lighter']},
  {slot:'belt', limit:3, types: [ 'weapon', 'purse']},
  {slot:'bag', limit:10, types: [ 'helmet', 'crown', 'clothes', 'lighter', 'potion', 'spell', 'food', 'purse' ]}
];

class Item {
  constructor(id, name, type, price, effect) {
    this.id = id;
    this.name = name;
    //let idx = itemCats.findIndex(e => e == type);
    //var testType = function(el) {return el == type};
    function testType(el) { return el == type;}
    let idx = itemCats.findIndex(testType);
    if (idx != -1) {
      this.type = type;
    }
    else {
      this.type = '';
    }
    if (price>=0) {
      this.price = price;
    }
    else {
      this.price = 0;
    }
    this.effect = effect;
  }

  static fromObject(obj) {
    let it = new Item(obj._id, obj.name, obj.type,obj.price, obj.effect);
    return it;
  }
}

class Slot {
  constructor(_id, name) {
    this._id = _id;
    this.name = name;
    this.items = [];
  }

  static fromObject(obj) {
    let sl = new Slot(obj._id, obj.name);
    obj.items.forEach(item => { sl.items.push(Item.fromObject(item)); });
    return sl;
  }
}

class Perso {

  constructor(_id, name, level) {
    this._id = _id;
    this.name = name;
    this.level = level;
    this.slots = [
      {name:'head', id:1, items:[]},
      {name:'body', id:2, items:[]},
      {name:'hands', id:3, items:[]},
      {name:'belt', id:4, items:[]},
      {name:'bag', id:5, items:[]}
    ];
    this.boughtItems = []; // list of item bought but not yet assigned
    this.life = 50*this.level; // the actual level of life
    this.gold=500*this.level;
    this.updateCaracs();
  }

  updateCaracs() {
    this.vitality = this.level*50;
    this.armor = 0;
    this.strength = this.level*20;
    for(let i=0;i<this.slots.length;i++) {
      let slot = this.slots[i];
      for(let j=0;j<slot.items.length;j++) {
        let item = slot.items[j];
        // search for armor effects
        if (item.effect[0] == 'A') {
          let val = item.effect.substring(2,item.effect.length);
          if (item.effect[1] == '+') this.armor += eval(val);
          else if (item.effect[1] == '-') this.armor -= eval(val);
        }
        // search for vitality effects
        if (item.effect[0] == 'L') {
          let val = item.effect.substring(2,item.effect.length);
          if (item.effect[1] == '+') this.vitality += eval(val);
          else if (item.effect[1] == '-') this.vitality -= eval(val);
        }
        // search for strength effects
        if (item.effect[0] == 'S') {
          let val = item.effect.substring(2,item.effect.length);
          if (item.effect[1] == '+') this.strength += eval(val);
          else if (item.effect[1] == '-') this.strength -= eval(val);
        }
      }
    }
    if (this.life > this.vitality) this.life = this.vitality;
  }

  /* modified version for TP 4:
       - called from buy() in vue instance, where checks/confirmation are done.
       - item parameter is an item object
  */
  buy(item) {
    this.boughtItems.push(item);
    this.gold -= item.price;
  }

  /* assign(): try to assign an item to a slot
  - itemId is the index of item in boughtItem
  - slot is the name of the slot (see attribute name in slots)
  return true if it's possible (i.e. limits and type of item respected)
  else return false.
  */
  assign(itemId, to) {
    let item = this.boughtItems[itemId];
    if (item == undefined) return false;
    let slot = this.slots.find(e => e.name == to);
    let slotLim = itemLimits.find(e => e.slot == to);
    // if to exists in player's slots and itemLimits
    if ((slot != undefined) && (slotLim != undefined)) {
      // check if limits/type is ok or not
      if (slot.items.length == slotLim.limit) {
        alert('limit for '+to+' alreay reached');
        return false;
      }
      let t = slotLim.types.find(e => e == item.type);
      if (t == undefined) {
        alert(to+' cannot be assigned with '+item.type);
        return false;
      }
      console.log("assign "+item.name+" to "+slot.name);
      slot.items.push(item);
      this.boughtItems.splice(itemId,1);
      this.updateCaracs();
      return true;
    }
    return false;
  }

  static fromObject(obj) {
    let p = new Perso(obj._id, obj.name, obj.level);
    p.gold = obj.gold;
    p.life = obj.life;
    p.vitality = obj.vitality;
    p.strength = obj.strength;
    p.armor = obj.armor;
    p.slots.splice(0,p.slots.length);
    obj.slots.forEach(slot => { p.slots.push(Slot.fromObject(slot)); });
    return p;
  }
}

class Shop {
  constructor(_id ,title, items){
    this._id=_id;
    this.title=title;
    this.items=items;
  }

  static nbItemBoutique = 7;
  static fillShops(){
    let listShops=[];
    for(let i=0; i<4; i++){
      let shopItems=[];
      for(let j=0;j<nbItemBoutique;j++) {
        let idx = getRandomInt(items.length);
        shopItems.push(items[idx]);
        console.log(items[idx]);
      }
      let shop= new Shop(i,"Shop"+i, shopItems);
      listShops.push(shop);
    }
    return listShops;
  }
}

var players = [];
var items = [];
var shops=[];
// for(let i=0; i<4; i++){
//   let shopItems=[];
//   for(let j=0;j<nbItemBoutique;j++) {
//     let idx = getRandomInt(items.length);
//     shopItems.push(items[idx]);
//   }
//   let shop= new Shop("Shop"+i, shopItems);
//   shops.push(shop);
// }
// create the shop, filling with items taken at random
