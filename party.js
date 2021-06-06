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

Vue.component('party-item', {
    props: ['info'],
    template: '<li>{{ info.text }}</li>'
  })
  

var addEntry = new Vue({
    el: '#add-entry',
    data: {
      message: 'test'
    },
    methods:{
        addEntry: function(event){
            console.log("Adding entry: " + this.message)
            entryList.entries.push({text: this.message})
            console.log(partyCode.code)
            var entries = []
            entryList.entries.forEach(element => {
                entries.push({"text": element.text});
            });
            console.log(entries)
            axios.post('https://party-organizer-back.herokuapp.com/party', 
            {partyID : partyCode.code, entries: entries})
            .catch(function (error) {
                // handle error
                console.log(error);
            });
        }
    }
})


var entryList = new Vue({
    el: '#entry-list',
    data: {
        entries: []
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