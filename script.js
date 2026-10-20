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
