Vue.component("member-component", {
	props: ["singlemember"],
	template: `<tr>
						<td><a :href="singlemember.url" target="_blank">{{ singlemember.first_name }} {{ singlemember.middle_name }} {{ singlemember.last_name }}</a></td>
						<td>{{ singlemember.party }}</td>
						<td>{{ singlemember.state }}</td>
						<td>{{ singlemember.seniority }}</td>
						<td>{{ singlemember.votes_with_party_pct }}%</td>
						</tr>`,
})