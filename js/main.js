var buttons = document.querySelectorAll('.iconbutton');
var volumeButtons = document.querySelectorAll('.soundbutton');
var muted = true;

const containerMap = {};
document.querySelectorAll(".gameinfo-container").forEach(container => {
    const key = Array.from(container.classList).find(cls => cls !== 'gameinfo-container' && cls !== 'active');
    containerMap[key] = container;
});

const backgroundMap = {};
document.querySelectorAll(".bg").forEach(bg => {
    const key = Array.from(bg.classList).find(cls => cls !== 'bg' && cls !== 'active');
    backgroundMap[key] = bg;
});

buttons.forEach(button => {
    button.addEventListener("click", () => {
    buttons.forEach(b => b.classList.remove('active'));
    button.classList.add('active');
    const dock = document.querySelector(".dock");
    dock.scrollTo({
        left: (button.offsetLeft + button.offsetWidth / 2) - dock.clientWidth / 2,
        behavior:"smooth"
    })
    selectedGame = button.classList[1]
    changeBackground(selectedGame);
    const selectedContainer = containerMap[selectedGame];
    Object.entries(containerMap).forEach(([key, container]) => 
        {
            if (key === selectedGame) {
            container.classList.add("active");
            container.scrollTo({top: 0, behavior: "smooth"});
            const video = container.querySelector("video");
            if (video) {
                video.muted = muted;
                video.play();
            }
            } else {
            container.classList.remove("active");
            const video = container.querySelector("video");
            if (video) video.pause();
            }
        });
    })
})

volumeButtons.forEach(button => {
    button.addEventListener("click", () => {
    muted = !muted;
    const activeVideo = document.querySelector(".gameinfo-container.active video");
    if (activeVideo) {
        activeVideo.muted = muted;
        if (!activeVideo.paused) activeVideo.play();
    }
    volumeButtons.forEach(b => {
        b.classList.toggle('active', !muted);
    });
    })
})

function changeBackground(game) {
    Object.entries(backgroundMap).forEach(([key, bg]) => {
        if (key === selectedGame) {
        bg.classList.add("active");
        } else {
        bg.classList.remove("active");
        }
    });
    document.body.classList = "backdrop";
    document.body.classList.add(selectedGame)
}

window.addEventListener('focus', function() {
    const activeVideo = document.querySelector(".gameinfo-container.active video");
    if (activeVideo) activeVideo.play();
});

window.addEventListener('blur', function() {
    const activeVideo = document.querySelector(".gameinfo-container.active video");
    if (activeVideo) activeVideo.pause();
});