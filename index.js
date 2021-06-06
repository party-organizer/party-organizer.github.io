var partyCreateButton = new Vue({
    el: '#party-create-button',
    data: {
        code: 'Missing'
    },
    methods:{
        showCreateParty: function(event){
            console.log("Getting code")
            axios.get('https://party-organizer-back.herokuapp.com/new-code')
                .then(response => (window.open("/party.html" + "?id=" + response.data.value.COUNT,"_self")))
        }
    }
  })
