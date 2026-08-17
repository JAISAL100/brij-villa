document.addEventListener("DOMContentLoaded", () => {

    const loader = document.getElementById("page-loader");
    const video = document.getElementById("loader-video");

    if (!loader) return;

    // Start video
    if (video) {
        video.play().catch(() => {});
    }

    // Hide loader after current page is fully loaded
    window.addEventListener("load", () => {
        setTimeout(() => {
            loader.classList.add("hide");
        }, 700);
    });

    // Loader when navigating to another page
    document.querySelectorAll('a[href]').forEach(link => {

        link.addEventListener("click", function (e) {

            const href = this.getAttribute("href");

            if (!href) return;

            // Don't interfere with anchors
            if (href.startsWith("#")) return;

            // Don't interfere with external links
            if (
                href.startsWith("http://") ||
                href.startsWith("https://") ||
                href.startsWith("mailto:") ||
                href.startsWith("tel:")
            ) {
                return;
            }

            // Don't interfere with new tabs
            if (this.target === "_blank") return;

            e.preventDefault();

            // Show loader
            loader.classList.remove("hide");

            // Restart video from beginning
            if (video) {
                video.currentTime = 0;
                video.play().catch(() => {});
            }

            // Navigate
            setTimeout(() => {
                window.location.href = href;
            }, 150);

        });

    });

});