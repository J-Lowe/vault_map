var vertical = 0;
var horizontal = 0;

var vaultRadius = 6;

var startV = vaultRadius;
var startH = vaultRadius;

var row = vaultRadius;
var col = vaultRadius;

var waypoints = [];

const directions = {NORTH: "N", SOUTH: "S", EAST: "E", WEST: "W"};

document.addEventListener("DOMContentLoaded", function() {
	size = vaultRadius * 2 + 1;
	for(i = 0; i < size; i++) {
		document.getElementById("map-table").innerHTML += "<tr id='row" + i + "'></tr>";
		for(j = 0; j < size; j++) {
			document.getElementById("row" + i).innerHTML += "<td id='cell-" + i + "-" + j + "'" + ((i == startV && j == startH) ? "style='background-color: yellow'" : "") +">" + ((i == startV && j == startH) ? "P*" : "") +"</td>";
		}
	}
  });

function move(direction) {
	var curLoc = document.getElementById("cell-" + row + "-" + col);
	curLoc.style.backgroundColor = "grey";
	curLoc.innerText = curLoc.innerText.slice(0, -1);
	switch(direction) {
		case directions.NORTH:
			vertical++;
			row--;
			break;
		case directions.SOUTH:
			vertical--;
			row++;
			break;
		case directions.EAST:
			horizontal++;
			col++;
			break;
		case directions.WEST:
			horizontal--;
			col--;
			break;
		default:
			break;
	}
	updateLocation();
}

function saveLocation(t) {
	waypoints.push({type: t, hor: horizontal, vert: vertical});
	var str = "";
	waypoints.forEach((elm) => {
		str += elm.type + " -- " + getLocationString(elm.vert, elm.hor) + "<br/>";
	});
	//document.getElementById("saved_locations").innerHTML = str;
	curLoc = document.getElementById("cell-" + row + "-" + col);
	curLoc.innerText = (t == "Obilisk" ? "O" : "L") + curLoc.innerText;
}

function getLocationString(v = vertical, h = horizontal) {
	var str = "";
	
	if (v >= 0) {
		str += v + " North";
	} else if (v < 0) {
		str += Math.abs(v) + " South";
	}
	
	str += " | ";
	
	if (h >= 0) {
		str += h + " East";
	} else if (h < 0) {
		str += Math.abs(h) + " West";
	}
	return str;
}

function updateLocation() {
	var curLoc = document.getElementById("cell-" + row + "-" + col);
	curLoc.style.backgroundColor = "yellow";
	curLoc.innerText += "*";
	document.getElementById("cur_location").innerText = getLocationString();
}