var partyCreateButton = new Vue({
    el: '#party-create-button',
    data: {},
    methods:{
        showCreateParty: function(event){
            window.open("/create.html","_self")
        }
    }
  })
