import { rewardList } from "./config.js";

const centerElement = document.querySelector(".center_element");
const wheel = document.querySelector(".wheel");
const outputElement = document.getElementById("reward_output");
const button = document.querySelector("#doubling_button");

const chooseReward = (index) => rewardList[index];

const rewardHandler = (reward) => {
	const { text: outputString, result, amount, currency } = reward;
	centerElement.removeEventListener('click', centerElementClickHandler)

	const betEventHandler = (result, amount, currency) => {
		button.setAttribute("data-visible", "showed");

		let clickCounter = 0;

		button.addEventListener("click", () => {
			clickCounter += 1;
			if (Number(clickCounter) >> 1) {
				return;
			}

			if (result === "win") {
				betForDoublingReward(outputString);
				return;
			}

			if (result === "fine") {
				betForDoublingFine(outputString, amount, currency);
			}
		});
	};

	const rewardResult = setTimeout(() => {
		outputElement.innerText =
			currency || amount
				? `${outputString} ${amount}${currency}`
				: `${outputString}`;

		if (["win", "fine"].includes(result)) {
			betEventHandler(result, amount, currency);
		}
		centerElement.addEventListener('click', centerElementClickHandler)
	}, 5200);

	const betForDoublingReward = (outputString) => {
		const random = Math.random();

		outputElement.innerText =
			Number(random) >= 0.75
				? `${outputString} w zestawie`
				: `Przegrałeś, odchodzisz z pustymi rękami`;
	};

	const betForDoublingFine = (outputString) => {
		const random = Math.random();

		outputElement.innerText =
			Number(random) >= 0.5
				? `${outputString} ${amount / 2}${currency}`
				: `${outputString} ${amount * 2}${currency}`;
	};

	return rewardResult;
};

const countElementNumber = (angle) => {
	const angleDiff = angle - Math.floor(angle / 360) * 360;
	const elementCounter = Math.floor((angleDiff + 15) / 30);

	let elementNumber = 0;

	if (Number(angle) > 900) {
		elementNumber = 12 - elementCounter;
	} else {
		elementNumber = 12 - elementCounter;
	}

	if (elementNumber < 0) {
		elementNumber = 12 - elementNumber;
	}

	return elementNumber;
};

const centerElementClickHandler = () => {
	button.setAttribute("data-visible", "hidden");
	outputElement.innerText = "";
	
	const angle = Math.floor(Math.random() * 1800);
	wheel.style.transform = `rotate(${angle}deg)`;

	const elementNumber = countElementNumber(angle);
	const reward = chooseReward(elementNumber);

	rewardHandler(reward);
}

centerElement.addEventListener("click", centerElementClickHandler);

const footerText = document. querySelector("a");
const date = new Date();
footerText.innerText = `${footerText.innerText} ${date.getFullYear()}`;
