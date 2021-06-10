var partyCode = new Vue({
    el: '#party-code',
    data: {
        code: 'Loading'
    },
    mounted(){
        console.log("Getting code")
        this.code = GetURLParameter("id");
        axios.get('https://party-organizer-back.herokuapp.com/party', {params:{partyID : this.code}})
            .then(response => (showPartyData(response.data)))
        
    },
})


var addEntry = new Vue({
    el: '#add-entry',
    data: {
      message: ''
    },
    methods:{
        addEntry: function(event){
            entryList.entries.push({text: this.message, id: entryList.entries.length})
            updateParty();
        }
    }
})

Vue.component('party-item', {
    props: ['info', 'id'],
    template: '<li>{{ info.text }} <button id="delete-button" @click="deleteItem">❌</button></li>',
    methods:{
        deleteItem: function () {
            this.$emit('delete-event', this.id)
          }
    }
  })

var entryList = new Vue({
    el: '#entry-list',
    data: {
        entries: []
    },
    methods: {
        handleDeleteEvent(id){
            var filtered = this.entries.filter(function(value, index, arr){
            return value.id != id;
            });
            this.entries = filtered; 
            updateParty();
        }
      }
})
