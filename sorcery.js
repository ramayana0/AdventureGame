$( function() {
	var buttons = $(".section button");
	var status = $("#status");
	var sections = $(".section");

	var life = 0;
	var lifeFull = 5;
	var potion = 0;
	var maxPotion = 3;

	startGame();
	$(".noObject").hide();
	$(".zombie").hide();
	$(".life span").html(getLife());
	$(".zombie span").html(getPotion());



	buttons.click( function() {
		gotoSection("#"+$(this).attr("go"));
	});
	
	
	function gotoSection(key) {
		$(sections).hide();
		$(key).show();
	}
	
	function getLife() {
		return life;
	}
	
	function setLife(v) {

		life=v;

		if(life>lifeFull){
			life = lifeFull;
		}
		if(life<1){
			life=0;
			gameOver();
		}

	}

	function getPotion(){
		return potion;
	}

	function setPotion(v){
		potion = v;

		if(potion>maxPotion){
			potion = maxPotion;
		}
		if(potion<1){
			potion=0;
			empty();
		}
	}
	
	function loseOneLife() {
		life--;
		return life;
	}

	function use(){
		potion --;
		return potion;
	}

	function empty(){
		$("noObject").show().delay(5000).fadeOut();
	}
	
	function startGame() {
		$(sections).hide();
		$("#intro").show();
		life=lifeFull;
		potion=maxPotion;

	}

	function gameOver(){
		$gotoSection("death");
	}
	
	function endGame() {
		//...
	}
});