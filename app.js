class DrumKit {
	constructor() {
		this.pads = document.querySelectorAll(".pad");
		this.playBtn = document.querySelector(".play");
		this.currentKick = "./sounds/kick/kick-1.wav";
		this.currentSnare = "./sounds/snare/snare-1.wav";
		this.currentHihat = "./sounds/hat/hat-1.wav";
		this.currentPerc = "./sounds/perc/perc-1.wav";
		this.currentLoop = "./sounds/loops/loop-1.wav";
		this.kickAudio = document.querySelector(".kick-sound");
		this.snareAudio = document.querySelector(".snare-sound");
		this.hihatAudio = document.querySelector(".hihat-sound");
		this.percAudio = document.querySelector(".perc-sound");
		this.loopAudio = document.querySelector(".loop-sound");
		this.index = 0;
		this.bpm = 150;
		this.isPlaying = null;
		this.selects = document.querySelectorAll("select");
		this.muteBtns = document.querySelectorAll(".mute");
		this.tempoSlider = document.querySelector(".tempo-slider");
	}
	activePad() {
		this.classList.toggle("active");
	}
	repeat() {
		let step = this.index % 8;
		const activeBars = document.querySelectorAll(`.b${step}`);
		// loop over the pads
		activeBars.forEach((bar) => {
			bar.style.animation = `playTrack 0.3s alternate ease-in-out 2`;
			//check if pads are active
			if (bar.classList.contains("active")) {
				//check each sound
				if (bar.classList.contains("kick-pad")) {
					this.kickAudio.currentTime = 0;
					this.kickAudio.play();
				}
				if (bar.classList.contains("snare-pad")) {
					this.snareAudio.currentTime = 0;
					this.snareAudio.play();
				}
				if (bar.classList.contains("hihat-pad")) {
					this.hihatAudio.currentTime = 0;
					this.hihatAudio.play();
				}
				if (bar.classList.contains("perc-pad")) {
					this.percAudio.currentTime = 0;
					this.percAudio.play();
				}
				if (bar.classList.contains("loop-pad")) {
					this.percAudio.currentTime = 0;
					this.loopAudio.play();
				}
			}
		});
		this.index++;
	}
	start() {
		const interval = (60 / this.bpm) * 1000;
		//check if is playing
		if (!this.isPlaying) {
			this.isPlaying = setInterval(() => {
				this.repeat();
			}, interval);
		} else {
			//remove interval
			clearInterval(this.isPlaying);
			this.isPlaying = null;
		}
	}
	updateBtn() {
		if (!this.isPlaying) {
			this.playBtn.innerText = "Stop";
			this.playBtn.classList.add("active");
		} else {
			this.playBtn.innerText = "Play";
			this.playBtn.classList.remove("active");
		}
	}
	changeSound(e) {
		const selectionName = e.target.name;
		const selectionValue = e.target.value;
		switch (selectionName) {
			case "kick-select":
				this.kickAudio.src = selectionValue;
				break;
			case "snare-select":
				this.snareAudio.src = selectionValue;
				break;
			case "hihat-select":
				this.hihatAudio.src = selectionValue;
				break;
			case "perc-select":
				this.percAudio.src = selectionValue;
				break;
			case "loop-select":
				this.loopAudio.src = selectionValue;
				break;
		}
	}
	mute(e) {
		const muteIndex = e.target.getAttribute("data-track");
		e.target.classList.toggle("active");
		if (e.target.classList.contains("active")) {
			switch (muteIndex) {
				case "0":
					this.kickAudio.volume = 0;
					break;
				case "1":
					this.snareAudio.volume = 0;
					break;
				case "2":
					this.hihatAudio.volume = 0;
					break;
				case "3":
					this.percAudio.volume = 0;
					break;
				case "4":
					this.loopAudio.volume = 0;
					break;
			}
		} else {
			switch (muteIndex) {
				case "0":
					this.kickAudio.volume = 1;
					break;
				case "1":
					this.snareAudio.volume = 1;
					break;
				case "2":
					this.hihatAudio.volume = 1;
					break;
				case "3":
					this.percAudio.volume = 1;
					break;
				case "4":
					this.loopAudio.volume = 1;
					break;
			}
		}
	}
	changeTempo(e) {
		const tempoText = document.querySelector(".tempo-nr");
		tempoText.innerText = e.target.value;
	}
	updateTempo(e) {
		this.bpm = e.target.value;
		clearInterval(this.isPlaying);
		this.isPlaying = null;
		const playBtn = document.querySelector(".play");
		if (playBtn.classList.contains("active")) {
			this.start();
		}
	}
}

const drumKit = new DrumKit();

// Event listerners

drumKit.pads.forEach((pad) => {
	pad.addEventListener("click", drumKit.activePad);
	pad.addEventListener("animationend", function () {
		this.style.animation = "";
	});
});

drumKit.playBtn.addEventListener("click", function () {
	drumKit.updateBtn();
	drumKit.start();
});

drumKit.selects.forEach((select) => {
	select.addEventListener("change", function (e) {
		drumKit.changeSound(e);
	});
});

drumKit.muteBtns.forEach((btn) => {
	btn.addEventListener("click", function (e) {
		drumKit.mute(e);
	});
});

drumKit.tempoSlider.addEventListener("input", function (e) {
	drumKit.changeTempo(e);
});

drumKit.tempoSlider.addEventListener("change", function (e) {
	drumKit.updateTempo(e);
});
