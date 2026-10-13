const dropdownItems = Array.from(document.querySelectorAll(".nav-item--dropdown"));

function closeDropdown(item, restoreFocus = false) {
	item.classList.remove("is-open");
	const toggle = item.querySelector(".nav-dropdown-toggle");
	toggle.setAttribute("aria-expanded", "false");
	if (restoreFocus) {
		toggle.focus();
	}
}

for (const item of dropdownItems) {
	const toggle = item.querySelector(".nav-dropdown-toggle");

	toggle.addEventListener("click", () => {
		const shouldOpen = toggle.getAttribute("aria-expanded") !== "true";
		for (const otherItem of dropdownItems) {
			closeDropdown(otherItem);
		}
		if (shouldOpen) {
			item.classList.add("is-open");
			toggle.setAttribute("aria-expanded", "true");
		}
	});
}

document.addEventListener("click", (event) => {
	if (!(event.target instanceof Element) || event.target.closest(".nav-item--dropdown")) {
		return;
	}
	for (const item of dropdownItems) {
		closeDropdown(item);
	}
});

document.addEventListener("keydown", (event) => {
	if (event.key !== "Escape") {
		return;
	}
	const openItem = dropdownItems.find((item) => item.classList.contains("is-open"));
	if (openItem) {
		event.preventDefault();
		closeDropdown(openItem, true);
	}
});
