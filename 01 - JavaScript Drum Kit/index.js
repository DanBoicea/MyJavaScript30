// Render all the key containers on the page
const keySounds = {
	A: "Clap",
	S: "Hihat",
	D: "Kick",
	F: "Openhat",
	G: "Boom",
	H: "Ride",
	J: "Snare",
	K: "Tom",
	L: "Tink",
};

const renderKeyContainer = (key) => {
	return `<div class="key-container" data-key="${key}">
				<kbd>${key}</kbd>
				<div class="key-sound-name">${keySounds[key]}</div>
			</div>`;
};

const allKeysContainer = document.querySelector(".all-keys-container");
if (allKeysContainer) {
	Object.keys(keySounds).forEach((key) => {
		const container = document.createElement("div");
		container.innerHTML = renderKeyContainer(key);
		allKeysContainer.appendChild(container);
	});
}

// Function used to play sounds on key presses
function playSound(event) {
	const eventKey = event.key.toUpperCase();
	const audio = document.querySelector(`audio[data-key=${eventKey}]`);
	if (!audio) return;

	// Reset and play the sound
	audio.currentTime = 0;
	audio.play();

	// Also highlight the corresponding key container on the page
	const keyContainer = document.querySelector(`.key-container[data-key=${eventKey}]`);
	keyContainer.classList.add("activated");
}

// Add the event listeners
window.addEventListener("keydown", playSound);
document.querySelectorAll(".key-container").forEach((element) =>
	addEventListener("transitionend", (event) => {
		// Make sure the "transitionend" event fires only once
		if (event.propertyName !== "transform") return;
		event.target.classList.remove("activated");
	}),
);
