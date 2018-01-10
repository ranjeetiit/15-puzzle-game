var Utils = (function(){

	function _createNumbers(len){
		var numbers = Array(len).fill(0).map(function(ele ,idx){
			return idx + 1;
		}).sort(function(){
			return 0.5 - Math.random();
		});
		return numbers;
	}


	function _getRandomNumBetween (min , max){
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	return{
		createNumberArray : _createNumbers,
		getRandomNumBetween : _getRandomNumBetween
	}

})()