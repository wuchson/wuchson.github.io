window.initAd = async function(c) {
    const b = document.getElementById(c.target);
    if (!b) return;
    b.style.maxWidth = "100%"; b.style.overflow = "hidden"; b.style.display = "block";
    try {
        const r = await fetch(c.api);
        const d = await r.json();
        const ads = d.filter(a => a.zone === c.zone);
        if (ads.length === 0) return;
        let i = 0;
        const fn = () => {
            b.style.opacity = 0; b.style.transition = "opacity 0.5s";
            setTimeout(() => {
                b.innerHTML = ads[i].content;
                const imgs = b.getElementsByTagName('img');
                for (let img of imgs) { img.style.maxWidth = "100%"; img.style.height = "auto"; img.style.display = "block"; }
                b.style.opacity = 1;
                i = (i + 1) % ads.length;
            }, 500);
        };
        fn();
        if (ads.length > 1) setInterval(fn, 5000);
    } catch (e) { console.error(e); }
};
