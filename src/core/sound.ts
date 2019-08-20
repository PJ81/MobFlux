export default class Sound {
  sounds: HTMLAudioElement[];
  muted: boolean;

  constructor(sndList: string[]) {
    this.sounds = new Array(sndList.length);
    this.muted = false;

    sndList.forEach((src, i) => {
      const snd = new Audio(src);
      snd.setAttribute("preload", "auto");
      snd.setAttribute("controls", "none");
      snd.style.display = "none";
      document.body.appendChild(snd);
      this.sounds[i] = snd;
    });
  }

  playLoop(snd: number) {
    this.sounds[snd].loop = true;
    this.play(snd);
  }

  play(snd: number) {
    if (this.muted) return;
    this.sounds[snd].play();
  }

  stop(snd: number) {
    this.sounds[snd].pause();
    this.sounds[snd].currentTime = 0;
  }

  setVolume(snd: number, vol: number) {
    this.sounds[snd].volume = vol;
  }

  mute(): boolean {
    this.muted = !this.muted;
    return this.muted;
  }
}