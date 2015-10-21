$(function() {


	var reelStates = {};
	var reelImageStates = {};

	var reelImageClasses = ["reelImage1", "reelImage2", "reelImage3", "reelImage4", "reelImage5"];

	var seenArray = [];

	var spinActive = false;

	var twoReelWinOdds = 100;
	var threeReelWinOdds = 1;
	var tensionOdds = 50;

	$(".spinButton").click(function() {
		if(!spinActive) {
			spinActive = true;
			//startSpin();
			startFixedSpin();
		}
	});

	function getReelImage(reset) {

		var foundImage = false,
		image;

		if(reset) seenArray = [];

		while(!foundImage) {
			var random = (Math.floor(Math.random()*reelImageClasses.length + 1)) - 1;
			if(seenArray.indexOf(random) == -1) {
				foundImage = true;
				seenArray.push(random);
				image = reelImageClasses[random];
				
			}
		}

		return image;

	}

	function createReels(appendTo) {

		reelStates[appendTo] = {};
		reelImageStates[appendTo] = {};

		var reel = $(".baseReel").clone();
		reel.removeClass("baseReel");
		reel.addClass("reelTopTop");
		reel.addClass(appendTo + "Reel1");
		var reelImage = getReelImage(true);
		reel.addClass(reelImage);
		reel.css("display", "block");
		$("." + appendTo + "SpinBox").append(reel);

		reelImageStates[appendTo][appendTo + "Reel1"] = reelImage;
		reelStates[appendTo][appendTo + "Reel1"] = "toptop";

		var reel = $(".baseReel").clone();
		reel.removeClass("baseReel");
		reel.addClass("reelTop")
		reel.addClass(appendTo + "Reel2");
		var reelImage = getReelImage();
		reel.addClass(reelImage);
		reel.css("display", "block");
		$("." + appendTo + "SpinBox").append(reel);

		reelImageStates[appendTo][appendTo + "Reel2"] = reelImage;
		reelStates[appendTo][appendTo + "Reel2"] = "top";

		var reel = $(".baseReel").clone();
		reel.removeClass("baseReel");
		reel.addClass(appendTo + "Reel3");
		var reelImage = getReelImage();
		reel.addClass(reelImage);
		reel.css("display", "block");
		$("." + appendTo + "SpinBox").append(reel);

		reelImageStates[appendTo][appendTo + "Reel3"] = reelImage;
		reelStates[appendTo][appendTo + "Reel3"] = "middle";

		var reel = $(".baseReel").clone();
		reel.removeClass("baseReel");
		reel.addClass("reelBottom");
		reel.addClass(appendTo + "Reel4");
		var reelImage = getReelImage();
		reel.addClass(reelImage);
		reel.css("display", "block");
		$("." + appendTo + "SpinBox").append(reel);

		reelImageStates[appendTo][appendTo + "Reel4"] = reelImage;
		reelStates[appendTo][appendTo + "Reel4"] = "bottom";

		var reel = $(".baseReel").clone();
		reel.removeClass("baseReel");
		reel.addClass("reelBottomBottom");
		reel.addClass(appendTo + "Reel5");
		var reelImage = getReelImage();
		reel.addClass(reelImage);
		reel.css("display", "block");
		$("." + appendTo + "SpinBox").append(reel);

		reelImageStates[appendTo][appendTo + "Reel5"] = reelImage;
		reelStates[appendTo][appendTo + "Reel5"] = "bottombottom";

	}

	function spinReel(reel, transitionSpeed) {

		var toptopClass = getClassByState(reel, "toptop"),
		toptopClassDot = "." + toptopClass;
		$(toptopClassDot).css("opacity", 1);
		$(toptopClassDot).removeClass("reelTopTop");
		$(toptopClassDot).addClass("reelTop");

		var topClass = getClassByState(reel, "top"),
		topClassDot = "." + topClass;
		$(topClassDot).removeClass("reelTop");

		var middleClass = getClassByState(reel, "middle"),
		middleClassDot = "." + middleClass;
		$(middleClassDot).addClass("reelBottom");

		var bottomClass = getClassByState(reel, "bottom"),
		bottomClassDot = "." + bottomClass;
		$(bottomClassDot).removeClass("reelBottom");
		$(bottomClassDot).addClass("reelBottomBottom");

		var bottombottomClass = getClassByState(reel, "bottombottom"),
		bottombottomClassDot = "." + bottombottomClass;
		$(bottombottomClassDot).css("opacity", 0);
		$(bottombottomClassDot).removeClass("reelBottomBottom");
		$(bottombottomClassDot).addClass("reelTopTop");

		reelStates[reel][toptopClass] = "top";
		reelStates[reel][topClass] = "middle";
		reelStates[reel][middleClass] = "bottom";
		reelStates[reel][bottomClass] = "bottombottom";
		reelStates[reel][bottombottomClass] = "toptop";

	}

	function startSpin() {

		var reelSpeed = 270,
		transitionSpeed = "0.25s",
		spinCount = 0,
		maxSpins = 15,
		minSpins = 9,
		leftSpinMax = Math.floor(Math.random() * (maxSpins - minSpins + 1)) + minSpins;
		midSpinMax = Math.floor(Math.random() * (maxSpins - minSpins + 1)) + minSpins;
		rightSpinMax = Math.floor(Math.random() * (maxSpins - minSpins + 1)) + minSpins;
		totalMax = Math.max(leftSpinMax, midSpinMax, rightSpinMax);


		function spin() {
			window.setTimeout(function() {
				if(spinCount < leftSpinMax) spinReel("left", transitionSpeed);
				if(spinCount < midSpinMax) spinReel("mid", transitionSpeed);
				if(spinCount < rightSpinMax) spinReel("right", transitionSpeed);
				
				spinCount++;

				if(spinCount < totalMax) {
					spin();
				} else if(spinCount == totalMax) {
					spinFinished();
				}
			},reelSpeed);
		}
		spin();
	}

	function startFixedSpin() {

		var reelSpeed = 220,
		winLine = calculateWinLine(),
		transitionSpeed = "0.25s",
		spinCount = 0,
		maxSpins = 10,
		leftFinished = false,
		middleFinished = false,
		rightFinished = false;

		function spin() {
			window.setTimeout(function() {
				if(!leftFinished) spinReel("left", transitionSpeed);
				if(!middleFinished) spinReel("mid", transitionSpeed);
				if(!rightFinished) spinReel("right", transitionSpeed);
				
				if(spinCount < maxSpins) {
					spin();
					spinCount++;
				} else if(!rightFinished){
					if(getCurrentReelImage("left") == winLine[0] && !leftFinished) {
						leftFinished = true;
					} else if(getCurrentReelImage("mid") == winLine[1] && !middleFinished && leftFinished) {
						middleFinished = true;
					} else if(getCurrentReelImage("right") == winLine[2] && middleFinished && leftFinished) {
						if(winLine[3]) {
							maxSpins = Math.floor(Math.random() * (20 - 12 + 1)) + 12;
							winLine[3] = false;
						} else {
							rightFinished = true;
						}
					}
					spin();
				} else {
					spinFinished();
				}

			},reelSpeed);
		}
		spin();

	}

	function calculateWinLine() {

		twoReelWinOdds = parseInt($(".twoReelChanceInput").val());
		threeReelWinOdds = parseInt($(".threeReelChanceInput").val());
		tensionOdds = parseInt($(".tensionReelChanceInput").val());
		//Right parameter is tension 
		var randomValForOdds = Math.floor(Math.random() * (100 - 0 + 1));

		var randomValForTension = Math.floor(Math.random() * (100 - 0 + 1));

		var addTension = (randomValForTension < tensionOdds);

		var winLine = [];

		var winningClass = reelImageClasses[(Math.floor(Math.random()*reelImageClasses.length + 1)) - 1];

		winLine.push(winningClass);

		function getRandomClass() {
			var found = false,
			theClass;

			while(!found) {
				var aClass = reelImageClasses[(Math.floor(Math.random()*reelImageClasses.length + 1)) - 1];
				if(winLine.indexOf(aClass) == -1) {
					found = true;
					theClass = aClass;
				}
			}

			return theClass;
		}

		if(randomValForOdds < threeReelWinOdds) {
			winLine = winLine.concat([winningClass, winningClass, addTension]);
		} else if(randomValForOdds < twoReelWinOdds) {
			winLine = winLine.concat([winningClass, getRandomClass(), addTension])
		} else {
			winLine = winLine.concat(getRandomClass(), getRandomClass(), false);
		}

		return winLine;
	}

	function getCurrentReelImage(reel) {
		var theClass = getClassByState(reel, "middle");
		return reelImageStates[reel][theClass];
	}
	//startSpin();

	function spinFinished() {
		spinActive = false;

		var leftImage = getCurrentReelImage("left"),
		middleImage = getCurrentReelImage("mid"),
		rightImage = getCurrentReelImage("right");

		if(leftImage == middleImage && middleImage == rightImage) {
			alert("Three reel win!");
		} else if(leftImage == middleImage) {
			alert("Two reel win!");
		}
	}


	function getClassByState(reelSide, position) {
		var state;

		for(var key in reelStates[reelSide]) {
			if(reelStates[reelSide][key] == position) {
				state = key;
				break;
			}
		}

		return state;
	}

	(function() {
		createReels("left");
		createReels("mid");
		createReels("right");
	})();

	

});