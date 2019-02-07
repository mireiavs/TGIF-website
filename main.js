//document.getElementById("senate-data").innerHTML = JSON.stringify(data,null,2);
//


//for (var i = 0; i < membersArr.length; i++) {
//	document.getElementById("table-data").innerHTML += "<tr><td>" + "<a href=" + membersArr[i].url + " target=\"_blank\">" + membersArr[i].first_name + " " + (membersArr[i].middle_name || "") + " " + membersArr[i].last_name + "</a></td><td>" + membersArr[i].party + "</td><td>" + membersArr[i].state + "</td><td>" + membersArr[i].seniority + "</td><td>" + membersArr[i].votes_with_party_pct + "%</td></tr>";
//}

//var membersArr = data.results[0].members;

if (document.getElementById("table-data")) {
	var membersArr = data.results[0].members;
	createTable(membersArr);
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
if (document.getElementById("state-filter")) {
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
if (document.getElementById("readmore")) {
	document.getElementById("readmore").onclick =
		function () {
			if (document.getElementById("readmore").innerHTML === "Read more") {
				document.getElementById("readmore").innerHTML = "Read less";
			} else {
				document.getElementById("readmore").innerHTML = "Read more";
			}
		}
}

//FILTER FUNCTIONS
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


//STATISTICS-----------------------------------------

function getPartyList(party) {
	var membersArr = data.results[0].members;
	return membersArr.filter(function (member) {
		return member.party === party
	});
}

function getAvgVotesWithParty(party) {
	var partyList = getPartyList(party);
	var total = 0;
	partyList.forEach(function (member) {
		total = total + member.votes_with_party_pct;
	})
	return total / partyList.length;
}

//function getLowest(parameter) {
//	var membersArr2 = membersArr.slice(0);
//	var membersArrLen = membersArr2.length;
//	var lowestMembersArr = [];
//	var memberPercentage = 0;
//
//	while (memberPercentage <= 0.1) {
//		var lowestVotesPercentage = 100;
//		var lowestMember;
//		for (var i = 0; i < membersArr2.length; i++) {
//			if (membersArr2[i][parameter] < lowestVotesPercentage) {
//				lowestVotesPercentage = membersArr2[i][parameter];
//				lowestMember = membersArr2[i];
//			}
//		}
//		lowestMembersArr.push(lowestMember);
//		membersArr2.splice(membersArr2.indexOf(lowestMember), 1);
//		memberPercentage = lowestMembersArr.length / membersArrLen;
//	}
//	return lowestMembersArr;
//}

//function getLowest(percentageToCheck) {
//	var membersArr = data.results[0].members;
//	var membersArr2 = membersArr.slice(0);
//	var membersArrLen = membersArr2.length;
//	var lowestMembersArr = [];
//	var memberPercentage = 0;
//
//	while (memberPercentage < 0.1) {
//		var lowestVotesPercentage = 100;
//		var lowestMember;
//		membersArr2.forEach(member => {
//			if (member[percentageToCheck] < lowestVotesPercentage) {
//				lowestVotesPercentage = member[percentageToCheck];
//				lowestMember = member;
//			}
//		})
//		lowestMembersArr.push(lowestMember);
//		membersArr2.splice(membersArr2.indexOf(lowestMember), 1);
//
//		var timesPctAppears = membersArr2.filter((member) => (member[percentageToCheck] === lowestVotesPercentage)).length;
//
//		if (timesPctAppears > 0) {
//			membersArr2.forEach(member => {
//				if (member[percentageToCheck] === lowestVotesPercentage) {
//					lowestMember = member;
//					lowestMembersArr.push(lowestMember);
//					membersArr2.splice(membersArr2.indexOf(lowestMember), 1);
//				}
//			})
//		}
//		memberPercentage = lowestMembersArr.length / membersArrLen;
//	}
//	return lowestMembersArr;
//}


function getTenPercent(parameterToCheck, highOrLow) {
	var membersArr = data.results[0].members;
	var membersArr2 = membersArr.slice(0);
	var membersArrLen = membersArr2.length;
	var finalMembersArr = [];
	var memberPercentage = 0;

	while (memberPercentage < 0.1) {
		var memberToInclude;
		if (highOrLow === "low") {
			var controlVotesPercentage = 100;
			var memberToInclude;
			membersArr2.forEach(member => {
				if (member[parameterToCheck] < controlVotesPercentage) {
					controlVotesPercentage = member[parameterToCheck];
					memberToInclude = member;
				}
			})
		} else if (highOrLow === "high") {
			var controlVotesPercentage = 0;
			var memberToInclude;
			membersArr2.forEach(member => {
				if (member[parameterToCheck] > controlVotesPercentage) {
					controlVotesPercentage = member[parameterToCheck];
					memberToInclude = member;
				}
			})
		}
		finalMembersArr.push(memberToInclude);
		membersArr2.splice(membersArr2.indexOf(memberToInclude), 1);

		var timesPctAppears = membersArr2.filter((member) => (member[parameterToCheck] === controlVotesPercentage)).length;

		if (timesPctAppears > 0) {
			membersArr2.forEach(member => {
				if (member[parameterToCheck] === controlVotesPercentage) {
					memberToInclude = member;
					finalMembersArr.push(memberToInclude);
					membersArr2.splice(membersArr2.indexOf(memberToInclude), 1);
				}
			})
		}
		memberPercentage = finalMembersArr.length / membersArrLen;
	}
	return finalMembersArr;
}



//HIGHEST 10%

//function getHighest(percentageToCheck) {
//	var membersArr = data.results[0].members;
//	var membersArr2 = membersArr.slice(0)
//	var membersArrLen = membersArr2.length;
//	var highestMembersArr = [];
//	var memberPercentage = 0;
//
//	while (memberPercentage < 0.1) {
//		var highestVotesPercentage = 0;
//		var highestMember;
//
//		membersArr2.forEach(member => {
//			if (member[percentageToCheck] > highestVotesPercentage) {
//				highestVotesPercentage = member[percentageToCheck];
//				highestMember = member;
//			}
//		})
//		highestMembersArr.push(highestMember);
//		membersArr2.splice(membersArr2.indexOf(highestMember), 1);
//
//		var timesPctAppears = membersArr2.filter((member) => (member[percentageToCheck] === highestVotesPercentage)).length;
//
//		if (timesPctAppears > 0) {
//			membersArr2.forEach(member => {
//				if (member[percentageToCheck] === highestVotesPercentage) {
//					highestMember = member;
//					highestMembersArr.push(highestMember);
//					membersArr2.splice(membersArr2.indexOf(highestMember), 1);
//				}
//			})
//		}
//		memberPercentage = highestMembersArr.length / membersArrLen;
//	}
//	return highestMembersArr;
//}

var statistics = {
	"Parties": [{
		"Name": "Democrats",
		"Number of Reps": getPartyList("D").length,
		"Avg Votes with Party": getAvgVotesWithParty("D")
	}, {
		"Name": "Republicans",
		"Number of Reps": getPartyList("R").length,
		"Avg Votes with Party": getAvgVotesWithParty("R")
	}, {
		"Name": "Independents",
		"Number of Reps": getPartyList("I").length,
		"Avg Votes with Party": getAvgVotesWithParty("I")
	}],
	"Least Loyal": getTenPercent("votes_with_party_pct", "low"),
	"Most Loyal": getTenPercent("votes_with_party_pct", "high"),
	"Least Engaged": getTenPercent("missed_votes_pct", "high"),
	"Most Engaged": getTenPercent("missed_votes_pct", "low")
};

function createAtAGlanceTable() {
	var partiesArr = statistics["Parties"];
	partiesArr.forEach(party => {
		var newRow = document.createElement("tr");
		newRow.insertCell().innerHTML = party["Name"];
		newRow.insertCell().innerHTML = party["Number of Reps"];
		newRow.insertCell().innerHTML = (Math.round(party["Avg Votes with Party"] * 100) / 100 || "0") + "%";
		document.getElementById("at-a-glance").append(newRow);
	})

	var totalReps = 0;
	partiesArr.forEach(function (party) {
		totalReps = totalReps + party["Number of Reps"];
	})
	
	var totalPcts = 0;
	partiesArr.forEach(function (party) {
		if (party["Number of Reps"] === 0) {
			partiesArr.splice(partiesArr.indexOf(party));
		}
		totalPcts = totalPcts + (party["Avg Votes with Party"] || 0);
	})
	
	var totalAvg = Math.round(totalPcts / partiesArr.length *100) / 100;
	
	var totalRow = document.createElement("tr");
	totalRow.insertCell().innerHTML = "Total";
	totalRow.insertCell().innerHTML = totalReps;
	totalRow.insertCell().innerHTML = totalAvg + "%";
	document.getElementById("at-a-glance").append(totalRow);
}



function createAttLoyTables(tbodyId, thingToShow) {
	var membersToShow = statistics[thingToShow];
	for (var i = 0; i < membersToShow.length; i++) {
		var row = document.createElement("tr");
		var link = document.createElement("a");
		link.setAttribute("href", membersToShow[i].url);
		link.setAttribute("target", "_blank");
		link.append(`${membersToShow[i].first_name} ${(membersToShow[i].middle_name || "")} ${membersToShow[i].last_name}`);
		row.insertCell().append(link);

		if (tbodyId === "least-engaged" || tbodyId === "most-engaged") {
			row.insertCell().innerHTML = membersToShow[i].missed_votes;
			row.insertCell().innerHTML = membersToShow[i].missed_votes_pct + "%";
		}

		if (tbodyId === "least-loyal" || tbodyId === "most-loyal") {
			var votesWithParty = Math.round(membersToShow[i].total_votes * membersToShow[i].votes_with_party_pct / 100);
			row.insertCell().innerHTML = votesWithParty;
			row.insertCell().innerHTML = membersToShow[i].votes_with_party_pct + "%";
		}
		document.getElementById(tbodyId).append(row);
	}
}


if (document.getElementById("at-a-glance")) {
	createAtAGlanceTable();
	if (document.getElementById("least-engaged")) {
		createAttLoyTables("least-engaged", "Least Engaged");
		createAttLoyTables("most-engaged", "Most Engaged");
	}
	if (document.getElementById("least-loyal")) {
		createAttLoyTables("least-loyal", "Least Loyal");
		createAttLoyTables("most-loyal", "Most Loyal");
	}
}

//console.log(JSON.stringify(statistics, null, 2))


//	for (var i = 0; i < membersArr.length; i++) {
//		if (membersArr[i].missed_votes_pct === 0.42) {
//			console.log(membersArr[i].first_name + " " + membersArr[i].last_name);
//		}
//	}
