/**
 * 廣告載入器 - 支援 Base64 直接顯示
 */
window.initAd = async function(config) {
    const box = document.getElementById(config.target);
    if (!box) return;

    try {
        const response = await fetch(config.api);
        const data = await response.json();
        const ads = data.filter(a => a.zone === config.zone);

        if (ads.length === 0) {
            console.log("No active ads for zone: " + config.zone);
            return;
        }

        let index = 0;
        const render = () => {
            box.style.opacity = 0;
            box.style.transition = "opacity 0.5s";
            
            setTimeout(() => {
                // 直接將試算表中的 HTML 代碼（含 Base64 圖片）注入
                box.innerHTML = ads[index].content;
                box.style.opacity = 1;
                index = (index + 1) % ads.length;
            }, 500);
        };

        render();
        if (ads.length > 1) setInterval(render, 5000); // 5秒輪播
    } catch (e) {
        console.error("Ad System Error:", e);
    }
};
