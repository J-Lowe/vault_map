var vertical = 0;
var horizontal = 0;

var vaultRadius = 6;

var startV = vaultRadius;
var startH = vaultRadius;

var row = vaultRadius;
var col = vaultRadius;

var waypoints = [];

const directions = {NORTH: "N", SOUTH: "S", EAST: "E", WEST: "W"};

var hasMoved = false;

function drawMap(rad) {
	startH = startV = row = col = vaultRadius = rad;
	document.getElementById("size-buttons").setAttribute("hidden", "true");
	size = vaultRadius * 2 + 1;
	for(i = 0; i < size; i++) {
		document.getElementById("map-table").innerHTML += "<tr id='row" + i + "'></tr>";
		for(j = 0; j < size; j++) {
			document.getElementById("row" + i).innerHTML += "<td id='cell-" + i + "-" + j + "'" + ((i == startV && j == startH) ? "style='background-color: yellow'" : "") +">" + ((i == startV && j == startH) ? "P*" : "") +"</td>";
		}
	}
};

function move(direction) {
	var curLoc = document.getElementById("cell-" + row + "-" + col);
	var updateLoc = false;
	switch(direction) {
		case directions.NORTH:
			if (row != 0) {
				curLoc.style.backgroundColor = "grey";
				curLoc.innerText = curLoc.innerText.slice(0, -1);
				vertical++;
				row--;
				if (!hasMoved) {
					curLoc.style.borderLeft = "3px solid";
					curLoc.style.borderRight = "3px solid";
					curLoc.style.borderBottom = "3px solid";
				}
				updateLoc = true;
			}
			break;
		case directions.SOUTH:
			if (row != vaultRadius * 2) {
				curLoc.style.backgroundColor = "grey";
				curLoc.innerText = curLoc.innerText.slice(0, -1);
				vertical--;
				row++;
				if (!hasMoved) {
					curLoc.style.borderLeft = "3px solid";
					curLoc.style.borderRight = "3px solid";
					curLoc.style.borderTop = "3px solid";
				}
				updateLoc = true;
			}
			break;
		case directions.EAST:
			if (col != vaultRadius * 2) {
				curLoc.style.backgroundColor = "grey";
				curLoc.innerText = curLoc.innerText.slice(0, -1);
				horizontal++;
				col++;
				if (!hasMoved) {
					curLoc.style.borderLeft = "3px solid";
					curLoc.style.borderTop = "3px solid";
					curLoc.style.borderBottom = "3px solid";
				}
				updateLoc = true;
			}
			break;
		case directions.WEST:
			if (col != 0) {
				curLoc.style.backgroundColor = "grey";
				curLoc.innerText = curLoc.innerText.slice(0, -1);
				horizontal--;
				col--;
				if (!hasMoved) {
					curLoc.style.borderTop = "3px solid";
					curLoc.style.borderRight = "3px solid";
					curLoc.style.borderBottom = "3px solid";
				}
				updateLoc = true;
			}
			break;
		default:
			break;
	}
	hasMoved = true;
	if (updateLoc) {
		updateLocation();
	}
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