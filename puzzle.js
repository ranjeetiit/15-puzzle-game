var Puzzle = (function(){

	function drawBoard (){
		document.getElementById("container").innerHTML = "";
		var puzzleContainer = document.createElement('div')
			puzzleContainer.id= "puzzle";
			puzzleContainer.classList.add("puzzleContainer");
		document.getElementById("container").appendChild(puzzleContainer);

		puzzleContainer.addEventListener("click" , function(e){
			var $target =  e.target;
			shiftCell($target);
		});

		var rand = Utils.getRandomNumBetween(0,15);
		var numbers = Utils.createNumberArray(15);
		numbers.splice(rand , 0 , "");
		//numbers.push("")
		drawGrid(numbers);
	}

	function createCell(id ,idx, value){
		var cell ;
			cell = document.createElement('div');
			if(!value){
				cell.classList.add("empty")
			}
			cell.classList.add("cell");
			cell.id = id;
			cell.setAttribute("idx" , idx+1);
			cell.setAttribute("value" , value)
			cell.innerHTML = value;
		return cell;
	}

	function shiftCell (cell){
		var emptyCell = getEmptyAdjacentCell(cell.id);
		if(emptyCell) {
			emptyCell.innerHTML = cell.innerHTML;
			emptyCell.classList.remove("empty")
			cell.innerHTML = "" ;
			cell.classList.add("empty");
		}
		checkOrder();
	}

	function checkOrder (){
		if(!getCell(3, 3).classList.contains("empty")){
			return;
		}

		var n = 1;
		// Goes through all cells and checks numbers
		for(var i = 0; i <= 3; i++){
			for(var j = 0; j <= 3; j++){
				if(n <= 15 && getCell(i, j).innerHTML != n.toString()){
					// Order is not correct
					return;
				}
				n++;
			}
		}
		if(confirm('Congrats, You did it! \nScramble the puzzle?')){
			Puzzle.start();
		}
	}

	function drawGrid(numbers){
		var puzzleContainer = document.getElementById("puzzle");
		var documentFragment = document.createDocumentFragment();
		var num = 0;
		var id ;
		for(var i=0;i<4;i++){
			for(j =0; j < 4 ; j++){
				id = "cell_"+ i + "_" + j;
				documentFragment.appendChild(createCell( id  , num,  numbers[num]));
				num ++;	
			}
		}
		puzzleContainer.appendChild(documentFragment);
	}

	function getCell(row, col){
		return document.getElementById('cell_'+row+'_'+col);
	}

	function getAdjacentCells(id){
		var adjacent = [];
		var arr = id.split("_"),
			row = parseInt(arr[1]);
			col = parseInt(arr[2]);
		if(row < 3){adjacent.push(getCell(row+1, col));}			
		if(row > 0){adjacent.push(getCell(row-1, col));}
		if(col < 3){adjacent.push(getCell(row, col+1));}
		if(col > 0){adjacent.push(getCell(row, col-1));}
		return adjacent;
	}

	function getEmptyAdjacentCell(id){
		var adjacent = getAdjacentCells(id);
		for(var i = 0; i < adjacent.length; i++){
			if(adjacent[i] && adjacent[i].innerHTML == ''){
				return adjacent[i];
			}
		}
		return false;
	}

	return {
		start : drawBoard
	}
})()


Puzzle.start();