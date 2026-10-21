const copyEmailButton = document.querySelector("[data-copy-email]");
const emailToast = document.querySelector("#email-copy-toast");
const mobileMenuButton = document.querySelector("[data-mobile-menu-toggle]");

if (mobileMenuButton) {
	const siteNav = mobileMenuButton.closest(".site-nav");
	const navLinks = siteNav?.querySelector(".nav-links");

	if (siteNav && navLinks) {
		siteNav.classList.add("has-mobile-menu");
		const projectsToggle = navLinks.querySelector(".nav-dropdown-toggle");
		const projectsItem = projectsToggle?.closest(".nav-item--dropdown");
		const projectsMenu = projectsItem?.querySelector(".dropdown-menu");

		if (projectsToggle && projectsMenu) {
			projectsToggle.setAttribute("aria-controls", projectsMenu.id);
			projectsToggle.setAttribute("aria-expanded", "false");
		}

		function setMobileMenuOpen(isOpen) {
			siteNav.classList.toggle("is-menu-open", isOpen);
			mobileMenuButton.setAttribute("aria-expanded", String(isOpen));
			mobileMenuButton.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");

			if (!isOpen && projectsItem && projectsToggle) {
				projectsItem.classList.remove("is-open");
				projectsToggle.setAttribute("aria-expanded", "false");
			}
		}

		mobileMenuButton.addEventListener("click", () => {
			setMobileMenuOpen(mobileMenuButton.getAttribute("aria-expanded") !== "true");
		});

		projectsToggle?.addEventListener("click", (event) => {
			if (!window.matchMedia("(max-width: 760px)").matches) {
				return;
			}

			event.preventDefault();
			const isOpen = projectsItem.classList.toggle("is-open");
			projectsToggle.setAttribute("aria-expanded", String(isOpen));
		});

		navLinks.addEventListener("click", (event) => {
			const link = event.target.closest("a");
			if (link && (link !== projectsToggle || !window.matchMedia("(max-width: 760px)").matches)) {
				setMobileMenuOpen(false);
			}
		});

		document.addEventListener("keydown", (event) => {
			if (event.key === "Escape" && mobileMenuButton.getAttribute("aria-expanded") === "true") {
				setMobileMenuOpen(false);
				mobileMenuButton.focus();
			}
		});
	}
}

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
