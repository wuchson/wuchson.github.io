window.initAd = async function(config) {
    const box = document.getElementById(config.target);
    if (!box) return;

    box.style.maxWidth = "100%";
    box.style.overflow = "hidden";
    box.style.display = "block";
    box.style.position = "relative";

    try {
        const response = await fetch(config.api);
        const allData = await response.json();
        const ads = allData.filter(a => a.zone === config.zone);
        if (ads.length === 0) return;

        let currentIndex = 0;
        const render = () => {
            box.style.opacity = 0;
            box.style.transition = "opacity 0.6s ease-in-out";
            
            setTimeout(() => {
                box.innerHTML = ads[currentIndex].content;
                const imgs = box.getElementsByTagName('img');
                for (let img of imgs) {
                    img.style.maxWidth = "100%";
                    img.style.height = "auto";
                    img.style.display = "block";
                    img.style.margin = "auto";
                }
                box.style.opacity = 1;
                currentIndex = (currentIndex + 1) % ads.length;
            }, 600);
        };

        render();
        if (ads.length > 1) setInterval(render, 5000);
    } catch (error) {
        console.error("Ad System Error:", error);
    }
};
