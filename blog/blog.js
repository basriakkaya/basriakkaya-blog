document.addEventListener('DOMContentLoaded', () => {
    const postsList = document.getElementById('posts-list');
    const fullPost = document.getElementById('full-post');
    let posts = [];

    // LocalStorage keys
    const STORAGE_KEY_PREFIX = 'blog_patched_';
    const PATCHED_COUNTS_KEY = 'blog_patched_counts';
    const VIEW_COUNTS_KEY = 'blog_view_counts';
    const VIEWED_POSTS_SESSION_KEY = 'blog_viewed_posts_session';

    // Initialize session viewed posts
    let sessionViewedPosts = new Set(JSON.parse(sessionStorage.getItem(VIEWED_POSTS_SESSION_KEY) || '[]'));

    // Get patched status
    function getPatchedStatus(slug) {
        return localStorage.getItem(`${STORAGE_KEY_PREFIX}${slug}`) === 'true';
    }

    // Get patched counts
    function getPatchedCounts() {
        const counts = localStorage.getItem(PATCHED_COUNTS_KEY);
        return counts ? JSON.parse(counts) : {};
    }

    // Set patched count
    function setPatchedCount(slug, count) {
        const counts = getPatchedCounts();
        counts[slug] = count;
        localStorage.setItem(PATCHED_COUNTS_KEY, JSON.stringify(counts));
    }

    // Get view counts
    function getViewCounts() {
        const counts = localStorage.getItem(VIEW_COUNTS_KEY);
        return counts ? JSON.parse(counts) : {};
    }

    // Set view count
    function setViewCount(slug, count) {
        const counts = getViewCounts();
        counts[slug] = count;
        localStorage.setItem(VIEW_COUNTS_KEY, JSON.stringify(counts));
    }

    // Increment view count
    function incrementViewCount(slug) {
        if (sessionViewedPosts.has(slug)) return;
        
        const counts = getViewCounts();
        const newCount = (counts[slug] || 0) + 1;
        setViewCount(slug, newCount);
        
        // Mark as viewed in this session
        sessionViewedPosts.add(slug);
        sessionStorage.setItem(VIEWED_POSTS_SESSION_KEY, JSON.stringify([...sessionViewedPosts]));
        
        return newCount;
    }

    // Show feedback message
    function showFeedback(button, message) {
        let feedback = document.querySelector('.feedback-message');
        if (!feedback) {
            feedback = document.createElement('div');
            feedback.className = 'feedback-message';
            document.body.appendChild(feedback);
        }
        
        const buttonRect = button.getBoundingClientRect();
        feedback.style.position = 'fixed';
        feedback.style.top = `${buttonRect.bottom + 10}px`;
        feedback.style.left = `${buttonRect.left}px`;
        
        feedback.textContent = message;
        feedback.classList.add('visible');
        
        setTimeout(() => {
            feedback.classList.remove('visible');
            setTimeout(() => feedback.remove(), 300);
        }, 3000);
    }

    // Handle patched click
    function handlePatchedClick(slug, button, countElement) {
        if (getPatchedStatus(slug)) {
            showFeedback(button, 'Bu yazıyı zaten incelendi olarak işaretlediniz');
            return;
        }

        localStorage.setItem(`${STORAGE_KEY_PREFIX}${slug}`, 'true');
        const counts = getPatchedCounts();
        const newCount = (counts[slug] || 0) + 1;
        setPatchedCount(slug, newCount);

        button.classList.add('patched');
        button.innerHTML = '<i class="fas fa-check"></i>';
        countElement.innerHTML = `<i class="fas fa-thumbs-up"></i> ${newCount}`;
        
        showFeedback(button, 'Geri bildiriminiz için teşekkürler!');
    }

    // Add back to top button
    const backToTopButton = document.createElement('a');
    backToTopButton.href = '#';
    backToTopButton.className = 'back-to-top';
    backToTopButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
    document.body.appendChild(backToTopButton);

    // Show/hide back to top button
    function toggleBackToTop() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const fullPostVisible = fullPost.style.display === 'block';
        
        if (scrollTop > 300 && fullPostVisible) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    }

    window.addEventListener('scroll', toggleBackToTop);

    backToTopButton.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Marked.js ayarları
    marked.setOptions({
        highlight: function(code, lang) {
            if (lang && hljs.getLanguage(lang)) {
                return hljs.highlight(code, { language: lang }).value;
            }
            return hljs.highlightAuto(code).value;
        },
        breaks: true,
        gfm: true
    });

    // Mermaid ayarları
    mermaid.initialize({
        startOnLoad: true,
        theme: 'dark',
        themeVariables: {
            primaryColor: '#4af626',
            primaryTextColor: '#fff',
            primaryBorderColor: '#4af626',
            lineColor: '#4af626',
            secondaryColor: '#006400',
            tertiaryColor: '#001400'
        }
    });

    // Metadata çıkarma fonksiyonu
    function extractMetadata(content) {
        const metadataRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
        const match = content.match(metadataRegex);
        
        if (!match) return null;

        const metadataStr = match[1];
        const content_body = match[2];
        const metadata = {};
        
        metadataStr.split('\n').forEach(line => {
            const [key, ...values] = line.split(':');
            if (key && values.length) {
                metadata[key.trim()] = values.join(':').trim();
            }
        });

        return {
            metadata,
            content: content_body
        };
    }

    // Markdown dosyasını yükleme
    async function loadMarkdownFile(filename) {
        try {
            const response = await fetch(`./posts/${filename}`);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const content = await response.text();
            
            const parsed = extractMetadata(content);
            if (!parsed) throw new Error('Metadata parsing failed');

            return {
                title: parsed.metadata.title || 'Başlıksız Yazı',
                date: parsed.metadata.date || 'Tarih Belirtilmemiş',
                slug: filename.replace('.md', ''),
                excerpt: parsed.metadata.excerpt || parsed.content.split('\n')[0].replace(/[#\s]/g, '').substring(0, 150) + '...',
                content: parsed.content
            };
        } catch (error) {
            console.error(`Error loading ${filename}:`, error);
            return null;
        }
    }

    // Tüm blog yazılarını yükleme
    async function loadAllPosts() {
        try {
            const files = [
                "cyber-kill-chain-modeli.md",
                "etik-hacker-yol-haritasi.md", 
                "startup-siber-guvenlik-maliyetleri.md",
                "quantum-sifreleme-gelismeleri.md",
                "microsoft-defender-zafiyeti.md",
                "chatgpt-guvenlik-riskleri.md",
                "android-bankaci-trojan.md",
                "wifi-protokol-guncelleme.md"
            ];
            
            const postPromises = files.map(filename => loadMarkdownFile(filename));
            posts = (await Promise.all(postPromises))
                .filter(post => post !== null)
                .sort((a, b) => new Date(b.date) - new Date(a.date));
            
            displayPosts();

            // Check for hash on load
            const initialHash = window.location.hash.slice(1);
            if (initialHash) {
                const post = posts.find(p => p.slug === initialHash);
                if (post) showFullPost(post);
            }
        } catch (error) {
            console.error('Error loading posts:', error);
            postsList.innerHTML = `
                <div class="error-message">
                    Blog yazıları yüklenirken bir hata oluştu.
                    <button onclick="location.reload()">Yeniden Dene</button>
                </div>
            `;
        }
    }

    // Display posts with patched status
    function displayPosts() {
        postsList.innerHTML = '';
        posts.forEach(post => {
            const isPatched = getPatchedStatus(post.slug);
            const patchedCountValue = getPatchedCounts()[post.slug] || 0;
            const viewCountValue = getViewCounts()[post.slug] || 0;
            
            const postElement = document.createElement('article');
            postElement.className = 'post-item';
            postElement.innerHTML = `
                <div class="post-header">
                    <h2 class="post-title">${post.title}</h2>
                    ${isPatched ? 
                        `<span class="read-status">okundu</span>` : ''}
                </div>
                <div class="post-date">${formatDate(post.date)}</div>
                <p class="post-excerpt">${post.excerpt}</p>
                <div class="post-footer">
                    <div class="post-stats">
                        <span class="view-count" title="Görüntülenme">
                            <i class="fas fa-eye"></i>${viewCountValue}
                        </span>
                        <span class="like-count" title="Beğeni">
                            <i class="fas fa-thumbs-up"></i>${patchedCountValue}
                        </span>
                    </div>
                    <a href="#${post.slug}" class="read-more">
                        Devamını Oku
                        <i class="fas fa-arrow-right"></i>
                    </a>
                </div>
            `;
            postsList.appendChild(postElement);

            // Devamını oku butonuna tıklama olayı
            const readMoreLink = postElement.querySelector('.read-more');
            readMoreLink.addEventListener('click', (e) => {
                e.preventDefault();
                showFullPost(post);
            });
        });
    }

    // Show full post with patched button
    function showFullPost(post) {
        const isPatched = getPatchedStatus(post.slug);
        const patchedCountValue = getPatchedCounts()[post.slug] || 0;
        const viewCount = incrementViewCount(post.slug);
        const viewCountValue = viewCount || getViewCounts()[post.slug] || 0;

        postsList.style.display = 'none';
        fullPost.style.display = 'block';
        fullPost.innerHTML = `
            <div class="post-navigation">
                <a href="#" class="back-btn" id="backToList">
                    <i class="fas fa-chevron-left"></i> Blog Yazıları
                </a>
                <div class="post-header">
                    <h2 class="post-title">${post.title}</h2>
                    ${isPatched ? 
                        `<span class="read-status">okundu</span>` : ''}
                </div>
            </div>
            <div class="post-meta">
                <span class="post-date">${formatDate(post.date)}</span>
                <div class="post-stats">
                    <span class="view-count" title="Görüntülenme">
                        <i class="fas fa-eye"></i>${viewCountValue}
                    </span>
                    <span class="like-count" title="Beğeni">
                        <i class="fas fa-thumbs-up"></i>${patchedCountValue}
                    </span>
                    <button class="like-btn ${isPatched ? 'liked' : ''}" id="patchedBtn" title="${isPatched ? 'Beğenildi' : 'Beğen'}">
                        <i class="fas fa-thumbs-up"></i>
                    </button>
                </div>
            </div>
            <div class="post-content">
                ${marked.parse(post.content)}
            </div>
        `;

        // Re-render Mermaid diagrams
        mermaid.init(undefined, document.querySelectorAll('.mermaid'));

        // Back button click event
        document.getElementById('backToList').addEventListener('click', (e) => {
            e.preventDefault();
            history.pushState(null, '', window.location.pathname);
            fullPost.style.display = 'none';
            postsList.style.display = 'grid';
            backToTopButton.classList.remove('visible');
            window.scrollTo(0, 0);
        });

        // Patched button click event
        const patchedBtn = document.getElementById('patchedBtn');
        const patchedCount = fullPost.querySelector('.patched-count');
        patchedBtn.addEventListener('click', () => {
            handlePatchedClick(post.slug, patchedBtn, patchedCount);
        });

        window.scrollTo(0, 0);
        toggleBackToTop(); // Reset back to top button visibility
    }

    // Tarih formatı
    function formatDate(dateStr) {
        const date = new Date(dateStr);
        return date.toLocaleDateString('tr-TR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }

    // URL hash değişikliğini dinle
    window.addEventListener('hashchange', () => {
        const slug = window.location.hash.slice(1);
        if (slug) {
            const post = posts.find(p => p.slug === slug);
            if (post) showFullPost(post);
        } else {
            fullPost.style.display = 'none';
            postsList.style.display = 'grid';
        }
    });

    // Başlangıçta blog yazılarını yükle
    loadAllPosts();
}); 