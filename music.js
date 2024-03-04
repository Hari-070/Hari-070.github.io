let currentMusic=0

const music=document.querySelector('#audio');
const seekBar=document.querySelector('.seek-bar');
const songName=document.querySelector('.song-name');
const artistName=document.querySelector('.artist');
const disk=document.querySelector('.disk');
const currentTime=document.querySelector('.cur-time');
const totalTime=document.querySelector('.tot-time');
const playBtn=document.querySelector('.play-btn');
const forBtn= document.querySelector('.forw');
const prevBtn=document.querySelector('.prev');

playBtn.addEventListener('click',()=>{
    if(playBtn.className.includes('pause')){
        music.play();
    }
    else{
        music.pause();
    }
    playBtn.classList.toggle('pause');
    disk.classList.toggle('play');
})

const setMusic= (i) =>{
    seekBar.value=0;
    let song= songs[i];
    currentMusic=i;
    music.src=song.path;

    songName.innerHTML=song.name;
    artistName.innerHTML=song.artist;
    disk.style.backgroundImage=`url(${song.cover})`;

    currentTime.innerHTML='00:00';
    setTimeout(() => {
        seekBar.max= music.duration;
        totalTime.innerHTML=formatTime(music.duration);
    },600);
}
//setMusic(2);
const formatTime=(time)=>{
    let min=Math.floor(time/60);
    if(min<10){
        min=`0${min}`;
    }
    let sec=Math.floor(time%60);
    if(sec<10){
        sec=`0${sec}`;
    }
    return `${min}:${sec}`;
}
//seekzbar
setInterval(()=>{
    seekBar.value=music.currentTime;
    currentTime.innerHTML=formatTime(music.currentTime);
},1000);

seekBar.addEventListener('change',()=>{
    music.currentTime=seekBar.value;
})

//forward and backward
forBtn.addEventListener('click',()=>{
    if(currentMusic >= songs.length-1){
        currentMusic=0;
    }
    else{
        currentMusic++;
    }
    setMusic(currentMusic);
    playBtn.click();
    playMusic();

})

prevBtn.addEventListener('click',()=>{
    if(currentMusic <=0){
        currentMusic=songs.length-1;
    }
    else{
        currentMusic--;
    }
    setMusic(currentMusic);
    playBtn.click();
    playMusic();
})

const playMusic=()=>{
    music.play();
    playBtn.classList.remove('pause');
    disk.classList.add('play');
}