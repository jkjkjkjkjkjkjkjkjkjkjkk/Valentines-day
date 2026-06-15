// 页面跳转函数（保持不变）
function nextPage() {
    window.location.href = "yes.html";
}

// 核心：手机/电脑通用的按钮跳跃函数
function moveButton() {
    const noButton = document.getElementById('noButton');

    // 1. 获取当前手机屏幕的可用宽高
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    // 2. 获取按钮自身的宽高
    const btnWidth = noButton.offsetWidth;
    const btnHeight = noButton.offsetHeight;

    // 3. 安全边界限制：让按钮在屏幕四周留出至少 20 像素的内边距，防止跳出手机屏幕或藏在刘海屏下面
    const padding = 20;
    const maxX = screenWidth - btnWidth - padding;
    const maxY = screenHeight - btnHeight - padding;

    // 4. 计算随机坐标（确保不小于安全边距）
    let randomX = Math.random() * (maxX - padding) + padding;
    let randomY = Math.random() * (maxY - padding) + padding;

    // 5. 兜底保护：万一算出了负数（比如极小的屏幕），强制归零
    randomX = Math.max(padding, randomX);
    randomY = Math.max(padding, randomY);

    // 6. 让按钮瞬移
    noButton.style.left = `${randomX}px`;
    noButton.style.top = `${randomY}px`;
}

// 7. 【最核心】等待网页加载完成后，同时监听“鼠标悬停”和“手机触摸”
document.addEventListener("DOMContentLoaded", function () {
    const noButton = document.getElementById('noButton');

    if (noButton) {
        // 兼容电脑端：鼠标一晃过去就跑
        noButton.addEventListener('mouseover', moveButton);

        // 兼容手机端：手指一旦碰触到按钮的瞬间就跑，让对方根本来不及点下去
        noButton.addEventListener('touchstart', function (e) {
            e.preventDefault(); // 阻止手机端的默认点击和放大缩放行为
            moveButton();
        });
    }
});