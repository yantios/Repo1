/* =========================================================
   VAULT — script.js
   Semua logika interaktif: gerbang sidik jari, maskot,
   galeri foto, pemutar musik, dan grid video.
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* =========== DATA — GANTI SESUAI ISI FOLDERMU =========== */

  // Taruh file foto di folder /foto lalu daftarkan di sini.
  const PHOTOS = [
    { src: 'foto/foto1.jpg', caption: 'ini dia gabug pap ke gua' },
    { src: 'foto/foto2.jpg', caption: 'Dia lagi Gabut ngepap ke aku' },
    { src: 'foto/foto3.jpg', caption: 'pap muka jelek, tetap aja cantik' },
    { src: 'foto/foto4.jpg', caption: 'Dia lagi di Eropa' },
    { src: 'foto/foto5.jpg', caption: 'Ini sih, gua langsung pingsan' },
    { src: 'foto/foto6.jpg', caption: 'Dia kirim foto ini, langsung sekarat gua' },
    { src: 'foto/foto7.jpg', caption:
    'kok bisa secantik ini' },
    { src: 'foto/foto8.jpg', caption:
    'mbgggggggg' },
    { src: 'foto/foto9.jpg', caption:
    'Pingsan le ghe liatnya' },
    { src: 'foto/foto10.jpg', caption:
    'Vantiknya bngstt' },
  ];

  // Taruh file audio di folder /music lalu daftarkan di sini.
  const TRACKS = [
    { title: 'Save Of My Heart', artist: 'Backstreet Boys', src: 'music/lagu1.mp3' },
    { title: 'The 1975 - About You', artist: 'Mattyhealy', src: 'music/lagu2.mp3' },
    { title: 'Hate That I Made You Love Me', artist: 'Ariana Grande', src: 'music/lagu3.mp3' },
  ];

  // Taruh file video di folder /video lalu daftarkan di sini.
  const VIDEOS = [
    { title: 'Anjing Cantik Bngt!!', tag: 'MP4 · Loop', src: 'video/video1.mp4' },
    { title: 'Kok Bs secantik iniii', tag: 'MP4 · Loop', src: 'video/video2.mp4' },
  ];

  /* =========================================================
     1. GERBANG SIDIK JARI
     ========================================================= */
  const gate       = document.getElementById('gate');
  const scanner    = document.getElementById('scanner');
  const gateHint   = document.getElementById('gateHint');
  const site       = document.getElementById('site');
  const gateFoxMouth   = document.getElementById('foxMouth');
  const gateFoxTongue  = document.getElementById('foxTongue');

  let scanning = false;
  let unlocked = false;

  function foxWink(){
    const eyes = document.getElementById('foxEyes');
    if(!eyes) return;
    eyes.classList.add('is-blinking');
  }

  function foxPlayfulFace(state){
    // state: 'idle' | 'happy' | 'shy'
    if(state === 'happy'){
      gateFoxMouth.setAttribute('d','M86 120 Q100 136 114 120');
      gateFoxTongue.style.opacity = '1';
      gateFoxTongue.style.transform = 'scaleY(1)';
    } else {
      gateFoxMouth.setAttribute('d','M88 122 Q100 130 112 122');
      gateFoxTongue.style.opacity = '0';
      gateFoxTongue.style.transform = 'scaleY(0)';
    }
  }

  scanner.addEventListener('click', () => {
    if(scanning || unlocked) return;
    scanning = true;
    scanner.classList.add('is-scanning');
    gateHint.textContent = 'Memindai sidik jari...';
    gateHint.classList.remove('is-error');
    foxPlayfulFace('happy');

    setTimeout(() => {
      scanner.classList.remove('is-scanning');
      scanner.classList.add('is-success');
      gateHint.textContent = 'Identitas dikonfirmasi. Selamat datang kembali.';
      unlocked = true;

      setTimeout(() => {
        gate.classList.add('is-hidden');
        site.removeAttribute('aria-hidden');
        document.body.style.overflow = 'auto';
        fireConfetti();
        showMascot('Akhirnya! Aku udah nungguin kamu dari tadi 😏');
      }, 900);
    }, 1650);
  });

  // Cegah scroll di belakang gate sebelum unlock
  document.body.style.overflow = 'hidden';

  function fireConfetti(){
    const colors = ['#d9aa5f', '#ff7a68', '#e8c78a', '#ffb3a6', '#f4f1e8'];
    const count = 36;
    for(let i = 0; i < count; i++){
      const piece = document.createElement('span');
      piece.className = 'confetti-piece';
      const size = 6 + Math.random() * 6;
      piece.style.width = `${size}px`;
      piece.style.height = `${size * (Math.random() > .5 ? 1 : 2.2)}px`;
      piece.style.background = colors[Math.floor(Math.random() * colors.length)];
      document.body.appendChild(piece);

      const angle = Math.random() * Math.PI * 2;
      const distance = 160 + Math.random() * 260;
      const dx = Math.cos(angle) * distance;
      const dy = Math.sin(angle) * distance - 80;
      const rot = Math.random() * 720 - 360;
      const duration = 1100 + Math.random() * 700;

      piece.animate([
        { transform: 'translate(-50%,-50%) translate(0,0) rotate(0deg)', opacity: 1 },
        { transform: `translate(-50%,-50%) translate(${dx}px, ${dy + 260}px) rotate(${rot}deg)`, opacity: 0 }
      ], { duration, easing: 'cubic-bezier(.22,1,.36,1)', fill: 'forwards' });

      setTimeout(() => piece.remove(), duration + 50);
    }
  }

  /* =========================================================
     2. MASKOT MENGAMBANG (setelah masuk)
     ========================================================= */
  const mascot       = document.getElementById('mascot');
  const mascotBubble = document.getElementById('mascotBubble');
  const mMouth       = document.getElementById('mMouth');

  const MASCOT_LINES = [
    'Psst... coba scroll ke bawah, ada yang seru 👀',
    'Jangan disebar-sebar ya, ini privat~',
    'Foto-foto di sini kesukaanku juga!',
    'Puter musiknya dong, biar aku ikut goyang 🎵',
    'Kamu betah banget di sini, aku suka itu.',
    'Awas kepencet tombol close, nanti aku ngambek.',
  ];

  let mascotTimer = null;

  function showMascot(text){
    mascot.classList.add('is-shown');
    mascotBubble.textContent = text;
    mascotBubble.classList.add('is-shown');
    clearTimeout(mascotTimer);
    mascotTimer = setTimeout(() => mascotBubble.classList.remove('is-shown'), 4200);
  }

  mascot.addEventListener('click', () => {
    const line = MASCOT_LINES[Math.floor(Math.random() * MASCOT_LINES.length)];
    showMascot(line);
    // ekspresi jahil: mulut senyum lebar sesaat
    mMouth.setAttribute('d','M50 58 Q60 70 70 58');
    setTimeout(() => mMouth.setAttribute('d','M52 60 Q60 66 68 60'), 500);
  });

  // Sesekali muncul sendiri saat idle
  setInterval(() => {
    if(!unlocked) return;
    if(Math.random() < 0.35 && !mascotBubble.classList.contains('is-shown')){
      showMascot(MASCOT_LINES[Math.floor(Math.random() * MASCOT_LINES.length)]);
    }
  }, 9000);

  /* =========================================================
     3. GALERI FOTO
     ========================================================= */
  const galleryGrid = document.getElementById('galleryGrid');
  const lightbox     = document.getElementById('lightbox');
  const lightboxImg  = document.getElementById('lightboxImg');
  const lightboxClose= document.getElementById('lightboxClose');

  PHOTOS.forEach((photo, i) => {
    const item = document.createElement('div');
    item.className = 'gallery__item';
    item.innerHTML = `
      <span class="gallery__index">0${i + 1}</span>
      <img src="${photo.src}" alt="${photo.caption}"
           onerror="this.parentElement.querySelector('img').style.display='none'; this.parentElement.querySelector('.gallery__fallback').style.display='flex';">
      <div class="gallery__placeholder gallery__fallback" style="display:none; position:absolute; inset:0;">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg>
        <span>${photo.src}<br>belum ditemukan</span>
      </div>
      <div class="gallery__caption">${photo.caption}</div>
    `;
    item.addEventListener('click', () => {
      if(item.querySelector('.gallery__fallback').style.display === 'flex') return;
      lightboxImg.src = photo.src;
      lightboxImg.alt = photo.caption;
      lightbox.classList.add('is-open');
    });
    galleryGrid.appendChild(item);
  });

  lightboxClose.addEventListener('click', () => lightbox.classList.remove('is-open'));
  lightbox.addEventListener('click', (e) => { if(e.target === lightbox) lightbox.classList.remove('is-open'); });
  document.addEventListener('keydown', (e) => { if(e.key === 'Escape') lightbox.classList.remove('is-open'); });

  /* =========================================================
     4. PEMUTAR MUSIK
     ========================================================= */
  const audioEl     = document.getElementById('audioEl');
  const trackName   = document.getElementById('trackName');
  const trackArtist = document.getElementById('trackArtist');
  const btnPlay     = document.getElementById('btnPlay');
  const playIcon    = document.getElementById('playIcon');
  const btnPrev     = document.getElementById('btnPrev');
  const btnNext     = document.getElementById('btnNext');
  const vinyl       = document.getElementById('vinyl');
  const playerBars  = document.getElementById('playerBars');
  const seekBar     = document.getElementById('seekBar');
  const seekFill    = document.getElementById('seekFill');
  const timeCurrent = document.getElementById('timeCurrent');
  const timeTotal   = document.getElementById('timeTotal');
  const playlistEl  = document.getElementById('playlist');

  let currentTrack = 0;
  let isPlaying = false;

  function fmtTime(sec){
    if(!isFinite(sec)) return '0:00';
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  }

  function loadTrack(i){
    currentTrack = (i + TRACKS.length) % TRACKS.length;
    const t = TRACKS[currentTrack];
    trackName.textContent = t.title;
    trackArtist.textContent = t.artist;
    audioEl.src = t.src;
    document.querySelectorAll('.playlist__item').forEach((el, idx) => {
      el.classList.toggle('is-active', idx === currentTrack);
    });
  }

  function playPause(){
    if(!audioEl.src){ loadTrack(0); }
    if(isPlaying){
      audioEl.pause();
    } else {
      audioEl.play().catch(() => {
        trackArtist.textContent = 'Berkas belum ditemukan di /music';
      });
    }
  }

  audioEl.addEventListener('play', () => {
    isPlaying = true;
    playIcon.innerHTML = '<path d="M6 5h4v14H6zm8 0h4v14h-4z"/>';
    vinyl.classList.add('is-spinning');
    playerBars.classList.add('is-playing');
  });
  audioEl.addEventListener('pause', () => {
    isPlaying = false;
    playIcon.innerHTML = '<path d="M8 5v14l11-7z"/>';
    vinyl.classList.remove('is-spinning');
    playerBars.classList.remove('is-playing');
  });
  audioEl.addEventListener('timeupdate', () => {
    timeCurrent.textContent = fmtTime(audioEl.currentTime);
    seekFill.style.width = `${(audioEl.currentTime / audioEl.duration) * 100 || 0}%`;
  });
  audioEl.addEventListener('loadedmetadata', () => {
    timeTotal.textContent = fmtTime(audioEl.duration);
  });
  audioEl.addEventListener('ended', () => loadTrack(currentTrack + 1) || playPause());

  btnPlay.addEventListener('click', playPause);
  btnPrev.addEventListener('click', () => { loadTrack(currentTrack - 1); audioEl.play().catch(()=>{}); });
  btnNext.addEventListener('click', () => { loadTrack(currentTrack + 1); audioEl.play().catch(()=>{}); });

  seekBar.addEventListener('click', (e) => {
    const rect = seekBar.getBoundingClientRect();
    const pct = (e.clientX - rect.left) / rect.width;
    if(isFinite(audioEl.duration)) audioEl.currentTime = pct * audioEl.duration;
  });

  TRACKS.forEach((t, i) => {
    const li = document.createElement('li');
    li.className = 'playlist__item';
    li.innerHTML = `
      <span class="playlist__num">0${i + 1}</span>
      <span class="playlist__title">${t.title} — <span style="opacity:.6">${t.artist}</span></span>
      <span class="playlist__dur">▶</span>
    `;
    li.addEventListener('click', () => { loadTrack(i); audioEl.play().catch(()=>{}); });
    playlistEl.appendChild(li);
  });
  loadTrack(0);

  /* =========================================================
     5. GRID VIDEO
     ========================================================= */
  const videoGrid = document.getElementById('videoGrid');
  VIDEOS.forEach(v => {
    const card = document.createElement('div');
    card.className = 'video-card';
    card.innerHTML = `
      <video src="${v.src}" controls preload="metadata"></video>
      <div class="video-card__meta">
        <div class="video-card__title">${v.title}</div>
        <div class="video-card__tag">${v.tag}</div>
      </div>
    `;
    videoGrid.appendChild(card);
  });

  /* =========================================================
     6. SCROLL REVEAL
     ========================================================= */
  const revealTargets = document.querySelectorAll('.gallery__item, .section-head, .player, .video-card');
  revealTargets.forEach(el => el.classList.add('reveal'));

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  revealTargets.forEach(el => io.observe(el));

});
