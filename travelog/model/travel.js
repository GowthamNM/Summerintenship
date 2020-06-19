<html>
<head>
<title>travelog</title>
<link rel="stylesheet" type="text/css" href="travel_css.css">
<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css">
</head>
<body>
<div class="action_win">
	<div class="a">
		<img src="travelog-logo-white.svg">
		<div class="ab">
		<a href="/logout">logout</a>
		</div>
	</div>
	
	<div class="b">
		<table>
			<td>
				<img src="home-illustration.svg">
			</td>
			<td>
				<h4>
					Sometimes, what matters is to pack your bags and get on a car and travel Non-STOP
				</h4>
				<h2>Explore! The World is Not Enough</h2>
			</td>
		</table>
	</div>
	<div class="c">
		<table>
			<td>
				<h4>
					MY VISITED PLACE
				</h4>
			</td>
			<td>
				<h4 class="ab">
					MY BUCKET LIST
				</h4>
			</td>
		</table>
	</div>
	<div class="d">
			<h2>My Visited Places
			<form action="/addplaces" method="POST">
			<input type="submit" value="ADD PLACE" name="new_insert"></h2>
			</form>
			<div class="row">
				
				<% campgrounds.forEach(function(campground){ %>
				<div class="col-md-3 col-sm-6">
					<div class="thumbnail">
						<img src="<%= campground.image %>">
					</div>
					<h4><%= campground.name %></h4>

				</div>
				<% }); %>
			</div>

	</div>
</div>
</body>
</html>


<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css">
				<% campgrounds.forEach(function(campground){ %>
				<div class="col-md-3 col-sm-6">
					<div class="thumbnail">
						<img src="<%= campground.image %>">
					</div>
					<h4><%= campground.name %></h4>

				</div>
				<% }); %>
