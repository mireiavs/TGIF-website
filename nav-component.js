Vue.component("nav-component", {
	template: `<nav class="navbar navbar-expand-sm">
		<ul class="navbar-nav navigation">
			<li class="nav-item"><a href="index.html" class="nav-link">Home</a></li>
			<li class="nav-item dropdown">
				<a class="nav-link dropdown-toggle" data-toggle="dropdown" href="#">Congress 113</a>
				<ul class="dropdown-menu">
					<li><a href="#" class="dropdown-item">Senate</a></li>
					<li><a href="house-data.html" class="dropdown-item">House</a></li>
				</ul>
			</li>
			<li class="nav-item dropdown">
				<a class="nav-link dropdown-toggle" data-toggle="dropdown" href="#">Attendance</a>
				<ul class="dropdown-menu">
					<li><a href="senate-attendance.html" class="dropdown-item">Senate</a></li>
					<li><a href="house-attendance.html" class="dropdown-item">House</a></li>
				</ul>
			</li>
			<li class="nav-item dropdown">
				<a class="nav-link dropdown-toggle" data-toggle="dropdown" href="#">Party Loyalty</a>
				<ul class="dropdown-menu">
					<li><a href="senate-party-loyalty.html" class="dropdown-item">Senate</a></li>
					<li><a href="house-party-loyalty.html" class="dropdown-item">House</a></li>
				</ul>
			</li>
		</ul>
	</nav>`
})