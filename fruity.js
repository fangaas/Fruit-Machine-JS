$(function() {


	var reelStates = {};

	var reelImageClasses = ["reelImage1", "reelImage2", "reelImage3", "reelImage4", "reelImage5"];

	var seenArray = [];

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

		var reel = $(".baseReel").clone();
		reel.removeClass("baseReel");
		reel.addClass("reelTopTop");
		reel.addClass(appendTo + "Reel1");
		reel.addClass(getReelImage(true));
		reel.css("display", "block");
		$("." + appendTo + "SpinBox").append(reel);

		reelStates[appendTo][appendTo + "Reel1"] = "toptop";

		var reel = $(".baseReel").clone();
		reel.removeClass("baseReel");
		reel.addClass("reelTop")
		reel.addClass(appendTo + "Reel2");
		reel.addClass(getReelImage());
		reel.css("display", "block");
		$("." + appendTo + "SpinBox").append(reel);

		reelStates[appendTo][appendTo + "Reel2"] = "top";

		var reel = $(".baseReel").clone();
		reel.removeClass("baseReel");
		reel.addClass(appendTo + "Reel3");
		reel.addClass(getReelImage());
		reel.css("display", "block");
		$("." + appendTo + "SpinBox").append(reel);

		reelStates[appendTo][appendTo + "Reel3"] = "middle";

		var reel = $(".baseReel").clone();
		reel.removeClass("baseReel");
		reel.addClass("reelBottom");
		reel.addClass(appendTo + "Reel4");
		reel.addClass(getReelImage());
		reel.css("display", "block");
		$("." + appendTo + "SpinBox").append(reel);

		reelStates[appendTo][appendTo + "Reel4"] = "bottom";

		var reel = $(".baseReel").clone();
		reel.removeClass("baseReel");
		reel.addClass("reelBottomBottom");
		reel.addClass(appendTo + "Reel5");
		reel.addClass(getReelImage());
		reel.css("display", "block");
		$("." + appendTo + "SpinBox").append(reel);

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
		spinCount = 0;
		leftSpinMax = 10;
		midSpinMax = leftSpinMax + 1;
		rightSpinMax = midSpinMax + 1;

		function spin() {
			window.setTimeout(function() {
				if(spinCount < leftSpinMax) spinReel("left", transitionSpeed);
				if(spinCount < midSpinMax) spinReel("mid", transitionSpeed);
				if(spinCount < rightSpinMax) spinReel("right", transitionSpeed);
				
				spinCount++;

				if(spinCount < rightSpinMax) {
					spin();
				} else if(spinCount == rightSpinMax) {
					spinFinished();
				}
			},reelSpeed);
		}
		spin();



	}
	startSpin();

	function spinFinished() {
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