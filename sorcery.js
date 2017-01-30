$( function() {
	var buttons = $(".section button");
	var status = $("#status");
	var sections = $(".section");
	var etatZombie = $("<span class='zombieState'>Zombie</span>");

	var life = 0;
	var lifeFull = 5;
	var potion = 0;
	var maxPotion = 3;

	startGame();
	$(".noObject").hide();
	$(".excededLifeFull").hide();
	$(".life span").html(getLife());
	$(".zombie span").html(getPotion());

	buttons.click( function() {
		if($(this).attr("go")!="usePotion"){
			gotoSection("#"+$(this).attr("go"));
		}
		if($(this).attr("go")=="hitDoor" || $(this).attr("go")=="hitWall"){
			loseOneLife();	
		}
		if($(this).attr("go")=="usePotion"){
			usePotion();
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

	function usePotion(){
		if(potion<1){
			potion=0;
			empty();
		}
		if(potion>0){
			potion --;
			life ++;
			setPotion(potion);
			if(life>lifeFull){
				excededLifeFull();
			}
			setLife(life);
			$(".life span").html(getLife());
			$(".zombie span").html(getPotion());
			$(etatZombie).remove();
			return getPotion();
		}

	}

	function excededLifeFull(){
		$(".excededLifeFull").show().delay(500).fadeOut();
	}

	function empty(){
		$(".noObject").show().delay(500).fadeOut();
	}
	
	function zombieState(){
		
		$(etatZombie).insertAfter(".zombie");
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