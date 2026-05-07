window.initAd = async function(c) {
    const box = document.getElementById(c.target);
    if (!box) return;

    try {
        const res = await fetch(c.api);
        const data = await res.json();
        const ads = data.filter(a => a.zone === c.zone);
        if (ads.length === 0) return;

        let i = 0;
        const render = () => {
            box.style.transition = "opacity 0.5s";
            box.style.opacity = 0;
            setTimeout(() => {
                box.innerHTML = ads[i].content;
                box.style.opacity = 1;
                i = (i + 1) % ads.length;
            }, 500);
        };

        render();
        if (ads.length > 1) setInterval(render, 5000); 
    } catch (e) { console.error("Ad System Error", e); }
};
