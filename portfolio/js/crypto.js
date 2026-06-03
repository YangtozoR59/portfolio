/**
 * CryptoLab - Interactive Cryptography Pedagogical Tool
 * Integrated for Caleb Yang's Portfolio
 */

(function() {
    'use strict';

    // DOM Elements - CryptoLab Mode Toggle
    const cryptoToggle = document.getElementById('cryptoToggle');
    const cryptoClose = document.getElementById('cryptoClose');
    const cryptoMode = document.getElementById('cryptoMode');
    const dashboard = document.querySelector('.dashboard');
    
    // Check if we need to hide depth indicator when crypto mode is on
    const depthIndicator = document.querySelector('.depth-indicator');
    
    // DOM Elements - CryptoLab Tool
    const elements = {
        algoSelect: document.getElementById('algo'),
        keyInput: document.getElementById('key'),
        keyHint: document.getElementById('key-hint'),
        sourceText: document.getElementById('source-text'),
        resultText: document.getElementById('result-text'),
        btnEncrypt: document.getElementById('btn-encrypt'),
        btnDecrypt: document.getElementById('btn-decrypt'),
        btnClear: document.getElementById('btn-clear'),
        btnCopy: document.getElementById('btn-copy'),
        terminalOutput: document.getElementById('terminal-output'),
        progressBar: document.getElementById('progress-bar')
    };

    if (!cryptoToggle || !cryptoMode) return;

    // --- Crypto Mode Toggle Logic ---
    let isCryptoActive = false;

    function t(key, fallback) {
        return (window._i18n && window._i18n.t) ? window._i18n.t(key) : (fallback || key);
    }

    function setCryptoMode(on) {
        isCryptoActive = on;
        if (on) {
            cryptoMode.classList.add('active');
            // Hide dashboard to prevent background scrolling/interaction
            dashboard.classList.add('fishing-hidden'); 
            if (depthIndicator) depthIndicator.style.display = 'none';
            
            // If fishing mode is active, disable it
            const fishingModeDiv = document.getElementById('fishingMode');
            if (fishingModeDiv && fishingModeDiv.classList.contains('active')) {
                 if (window._fishingGame) window._fishingGame.stop();
                 fishingModeDiv.classList.remove('active');
                 const modeToggle = document.getElementById('modeToggle');
                 const modeIcon = document.getElementById('modeToggleIcon');
                 if (modeIcon) modeIcon.className = 'bi bi-controller';
                 if (modeToggle) modeToggle.title = t('mode_toggle_fishing', 'Passer en mode pêche');
                 const catchJournal = document.getElementById('catchJournal');
                 if (catchJournal) catchJournal.classList.remove('active');
            }
        } else {
            cryptoMode.classList.remove('active');
            dashboard.classList.remove('fishing-hidden');
            if (depthIndicator) depthIndicator.style.display = '';
        }
    }

    cryptoToggle.addEventListener('click', () => setCryptoMode(true));
    cryptoClose.addEventListener('click', () => setCryptoMode(false));

    // Configuration & State
    let isAnimating = false;

    // Alphabet utilities
    const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const charToInt = (char) => ALPHABET.indexOf(char.toUpperCase());
    const intToChar = (int) => ALPHABET[((int % 26) + 26) % 26];
    const isLetter = (char) => /[a-zA-Z]/.test(char);

    // -----------------------------------------------------------------------------
    // EVENT LISTENERS
    // -----------------------------------------------------------------------------

    elements.algoSelect.addEventListener('change', updateKeyPlaceholder);

    elements.btnEncrypt.addEventListener('click', () => processCryptography('encrypt'));
    elements.btnDecrypt.addEventListener('click', () => processCryptography('decrypt'));

    elements.btnClear.addEventListener('click', () => {
        if (isAnimating) return;
        elements.sourceText.value = '';
        elements.resultText.value = '';
        elements.keyInput.value = '';
        updateTerminal(`<span class="prompt">>_ </span>${t('crypto_ready', "Prêt. En attente d'une opération...")}`);
        elements.progressBar.style.width = '0%';
    });

    elements.btnCopy.addEventListener('click', () => {
        if (!elements.resultText.value) return;
        navigator.clipboard.writeText(elements.resultText.value).then(() => {
            const originalHTML = elements.btnCopy.innerHTML;
            elements.btnCopy.innerHTML = '<i class="bi bi-check-lg"></i>';
            setTimeout(() => elements.btnCopy.innerHTML = originalHTML, 2000);
        });
    });

    // -----------------------------------------------------------------------------
    // UI & ANIMATION UTILS
    // -----------------------------------------------------------------------------

    function updateKeyPlaceholder() {
        const algo = elements.algoSelect.value;
        if (algo === 'caesar') {
            elements.keyInput.placeholder = "Ex: 3";
            elements.keyHint.textContent = t('crypto_hint_caesar', "Décalage numérique (ex: 3). Laissez vide pour Force Brute.");
        } else if (algo === 'vigenere') {
            elements.keyInput.placeholder = "Ex: SECRET";
            elements.keyHint.textContent = t('crypto_hint_vigenere', "Mot-clé alphabétique (ex: SECRET)");
        } else if (algo === 'hill') {
            elements.keyInput.placeholder = "Ex: 1,2; 3,4";
            elements.keyHint.textContent = t('crypto_hint_hill', "Matrice 2x2 ou 3x3 séparée par ; et ,");
        }
    }

    function setUIState(disabled) {
        isAnimating = disabled;
        elements.algoSelect.disabled = disabled;
        elements.keyInput.disabled = disabled;
        elements.sourceText.disabled = disabled;
        elements.btnEncrypt.disabled = disabled;
        elements.btnDecrypt.disabled = disabled;
        elements.btnClear.disabled = disabled;
    }

    function updateTerminal(htmlContent) {
        elements.terminalOutput.innerHTML = htmlContent;
        // Auto-scroll to bottom
        const windowEl = elements.terminalOutput.parentElement;
        windowEl.scrollTop = windowEl.scrollHeight;
    }

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async function animateSteps(steps, finalResult) {
        setUIState(true);
        let currentHtml = `<span class="prompt">>_ </span>${t('crypto_init', "Initialisation des calculs...")}\n\n`;
        updateTerminal(currentHtml);
        elements.progressBar.style.width = '0%';
        elements.resultText.value = '';

        const totalSteps = steps.length;
        
        // Calculate a reasonable delay so the whole animation doesn't take forever for long texts
        const delayPerChar = Math.max(2, Math.min(20, 1500 / (totalSteps * 20)));

        for (let i = 0; i < totalSteps; i++) {
            const stepText = steps[i] + "\n";
            
            // Typewriter effect for this step
            for (let j = 0; j < stepText.length; j++) {
                currentHtml += stepText[j];
                if (j % 10 === 0) updateTerminal(currentHtml); // Optimization: update DOM every 10 chars
                await sleep(delayPerChar);
            }
            updateTerminal(currentHtml);

            // Update progress bar
            const progress = ((i + 1) / totalSteps) * 100;
            elements.progressBar.style.width = `${progress}%`;
        }

        currentHtml += `\n<span class="prompt">>_ </span>${t('crypto_done', "Opération terminée avec succès.")}`;
        updateTerminal(currentHtml);
        elements.resultText.value = finalResult;
        setUIState(false);
    }

    // -----------------------------------------------------------------------------
    // CRYPTO LOGIC MANAGER
    // -----------------------------------------------------------------------------

    async function processCryptography(mode) {
        const algo = elements.algoSelect.value;
        const text = elements.sourceText.value;
        const keyStr = elements.keyInput.value;

        if (!text.trim()) {
            updateTerminal(`<span style='color:var(--danger)'>${t('crypto_err_empty', "Erreur : Le texte source est vide.")}</span>`);
            return;
        }

        let result = { final: "", steps: [] };

        try {
            if (algo === 'caesar') {
                result = processCaesar(text, keyStr, mode);
            } else if (algo === 'vigenere') {
                result = processVigenere(text, keyStr, mode);
            } else if (algo === 'hill') {
                result = processHill(text, keyStr, mode);
            }

            if (result.error) {
                updateTerminal(`<span style='color:var(--danger)'>Erreur : ${result.error}</span>`);
                return;
            }

            await animateSteps(result.steps, result.final);

        } catch (e) {
            updateTerminal(`<span style='color:var(--danger)'>Erreur inattendue : ${e.message}</span>`);
        }
    }

    // -----------------------------------------------------------------------------
    // ALGORITHMS
    // -----------------------------------------------------------------------------

    // CAESAR
    function processCaesar(text, keyStr, mode) {
        const steps = [];
        let final = "";
        
        // Brute force check
        if (!keyStr && mode === 'decrypt') {
            return processCaesarBruteForce(text);
        }

        const key = parseInt(keyStr, 10);
        if (isNaN(key)) return { error: "La clé de César doit être un nombre entier." };

        const shift = mode === 'encrypt' ? key : -key;
        const opSign = shift >= 0 ? '+' : '-';
        const absShift = Math.abs(shift) % 26;

        steps.push(`Algorithme: César | Mode: ${mode.toUpperCase()} | Décalage: ${shift}`);

        for (let i = 0; i < text.length; i++) {
            const char = text[i];
            if (isLetter(char)) {
                const isUpper = char === char.toUpperCase();
                const val = charToInt(char);
                const newVal = ((val + shift) % 26 + 26) % 26;
                const newChar = intToChar(newVal);
                final += isUpper ? newChar : newChar.toLowerCase();
                
                steps.push(`${char.toUpperCase()} (${val}) ${opSign} ${absShift} = ${newVal} -> ${newChar}`);
            } else {
                final += char;
            }
        }

        return { final, steps };
    }

    function processCaesarBruteForce(text) {
        const steps = [];
        let final = "Résultats de la Force Brute :\n";
        steps.push(`Algorithme: César | Mode: FORCE BRUTE (Déchiffrement)`);

        for (let shift = 1; shift < 26; shift++) {
            let attempt = "";
            for (let i = 0; i < text.length; i++) {
                const char = text[i];
                if (isLetter(char)) {
                    const isUpper = char === char.toUpperCase();
                    const val = charToInt(char);
                    const newVal = ((val - shift) % 26 + 26) % 26;
                    attempt += isUpper ? intToChar(newVal) : intToChar(newVal).toLowerCase();
                } else {
                    attempt += char;
                }
            }
            steps.push(`Clé ${shift}: ${attempt.substring(0, 30)}${attempt.length > 30 ? '...' : ''}`);
            final += `Clé ${shift} : ${attempt}\n`;
        }
        return { final, steps };
    }

    // VIGENERE
    function processVigenere(text, keyStr, mode) {
        if (!keyStr || !isLetter(keyStr)) {
            return { error: "La clé de Vigenère doit contenir uniquement des lettres." };
        }

        const steps = [];
        let final = "";
        const key = keyStr.toUpperCase().replace(/[^A-Z]/g, '');
        let keyIndex = 0;

        steps.push(`Algorithme: Vigenère | Mode: ${mode.toUpperCase()} | Mot-clé: ${key}`);

        for (let i = 0; i < text.length; i++) {
            const char = text[i];
            if (isLetter(char)) {
                const isUpper = char === char.toUpperCase();
                const p = charToInt(char);
                const kChar = key[keyIndex % key.length];
                const k = charToInt(kChar);
                
                let newVal;
                if (mode === 'encrypt') {
                    newVal = (p + k) % 26;
                    steps.push(`${char.toUpperCase()} (${p}) + ${kChar} (${k}) = ${newVal} -> ${intToChar(newVal)}`);
                } else {
                    newVal = ((p - k) % 26 + 26) % 26;
                    steps.push(`${char.toUpperCase()} (${p}) - ${kChar} (${k}) = ${newVal} -> ${intToChar(newVal)}`);
                }

                const newChar = intToChar(newVal);
                final += isUpper ? newChar : newChar.toLowerCase();
                keyIndex++;
            } else {
                final += char;
            }
        }

        return { final, steps };
    }

    // HILL
    function processHill(text, keyStr, mode) {
        const steps = [];
        let final = "";

        // Parse Matrix
        let matrix;
        try {
            matrix = keyStr.split(';').map(row => row.split(',').map(n => parseInt(n.trim(), 10)));
            if (!matrix.length || matrix.length !== matrix[0].length) throw new Error("Matrice non carrée");
            if (matrix.length !== 2 && matrix.length !== 3) throw new Error("Seules les matrices 2x2 ou 3x3 sont gérées");
            for (let r = 0; r < matrix.length; r++) {
                for (let c = 0; c < matrix.length; c++) {
                    if (isNaN(matrix[r][c])) throw new Error("Valeurs invalides");
                    matrix[r][c] = ((matrix[r][c] % 26) + 26) % 26;
                }
            }
        } catch (e) {
            return { error: "Format de matrice invalide. Ex: 1,2; 3,4" };
        }

        const n = matrix.length;
        steps.push(`Algorithme: Hill | Mode: ${mode.toUpperCase()} | Matrice ${n}x${n}`);
        
        // Matrix Math Utils
        const det2x2 = (m) => m[0][0]*m[1][1] - m[0][1]*m[1][0];
        const det3x3 = (m) => 
            m[0][0]*(m[1][1]*m[2][2] - m[1][2]*m[2][1]) - 
            m[0][1]*(m[1][0]*m[2][2] - m[1][2]*m[2][0]) + 
            m[0][2]*(m[1][0]*m[2][1] - m[1][1]*m[2][0]);
        
        const modInverse = (a, m) => {
            a = ((a % m) + m) % m;
            for (let x = 1; x < m; x++) {
                if ((a * x) % m == 1) return x;
            }
            return -1;
        };

        let workingMatrix = matrix;

        if (mode === 'decrypt') {
            let d = n === 2 ? det2x2(matrix) : det3x3(matrix);
            d = ((d % 26) + 26) % 26;
            const dInv = modInverse(d, 26);
            
            if (dInv === -1) {
                return { error: `Le déterminant est ${d}, qui n'a pas d'inverse modulo 26. Matrice non inversible.` };
            }

            steps.push(`Déterminant = ${d}, Inverse modulaire = ${dInv}`);
            let invMatrix = Array(n).fill(0).map(() => Array(n).fill(0));

            if (n === 2) {
                invMatrix[0][0] = matrix[1][1];
                invMatrix[0][1] = -matrix[0][1];
                invMatrix[1][0] = -matrix[1][0];
                invMatrix[1][1] = matrix[0][0];
            } else {
                // 3x3 Adjucate
                for(let i=0; i<3; i++) {
                    for(let j=0; j<3; j++) {
                        const subM = [];
                        for(let r=0; r<3; r++) {
                            if(r===i) continue;
                            const row = [];
                            for(let c=0; c<3; c++) {
                                if(c===j) continue;
                                row.push(matrix[r][c]);
                            }
                            subM.push(row);
                        }
                        const sign = ((i+j)%2 === 0) ? 1 : -1;
                        invMatrix[j][i] = sign * det2x2(subM); // Transpose included
                    }
                }
            }

            for (let r = 0; r < n; r++) {
                for (let c = 0; c < n; c++) {
                    invMatrix[r][c] = ((invMatrix[r][c] * dInv % 26) + 26) % 26;
                }
            }
            workingMatrix = invMatrix;
            steps.push(`Matrice Inverse mod 26 calculée.`);
        }

        // Prepare text (remove spaces, pad)
        const cleanText = [];
        for (let i = 0; i < text.length; i++) {
            if (isLetter(text[i])) {
                cleanText.push({ char: text[i], isUpper: text[i] === text[i].toUpperCase(), origIdx: i });
            }
        }

        // Padding with 'A'
        let paddedCount = 0;
        while (cleanText.length % n !== 0) {
            cleanText.push({ char: 'A', isUpper: true, origIdx: -1 });
            paddedCount++;
        }
        if (paddedCount > 0) {
            steps.push(`Ajout de ${paddedCount} 'A' à la fin pour former des blocs de ${n}.`);
        }

        const resultArray = new Array(text.length).fill(null);
        let appendedString = "";

        // Process blocks
        for (let i = 0; i < cleanText.length; i += n) {
            const block = [];
            const chars = [];
            for (let j = 0; j < n; j++) {
                block.push(charToInt(cleanText[i+j].char));
                chars.push(cleanText[i+j].char.toUpperCase());
            }

            const outBlock = [];
            for (let r = 0; r < n; r++) {
                let sum = 0;
                let sumStr = "";
                for (let c = 0; c < n; c++) {
                    sum += workingMatrix[r][c] * block[c];
                    sumStr += `${workingMatrix[r][c]}*${block[c]} + `;
                }
                sumStr = sumStr.slice(0, -3);
                const val = sum % 26;
                outBlock.push(val);
                steps.push(`Bloc [${chars.join(', ')}] -> Ligne ${r+1}: ${sumStr} = ${sum} = ${val} mod 26 -> ${intToChar(val)}`);
            }

            for (let j = 0; j < n; j++) {
                const outChar = cleanText[i+j].isUpper ? intToChar(outBlock[j]) : intToChar(outBlock[j]).toLowerCase();
                if (cleanText[i+j].origIdx !== -1) {
                    resultArray[cleanText[i+j].origIdx] = outChar;
                } else {
                    appendedString += outChar;
                }
            }
        }

        // Reconstruct with punctuation
        for (let i = 0; i < text.length; i++) {
            if (!isLetter(text[i])) {
                resultArray[i] = text[i];
            }
        }

        final = resultArray.join('') + appendedString;
        return { final, steps };
    }

    // Init
    updateKeyPlaceholder();

})();
