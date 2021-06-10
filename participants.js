var addParticipant = new Vue({
    el: '#add-participant',
    data: {
      message: ''
    },
    methods:{
        addParticipant: function(event){
            participantList.entries.push({text: this.message, id: participantList.entries.length})
            updateParty();
        }
    }
})

Vue.component('party-participant', {
    props: ['info', 'id'],
    template: '<li>{{ info.text }} <button id="delete-button" @click="deleteItem">❌</button></li>',
    methods:{
        deleteItem: function () {
            this.$emit('delete-event', this.id)
          }
    }
  })

var participantList = new Vue({
    el: '#participant-list',
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