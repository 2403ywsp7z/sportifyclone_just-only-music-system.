console.log("welcome to Spotify");
//initialize the variable
let songIndex =0;
let audioElement = new Audio('songs/5.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItem=Array.from(document.getElementsByClassName('songItem'));

let songs=[
    {songName:"Midnight Dreams",filePath:"songs/1.mp3",coverPath:"covers/1.jpg" },
    {songName:"Lost in the Beat",filePath:"songs/2.mp3",coverPath:"covers/2.jpg" },
    {songName:"Chill Vibes",filePath:"songs/3.mp3",coverPath:"covers/3.jpg" },
    {songName:"Echoes of Love",filePath:"songs/4.mp3",coverPath:"covers/4.jpg" },
    {songName:"Night Drive",filePath:"songs/5.mp3",coverPath:"covers/5.jpg" },
    {songName:"Calm Waves",filePath:"songs/6.mp3",coverPath:"covers/6.jpg" },
    {songName:"Feel the Rhythm",filePath:"songs/7.mp3",coverPath:"covers/7.jpg" },
    {songName:"Soft Memories",filePath:"songs/8.mp3",coverPath:"covers/8.jpg" },
    {songName:"Neon Lights",filePath:"songs/9.mp3",coverPath:"covers/9.jpg" },
    {songName:"salam-e-Ishq",filePath:"songs/10.mp3",coverPath:"covers/10.jpg" },
]

songItem.forEach((element, i) => {
    // image & song name
    element.getElementsByTagName('img')[0].src = songs[i].coverPath;
    element.getElementsByClassName('songName')[0].innerText = songs[i].songName;

    // create temp audio for duration
    let audio = document.createElement('audio');
    audio.src = songs[i].filePath;
    audio.preload = "metadata";

    audio.addEventListener('loadedmetadata', () => {
        let min = Math.floor(audio.duration / 60);
        let sec = Math.floor(audio.duration % 60);
        if (sec < 10) sec = "0" + sec;
        element.querySelector('.songTime').innerText = `${min}:${sec}`;
    });
});

//audioElement.play();

//handle play /pause click
masterPlay.addEventListener('click',()=>{
    if(audioElement.paused){
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        gif.style.opacity = 1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
        gif.style.opacity = 0;
    }
});


audioElement.addEventListener('timeupdate', () => {
    if (!isNaN(audioElement.duration)) {
        progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
        myProgressBar.value = progress;
    }
});


myProgressBar.addEventListener('change',()=>{
    audioElement.currentTime=myProgressBar.value*audioElement.duration/100;
})

const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) =>{
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');
    });
}


Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
    element.addEventListener('click', (e) => {
        makeAllPlays();
        songIndex = parseInt(e.target.id);

        e.target.classList.remove('fa-circle-play');
        e.target.classList.add('fa-circle-pause');

        audioElement.src = songs[songIndex].filePath;
        masterSongName.innerText = songs[songIndex].songName;

        audioElement.currentTime = 0;
        audioElement.play();

        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        gif.style.opacity = 1;
    });
});


document.getElementById('next').addEventListener('click',()=>{
    if(songIndex>=9){
        songIndex = 0
    }
    else{
        songIndex += 1;
    }
     
    audioElement.src = songs[songIndex].filePath;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');

})

document.getElementById('previous').addEventListener('click',()=>{
    if(songIndex<=0){
        songIndex = 0
    }
    else{
        songIndex -= 1;
    }
     
    audioElement.src = songs[songIndex].filePath;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');

})

audioElement.addEventListener('ended', () => {
    songIndex++;

    if (songIndex >= songs.length) {
        songIndex = 0;
    }

    audioElement.src = songs[songIndex].filePath;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();

    makeAllPlays();
    document.getElementsByClassName('songItemPlay')[songIndex]
        .classList.remove('fa-circle-play');
    document.getElementsByClassName('songItemPlay')[songIndex]
        .classList.add('fa-circle-pause');

    gif.style.opacity = 1;
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
});




