var app = new Vue({
	el: "#app",
	data: {
		members: [],
		parties: [{
			name: "Democrats",
		}, {
			name: "Republicans"
		}, {
			name: "Independents"
		}],
		leastLoyal: [],
		mostLoyal: [],
		leastEngaged: [],
		mostEngaged: [],
		selectedParties: [],
		selectedState: "",
		accordionMessage: "Read more"
	},
	created() {
		if (!location.pathname.includes("index")) {
			this.getData();
		}
	},
	computed: {
		orderedStates() {
			var states = [];
			this.members.forEach(member => {
				if (!states.includes(member.state)) {
					states.push(member.state);
				}
			});
			return states.sort();
		},
		filteredMembers() {
			return this.members.filter(member => {
				var filterParty = this.selectedParties.includes(member.party) || this.selectedParties.length === 0;
				var filterState = this.selectedState === member.state || this.selectedState === "";
				return filterParty && filterState;
			});
		},
	},
	methods: {
		getData() {
			if (location.pathname.includes("senate")) {
				var url = " https://api.propublica.org/congress/v1/113/senate/members.json"
			} else if (location.pathname.includes("house")) {
				var url = " https://api.propublica.org/congress/v1/113/house/members.json"
			};
			fetch(url, {
					headers: {
						"X-API-Key": "jmVgidrA236zStXzcxshkOG8NskSEWXqCjw2TOlN"
					}
				})
				.then(dataFromPP => dataFromPP.json())
				.then(ppObject => {
					this.members = ppObject.results[0].members;
					this.getStatistics();
				})
				.catch(error => console.log(error))
		},
		getPartyList(party) {
			return this.members.filter(member => member.party === party);
		},
		getAvgVotesWithParty(party) {
			var partyList = this.getPartyList(party);
			var total = 0;
			partyList.forEach(member =>
				total = total + member.votes_with_party_pct
			);
			return Math.round(total / partyList.length * 100) / 100;
		},
		getTenPercent(parameterToCheck, highOrLow) {
			var membersArr2 = this.members.slice(0);
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
				memberPercentage = finalMembersArr.length / this.members.length;
			}
			return finalMembersArr;
		},
		getStatistics() {
			this.parties[0].numberOfReps = this.getPartyList("D").length;
			this.parties[1].numberOfReps = this.getPartyList("R").length;
			this.parties[2].numberOfReps = this.getPartyList("I").length;
			this.parties[0].avgVoteswParty = this.getAvgVotesWithParty("D");
			this.parties[1].avgVoteswParty = this.getAvgVotesWithParty("R");
			this.parties[2].avgVoteswParty = this.getAvgVotesWithParty("I");
			this.leastLoyal = this.getTenPercent("votes_with_party_pct", "low");
			this.mostLoyal = this.getTenPercent("votes_with_party_pct", "high");
			this.leastEngaged = this.getTenPercent("missed_votes_pct", "high");
			this.mostEngaged = this.getTenPercent("missed_votes_pct", "low");
		},
		totalReps() {
			return this.parties.reduce((total, party) => {
				return total + party.numberOfReps;
			}, 0);
		},
		totalAvgVotes() {
			var partiesWithMembers = this.parties.filter(party =>
				party.numberOfReps > 0);
			return Math.round(partiesWithMembers.reduce((total, x) => {
				return total + x.avgVoteswParty;
			}, 0) / partiesWithMembers.length * 100) / 100;
		},
		changeAccordionText() {
			if (this.accordionMessage === "Read more") {
				this.accordionMessage = "Read less";
			} else {
				this.accordionMessage = "Read more";
			}
		}
	}
})