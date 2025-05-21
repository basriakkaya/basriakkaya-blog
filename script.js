document.addEventListener('DOMContentLoaded', () => {
    // Terminal cursor effect for cyber-text
    const cyberText = document.querySelector('.cyber-text');
    setInterval(() => {
        cyberText.style.borderRight = cyberText.style.borderRight ? '' : '2px solid #4af626';
    }, 500);

    // Add glitch effect to profile image on hover
    const profileImg = document.querySelector('.glitch-container');
    profileImg.addEventListener('mouseover', () => {
        profileImg.style.animation = 'glitch 0.3s infinite';
    });
    
    profileImg.addEventListener('mouseout', () => {
        profileImg.style.animation = 'none';
    });

    // Add terminal-style hover effect to links
    const links = document.querySelectorAll('.link-btn');
    links.forEach(link => {
        link.addEventListener('mouseover', () => {
            link.style.transform = 'translateX(5px)';
            link.style.borderColor = '#72ff4a';
        });
        
        link.addEventListener('mouseout', () => {
            link.style.transform = 'translateX(0)';
            link.style.borderColor = '#4af626';
        });
    });

    // Matrix rain effect with improved visibility
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    // Canvas'ı container'dan önce ekleyelim
    const container = document.querySelector('.container');
    document.body.insertBefore(canvas, container);

    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.zIndex = '-1';
    canvas.style.opacity = '0.15'; // Opaklığı artırdık

    // Canvas boyutlarını pencere boyutuna göre ayarla
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        width = canvas.width;
        height = canvas.height;
        // Sütunları yeniden hesapla
        columns = width / fontSize;
        // Damlaları sıfırla
        drops = Array(Math.floor(columns)).fill(1);
        speeds = Array(Math.floor(columns)).fill(0).map(() => Math.random() * 2 + 1);
    }

    let width = canvas.width;
    let height = canvas.height;
    const fontSize = 14;
    let columns;
    let drops;
    let speeds;

    // İlk boyutlandırma
    resizeCanvas();

    const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';

    function draw() {
        // Arka planı temizle
        ctx.fillStyle = 'rgba(10, 12, 15, 0.1)';
        ctx.fillRect(0, 0, width, height);

        // Matrix yağmuru çiz
        for (let i = 0; i < drops.length; i++) {
            const text = chars[Math.floor(Math.random() * chars.length)];
            
            // Karakterlerin parlaklığını rastgele değiştir
            const brightness = Math.random() * 0.5 + 0.5;
            const color = i % 2 === 0 ? 
                `rgba(74, 246, 38, ${brightness})` : 
                `rgba(114, 255, 74, ${brightness})`;
            
            ctx.fillStyle = color;
            ctx.font = `${fontSize}px monospace`;
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);

            // Damla ekranın altına ulaştığında
            if (drops[i] * fontSize > height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            
            // Damlaların hızını güncelle
            drops[i] += speeds[i] * 0.15;
        }
    }

    // Pencere boyutu değiştiğinde canvas'ı yeniden boyutlandır
    window.addEventListener('resize', resizeCanvas);

    // Matrix efektini başlat
    setInterval(draw, 33);

    // Easter Egg - Konami Kodu
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let konamiIndex = 0;

    document.addEventListener('keydown', (e) => {
        // Ctrl+U kombinasyonu için özel mesaj
        if (e.ctrlKey && e.key === 'u') {
            console.log('%c🎮 Easter Egg Bulundu! 🎮', 'color: #4af626; font-size: 20px; font-weight: bold;');
            console.log('%cGizli mesajı buldun! Güvenlik her zaman görünenden daha derindir.', 'color: #4af626;');
        }

        // Konami Kodu kontrolü
        if (e.key === konamiCode[konamiIndex]) {
            konamiIndex++;
            if (konamiIndex === konamiCode.length) {
                activateMatrixRain();
                konamiIndex = 0;
            }
        } else {
            konamiIndex = 0;
        }
    });

    function activateMatrixRain() {
        // Matrix yağmuru efektini yoğunlaştır
        canvas.style.opacity = '0.3';
        const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
        const fontSize = 20;
        const drops = Array(Math.floor(width / fontSize)).fill(1);
        
        // Geçici olarak efekti güçlendir
        const originalDraw = draw;
        draw = () => {
            ctx.fillStyle = 'rgba(10, 12, 15, 0.1)';
            ctx.fillRect(0, 0, width, height);

            ctx.fillStyle = '#4af626';
            ctx.font = `${fontSize}px monospace`;

            for (let i = 0; i < drops.length; i++) {
                const text = chars[Math.floor(Math.random() * chars.length)];
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);

                if (drops[i] * fontSize > height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i] += Math.random() * 2;
            }
        };

        // 5 saniye sonra normal efekte geri dön
        setTimeout(() => {
            draw = originalDraw;
            canvas.style.opacity = '0.15';
        }, 5000);
    }
}); 