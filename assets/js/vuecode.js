
/*
Componente de item de lista
  Contem uma checkbox do item e botoes de editar, remover, renomear e cancelar renomeacao.
  Para o prop 'item', e' necessario passar um dado item com id, newName, checked, value, type e editMode
*/
Vue.component('item', {
  props: ['item'],
  template: `
  <div v-if="!item.editMode">
    <input type="checkbox" v-model="item.checked"> {{item.value}} </input>
    <button v-on:click="$emit('edit', item.id)" > <strong>Edit</strong> </button>
    <button v-on:click="$emit('remove', item.id)" > <strong>X</strong> </button>
  </div>
  <div v-else-if="item.editMode">
    <input type="checkbox" v-model="item.checked"></input>
     <input type="text" v-model="item.newName"/>
     <button v-on:click="$emit('rename', item.id, item.newName)" > <strong>Rename</strong> </button>
     <button v-on:click="$emit('edit', item.id)"> <strong>Cancel</strong> </button>
  </div>
  `
})

/*
Aplicacao Vue
  Cuida da lista de itens, cada item vira um componente 'item'
  Pode-se adicionar novos itens, deleta-los e renomea-los
*/
var app = new Vue({
  el: '#app',
  data: {
    itens:  [],
    count:  0,
    newItemType:  '',
    newItemValue: '',
    addMode: false
  },
  methods:  {
    //Adiciona um novo item
    push(){
      if(!this.newItemValue || this.newItemValue.length === 0) return;
      axios
				.post('/', {
          // id      : this.count + 1,
          value   : this.newItemValue,
          checked : false
        })
				.then(response => {
          if(response.status == 'Item repetido') return;
					let item = {
            id      : this.count++,
            value   : response.data,
            type    : this.newItemType,
            checked : false,
            editMode : false,
            newName: ''
          }
          this.itens.push(item)
					console.log(response.data);
				})
				.catch(error => {
					console.log(error)
					this.errored = true
        })
        this.newItemValue = ''
        this.addMode = false
    },
    //Remove o item de id passado como parametro
    remove(id){
      this.itens = this.itens.filter(item => item.id !== id)
    },
    //Renomeia o item de id passado como parametro
    rename(id, name) {
      let i = this.itens.find(item => item.id === id)
      i.value = name
      i.editMode = false
      i.newName = ''
    },
    //Troca o item de id passado como parametro para modo de edicao ou sai do mesmo
    edit(id){
      let i = this.itens.find(item => item.id === id)
      i.editMode = !i.editMode
      i.newName = i.value
    },
    //Entra no modo de adicionar item
    EnterAddMode(){
      this.addMode = true
    }
  }
})
