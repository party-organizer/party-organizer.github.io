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

var findParties = new Vue({
    el: '#party-finder',
    data: {
      partyID: '',
      searchResult: ''
    },
    methods:{
        findParty: function(event){
            console.log('searching for party')
            axios.get('https://party-organizer-back.herokuapp.com/party', {params:{partyID : this.partyID}})
            .then(response => (showParty(response.data)))
            .catch(function (error) {
                this.searchResult = 'Party not found'
                console.log(error);
            });
        }
    }
})

function showParty(partyData)
{
    if(partyData)
    {
        console.log(partyData)
        findParties.searchResult = 'Found party: ' + partyData.partyID;
        window.open("/party.html" + "?id=" + partyData.partyID,"_self")
    }
    else
    {
        console.log('Party not found')
        findParties.searchResult = 'Party not found'
    }
}
