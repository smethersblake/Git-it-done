var issueContainerEl = document.querySelector("#issues-container");
var getRepoIssues = function(repo) {
    var apiUrl = "https://api.github.com/repos/" + repo + "/issues?direction=asc";
    fetch(apiUrl).then(function(resopnse) {
        // request was succeful
        if (resopnse.ok) {
            resopnse.json().then(function(data) {
                displayIssues(data)
            })
        }
        else {
            alert("There was aproblem with your request!")
        }
    })
    console.log(repo)
}
var displayIssues = function(issues) {
    for (let i = 0; i < issues.length; i++) {
        // create a link element to take users to the github
        var issueEl = document.createElement("a")
        issueEl.classList = "list-item flex-row justify-space-between align-center"
        issueEl.setAttribute("herf", issues[i].html_url)
        issueEl.setAttribute("target", "_blank")
        // create span to hold issue title
        var titleEl = document.createElement("span")
        titleEl.textContent = issues[i].title;
        // append to container
        issueEl.appendChild(titleEl)
        // create a type element
        var typeEl = document.createElement("span")
        // cheack if issue is an actual issue or a pull request
        if (issues[i].pull_request) {
            typeEl.textContent = "(Pull request)"
        }
        else {
            typeEl.textContent = "(Issue)"
        }
        // appened to container
        issueEl.appendChild(typeEl)
        
        issueContainerEl.appendChild(issueEl);
    }
}
getRepoIssues("facebook/react")