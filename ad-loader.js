/**
 * 廣告載入器 (ad-loader.js) - 自適應強化版
 * 支援 Base64 圖片存儲、自動縮放與多廣告輪播
 */
window.initAd = async function(config) {
    const box = document.getElementById(config.target);
    if (!box) {
        console.error("Ad System: 找不到目標容器 #" + config.target);
        return;
    }

    // --- 1. 強制設定容器樣式，防止框架變形 ---
    box.style.maxWidth = "100%";
    box.style.overflow = "hidden";
    box.style.display = "block";
    box.style.position = "relative";

    try {
        // --- 2. 從 GAS 抓取資料 ---
        const response = await fetch(config.api);
        const allData = await response.json();
        
        // 過濾出屬於該區域的廣告
        const ads = allData.filter(a => a.zone === config.zone);

        if (ads.length === 0) {
            console.log("Ad System: 區域 " + config.zone + " 目前沒有活動中的廣告。");
            return;
        }

        let currentIndex = 0;

        // --- 3. 渲染函式 ---
        const render = () => {
            // 淡出效果
            box.style.opacity = 0;
            box.style.transition = "opacity 0.6s ease-in-out";
            
            setTimeout(() => {
                // 注入廣告內容 (可能是圖片 HTML 或文字 HTML)
                box.innerHTML = ads[currentIndex].content;
                
                // --- 4. 關鍵：強制處理內容中的圖片，確保不撐開框架 ---
                const imgs = box.getElementsByTagName('img');
                for (let img of imgs) {
                    img.style.maxWidth = "100%";   // 寬度限制在 100%
                    img.style.height = "auto";     // 高度自適應，防止拉伸
                    img.style.display = "block";
                    img.style.margin = "auto";
                    img.style.border = "none";
                }
                
                // 淡入效果
                box.style.opacity = 1;
                
                // 切換到下一張 (準備輪播)
                currentIndex = (currentIndex + 1) % ads.length;
            }, 600);
        };

        // 執行第一次渲染
        render();

        // --- 5. 如果有多個廣告，開啟自動輪播 (每 5 秒) ---
        if (ads.length > 1) {
            setInterval(render, 5000);
        }

    } catch (error) {
        console.error("Ad System Error:", error);
    }
};
