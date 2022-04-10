var issueContainerEl = document.querySelector("#issues-container");
var limmitWarningEl = document.querySelector("#limit-warning")
var getRepoIssues = function(repo) {
    var apiUrl = "https://api.github.com/repos/" + repo + "/issues?direction=asc";
    fetch(apiUrl).then(function(resopnse) {
        // request was succeful
        if (resopnse.ok) {
            resopnse.json().then(function(data) {
                displayIssues(data)
            })
        }
        // check if api has paginated issues
        if (resopnse.headers.get("Link")) {
            displayWarning(repo)
        }
        else {
            alert("There was aproblem with your request!")
        }
    })
    console.log(repo)
}
var displayIssues = function(issues) {
    if (issues.length === 0) {
        issueContainerEl.textContent = "This repo has no open issues!"
        return;
    }
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
var displayWarning = function(repo) {
    // add text to warning container
    limmitWarningEl.textContent = "To see more then 30 issues, visit "
    var linkEl = document.createElement("a")
    linkEl.textContent = "See More Issues on GitHub.com"
    linkEl.setAttribute("href", "https://github.com/" + repo + "/issuses")
    linkEl.setAttribute("target", "_blank")
    // append to warning container
    limmitWarningEl.appendChild(linkEl)
}
getRepoIssues("facebook/react")