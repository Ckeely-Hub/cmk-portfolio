const dropdownItems = Array.from(document.querySelectorAll(".nav-item--dropdown")).filter((item) => item.querySelector("button.nav-dropdown-toggle"));

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

	item.addEventListener("pointerleave", (event) => {
		if (event.pointerType === "mouse") {
			closeDropdown(item);
		}
	});

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

const copyEmailButton = document.querySelector("[data-copy-email]");
const emailToast = document.querySelector("#email-copy-toast");

if (copyEmailButton && emailToast) {
	let emailToastTimer;

	function fallbackCopyText(text) {
		const textArea = document.createElement("textarea");
		textArea.value = text;
		textArea.setAttribute("readonly", "");
		textArea.style.position = "fixed";
		textArea.style.opacity = "0";
		document.body.append(textArea);
		textArea.select();
		const copied = document.execCommand("copy");
		textArea.remove();
		return copied;
	}

	copyEmailButton.addEventListener("click", async () => {
		const email = "cmkchloe@tktechs.com";
		let copied = false;

		try {
			if (navigator.clipboard?.writeText) {
				await navigator.clipboard.writeText(email);
				copied = true;
			}
		} catch {
			copied = fallbackCopyText(email);
		}

		if (!copied) {
			copied = fallbackCopyText(email);
		}
		if (!copied) {
			return;
		}

		window.clearTimeout(emailToastTimer);
		emailToast.hidden = false;
		window.requestAnimationFrame(() => emailToast.classList.add("is-visible"));
		emailToastTimer = window.setTimeout(() => {
			emailToast.classList.remove("is-visible");
			emailToast.hidden = true;
		}, 4000);
	});
}
