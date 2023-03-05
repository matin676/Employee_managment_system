<?php
$id = (isset($_GET['id']) ? $_GET['id'] : '');
include('nav4.php');
require_once('process/dbh.php');
$sql1 = "SELECT * FROM `employee` where id = '$id'";
$result1 = mysqli_query($conn, $sql1);
if ($result1) {
	while ($res = mysqli_fetch_assoc($result1)) {
		$firstname = $res['firstName'];
		$lastname = $res['lastName'];
		$email = $res['email'];
		$pic = $res['pic'];
		$degree = $res['degree'];
		$department = $res['dept'];
	}
}

$sql = "SELECT id,  points FROM employee, rank WHERE rank.eid = '$id'";
// $sql = "SELECT `eid`, SUM(mark) AS upPoints FROM `project` GROUP BY eid";

$sql1 = "SELECT `pname`, `duedate` FROM `project` WHERE eid = $id and status = 'Due'";

$sql2 = "Select * From employee, employee_leave Where employee.id = $id and employee_leave.id = $id order by employee_leave.token";

$sql3 = "SELECT * FROM `salary` WHERE salary.id = $id";

//echo "$sql";
$result = mysqli_query($conn, $sql);
$result1 = mysqli_query($conn, $sql1);
$result2 = mysqli_query($conn, $sql2);
$result3 = mysqli_query($conn, $sql3);

if ($result) {
	while ($employee = mysqli_fetch_assoc($result)) {
		$points = $employee['points'];
	}
}

$result = mysqli_query($conn, "select count(1) FROM project WHERE eid = $id");
$row = mysqli_fetch_array($result);
$total = $row[0];

?>

<!DOCTYPE html>
<html lang="en">

<head>
	<meta charset="UTF-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>DDO Bharuch | Employee Panel</title>
	<link href="https://fonts.googleapis.com/css?family=Lobster|Montserrat|Ubuntu" rel="stylesheet">
	<link rel="stylesheet" type="text/css" href="css/main.css" media="all">
	<link rel="stylesheet" type="text/css" href="css/styleemplogin.css">
	<link href="vendor/mdi-font/css/material-design-iconic-font.min.css" rel="stylesheet" media="all">
	<link href="vendor/font-awesome-4.7/css/font-awesome.min.css" rel="stylesheet" media="all">
	<script src="https://kit.fontawesome.com/794e5409cc.js" crossorigin="anonymous"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/typed.js/2.0.12/typed.min.js"></script>
	<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
	<style>
		.minus{
			color: red;
		}
	</style>
</head>

<body>

	<div id="divimg">
		<div class="eloginwel-container">

			<h2 class="elogin-heading" style="margin: auto;"><?php echo $firstname; ?>'s Dashboard </h2>
			<div class="elogin-section">
				<div class="img-left">
					<div class="h-shape"></div>
					<img src="process/<?php echo $pic; ?>" alt="profile pic">
					<form class="eloginwel-form" method="post">
						<div class="row row-space">
							<div class="col-2">
								<div class="input-group">
									<p>First Name</p>
									<input class="input--style-1 elogin-input" type="text" name="firstName" value="<?php echo $firstname; ?>" readonly>
								</div>
							</div>
							<div class="col-2">
								<div class="input-group">
									<p>Last Name</p>
									<input class="input--style-1 elogin-input" type="text" name="lastName" value="<?php echo $lastname; ?>" readonly>
								</div>
							</div>
						</div>
						<div class="input-group">
							<p>Email</p>
							<input class="input--style-1 elogin-input" type="email" name="email" value="<?php echo $email; ?>" readonly>
						</div>
					</form>
				</div>
				<div class="details-right">
					<div class="details-item">
						<div class="abt-text">
							<p class="large-text"><?php echo $total; ?></p>
							<p class="small-text">Projects <br /> Completed</p>
						</div>
					</div>
					<div class="details-item">
						<div class="abt-text">
							<p class="large-text extra-large-text"><?php echo $department; ?></p>
							<p class="small-text">Work<br /> Department</p>
						</div>
					</div>
					<div class="details-item">
						<div class="abt-text">
							<p class="large-text"><?php echo $points; ?></p>
							<p class="small-text">Total <br /> Points</p>
						</div>
					</div>
					<div class="details-item">
						<div class="abt-text">
							<p class="large-text"><?php echo $degree; ?></p>
							<p class="small-text">Degree <br /> Associated</p>
						</div>
					</div>
				</div>
			</div>
			<h2 class="h2-style elogin-h2">Due Projects</h2>
			<table class="elogin-table" id="elogin-table2">
				<tr>
					<th align="center">Project Name</th>
					<th align="center">Due Date</th>
				</tr>
				<?php
				while ($employee1 = mysqli_fetch_assoc($result1)) {
					echo "<tr>";
					echo "<td>" . $employee1['pname'] . "</td>";
					echo "<td>" . $employee1['duedate'] . "</td>";
				}
				?>
			</table>
			<h2 class="h2-style elogin-h2">Salary Status</h2>
			<table class="elogin-table" id="elogin-table3">
				<tr>
					<th align="center">Base Salary</th>
					<th align="center">DA</th>
					<th align="center">HRA</th>
					<th align="center">Medical</th>
					<th align="center">Vehicle</th>
					<th align="center">TotalSalary</th>
					<th align="center">Professional Tax</th>
					<th align="center">Group Insurance</th>
					<th align="center">Income Tax</th>
					<th align="center">Provident Fund</th>
					<th align="center">Cut Salary</th>
					<th align="center">Net Salary</th>
				</tr>
				<?php
				while ($employee = mysqli_fetch_assoc($result3)) {
					echo "<tr>";
					echo "<td>" . $employee['base'] . "</td>";
					echo "<td>" . $employee['DA'] . "</td>";
					echo "<td>" . $employee['HRA'] . "</td>";
					echo "<td>" . $employee['Medical'] . "</td>";
					echo "<td>" . $employee['Vehicle'] . "</td>";
					echo "<td>" . $employee['total'] . "</td>";
					echo "<td class='minus'>" . $employee['ProfessionalTax'] . "</td>";
					echo "<td class='minus'>" . $employee['GroupInsurance'] . "</td>";
					echo "<td class='minus'>" . $employee['IncomeTax'] . "</td>";
					echo "<td class='minus'>" . $employee['ProvidentFund'] . "</td>";
					echo "<td class='minus'>" . $employee['CutSalary'] . "</td>";
					echo "<td>" . $employee['NetSalary'] . "</td>";
				}
				?>
			</table>
			<h2 class="h2-style elogin-h2">Leave Status</h2>
			<table class="elogin-table" id="elogin-table4">
				<tr>
					<th align="center">Start Date</th>
					<th align="center">End Date</th>
					<th align="center">Total Days</th>
					<th align="center">Reason</th>
					<th align="center">Leave</th>
					<th align="center">Status</th>
				</tr>
				<?php
				while ($employee = mysqli_fetch_assoc($result2)) {
					$date1 = new DateTime($employee['start']);
					$date2 = new DateTime($employee['end']);
					$interval = $date1->diff($date2);
					$interval = $date1->diff($date2);
					echo "<tr>";
					echo "<td>" . $employee['start'] . "</td>";
					echo "<td>" . $employee['end'] . "</td>";
					echo "<td>" . $interval->days . "</td>";
					echo "<td>" . $employee['reason'] . "</td>";
					echo "<td>" . $employee['leave'] . "</td>";
					echo "<td>" . $employee['status'] . "</td>";
				}
				?>
			</table>
			<br>
			<br>
			<br>
			<br>
		</div>
	</div>
</body>

</html>