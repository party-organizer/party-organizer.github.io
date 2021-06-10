
function showPartyData(partyData)
{
    console.log(partyData)
    if(partyData.entries)
    {
        partyData.entries.forEach(element => {
            entryList.entries.push(element)
        });
    }
    if(partyData.participants)
    {
        partyData.participants.forEach(element => {
            participantList.entries.push(element)
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

function updateParty(){
    var entries = []
    var participants = []
    var index = 0;
    entryList.entries.forEach(element => {
        entries.push({"text": element.text, "id": index});
        index++;
    });
    var participants = []
    index = 0;
    participantList.entries.forEach(element => {
        participants.push({"text": element.text, "id": index});
        index++;
    });
    axios.post('https://party-organizer-back.herokuapp.com/party', 
    {partyID : partyCode.code, entries: entries, participants: participants})
    .catch(function (error) {
        console.log(error);
    });
}