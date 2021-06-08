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
        
        //TODO: show party info here
    },
})

var addEntry = new Vue({
    el: '#add-entry',
    data: {
      message: 'test'
    },
    methods:{
        addEntry: function(event){
            entryList.entries.push({text: this.message, id: entryList.entries.length})
            var entries = []
            var index = 0;
            entryList.entries.forEach(element => {
                entries.push({"text": element.text, "id": index});
                index++;
            });
            axios.post('https://party-organizer-back.herokuapp.com/party', 
            {partyID : partyCode.code, entries: entries})
            .catch(function (error) {
                // handle error
                console.log(error);
            });
        }
    }
})

Vue.component('party-item', {
    props: ['info', 'id'],
    template: '<li>{{ info.text }} <button @click="deleteItem">Delete item</button></li>',
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
            var entries = []
            var index = 0;
            this.entries.forEach(element => {
                entries.push({"text": element.text, "id": index});
                index++;
            });
            axios.post('https://party-organizer-back.herokuapp.com/party', 
            {partyID : partyCode.code, entries: entries})
            .catch(function (error) {
                // handle error
                console.log(error);
            });
        }
      }
})

function showPartyData(partyData)
{
    console.log(partyData)
    if(partyData.entries)
    {
        partyData.entries.forEach(element => {
            entryList.entries.push(element)
        });
    }
}

function GetURLParameter(sParam)
{
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++) 
    {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam) 
        {
            console.log(sParameterName[1]);
            return sParameterName[1];
        }
    }
}