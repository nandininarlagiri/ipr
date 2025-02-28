document.addEventListener("DOMContentLoaded", function () {
    // Language Switcher Integration with Telugu Translator (LSTM Algorithm)
    const languageSwitcher = document.getElementById("language-switcher");
    languageSwitcher.addEventListener("click", function () {
        if (languageSwitcher.textContent === "తెలుగు") {
            translateToTeluguLSTM();
            languageSwitcher.textContent = "English";
        } else {
            translateToEnglish();
            languageSwitcher.textContent = "తెలుగు";
        }
    });

    async function translateToTeluguLSTM() {
        let elementsToTranslate = document.querySelectorAll("h1, h2, p, a");
        for (let elem of elementsToTranslate) {
            let text = elem.textContent;
            let translatedText = await lstmTranslate(text, "en", "te");
            elem.textContent = translatedText;
        }
    }

    async function lstmTranslate(text, sourceLang, targetLang) {
        // Placeholder API integration for LSTM translator
        const response = await fetch("/translate", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ text, sourceLang, targetLang })
        });
        const data = await response.json();
        return data.translatedText;
    }

    function translateToEnglish() {
        location.reload(); // Reloads page to revert to English
    }

    // Smooth Scrolling for Navigation Links
    document.querySelectorAll("nav a").forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            if (this.getAttribute("href").startsWith("#")) {
                e.preventDefault();
                const section = document.querySelector(this.getAttribute("href"));
                if (section) {
                    section.scrollIntoView({ behavior: "smooth" });
                }
            }
        });
    });

    // Contact Form Validation
    document.querySelector("form").addEventListener("submit", function (e) {
        e.preventDefault();
        const name = document.querySelector("input[placeholder='Name']").value.trim();
        const phone = document.querySelector("input[placeholder='Phone Number']").value.trim();
        const email = document.querySelector("input[placeholder='Email']").value.trim();
        const message = document.querySelector("input.message-box").value.trim();

        if (!name || !phone || !email || !message) {
            alert("Please fill out all fields.");
            return;
        }
        alert("Form submitted successfully!");
        this.reset();
    });

    // Making Website Responsive
    window.addEventListener("resize", function () {
        if (window.innerWidth < 768) {
            document.querySelector(".navbar").style.flexDirection = "column";
        } else {
            document.querySelector(".navbar").style.flexDirection = "row";
        }
    });
});
