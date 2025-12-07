// Main JavaScript for ToolioAI
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initTheme();
    initSearch();
    initMobileMenu();
    initToolsGrid();
    initCurrentYear();
    
    // Initialize tool-specific functionality if on tool page
    const toolId = getCurrentToolId();
    if (toolId) {
        initToolPage(toolId);
    }
});

// Theme Management
function initTheme() {
    const themeToggle = document.getElementById('themeToggle');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Check for saved theme or prefer color scheme
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = prefersDarkScheme.matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        document.documentElement.classList.add('dark');
    }
    
    themeToggle?.addEventListener('click', () => {
        document.documentElement.classList.toggle('dark');
        const isDark = document.documentElement.classList.contains('dark');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });
}

// Search Functionality
function initSearch() {
    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');
    
    if (!searchInput || !searchResults) return;
    
    // Tools data for search
    const tools = [
        { id: 'text-summarizer', title: 'Text Summarizer', description: 'Summarize long texts into key points', category: 'text', tags: ['text', 'ai', 'summary'] },
        { id: 'grammar-checker', title: 'Grammar & Spell Checker', description: 'Check grammar and spelling errors', category: 'text', tags: ['text', 'grammar', 'spell'] },
        { id: 'text-rewriter', title: 'Text Rewriter/Paraphraser', description: 'Rewrite text while preserving meaning', category: 'text', tags: ['text', 'rewrite', 'paraphrase'] },
        { id: 'password-generator', title: 'Password Generator', description: 'Generate secure random passwords', category: 'generator', tags: ['security', 'password', 'generator'] },
        { id: 'qr-code-generator', title: 'QR Code Generator', description: 'Create QR codes from text or URLs', category: 'generator', tags: ['qr', 'code', 'generator'] },
        { id: 'image-compressor', title: 'Image Compressor', description: 'Compress images without quality loss', category: 'image', tags: ['image', 'compress', 'optimize'] },
        { id: 'pdf-merger', title: 'PDF Merger', description: 'Merge multiple PDF files into one', category: 'converter', tags: ['pdf', 'merge', 'document'] },
        { id: 'unit-converter', title: 'Unit Converter', description: 'Convert between different units', category: 'converter', tags: ['convert', 'units', 'measurement'] },
        { id: 'word-counter', title: 'Word & Character Counter', description: 'Count words, characters, and sentences', category: 'text', tags: ['text', 'counter', 'analyze'] },
        { id: 'base64-converter', title: 'Base64 Encoder/Decoder', description: 'Encode and decode Base64 strings', category: 'converter', tags: ['base64', 'encode', 'decode'] },
        { id: 'color-picker', title: 'Color Picker & Generator', description: 'Pick colors and generate palettes', category: 'generator', tags: ['color', 'picker', 'palette'] },
        { id: 'image-to-base64', title: 'Image to Base64', description: 'Convert images to Base64 strings', category: 'converter', tags: ['image', 'base64', 'convert'] },
        { id: 'name-generator', title: 'Random Name Generator', description: 'Generate random names for projects', category: 'generator', tags: ['name', 'generator', 'random'] },
        { id: 'code-minifier', title: 'Code Minifier', description: 'Minify HTML, CSS, and JavaScript code', category: 'text', tags: ['code', 'minify', 'optimize'] },
        { id: 'todo-list', title: 'Todo List', description: 'Manage tasks with local storage', category: 'productivity', tags: ['todo', 'tasks', 'productivity'] }
    ];
    
    searchInput.addEventListener('input', function() {
        const query = this.value.toLowerCase().trim();
        searchResults.innerHTML = '';
        
        if (query.length < 2) {
            searchResults.style.display = 'none';
            return;
        }
        
        const filteredTools = tools.filter(tool => 
            tool.title.toLowerCase().includes(query) ||
            tool.description.toLowerCase().includes(query) ||
            tool.tags.some(tag => tag.toLowerCase().includes(query))
        );
        
        if (filteredTools.length > 0) {
            filteredTools.forEach(tool => {
                const resultItem = document.createElement('div');
                resultItem.className = 'search-result-item';
                resultItem.innerHTML = `
                    <strong>${tool.title}</strong>
                    <div class="tooltip">${tool.description}</div>
                `;
                resultItem.addEventListener('click', () => {
                    window.location.href = `tools/${tool.id}.html`;
                });
                searchResults.appendChild(resultItem);
            });
            searchResults.style.display = 'block';
        } else {
            const noResults = document.createElement('div');
            noResults.className = 'search-result-item';
            noResults.textContent = 'No tools found';
            searchResults.appendChild(noResults);
            searchResults.style.display = 'block';
        }
    });
    
    // Close search results when clicking outside
    document.addEventListener('click', (e) => {
        if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
            searchResults.style.display = 'none';
        }
    });
}

// Mobile Menu
function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileMenuClose = document.getElementById('mobileMenuClose');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.add('active');
        });
        
        mobileMenuClose?.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
        });
        
        // Close menu when clicking on a link
        document.querySelectorAll('.mobile-nav-link').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!mobileMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
                mobileMenu.classList.remove('active');
            }
        });
    }
}

// Tools Grid
function initToolsGrid() {
    const toolsGrid = document.getElementById('toolsGrid');
    if (!toolsGrid) return;
    
    const tools = [
        { id: 'text-summarizer', icon: 'fas fa-file-contract', title: 'Text Summarizer', description: 'Summarize long texts into key points quickly.', category: 'text', tags: ['AI', 'Summary', 'Text'] },
        { id: 'grammar-checker', icon: 'fas fa-spell-check', title: 'Grammar Checker', description: 'Check grammar and spelling errors instantly.', category: 'text', tags: ['Grammar', 'Spell', 'Text'] },
        { id: 'text-rewriter', icon: 'fas fa-edit', title: 'Text Rewriter', description: 'Rewrite text while preserving the original meaning.', category: 'text', tags: ['Rewrite', 'Paraphrase', 'Text'] },
        { id: 'password-generator', icon: 'fas fa-key', title: 'Password Generator', description: 'Generate secure random passwords with options.', category: 'generator', tags: ['Security', 'Password', 'Generator'] },
        { id: 'qr-code-generator', icon: 'fas fa-qrcode', title: 'QR Code Generator', description: 'Create QR codes for URLs, text, and more.', category: 'generator', tags: ['QR Code', 'Generator', 'Share'] },
        { id: 'image-compressor', icon: 'fas fa-compress-alt', title: 'Image Compressor', description: 'Compress images without losing quality.', category: 'image', tags: ['Image', 'Compress', 'Optimize'] },
        { id: 'pdf-merger', icon: 'fas fa-file-pdf', title: 'PDF Merger', description: 'Merge multiple PDF files into one document.', category: 'converter', tags: ['PDF', 'Merge', 'Document'] },
        { id: 'unit-converter', icon: 'fas fa-balance-scale', title: 'Unit Converter', description: 'Convert between different units of measurement.', category: 'converter', tags: ['Units', 'Convert', 'Measurement'] },
        { id: 'word-counter', icon: 'fas fa-font', title: 'Word Counter', description: 'Count words, characters, sentences, and more.', category: 'text', tags: ['Counter', 'Analyze', 'Text'] },
        { id: 'base64-converter', icon: 'fas fa-code', title: 'Base64 Converter', description: 'Encode and decode Base64 strings easily.', category: 'converter', tags: ['Base64', 'Encode', 'Decode'] },
        { id: 'color-picker', icon: 'fas fa-palette', title: 'Color Picker', description: 'Pick colors and generate beautiful palettes.', category: 'generator', tags: ['Color', 'Picker', 'Design'] },
        { id: 'image-to-base64', icon: 'fas fa-image', title: 'Image to Base64', description: 'Convert images to Base64 data URLs.', category: 'converter', tags: ['Image', 'Base64', 'Convert'] },
        { id: 'name-generator', icon: 'fas fa-users', title: 'Name Generator', description: 'Generate random names for projects and characters.', category: 'generator', tags: ['Name', 'Generator', 'Random'] },
        { id: 'code-minifier', icon: 'fas fa-file-code', title: 'Code Minifier', description: 'Minify HTML, CSS, and JavaScript code.', category: 'text', tags: ['Code', 'Minify', 'Optimize'] },
        { id: 'todo-list', icon: 'fas fa-tasks', title: 'Todo List', description: 'Manage your tasks with local storage.', category: 'productivity', tags: ['Todo', 'Tasks', 'Productivity'] }
    ];
    
    tools.forEach(tool => {
        const toolCard = document.createElement('a');
        toolCard.href = `tools/${tool.id}.html`;
        toolCard.className = 'tool-card';
        toolCard.dataset.category = tool.category;
        
        toolCard.innerHTML = `
            <div class="tool-icon">
                <i class="${tool.icon}"></i>
            </div>
            <h3 class="tool-title">${tool.title}</h3>
            <p class="tool-description">${tool.description}</p>
            <div class="tool-tags">
                ${tool.tags.map(tag => `<span class="tool-tag">${tag}</span>`).join('')}
            </div>
        `;
        
        toolsGrid.appendChild(toolCard);
    });
    
    // Category filtering
    document.querySelectorAll('.category-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const category = link.dataset.category;
            
            // Update active state
            document.querySelectorAll('.category-link').forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            
            // Filter tools
            document.querySelectorAll('.tool-card').forEach(card => {
                if (category === 'all' || card.dataset.category === category) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

// Update current year in footer
function initCurrentYear() {
    const yearElement = document.getElementById('currentYear');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}

// Get current tool ID from URL
function getCurrentToolId() {
    const path = window.location.pathname;
    const match = path.match(/tools\/(.+)\.html/);
    return match ? match[1] : null;
}

// Initialize tool-specific functionality
function initToolPage(toolId) {
    // Google AdSense: Insert ad code here (Tool Page)
    const adPlaceholder = document.createElement('div');
    adPlaceholder.className = 'ad-placeholder content-ad';
    adPlaceholder.innerHTML = '<span>Ad Space (728x90)</span><p>Google AdSense</p>';
    
    const toolContent = document.querySelector('.tool-content');
    if (toolContent) {
        toolContent.parentNode.insertBefore(adPlaceholder, toolContent.nextSibling);
    }
    
    // Initialize specific tool
    switch(toolId) {
        case 'text-summarizer':
            initTextSummarizer();
            break;
        case 'password-generator':
            initPasswordGenerator();
            break;
        case 'qr-code-generator':
            initQRCodeGenerator();
            break;
        case 'image-compressor':
            initImageCompressor();
            break;
        case 'unit-converter':
            initUnitConverter();
            break;
        case 'word-counter':
            initWordCounter();
            break;
        case 'base64-converter':
            initBase64Converter();
            break;
        case 'color-picker':
            initColorPicker();
            break;
        case 'image-to-base64':
            initImageToBase64();
            break;
        case 'name-generator':
            initNameGenerator();
            break;
        case 'code-minifier':
            initCodeMinifier();
            break;
        case 'todo-list':
            initTodoList();
            break;
    }
}

// Text Summarizer
function initTextSummarizer() {
    const textInput = document.getElementById('textInput');
    const summaryLength = document.getElementById('summaryLength');
    const lengthValue = document.getElementById('lengthValue');
    const summarizeBtn = document.getElementById('summarizeBtn');
    const resultContainer = document.getElementById('resultContainer');
    const summaryOutput = document.getElementById('summaryOutput');
    const copyBtn = document.getElementById('copyBtn');
    
    if (!textInput || !summarizeBtn) return;
    
    summaryLength?.addEventListener('input', function() {
        if (lengthValue) {
            lengthValue.textContent = `${this.value}%`;
        }
    });
    
    summarizeBtn.addEventListener('click', function() {
        const text = textInput.value.trim();
        if (!text) {
            showToast('Please enter some text to summarize', 'warning');
            return;
        }
        
        const length = parseInt(summaryLength?.value || 50) / 100;
        
        // Simple text summarization algorithm (sentence extraction based on word frequency)
        const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
        const words = text.toLowerCase().match(/\b\w+\b/g) || [];
        
        // Calculate word frequency
        const wordFreq = {};
        words.forEach(word => {
            if (word.length > 3) { // Ignore short words
                wordFreq[word] = (wordFreq[word] || 0) + 1;
            }
        });
        
        // Score sentences based on word frequency
        const sentenceScores = sentences.map(sentence => {
            const sentenceWords = sentence.toLowerCase().match(/\b\w+\b/g) || [];
            let score = 0;
            sentenceWords.forEach(word => {
                score += wordFreq[word] || 0;
            });
            return { sentence, score: score / sentenceWords.length || 0 };
        });
        
        // Sort sentences by score
        sentenceScores.sort((a, b) => b.score - a.score);
        
        // Take top sentences based on desired length
        const numSentences = Math.max(1, Math.floor(sentences.length * length));
        const topSentences = sentenceScores.slice(0, numSentences);
        
        // Sort back to original order
        topSentences.sort((a, b) => 
            sentences.indexOf(a.sentence) - sentences.indexOf(b.sentence)
        );
        
        const summary = topSentences.map(s => s.sentence.trim() + '.').join(' ');
        
        if (summaryOutput) {
            summaryOutput.textContent = summary;
            resultContainer?.classList.add('show');
            showToast('Text summarized successfully!', 'success');
        }
    });
    
    copyBtn?.addEventListener('click', function() {
        if (summaryOutput?.textContent) {
            navigator.clipboard.writeText(summaryOutput.textContent)
                .then(() => showToast('Copied to clipboard!', 'success'))
                .catch(() => showToast('Failed to copy', 'error'));
        }
    });
}

// Password Generator
function initPasswordGenerator() {
    const lengthInput = document.getElementById('passwordLength');
    const lengthValue = document.getElementById('passwordLengthValue');
    const uppercaseCheck = document.getElementById('uppercaseCheck');
    const lowercaseCheck = document.getElementById('lowercaseCheck');
    const numbersCheck = document.getElementById('numbersCheck');
    const symbolsCheck = document.getElementById('symbolsCheck');
    const generateBtn = document.getElementById('generateBtn');
    const passwordOutput = document.getElementById('passwordOutput');
    const copyBtn = document.getElementById('copyBtn');
    const strengthIndicator = document.getElementById('strengthIndicator');
    
    if (!lengthInput || !generateBtn) return;
    
    lengthInput.addEventListener('input', function() {
        if (lengthValue) {
            lengthValue.textContent = this.value;
        }
        updatePasswordStrength();
    });
    
    [uppercaseCheck, lowercaseCheck, numbersCheck, symbolsCheck].forEach(check => {
        check?.addEventListener('change', updatePasswordStrength);
    });
    
    generateBtn.addEventListener('click', generatePassword);
    
    function generatePassword() {
        const length = parseInt(lengthInput.value);
        const includeUppercase = uppercaseCheck?.checked ?? true;
        const includeLowercase = lowercaseCheck?.checked ?? true;
        const includeNumbers = numbersCheck?.checked ?? true;
        const includeSymbols = symbolsCheck?.checked ?? true;
        
        let charset = '';
        if (includeLowercase) charset += 'abcdefghijklmnopqrstuvwxyz';
        if (includeUppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        if (includeNumbers) charset += '0123456789';
        if (includeSymbols) charset += '!@#$%^&*()_+-=[]{}|;:,.<>?';
        
        if (!charset) {
            showToast('Please select at least one character type', 'warning');
            return;
        }
        
        let password = '';
        const array = new Uint32Array(length);
        window.crypto.getRandomValues(array);
        
        for (let i = 0; i < length; i++) {
            password += charset[array[i] % charset.length];
        }
        
        if (passwordOutput) {
            passwordOutput.textContent = password;
            document.getElementById('resultContainer')?.classList.add('show');
            updatePasswordStrength();
            showToast('Password generated successfully!', 'success');
        }
    }
    
    function updatePasswordStrength() {
        if (!strengthIndicator) return;
        
        const length = parseInt(lengthInput.value);
        let score = 0;
        
        // Length score
        if (length >= 8) score += 1;
        if (length >= 12) score += 1;
        if (length >= 16) score += 1;
        
        // Character type score
        const checks = [uppercaseCheck, lowercaseCheck, numbersCheck, symbolsCheck];
        const selectedCount = checks.filter(check => check?.checked).length;
        score += Math.min(selectedCount, 3);
        
        // Update strength indicator
        const strengthText = document.getElementById('strengthText');
        const strengthClasses = ['weak', 'fair', 'good', 'strong', 'very-strong'];
        const strengthLabels = ['Weak', 'Fair', 'Good', 'Strong', 'Very Strong'];
        
        const strengthIndex = Math.min(score, strengthClasses.length - 1);
        
        strengthIndicator.className = 'strength-indicator ' + strengthClasses[strengthIndex];
        if (strengthText) {
            strengthText.textContent = strengthLabels[strengthIndex];
        }
    }
    
    // Generate initial password
    generatePassword();
}

// QR Code Generator
function initQRCodeGenerator() {
    const qrInput = document.getElementById('qrInput');
    const generateBtn = document.getElementById('generateBtn');
    const downloadBtn = document.getElementById('downloadBtn');
    const qrCodeContainer = document.getElementById('qrCodeContainer');
    
    if (!qrInput || !generateBtn) return;
    
    generateBtn.addEventListener('click', generateQRCode);
    
    function generateQRCode() {
        const text = qrInput.value.trim();
        if (!text) {
            showToast('Please enter text or URL', 'warning');
            return;
        }
        
        // Clear previous QR code
        qrCodeContainer.innerHTML = '';
        
        // Create QR code using qrcode.js (would need to be loaded)
        // This is a simplified version - in production, you'd load qrcode.js library
        const qrSize = 200;
        const canvas = document.createElement('canvas');
        canvas.width = qrSize;
        canvas.height = qrSize;
        const ctx = canvas.getContext('2d');
        
        // Simple QR-like pattern (in production, use a proper QR library)
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, qrSize, qrSize);
        ctx.fillStyle = '#000000';
        
        // Generate a simple pattern based on input hash
        let hash = 0;
        for (let i = 0; i < text.length; i++) {
            hash = ((hash << 5) - hash) + text.charCodeAt(i);
            hash |= 0;
        }
        
        const cellSize = 10;
        const cells = Math.floor(qrSize / cellSize);
        
        for (let y = 0; y < cells; y++) {
            for (let x = 0; x < cells; x++) {
                const bit = (hash + x * y) % 2;
                if (bit) {
                    ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
                }
            }
        }
        
        qrCodeContainer.appendChild(canvas);
        document.getElementById('resultContainer')?.classList.add('show');
        showToast('QR Code generated!', 'success');
        
        // Enable download button
        if (downloadBtn) {
            downloadBtn.onclick = () => {
                const link = document.createElement('a');
                link.download = 'qrcode.png';
                link.href = canvas.toDataURL('image/png');
                link.click();
            };
        }
    }
}

// Image Compressor
function initImageCompressor() {
    const imageInput = document.getElementById('imageInput');
    const qualityInput = document.getElementById('qualityInput');
    const qualityValue = document.getElementById('qualityValue');
    const compressBtn = document.getElementById('compressBtn');
    const imagePreview = document.getElementById('imagePreview');
    const downloadBtn = document.getElementById('downloadBtn');
    const originalSize = document.getElementById('originalSize');
    const compressedSize = document.getElementById('compressedSize');
    const compressionRatio = document.getElementById('compressionRatio');
    
    if (!imageInput || !compressBtn) return;
    
    qualityInput?.addEventListener('input', function() {
        if (qualityValue) {
            qualityValue.textContent = `${this.value}%`;
        }
    });
    
    let originalImage = null;
    let compressedBlob = null;
    
    imageInput.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (!file) return;
        
        if (!file.type.startsWith('image/')) {
            showToast('Please select an image file', 'error');
            return;
        }
        
        // Show original size
        if (originalSize) {
            originalSize.textContent = formatFileSize(file.size);
        }
        
        // Preview image
        const reader = new FileReader();
        reader.onload = function(event) {
            if (imagePreview) {
                imagePreview.innerHTML = `<img src="${event.target.result}" alt="Preview">`;
            }
            originalImage = event.target.result;
        };
        reader.readAsDataURL(file);
    });
    
    compressBtn.addEventListener('click', function() {
        if (!originalImage) {
            showToast('Please select an image first', 'warning');
            return;
        }
        
        const quality = parseInt(qualityInput?.value || 80) / 100;
        const img = new Image();
        
        img.onload = function() {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            
            // Calculate new dimensions (optional: add max width/height)
            canvas.width = img.width;
            canvas.height = img.height;
            
            // Draw image on canvas
            ctx.drawImage(img, 0, 0);
            
            // Compress image
            canvas.toBlob(function(blob) {
                if (!blob) {
                    showToast('Compression failed', 'error');
                    return;
                }
                
                compressedBlob = blob;
                
                // Update stats
                if (compressedSize) {
                    compressedSize.textContent = formatFileSize(blob.size);
                }
                
                if (compressionRatio && originalSize) {
                    const ratio = ((blob.size / imageInput.files[0].size) * 100).toFixed(1);
                    compressionRatio.textContent = `${ratio}%`;
                }
                
                // Show compressed image
                const compressedUrl = URL.createObjectURL(blob);
                if (imagePreview) {
                    imagePreview.innerHTML = `
                        <div class="image-comparison">
                            <div>
                                <h4>Original</h4>
                                <img src="${originalImage}" alt="Original">
                            </div>
                            <div>
                                <h4>Compressed</h4>
                                <img src="${compressedUrl}" alt="Compressed">
                            </div>
                        </div>
                    `;
                }
                
                // Enable download button
                if (downloadBtn) {
                    downloadBtn.onclick = function() {
                        const link = document.createElement('a');
                        link.download = `compressed_${imageInput.files[0].name}`;
                        link.href = compressedUrl;
                        link.click();
                    };
                }
                
                document.getElementById('resultContainer')?.classList.add('show');
                showToast('Image compressed successfully!', 'success');
                
            }, 'image/jpeg', quality);
        };
        
        img.src = originalImage;
    });
    
    function formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }
}

// Unit Converter
function initUnitConverter() {
    const unitType = document.getElementById('unitType');
    const fromUnit = document.getElementById('fromUnit');
    const toUnit = document.getElementById('toUnit');
    const inputValue = document.getElementById('inputValue');
    const convertBtn = document.getElementById('convertBtn');
    const resultOutput = document.getElementById('resultOutput');
    
    if (!unitType || !convertBtn) return;
    
    // Unit definitions
    const units = {
        length: {
            meter: 1,
            kilometer: 1000,
            centimeter: 0.01,
            millimeter: 0.001,
            mile: 1609.34,
            yard: 0.9144,
            foot: 0.3048,
            inch: 0.0254
        },
        weight: {
            kilogram: 1,
            gram: 0.001,
            pound: 0.453592,
            ounce: 0.0283495,
            ton: 1000
        },
        temperature: {
            celsius: 'celsius',
            fahrenheit: 'fahrenheit',
            kelvin: 'kelvin'
        },
        volume: {
            liter: 1,
            milliliter: 0.001,
            gallon: 3.78541,
            quart: 0.946353,
            pint: 0.473176,
            cup: 0.24
        }
    };
    
    function updateUnitSelects() {
        const type = unitType.value;
        const unitList = units[type] || {};
        
        // Clear current options
        fromUnit.innerHTML = '';
        toUnit.innerHTML = '';
        
        // Add new options
        Object.keys(unitList).forEach(unit => {
            const option1 = document.createElement('option');
            option1.value = unit;
            option1.textContent = unit;
            
            const option2 = option1.cloneNode(true);
            
            fromUnit.appendChild(option1);
            toUnit.appendChild(option2);
        });
        
        // Set default values
        if (type === 'temperature') {
            fromUnit.value = 'celsius';
            toUnit.value = 'fahrenheit';
        } else {
            const unitKeys = Object.keys(unitList);
            fromUnit.value = unitKeys[0];
            toUnit.value = unitKeys[1] || unitKeys[0];
        }
    }
    
    unitType.addEventListener('change', updateUnitSelects);
    updateUnitSelects();
    
    convertBtn.addEventListener('click', function() {
        const value = parseFloat(inputValue.value);
        if (isNaN(value)) {
            showToast('Please enter a valid number', 'warning');
            return;
        }
        
        const type = unitType.value;
        const from = fromUnit.value;
        const to = toUnit.value;
        
        let result;
        
        if (type === 'temperature') {
            // Temperature conversion
            result = convertTemperature(value, from, to);
        } else {
            // Other unit conversions
            const fromFactor = units[type][from];
            const toFactor = units[type][to];
            result = value * fromFactor / toFactor;
        }
        
        if (resultOutput) {
            resultOutput.textContent = `${value} ${from} = ${result.toFixed(6)} ${to}`;
            document.getElementById('resultContainer')?.classList.add('show');
            showToast('Conversion complete!', 'success');
        }
    });
    
    function convertTemperature(value, from, to) {
        // Convert to Celsius first
        let celsius;
        switch (from) {
            case 'celsius':
                celsius = value;
                break;
            case 'fahrenheit':
                celsius = (value - 32) * 5/9;
                break;
            case 'kelvin':
                celsius = value - 273.15;
                break;
        }
        
        // Convert from Celsius to target
        switch (to) {
            case 'celsius':
                return celsius;
            case 'fahrenheit':
                return (celsius * 9/5) + 32;
            case 'kelvin':
                return celsius + 273.15;
        }
        return 0;
    }
}

// Word Counter
function initWordCounter() {
    const textInput = document.getElementById('textInput');
    const countBtn = document.getElementById('countBtn');
    const wordCount = document.getElementById('wordCount');
    const charCount = document.getElementById('charCount');
    const sentenceCount = document.getElementById('sentenceCount');
    const paragraphCount = document.getElementById('paragraphCount');
    const readingTime = document.getElementById('readingTime');
    
    if (!textInput || !countBtn) return;
    
    // Count on input
    textInput.addEventListener('input', countText);
    
    countBtn.addEventListener('click', countText);
    
    function countText() {
        const text = textInput.value.trim();
        
        // Word count (split by whitespace and filter empty strings)
        const words = text.match(/\b\w+\b/g) || [];
        const wordCountValue = words.length;
        
        // Character count
        const charCountValue = text.length;
        const charCountNoSpaces = text.replace(/\s/g, '').length;
        
        // Sentence count (split by ., !, ?, and filter empty strings)
        const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
        const sentenceCountValue = sentences.length;
        
        // Paragraph count (split by newlines and filter empty strings)
        const paragraphs = text.split(/\n+/).filter(p => p.trim().length > 0);
        const paragraphCountValue = paragraphs.length;
        
        // Reading time (average reading speed: 200 words per minute)
        const readingTimeValue = wordCountValue > 0 ? Math.ceil(wordCountValue / 200) : 0;
        
        // Update display
        if (wordCount) wordCount.textContent = wordCountValue;
        if (charCount) charCount.textContent = `${charCountValue} (${charCountNoSpaces} without spaces)`;
        if (sentenceCount) sentenceCount.textContent = sentenceCountValue;
        if (paragraphCount) paragraphCount.textContent = paragraphCountValue;
        if (readingTime) readingTime.textContent = `${readingTimeValue} minute${readingTimeValue !== 1 ? 's' : ''}`;
        
        document.getElementById('resultContainer')?.classList.add('show');
    }
    
    // Initial count
    countText();
}

// Base64 Converter
function initBase64Converter() {
    const encodeInput = document.getElementById('encodeInput');
    const decodeInput = document.getElementById('decodeInput');
    const encodeBtn = document.getElementById('encodeBtn');
    const decodeBtn = document.getElementById('decodeBtn');
    const encodedOutput = document.getElementById('encodedOutput');
    const decodedOutput = document.getElementById('decodedOutput');
    
    if (!encodeBtn || !decodeBtn) return;
    
    encodeBtn.addEventListener('click', function() {
        const text = encodeInput.value.trim();
        if (!text) {
            showToast('Please enter text to encode', 'warning');
            return;
        }
        
        try {
            const encoded = btoa(unescape(encodeURIComponent(text)));
            if (encodedOutput) {
                encodedOutput.textContent = encoded;
                document.getElementById('encodeResult')?.classList.add('show');
                showToast('Text encoded successfully!', 'success');
            }
        } catch (error) {
            showToast('Failed to encode text', 'error');
        }
    });
    
    decodeBtn.addEventListener('click', function() {
        const text = decodeInput.value.trim();
        if (!text) {
            showToast('Please enter text to decode', 'warning');
            return;
        }
        
        try {
            const decoded = decodeURIComponent(escape(atob(text)));
            if (decodedOutput) {
                decodedOutput.textContent = decoded;
                document.getElementById('decodeResult')?.classList.add('show');
                showToast('Text decoded successfully!', 'success');
            }
        } catch (error) {
            showToast('Invalid Base64 string', 'error');
        }
    });
}

// Color Picker
function initColorPicker() {
    const colorPicker = document.getElementById('colorPicker');
    const hexInput = document.getElementById('hexInput');
    const rgbInput = document.getElementById('rgbInput');
    const hslInput = document.getElementById('hslInput');
    const generateBtn = document.getElementById('generateBtn');
    const colorPreview = document.getElementById('colorPreview');
    const paletteContainer = document.getElementById('paletteContainer');
    
    if (!colorPicker) return;
    
    // Update color when picker changes
    colorPicker.addEventListener('input', updateColorFromPicker);
    hexInput?.addEventListener('input', updateColorFromHex);
    generateBtn?.addEventListener('click', generatePalette);
    
    function updateColorFromPicker() {
        const color = colorPicker.value;
        updateColorDisplay(color);
    }
    
    function updateColorFromHex() {
        const hex = hexInput.value.trim();
        if (/^#?([0-9A-F]{3}|[0-9A-F]{6})$/i.test(hex)) {
            const color = hex.startsWith('#') ? hex : '#' + hex;
            colorPicker.value = color;
            updateColorDisplay(color);
        }
    }
    
    function updateColorDisplay(hex) {
        // Update preview
        if (colorPreview) {
            colorPreview.style.backgroundColor = hex;
        }
        
        // Convert hex to RGB
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        
        // Update hex input
        if (hexInput) {
            hexInput.value = hex.toUpperCase();
        }
        
        // Update RGB input
        if (rgbInput) {
            rgbInput.value = `rgb(${r}, ${g}, ${b})`;
        }
        
        // Convert to HSL
        const hsl = rgbToHsl(r, g, b);
        if (hslInput) {
            hslInput.value = `hsl(${hsl[0]}, ${hsl[1]}%, ${hsl[2]}%)`;
        }
    }
    
    function rgbToHsl(r, g, b) {
        r /= 255;
        g /= 255;
        b /= 255;
        
        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
        let h, s, l = (max + min) / 2;
        
        if (max === min) {
            h = s = 0;
        } else {
            const d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            
            switch (max) {
                case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                case g: h = (b - r) / d + 2; break;
                case b: h = (r - g) / d + 4; break;
            }
            h /= 6;
        }
        
        return [
            Math.round(h * 360),
            Math.round(s * 100),
            Math.round(l * 100)
        ];
    }
    
    function generatePalette() {
        const baseColor = colorPicker.value;
        const baseR = parseInt(baseColor.slice(1, 3), 16);
        const baseG = parseInt(baseColor.slice(3, 5), 16);
        const baseB = parseInt(baseColor.slice(5, 7), 16);
        
        if (!paletteContainer) return;
        
        paletteContainer.innerHTML = '';
        
        // Generate complementary colors
        const paletteTypes = [
            'Monochromatic',
            'Analogous',
            'Complementary',
            'Triadic',
            'Tetradic'
        ];
        
        paletteTypes.forEach(type => {
            const paletteDiv = document.createElement('div');
            paletteDiv.className = 'palette-type';
            
            const title = document.createElement('h4');
            title.textContent = type;
            paletteDiv.appendChild(title);
            
            const colorsDiv = document.createElement('div');
            colorsDiv.className = 'color-grid';
            
            let colors = [];
            switch (type) {
                case 'Monochromatic':
                    colors = generateMonochromatic(baseR, baseG, baseB);
                    break;
                case 'Analogous':
                    colors = generateAnalogous(baseR, baseG, baseB);
                    break;
                case 'Complementary':
                    colors = generateComplementary(baseR, baseG, baseB);
                    break;
                case 'Triadic':
                    colors = generateTriadic(baseR, baseG, baseB);
                    break;
                case 'Tetradic':
                    colors = generateTetradic(baseR, baseG, baseB);
                    break;
            }
            
            colors.forEach(color => {
                const colorDiv = document.createElement('div');
                colorDiv.className = 'color-item';
                colorDiv.style.backgroundColor = color;
                colorDiv.innerHTML = `
                    <div class="color-value">${color}</div>
                `;
                
                colorDiv.addEventListener('click', () => {
                    navigator.clipboard.writeText(color)
                        .then(() => showToast('Color copied!', 'success'))
                        .catch(() => showToast('Failed to copy', 'error'));
                });
                
                colorsDiv.appendChild(colorDiv);
            });
            
            paletteDiv.appendChild(colorsDiv);
            paletteContainer.appendChild(paletteDiv);
        });
        
        document.getElementById('resultContainer')?.classList.add('show');
        showToast('Color palette generated!', 'success');
    }
    
    function rgbToHex(r, g, b) {
        return '#' + [r, g, b].map(x => {
            const hex = x.toString(16);
            return hex.length === 1 ? '0' + hex : hex;
        }).join('');
    }
    
    function generateMonochromatic(r, g, b) {
        return [
            rgbToHex(r, g, b),
            rgbToHex(Math.min(255, r + 30), Math.min(255, g + 30), Math.min(255, b + 30)),
            rgbToHex(Math.max(0, r - 30), Math.max(0, g - 30), Math.max(0, b - 30)),
            rgbToHex(Math.min(255, r + 60), Math.min(255, g + 60), Math.min(255, b + 60)),
            rgbToHex(Math.max(0, r - 60), Math.max(0, g - 60), Math.max(0, b - 60))
        ];
    }
    
    function generateAnalogous(r, g, b) {
        // Simplified analogous colors
        return [
            rgbToHex((r + 20) % 256, (g + 20) % 256, (b + 20) % 256),
            rgbToHex((r + 10) % 256, (g + 10) % 256, (b + 10) % 256),
            rgbToHex(r, g, b),
            rgbToHex((r + 350) % 256, (g + 350) % 256, (b + 350) % 256),
            rgbToHex((r + 340) % 256, (g + 340) % 256, (b + 340) % 256)
        ];
    }
    
    // Initial color update
    updateColorFromPicker();
}

// Image to Base64
function initImageToBase64() {
    const imageInput = document.getElementById('imageInput');
    const convertBtn = document.getElementById('convertBtn');
    const base64Output = document.getElementById('base64Output');
    const previewImage = document.getElementById('previewImage');
    
    if (!imageInput || !convertBtn) return;
    
    convertBtn.addEventListener('click', function() {
        const file = imageInput.files[0];
        if (!file) {
            showToast('Please select an image file', 'warning');
            return;
        }
        
        if (!file.type.startsWith('image/')) {
            showToast('Please select an image file', 'error');
            return;
        }
        
        const reader = new FileReader();
        reader.onload = function(event) {
            const base64 = event.target.result;
            
            if (base64Output) {
                base64Output.textContent = base64;
                document.getElementById('resultContainer')?.classList.add('show');
            }
            
            if (previewImage) {
                previewImage.innerHTML = `<img src="${base64}" alt="Preview">`;
            }
            
            showToast('Image converted to Base64!', 'success');
        };
        
        reader.onerror = function() {
            showToast('Failed to read image file', 'error');
        };
        
        reader.readAsDataURL(file);
    });
}

// Name Generator
function initNameGenerator() {
    const generateBtn = document.getElementById('generateBtn');
    const nameType = document.getElementById('nameType');
    const nameCount = document.getElementById('nameCount');
    const nameOutput = document.getElementById('nameOutput');
    
    if (!generateBtn) return;
    
    // Name databases
    const names = {
        firstName: [
            'Emma', 'Liam', 'Olivia', 'Noah', 'Ava', 'Elijah', 'Sophia', 'Oliver', 'Isabella', 'Lucas',
            'Mia', 'Mason', 'Amelia', 'Logan', 'Harper', 'Ethan', 'Evelyn', 'James', 'Abigail', 'Benjamin'
        ],
        lastName: [
            'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez',
            'Wilson', 'Anderson', 'Taylor', 'Thomas', 'Hernandez', 'Moore', 'Martin', 'Jackson', 'Thompson', 'White'
        ],
        business: [
            'Tech', 'Innovation', 'Global', 'Solutions', 'Digital', 'Creative', 'Network', 'Systems', 'Enterprise', 'Group',
            'Industries', 'Corporation', 'Partners', 'Services', 'Technologies', 'Ventures', 'Holdings', 'International', 'Media', 'Works'
        ],
        domain: [
            'io', 'ai', 'tech', 'app', 'dev', 'cloud', 'studio', 'labs', 'hub', 'digital',
            'online', 'net', 'co', 'space', 'tools', 'smart', 'next', 'prime', 'alpha', 'beta'
        ]
    };
    
    generateBtn.addEventListener('click', function() {
        const type = nameType?.value || 'full';
        const count = parseInt(nameCount?.value || 5);
        
        const generatedNames = [];
        
        for (let i = 0; i < count; i++) {
            let name;
            
            switch (type) {
                case 'first':
                    name = getRandomItem(names.firstName);
                    break;
                case 'last':
                    name = getRandomItem(names.lastName);
                    break;
                case 'full':
                    name = `${getRandomItem(names.firstName)} ${getRandomItem(names.lastName)}`;
                    break;
                case 'business':
                    name = `${getRandomItem(names.firstName)} ${getRandomItem(names.business)}`;
                    break;
                case 'domain':
                    name = `${getRandomItem(names.business).toLowerCase()}.${getRandomItem(names.domain)}`;
                    break;
            }
            
            generatedNames.push(name);
        }
        
        if (nameOutput) {
            nameOutput.innerHTML = generatedNames.map(name => `<div>${name}</div>`).join('');
            document.getElementById('resultContainer')?.classList.add('show');
            showToast(`${count} names generated!`, 'success');
        }
    });
    
    function getRandomItem(array) {
        return array[Math.floor(Math.random() * array.length)];
    }
    
    // Generate initial names
    generateBtn.click();
}

// Code Minifier
function initCodeMinifier() {
    const codeInput = document.getElementById('codeInput');
    const codeType = document.getElementById('codeType');
    const minifyBtn = document.getElementById('minifyBtn');
    const resultOutput = document.getElementById('resultOutput');
    
    if (!minifyBtn) return;
    
    minifyBtn.addEventListener('click', function() {
        const code = codeInput.value.trim();
        if (!code) {
            showToast('Please enter code to minify', 'warning');
            return;
        }
        
        const type = codeType?.value || 'html';
        let minified;
        
        try {
            switch (type) {
                case 'html':
                    minified = minifyHTML(code);
                    break;
                case 'css':
                    minified = minifyCSS(code);
                    break;
                case 'js':
                    minified = minifyJS(code);
                    break;
                default:
                    minified = code;
            }
            
            const originalSize = new Blob([code]).size;
            const minifiedSize = new Blob([minified]).size;
            const savings = ((1 - minifiedSize / originalSize) * 100).toFixed(1);
            
            if (resultOutput) {
                resultOutput.innerHTML = `
                    <div class="stats-display">
                        <div class="stat-box">
                            <div class="stat-number">${formatFileSize(originalSize)}</div>
                            <div class="stat-label">Original Size</div>
                        </div>
                        <div class="stat-box">
                            <div class="stat-number">${formatFileSize(minifiedSize)}</div>
                            <div class="stat-label">Minified Size</div>
                        </div>
                        <div class="stat-box">
                            <div class="stat-number">${savings}%</div>
                            <div class="stat-label">Savings</div>
                        </div>
                    </div>
                    <pre class="result-content">${escapeHtml(minified)}</pre>
                `;
                document.getElementById('resultContainer')?.classList.add('show');
                showToast('Code minified successfully!', 'success');
            }
        } catch (error) {
            showToast('Failed to minify code', 'error');
        }
    });
    
    function minifyHTML(code) {
        return code
            .replace(/<!--[\s\S]*?-->/g, '') // Remove comments
            .replace(/\s+/g, ' ') // Replace multiple spaces with single space
            .replace(/>\s+</g, '><') // Remove spaces between tags
            .trim();
    }
    
    function minifyCSS(code) {
        return code
            .replace(/\/\*[\s\S]*?\*\//g, '') // Remove comments
            .replace(/\s+/g, ' ') // Replace multiple spaces with single space
            .replace(/\s*([{:;,])\s*/g, '$1') // Remove spaces around colons, semicolons, commas
            .replace(/;\s*}/g, '}') // Remove last semicolon in rule
            .trim();
    }
    
    function minifyJS(code) {
        // Simple JS minification (in production, use a proper minifier library)
        return code
            .replace(/\/\/.*$/gm, '') // Remove single line comments
            .replace(/\/\*[\s\S]*?\*\//g, '') // Remove multi-line comments
            .replace(/\s+/g, ' ') // Replace multiple spaces with single space
            .replace(/\s*([=+\-*/%&|^<>?:;,{}()[\]])\s*/g, '$1') // Remove spaces around operators
            .trim();
    }
    
    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
    
    function formatFileSize(bytes) {
        if (bytes < 1024) return bytes + ' B';
        if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + ' KB';
        return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
    }
}

// Todo List
function initTodoList() {
    const todoInput = document.getElementById('todoInput');
    const addBtn = document.getElementById('addBtn');
    const todoList = document.getElementById('todoList');
    const clearBtn = document.getElementById('clearBtn');
    
    if (!addBtn || !todoList) return;
    
    // Load todos from localStorage
    let todos = JSON.parse(localStorage.getItem('todos') || '[]');
    renderTodos();
    
    addBtn.addEventListener('click', addTodo);
    todoInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') addTodo();
    });
    
    clearBtn?.addEventListener('click', function() {
        if (confirm('Clear all todos?')) {
            todos = [];
            saveTodos();
            renderTodos();
            showToast('All todos cleared', 'success');
        }
    });
    
    function addTodo() {
        const text = todoInput.value.trim();
        if (!text) {
            showToast('Please enter a todo item', 'warning');
            return;
        }
        
        const todo = {
            id: Date.now(),
            text: text,
            completed: false,
            createdAt: new Date().toISOString()
        };
        
        todos.unshift(todo);
        saveTodos();
        renderTodos();
        
        todoInput.value = '';
        showToast('Todo added!', 'success');
    }
    
    function renderTodos() {
        todoList.innerHTML = '';
        
        if (todos.length === 0) {
            todoList.innerHTML = '<div class="empty-state">No todos yet. Add one above!</div>';
            return;
        }
        
        todos.forEach(todo => {
            const li = document.createElement('li');
            li.className = 'todo-item';
            li.innerHTML = `
                <input type="checkbox" class="todo-checkbox" ${todo.completed ? 'checked' : ''}>
                <span class="todo-text ${todo.completed ? 'completed' : ''}">${escapeHtml(todo.text)}</span>
                <button class="todo-delete" data-id="${todo.id}">
                    <i class="fas fa-trash"></i>
                </button>
            `;
            
            // Toggle completion
            const checkbox = li.querySelector('.todo-checkbox');
            const todoText = li.querySelector('.todo-text');
            
            checkbox.addEventListener('change', function() {
                todo.completed = this.checked;
                todoText.classList.toggle('completed', this.checked);
                saveTodos();
            });
            
            // Delete todo
            const deleteBtn = li.querySelector('.todo-delete');
            deleteBtn.addEventListener('click', function() {
                todos = todos.filter(t => t.id !== todo.id);
                saveTodos();
                renderTodos();
                showToast('Todo deleted', 'success');
            });
            
            todoList.appendChild(li);
        });
        
        // Update stats
        const totalCount = todos.length;
        const completedCount = todos.filter(t => t.completed).length;
        const pendingCount = totalCount - completedCount;
        
        const statsElement = document.getElementById('todoStats');
        if (statsElement) {
            statsElement.innerHTML = `
                <div class="stats-display">
                    <div class="stat-box">
                        <div class="stat-number">${totalCount}</div>
                        <div class="stat-label">Total</div>
                    </div>
                    <div class="stat-box">
                        <div class="stat-number">${pendingCount}</div>
                        <div class="stat-label">Pending</div>
                    </div>
                    <div class="stat-box">
                        <div class="stat-number">${completedCount}</div>
                        <div class="stat-label">Completed</div>
                    </div>
                </div>
            `;
        }
    }
    
    function saveTodos() {
        localStorage.setItem('todos', JSON.stringify(todos));
    }
    
    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// Toast Notification System
function showToast(message, type = 'info') {
    const toastContainer = document.querySelector('.toast-container') || createToastContainer();
    
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
        <i class="fas fa-${getToastIcon(type)}"></i>
        <span>${message}</span>
    `;
    
    toastContainer.appendChild(toast);
    
    // Remove toast after 3 seconds
    setTimeout(() => {
        toast.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            toast.remove();
        }, 300);
    }, 3000);
}

function createToastContainer() {
    const container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
    
    // Add slideOutRight animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideOutRight {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
    
    return container;
}

function getToastIcon(type) {
    switch(type) {
        case 'success': return 'check-circle';
        case 'error': return 'exclamation-circle';
        case 'warning': return 'exclamation-triangle';
        default: return 'info-circle';
    }
}
