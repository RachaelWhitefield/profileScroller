$.ajax({
    url: 'https://randomuser.me/api/?nat=us',
    dataType: 'json',
    success: function(data) {
    //   console.log(data.results);
    //   console.log("2", data.results[0].name.first)
      const results = data.results;
      const profiles = profileIterator(results);
        

// Call first profile
nextProfile();

// Next Event
document.getElementById("next").addEventListener("click", nextProfile);

// Next Profile Display
function nextProfile() {
    const currentProfile = profiles.next().value;

    if(currentProfile !== undefined) {
        document.getElementById("profileDisplay").innerHTML = 
            `<ul class="list-group">
                <li class="list-group-item">Name: ${results[0].name.first}</li>
                <li class="list-group-item">Age: ${results[0].dob.age}</li>
                <li class="list-group-item">City: ${results[0].location.city}</li>
                <li class="list-group-item">State: ${results[0].location.state}</li>
            </ul>`
        ;

        document.getElementById("imageDisplay").innerHTML = 
        `<img src="${results[0].picture.large}">`;
    } else {
        // no more profiles
        window.location.reload();
    }
}

// Profile Iterator
function profileIterator(profiles) {
    let nextIndex = 0;

    return {
        next: function() {
            return nextIndex < profiles.length ? 
            { value: profiles[nextIndex++], done: false } :
            { done: true }
        }
    };
}
}
});