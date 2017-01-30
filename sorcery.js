$( function() {
	var buttons = $(".section button");
	var status = $("#status");
	var sections = $(".section");
	var hits = $("action").attr("name");

	var life = 0;
	var lifeFull = 5;
	var potion = 0;
	var maxPotion = 3;

	startGame();
	$(".noObject").hide();
	$(".life span").html(getLife());
	$(".zombie span").html(getPotion());


	buttons.click( function() {
		gotoSection("#"+$(this).attr("go"));
		if($(this).attr("go")=="hitDoor" || $(this).attr("go")=="hitWall"){
			loseOneLife();
		}	
	});
	
	$("#exit button, #death button").click(function(){
		startGame();
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
		life --;
		$(".life span").html(getLife());
		setLife(life);
		return getLife();
	}

	function gameOver(){
		gotoSection("#death");
	}

	function useItem(){
		if(potion<1){
			potion=0;
			empty();
		}
		if(potion>0){
			potion --;
			life ++;
			zombieState.remove();
			return potion;
		}

	}

	function empty(){
		$("noObject").show().delay(5000).fadeOut();
	}
	
	function startGame(){
		setLife(lifeFull);
		setPotion(maxPotion);
		$(".life span").html(life);
		$(".zombie span").html(potion);
		$(sections).hide();
		$("#intro").show();
	}

	function endGame() {
		
	}
});