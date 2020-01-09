// your code here
function getRepositories() {
    let username = document.getElementById("username").value;
    let url = `https://api.github.com/users/${username}/repos`
    const req = new XMLHttpRequest();
	req.addEventListener('load', displayRepositories);
	req.open('GET', url);
	req.send();
}

function displayRepositories() {
    let repos = JSON.parse(this.responseText);
	const repoList = '<ul>' +
		repos.map(repo => {
			// debugger;
			return `
				<li><strong>${repo.name}</strong></li>
				<a href="${repo.html_url}" >${repo.html_url}</a><br>
				<a href="#" onclick="getCommits(this)" data-repository="${repo.name}" data-username="${repo.owner.login}" data-url="${repo.commits_url}">Get Commits</a><br>
				<a href="#" onclick="getBranches(this)" data-repository="${repo.name}" data-username="${repo.owner.login}" data-url="${repo.branches_url}">Get Branches</a><br>
			`
		})
		.join("") + '</ul>'

	document.getElementById('repositories').innerHTML = repoList;
} 

function getCommits(el) {
	// debugger
	const repository = el.dataset.repository;
	const username = el.dataset.username;
	const url = `https://api.github.com/repos/${username}/${repository}/commits`;
	// let url
	// if (el.dataset.url) { 
	// 	url = el.dataset.url.replace(/{.*}/,"");
	// } else {
	// 	url = `https://api.github.com/repos/${username}/${repository}/commits`;
	// }
	const req = new XMLHttpRequest();
	req.addEventListener('load', displayCommits);
	req.open('GET', url);
	req.send();
}

function displayCommits() {
	const commits = JSON.parse(this.responseText);
    console.log(commits)
	const commitsList = commits.map(commit => {
		return `
		${commit.commit.author.name}, 
		${commit.author.login}, 
		${commit.commit.message}<br>
		`
	})
	.join('');
	document.getElementById('details').innerHTML = commitsList;
}

function getBranches(el) {
	const repository = el.dataset.repository;
	const username = el.dataset.username;
	const url = `https://api.github.com/repos/${username}/${repository}/branches`;
	const req = new XMLHttpRequest();
	req.addEventListener('load', displayBranches);
	req.open('GET', url);
	req.send();

}

function displayBranches() {
	const branches = JSON.parse(this.responseText);
	console.log(branches);
	const branchesList = branches.map(branch => {
		return `
		${branch.name}<br>
		`
	})
	.join('');
	document.getElementById('details').innerHTML = branchesList;

}