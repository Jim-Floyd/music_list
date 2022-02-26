let play = document.querySelectorAll('.promo__item_play'),
    status = document.querySelectorAll('.promo__item_play img'),
    progressContainer = document.querySelectorAll('.promo__item_progress'),
    progress = document.querySelectorAll('.promo__item_progress_item'),
    audio = document.querySelectorAll('audio'),
    list_img = document.querySelectorAll('.promo__item_img img'),
    main_img = document.querySelector('.promo__player_img img'),
    promo__player_progress = document.querySelector('.promo__player_progress'),
    promo__player_progress_item = document.querySelector('.promo__player_progress_item'),
    active_play = document.querySelector('.active_play'),
    forward_play = document.querySelector('.forward_play'),
    backward_play = document.querySelector('.backward_play'),
    old_audio,
    audio_id = 0,
    new_audio;

function endAudio() {
    audio.forEach(aud => {
        aud.pause();
        aud.currentTime = 0;
    })
}

function removeImg() {
    status.forEach(img => {
        img.src = "icons/play-solid.svg";
    })
    active_play.src = "icons/play-circle-solid.svg"
}

function removeProgress() {
    progress.forEach(item => {
        item.style.width = "0";
    })
}

function updateProgress(e) {
    const {duration, currentTime} = e.srcElement;
    const progressPercent = (currentTime / duration) * 100;
    progress[audio_id].style.width = `${progressPercent}%`;
}

function updateProgress2(e) {
    const {duration, currentTime} = e.srcElement;
    const progressPercent = (currentTime / duration) * 100;
    promo__player_progress_item.style.width = `${progressPercent}%`;
}

function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;

    const duration = audio[audio_id].duration;
    audio[audio_id].currentTime = (clickX / width) * duration;
    nextMusic(audio_id)
}

function NonActiveElements() {
    progressContainer.forEach(item => {
        item.style.display = "none";
    })
    main_img.classList.remove('active')
    promo__player_progress.style.display = "none";
}

function musicPlaying(audio_id) {
    if (audio[audio_id].paused) {
        promo__player_progress.style.display = "block";
        progressContainer[audio_id].style.display = "block";
        audio[audio_id].addEventListener("timeupdate", updateProgress);
        audio[audio_id].addEventListener("timeupdate", updateProgress2);
        promo__player_progress.addEventListener("click", setProgress);
        progressContainer[audio_id].addEventListener("click", setProgress);
        audio[audio_id].play();
        status[audio_id].src = "icons/pause-solid.svg"
        main_img.src = list_img[audio_id].src;
        main_img.classList.add('active')
        active_play.src = "icons/pause-circle-solid.svg";
    } else {
        audio[audio_id].pause();
        status[audio_id].src = "icons/play-solid.svg"
        active_play.src = "icons/play-circle-solid.svg";
        main_img.classList.remove('active')
    }
}

function onlyOneMusicCheck(id) {
    audio_id = id;
    if (!old_audio) {
        old_audio = audio[id].src;
    } else if (old_audio) {
        new_audio = audio[id].src;
    }

    if (old_audio && new_audio) {
        if (old_audio !== new_audio) {
            endAudio()
            removeImg()
            removeProgress()
            old_audio = new_audio;
            NonActiveElements()
        }
    }
    nextMusic(audio_id)
}

play.forEach((btn, id) => {
    btn.addEventListener('click', () => {
        audio_id = id
        onlyOneMusicCheck(id)
        musicPlaying(id)
        nextMusic(audio_id)
    })
})
active_play.addEventListener('click', () => {
    if (!audio_id) {
        audio_id = 0
    }
    onlyOneMusicCheck(audio_id)
    musicPlaying(audio_id)
    nextMusic(audio_id)
})
forward_play.addEventListener('click', () => {
    if (!audio_id) {
        audio_id = 0
    }
    audio_id++
    if (audio_id > audio.length - 1) {
        audio_id = 0
    }
    onlyOneMusicCheck(audio_id)
    musicPlaying(audio_id)
    nextMusic(audio_id)
})
backward_play.addEventListener('click', () => {
    if (!audio_id) {
        audio_id = 0
    }
    audio_id--
    if (audio_id < 0) {
        audio_id = audio.length - 1
    }
    onlyOneMusicCheck(audio_id)
    musicPlaying(audio_id)
    nextMusic(audio_id)
})

function nextMusic(audio_id) {
    audio[audio_id].addEventListener('ended', () => {
        endAudio()
        audio_id++
        if (audio_id > audio.length - 1) {
            audio_id = 0
        }
        onlyOneMusicCheck(audio_id)
        musicPlaying(audio_id)
    })
}
nextMusic(audio_id)
