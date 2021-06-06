var partyCode = new Vue({
    el: '#party-code',
    data: {
        code: 'Loading'
    },
    mounted(){
        console.log("Getting code")
        axios
            .get('https://party-organizer-back.herokuapp.com/new-code')
            .then(response => (this.code = response.data))
    }
  })
