$(function() {


	var reelStates = {};
	var reelImageStates = {};

	var reelImageClasses = ["reelImage1", "reelImage2", "reelImage3", "reelImage4", "reelImage5"];

	var seenArray = [];

	var spinActive = false;

	$(".spinButton").click(function() {
		if(!spinActive) {
			spinActive = true;
			startSpin();
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
	//startSpin();

	function spinFinished() {
		var leftClass = getClassByState("left", "middle"),
		middleClass = getClassByState("mid", "middle"),
		rightClass = getClassByState("right", "middle");

		var leftImage = reelImageStates["left"][leftClass],
		middleImage = reelImageStates["mid"][middleClass],
		rightImage = reelImageStates["right"][rightClass];

		spinActive = false;

		if(leftImage == middleImage == rightImage) {
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