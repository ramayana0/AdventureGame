$( function() {
	var buttons = $(".section button");
	var status = $("#status");
	var sections = $(".section");
	var etatBleeding=$("<span class='bleedingState'>Saignement : -1 vie par action</span>");

	var life = 0;
	var lifeFull = 3;
	var bandage = 0;
	var maxBandage = 2;
	var bleedingIsActive =false;
	
	startGame();
	$(".noObject").hide();
	$(".exceededLifeFull").hide();
	$(".life span").html(getLife());
	$(".zombie span").html(getBandage());

/* Il y a un travail de refactoring que je n'ai pas fait complètement
	surtout au niveau des appels des getters et des setters*/
	buttons.click( function() {
		if(bleedingIsActive && $(this).attr("go")!="useBandage"){
		 	bleedingLife();
			setLife(life);
		}
		if($(this).attr("go")!="useBandage"){
			gotoSection("#"+$(this).attr("go"));
			setLife(life);
		}
		if($(this).attr("go")=="hitWire" || $(this).attr("go")=="minotaurRoom" 
		|| $(this).attr("go")=="itsATrap" || $(this).attr("go")=="slideOnFloor"
		|| $(this).attr("go")=="hitBucket"){
			loseOneLife();
			var random=Math.floor((Math.random() * 10) + 1);
			if(random<=5 && getLife()>0){
				bleedingState();
				bleedingIsActive=true;
			}
		}
		if($(this).attr("go")=="bathroom"){
			bandage++;
			$(".bleeding span").html(getBandage());
		}
		if($(this).attr("go")=="useBandage"){
			useBandage();
		}
		if($(this).attr("go")=="death" || $(this).attr("go")=="suicide"){
			setLife(0);
			$(".life span").html(getLife());
		}
	});


	$("#exit button, #death button, #suicide button").click(function(){
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

	function getBandage(){
		return bandage;
	}

	function setBandage(v){
		bandage = v;

		if(bandage > maxBandage){
			bandage = maxBandage;
		}
		if(bandage<0){
			bandage=0;
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
		bleedingIsActive=false;
		$(etatBleeding).remove();
	}

	function useBandage(){
		if(bandage<1){
			bandage=0;
			empty();
		}
		if(bandage>0){
			bandage --;
			life ++;
			setBandage(bandage);
			if(life>lifeFull){
				exceededLifeFull();
			}
			setLife(life);
			$(".life span").html(getLife());
			$(".bleeding span").html(getBandage());
			bleedingIsActive =false;
			$(etatBleeding).remove();
			return getBandage();
		}

	}

	function bleedingLife(){
		life --;
		setLife(life);
		$(".life span").html(getLife());
	}

	function exceededLifeFull(){
		$(".exceededLifeFull").show().delay(500).fadeOut();
	}

	function empty(){
		$(".noObject").show().delay(500).fadeOut();
	}
	
	function bleedingState(){
		$(etatBleeding).insertAfter(".bleeding");
	}

	function startGame(){
		setLife(lifeFull);
		setBandage(0);
		$(etatBleeding).remove();
		bleedingIsActive =false;
		$(".life span").html(getLife());
		$(".bleeding span").html(getBandage());
		$(sections).hide();
		$("#intro").show();
	}

	function endGame() {
		
	}
});