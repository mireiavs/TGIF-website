//document.getElementById("senate-data").innerHTML = JSON.stringify(data,null,2);
//


//for (var i = 0; i < membersArr.length; i++) {
//	document.getElementById("table-data").innerHTML += "<tr><td>" + "<a href=" + membersArr[i].url + " target=\"_blank\">" + membersArr[i].first_name + " " + (membersArr[i].middle_name || "") + " " + membersArr[i].last_name + "</a></td><td>" + membersArr[i].party + "</td><td>" + membersArr[i].state + "</td><td>" + membersArr[i].seniority + "</td><td>" + membersArr[i].votes_with_party_pct + "%</td></tr>";
//}

var membersArr = data.results[0].members;

if (document.getElementById("table-data") !== null) {
	window.onload = createTable(membersArr);
}

function createTable(array) {
	for (var i = 0; i < array.length; i++) {
		var newRow = document.createElement("tr");
		var link = document.createElement("a");
		var full_name = array[i].first_name + " " + (array[i].middle_name || "") + " " + array[i].last_name;
		link.setAttribute("href", array[i].url);
		link.setAttribute("target", "_blank");
		link.append(full_name);
		newRow.insertCell().append(link);
		newRow.insertCell().innerHTML = array[i].party;
		newRow.insertCell().innerHTML = array[i].state;
		newRow.insertCell().innerHTML = array[i].seniority;
		newRow.insertCell().innerHTML = array[i].votes_with_party_pct + "%";
		newRow.setAttribute("class", "table-row");
		document.getElementById("table-data").append(newRow);
	}
}


//CREATE DROPDOWN MENU (STATES ORDERED ALPHABETICALLY)
if (document.getElementById("state-filter") !== null) {
	document.getElementById("state-filter").onchange = updateUI;
	var states = [];
	for (var i = 0; i < membersArr.length; i++) {
		if (states.indexOf(membersArr[i].state) === -1) {
			states.push(membersArr[i].state);
		}
	}
	var statesOrdered = states.sort();
	for (var j = 0; j < statesOrdered.length; j++) {
		var option = document.createElement("option");
		option.setAttribute("value", statesOrdered[j]);
		option.append(statesOrdered[j]);
		document.getElementById("state-filter").append(option);
	}
}

var checkboxes = Array.from(document.getElementsByTagName("input"));
for (k = 0; k < checkboxes.length; k++) {
	checkboxes[k].onclick = updateUI;
}


//READ MORE/READ LESS
if (document.getElementById("readmore") !== null) {
	document.getElementById("readmore").onclick =
		function () {
			if (document.getElementById("readmore").innerHTML === "Read more") {
				document.getElementById("readmore").innerHTML = "Read less";
			} else {
				document.getElementById("readmore").innerHTML = "Read more";
			}
		}
}

//function filterByParty() {
//	var selectedParties = Array.from(document.querySelectorAll("input[name=party]:checked")).map(selparty => selparty.value);
//
//	var allRows = Array.from(document.getElementsByClassName("table-row"));
//
//	for (var i = 0; i < membersArr.length; i++) {
//		if (selectedParties.length === 0) {
//			allRows[i].style.display = "table-row";
//		} else {
//			allRows[i].style.display = "none";
//			for (var j = 0; j < selectedParties.length; j++) {
//				if (membersArr[i].party === selectedParties[j]) {
//					allRows[i].style.display = "table-row";
//				}
//			}
//		}
//	}
//}

//function filterByState() {
//	var selectedState = $("#state-filter").val();
//
//	var allRows = Array.from(document.getElementsByClassName("table-row"));
//
//	for (var i = 0; i < membersArr.length; i++) {
//		allRows[i].style.display = "table-row";
//		if (selectedState !== "") {
//			if (membersArr[i].state !== selectedState) {
//				allRows[i].style.display = "none";
//			}
//		}
//	}
//}



//FILTER FUNCTIONS
function updateUI2() {
	var selectedParties = Array.from(document.querySelectorAll("input[name=party]:checked")).map(selparty => selparty.value);

	var selectedState = document.querySelector("#state-filter").value;

	var allRows = Array.from(document.getElementsByClassName("table-row"));

	for (var i = 0; i < membersArr.length; i++) {
		if (selectedParties.length === 0) {
			allRows[i].style.display = "table-row";
		} else {
			allRows[i].style.display = "none";
			for (var j = 0; j < selectedParties.length; j++) {
				if (membersArr[i].party === selectedParties[j]) {
					allRows[i].style.display = "table-row";
				}
			}
		}
		if (selectedState !== "") {
			if (membersArr[i].state !== selectedState) {
				allRows[i].style.display = "none";
			}
		}
	}
}


function updateUI3() {
	var selectedParties = Array.from(document.querySelectorAll("input[name=party]:checked")).map(selparty => selparty.value);

	var selectedState = document.querySelector("#state-filter").value;

	var membersFiltered = [];

	document.getElementById("table-data").innerHTML = "";

	if (selectedParties.length === 0) {
		if (selectedState === "") {
			return createTable(membersArr);
		} else {
			for (var i = 0; i < membersArr.length; i++) {
				if (membersArr[i].state === selectedState) {
					membersFiltered.push(membersArr[i]);
				}
			}
		}
	} else {
		for (var i = 0; i < membersArr.length; i++) {
			for (var j = 0; j < selectedParties.length; j++) {
				if (membersArr[i].party === selectedParties[j] && (membersArr[i].state === selectedState || selectedState === "")) {
					membersFiltered.push(membersArr[i]);
				}
			}
		}
	}
	return createTable(membersFiltered);
}

//use forEach instead of for loops
function updateUI() {
	var selectedParties = Array.from(document.querySelectorAll("input[name=party]:checked")).map(selparty => selparty.value);

	var selectedState = document.querySelector("#state-filter").value;

	var membersFiltered = [];

	document.getElementById("table-data").innerHTML = "";

	if (selectedParties.length === 0) {
		if (selectedState === "") {
			return createTable(membersArr);
		} else {
			membersArr.forEach(function (member) {
				if (member.state === selectedState) {
					membersFiltered.push(member);
				}
			})
		}
	} else {
		membersArr.forEach(function (member) {
			selectedParties.forEach(function (party) {
				if (member.party === party && (member.state === selectedState || selectedState === "")) {
					membersFiltered.push(member);
				}
			})
		})
	}
	return createTable(membersFiltered);
}


//STATISTICS

function getPartyList(party) {
	var partyList = [];
	membersArr.forEach(function (member) {
		if (member.party === party) {
			partyList.push(member);
		}
	})
	return partyList;
}

function getAvgVotesWithParty(party) {
	var partyList = getPartyList(party);
	var total = 0;
	partyList.forEach(function (member) {
		total = total + member.votes_with_party_pct;
	})
	return total / partyList.length;
}

function getLowest(parameter) {
	var membersArr2 = membersArr.slice(0)
	var membersArrLen = membersArr2.length;
	var lowestMembersArr = [];
	var memberPercentage = 0;

	while (memberPercentage < 0.1) {
		var lowestPercentage = 100;
		var lowestMember;
		for (var i = 0; i < membersArr2.length; i++) {
			if (membersArr2[i][parameter] < lowestPercentage) {
				lowestPercentage = membersArr2[i][parameter];
				lowestMember = membersArr2[i];
			}
		}
		lowestMembersArr.push(lowestMember);
		membersArr2.splice(membersArr2.indexOf(lowestMember), 1);
		memberPercentage = lowestMembersArr.length / membersArrLen;
	}
	return lowestMembersArr;
}

function getHighest(parameter) {
	var membersArr2 = membersArr.slice(0)
	var membersArrLen = membersArr2.length;
	var highestMembersArr = [];
	var memberPercentage = 0;

	while (memberPercentage < 0.1) {
		var highestPercentage = 0;
		var highestMember;
		for (var i = 0; i < membersArr2.length; i++) {
			if (membersArr2[i][parameter] > highestPercentage) {
				highestPercentage = membersArr2[i][parameter];
				highestMember = membersArr2[i];
			}
		}
		highestMembersArr.push(highestMember);
		membersArr2.splice(membersArr2.indexOf(highestMember), 1);
		memberPercentage = highestMembersArr.length / membersArrLen;
	}
	return highestMembersArr;
}

var lowestLoyalty = getLowest("votes_with_party_pct");
var highestLoyalty = getHighest("votes_with_party_pct");
var lowestMissedVotes = getLowest("missed_votes_pct");
var highestMissedVotes = getHighest("missed_votes_pct");

var statistics = {
	"Number of Democrats": getPartyList("D").length,
	"Number of Republicans": getPartyList("R").length,
	"Number of Independents": getPartyList("I").length,
	"Democrats Average Votes with Party": getAvgVotesWithParty("D"),
	"Republicans Average Votes with Party": getAvgVotesWithParty("R"),
	"Independents Average Votes with Party": getAvgVotesWithParty("I"),
	"Least Loyal": lowestLoyalty,
	"Most Loyal": highestLoyalty,
	"Least Engaged": highestMissedVotes,
	"Most Engaged": lowestMissedVotes,
};


