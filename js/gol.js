/* ==========================================
   GAME OF LIFE LOGIC
   ========================================== */

(function () {
    'use strict';
  
    // DOM Elements
    const golToggle = document.getElementById('golToggle');
    const golClose = document.getElementById('golClose');
    const golMode = document.getElementById('golMode');
    
    const canvas = document.getElementById('golCanvas');
    const ctx = canvas ? canvas.getContext('2d') : null;
    
    const btnPlay = document.getElementById('gol-btn-play');
    const btnNext = document.getElementById('gol-btn-next');
    const btnPrev = document.getElementById('gol-btn-prev');
    const btnRandom = document.getElementById('gol-btn-random');
    const btnClear = document.getElementById('gol-btn-clear');
    
    const playIcon = document.getElementById('gol-play-icon');
    const playText = document.getElementById('gol-play-text');
  
    // Game state variables
    let resolution = 20; // Size of each cell
    let cols;
    let rows;
    let grid;
    let history = []; // To store previous states
    let isPlaying = false;
    let animationId;
    let isDragging = false;
    let lastToggledCell = null; // Prevent toggling the same cell multiple times during one drag
  
    // Initialize Game
    function init() {
      if (!canvas) return;
      
      cols = Math.floor(canvas.width / resolution);
      rows = Math.floor(canvas.height / resolution);
      
      grid = make2DArray(cols, rows);
      draw();
      
      setupEventListeners();
    }
  
    function make2DArray(cols, rows) {
      let arr = new Array(cols);
      for (let i = 0; i < arr.length; i++) {
        arr[i] = new Array(rows).fill(0);
      }
      return arr;
    }
  
    function cloneGrid(arr) {
        let newArr = new Array(cols);
        for (let i = 0; i < cols; i++) {
            newArr[i] = [...arr[i]];
        }
        return newArr;
    }
  
    function randomizeGrid() {
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          grid[i][j] = Math.random() > 0.85 ? 1 : 0;
        }
      }
      saveState();
      draw();
    }
  
    function clearGrid() {
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          grid[i][j] = 0;
        }
      }
      history = []; // Reset history on clear
      saveState();
      draw();
      if(isPlaying) togglePlay(); // Pause if playing
    }
  
    function draw() {
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw grid cells
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          let x = i * resolution;
          let y = j * resolution;
          
          if (grid[i][j] == 1) {
            ctx.beginPath();
            ctx.rect(x, y, resolution - 1, resolution - 1);
            
            // Abyssal / Glassmorphism styling for live cells
            ctx.fillStyle = '#00F5D4'; // Primary accent
            ctx.shadowColor = '#00F5D4';
            ctx.shadowBlur = 10;
            ctx.fill();
            
            ctx.shadowBlur = 0; // Reset for performance
          } else {
              // Draw empty cell border faintly
              ctx.beginPath();
              ctx.rect(x, y, resolution - 1, resolution - 1);
              ctx.strokeStyle = 'rgba(0, 245, 212, 0.05)';
              ctx.stroke();
          }
        }
      }
    }
  
    // Compute next generation
    function nextGeneration() {
      saveState();
        
      let next = make2DArray(cols, rows);
  
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          let state = grid[i][j];
          let neighbors = countNeighbors(grid, i, j);
  
          // Conway's rules
          if (state === 0 && neighbors === 3) {
            next[i][j] = 1;
          } else if (state === 1 && (neighbors < 2 || neighbors > 3)) {
            next[i][j] = 0;
          } else {
            next[i][j] = state;
          }
        }
      }
  
      grid = next;
      draw();
    }
  
    function countNeighbors(grid, x, y) {
      let sum = 0;
      for (let i = -1; i < 2; i++) {
        for (let j = -1; j < 2; j++) {
          // Wrap around edges (Toroidal array)
          let col = (x + i + cols) % cols;
          let row = (y + j + rows) % rows;
          sum += grid[col][row];
        }
      }
      sum -= grid[x][y]; // Subtract self
      return sum;
    }
  
    // History management
    function saveState() {
        history.push(cloneGrid(grid));
        if (history.length > 100) {
            history.shift(); // Keep only last 100 states to save memory
        }
        btnPrev.disabled = history.length === 0;
    }
  
    function stepBackward() {
        if (history.length > 0) {
            grid = history.pop();
            draw();
            if(history.length === 0) btnPrev.disabled = true;
        }
    }
  
    // Game Loop
    let lastTime = 0;
    const fps = 10; // Speed of the game
    const interval = 1000 / fps;
  
    function loop(currentTime) {
      if (!isPlaying) return;
      
      requestAnimationFrame(loop);
      
      const deltaTime = currentTime - lastTime;
      if (deltaTime > interval) {
        nextGeneration();
        lastTime = currentTime - (deltaTime % interval);
      }
    }
  
    function togglePlay() {
      isPlaying = !isPlaying;
      if (isPlaying) {
        playIcon.classList.remove('bi-play-fill');
        playIcon.classList.add('bi-pause-fill');
        if (window._i18n) {
            playText.textContent = window._i18n.t('gol_btn_pause', 'Pause');
        } else {
            playText.textContent = "Pause";
        }
        lastTime = performance.now();
        requestAnimationFrame(loop);
      } else {
        playIcon.classList.remove('bi-pause-fill');
        playIcon.classList.add('bi-play-fill');
        if (window._i18n) {
            playText.textContent = window._i18n.t('gol_btn_play', 'Lecture');
        } else {
            playText.textContent = "Lecture";
        }
      }
    }
  
    // Canvas Interaction
    function toggleCell(evt) {
        const rect = canvas.getBoundingClientRect();
        // Calculate scale in case CSS resizes the canvas
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;

        const x = (evt.clientX - rect.left) * scaleX;
        const y = (evt.clientY - rect.top) * scaleY;
        
        const col = Math.floor(x / resolution);
        const row = Math.floor(y / resolution);
        
        if (col >= 0 && col < cols && row >= 0 && row < rows) {
            const cellId = col + "," + row;
            if(lastToggledCell !== cellId) {
                if (history.length === 0 || lastToggledCell === null) {
                    saveState(); // Only save state at the start of a drag or click
                }
                grid[col][row] = grid[col][row] ? 0 : 1;
                draw();
                lastToggledCell = cellId;
            }
        }
    }
  
    // Events Setup
    function setupEventListeners() {
      // Controls
      btnPlay.addEventListener('click', togglePlay);
      btnNext.addEventListener('click', () => {
          if(isPlaying) togglePlay();
          nextGeneration();
      });
      btnPrev.addEventListener('click', () => {
          if(isPlaying) togglePlay();
          stepBackward();
      });
      btnRandom.addEventListener('click', randomizeGrid);
      btnClear.addEventListener('click', clearGrid);
      
      // Canvas Drawing
      canvas.addEventListener('mousedown', (e) => {
          isDragging = true;
          lastToggledCell = null;
          toggleCell(e);
      });
      canvas.addEventListener('mousemove', (e) => {
          if (isDragging) toggleCell(e);
      });
      canvas.addEventListener('mouseup', () => {
          isDragging = false;
          lastToggledCell = null;
      });
      canvas.addEventListener('mouseleave', () => {
          isDragging = false;
          lastToggledCell = null;
      });
      
      // Touch Support
      canvas.addEventListener('touchstart', (e) => {
          e.preventDefault(); // Prevent scrolling
          isDragging = true;
          lastToggledCell = null;
          toggleCell(e.touches[0]);
      }, {passive: false});
      canvas.addEventListener('touchmove', (e) => {
          e.preventDefault();
          if (isDragging) toggleCell(e.touches[0]);
      }, {passive: false});
      canvas.addEventListener('touchend', () => {
          isDragging = false;
          lastToggledCell = null;
      });
  
      // UI Modals
      if (golToggle) {
        golToggle.addEventListener('click', () => {
          golMode.classList.add('active');
          document.body.style.overflow = 'hidden'; // Prevent background scrolling
          // Fix canvas rendering bug if opened after resize
          draw();
        });
      }
  
      if (golClose) {
        golClose.addEventListener('click', () => {
          golMode.classList.remove('active');
          document.body.style.overflow = '';
          if (isPlaying) togglePlay(); // Auto-pause when closing
        });
      }
  
      // Listen to i18n language change to update texts if needed
      window.addEventListener('languageChanged', (e) => {
        if (!isPlaying && window._i18n) {
            playText.textContent = window._i18n.t('gol_btn_play', 'Lecture');
        } else if (isPlaying && window._i18n) {
            playText.textContent = window._i18n.t('gol_btn_pause', 'Pause');
        }
      });
    }
  
    // Bootstrap
    document.addEventListener('DOMContentLoaded', init);
  
  })();
