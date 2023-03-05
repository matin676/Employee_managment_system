<?php
include('nav3.php');
require_once('process/dbh.php');
//$sql = "SELECT * from `employee_leave`";
$sql = "Select employee.id, employee.firstName, employee.lastName, employee_leave.start, employee_leave.end, employee_leave.reason, employee_leave.leave, employee_leave.status, employee_leave.token From employee, employee_leave Where employee.id = employee_leave.id order by employee_leave.token";
//echo "$sql";
$result = mysqli_query($conn, $sql);
?>

<!DOCTYPE html>
<html lang="en">

<head>
	<meta charset="UTF-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>DDO Bharuch | Employee Leave | Admin Panel</title>
	<link href="https://fonts.googleapis.com/css?family=Lobster|Montserrat|Ubuntu" rel="stylesheet">
	<link rel="stylesheet" type="text/css" href="css/styleview.css">
	<script src="https://kit.fontawesome.com/794e5409cc.js" crossorigin="anonymous"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/typed.js/2.0.12/typed.min.js"></script>
	<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
</head>

<body>

	<h2>Employee Leave</h2>
	<div id="divimg">
		<table class="leave-table">
			<tr>
				<th>Emp. ID</th>
				<th>Token</th>
				<th>Name</th>
				<th>Start Date</th>
				<th>End Date</th>
				<th>Total Days</th>
				<th>Reason</th>
				<th>Leave</th>
				<th>Status</th>
				<th>Options</th>
			</tr>
			<?php
			while ($employee = mysqli_fetch_assoc($result)) {
				$date1 = new DateTime($employee['start']);
				$date2 = new DateTime($employee['end']);
				$interval = $date1->diff($date2);
				$interval = $date1->diff($date2);
				//echo "difference " . $interval->days . " days ";
				echo "<tr>";
				echo "<td>" . $employee['id'] . "</td>";
				echo "<td>" . $employee['token'] . "</td>";
				echo "<td>" . $employee['firstName'] . " " . $employee['lastName'] . "</td>";
				echo "<td>" . $employee['start'] . "</td>";
				echo "<td>" . $employee['end'] . "</td>";
				echo "<td>" . $interval->days . "</td>";
				echo "<td>" . $employee['reason'] . "</td>";
				echo "<td>" . $employee['leave'] . "</td>";
				echo "<td>" . $employee['status'] . "</td>";
				echo "<td><a href=\"approve.php?id=$employee[id]&token=$employee[token]\"  onClick=\"return confirm('Are you sure you want to Approve the request?')\">Approve</a> | <a href=\"cancel.php?id=$employee[id]&token=$employee[token]\" onClick=\"return confirm('Are you sure you want to Canel the request?')\">Cancel</a></td>";
			}
			?>
		</table>

	</div>

</body>

</html>