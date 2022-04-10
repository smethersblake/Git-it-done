var getUserRepos = function(user) {
    // format the github api url
    var apiUrl = "https://api.github.com/users/" + user + "/reps"

    // make a request to the url
    fetch(apiUrl).then(function(resopnse) {
        resopnse.json().then(function(data) {
            console.log(data)
        })
    })
}


// var getUserRepos = function() {
// fetch("https://api.github.com/users/octocat/repos").then(function(resopnse) {
//     resopnse.json().then(function(data) {
//         console.log(data)
//     })
//     // console.log(resopnse)

// })
// console.log("outside")
// }
getUserRepos();