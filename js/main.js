const player = document.querySelector('.player'),
    playBtn = document.querySelector('.play'),
    nextBtn = document.querySelector('.next'),
    prevBtn = document.querySelector('.prev'),
    audio = document.querySelector('.audio'),
    progressContainer = document.querySelector('.progress_container'),
    progress = document.querySelector('.progress'),
    volumeContainer = document.querySelector('.volume_container'),
    title = document.querySelector('.song'),
    cover = document.querySelector('.cover'),
    playSrc = document.querySelector('.play-src')

// Название песен
const songs = ['Lizer - ВЕСНА', 'HARU - В КИНО', 'Lizer - Звезда']

// Песня по умолчанию
let songIndex = 0

// Init 
function loadSong(song) {
    title.innerHTML = song
    audio.src = `audio/${song}.mp3`
    cover.src = `img/background-cover${songIndex + 1}.jpg`
}

loadSong(songs[songIndex])

// Play
function playSong() {
    player.classList.add('play')
    playSrc.src = 'img/img-pause.svg'
    audio.play()
}

// Pause
function pauseSong() {
    player.classList.remove('play')
    playSrc.src = 'img/img-play.svg'
    audio.pause()
}

playBtn.addEventListener('click', () => {
    const isPlaying = player.classList.contains('play')
    if (isPlaying) {
        pauseSong()
    }
    else {
        playSong()
    }
})

// Следующая песня

function nextSong() {
    songIndex++
    if (songIndex > songs.length - 1) {
        songIndex = 0
    }
    loadSong(songs[songIndex])
    playSong()
}

nextBtn.addEventListener('click', nextSong)

// Предыдущая песня

function prevSong() {
    songIndex--
    if (songIndex < 0) {
        songIndex = songs.length - 1
    }
    loadSong(songs[songIndex])
    playSong()
}
prevBtn.addEventListener('click', prevSong)


// Прогресс полоска
function updateProgress(e) {
    const { duration, currentTime } = e.srcElement
    const progressPercent = (currentTime / duration) * 100
    progress.style.width = `${progressPercent}%`
}
audio.addEventListener('timeupdate', updateProgress)

// Громкость полоска

let volume = document.querySelector("#volume");
volume.addEventListener("change", function (e) {
    audio.volume = e.currentTarget.value / 100;
})

// Перемотка
function setProgress(e) {
    const width = this.clientWidth
    const clickX = e.offsetX
    const duration = audio.duration

    audio.currentTime = (clickX / width) * duration
}
progressContainer.addEventListener('click', setProgress)

// Автоматическое включение следующей песни после конца 
audio.addEventListener('ended', nextSong)


/// slider ///

$(function () {
    $('.content-slider-items').slick({
        dots: false,
        arrows: false,
        infinite: true,
        speed: 300,
        slidesToShow: 5,
        centerMode: true,
        variableWidth: true,
        autoplay: true,
        autoplaySpeed: 2300
    })
})
$(function () {
    $('.comments').slick({
        vertical: true,
        verticalSwiping: true,
        arrows: false,
        dots: false,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 1000
    })
})

/// clock ///

window.onload = function () {
    window.setInterval(function () {
        let date = new Date();

        let hours = date.getHours();
        let minutes = date.getMinutes();

        if (hours < 10) hours = '0' + hours
        if (minutes < 10) minutes = '0' + minutes
        let clock = hours + ':' + minutes;
        document.getElementById('time').innerHTML = clock
    });
}


