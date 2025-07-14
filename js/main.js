// Navigation
document.addEventListener('DOMContentLoaded', function() {
    const header = document.getElementById('header');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    
    // Header scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('header-fixed');
            header.classList.remove('header-transparent');
        } else {
            header.classList.remove('header-fixed');
            header.classList.add('header-transparent');
        }
    });
    
    // Mobile menu toggle
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
    });
    
    // Close mobile menu when clicking on a nav link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.classList.remove('no-scroll');
        });
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Fade in animation on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for fade-in effect
    const elementsToObserve = document.querySelectorAll('.service-card, .work-item, .blog-post, .process-step');
    elementsToObserve.forEach(element => {
        observer.observe(element);
    });
    
    // Contact form handling
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = document.getElementById('submit-btn');
            const btnText = submitBtn.querySelector('.btn-text');
            const btnLoading = submitBtn.querySelector('.btn-loading');
            
            // Show loading state
            btnText.style.display = 'none';
            btnLoading.style.display = 'inline';
            submitBtn.disabled = true;
            
            // Simulate form submission (replace with actual form handling)
            setTimeout(() => {
                alert('お問い合わせありがとうございます。24時間以内にご連絡いたします。');
                contactForm.reset();
                
                // Reset button state
                btnText.style.display = 'inline';
                btnLoading.style.display = 'none';
                submitBtn.disabled = false;
            }, 2000);
        });
    }
    
    // Works filter functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    const workItems = document.querySelectorAll('.work-item');
    const blogPosts = document.querySelectorAll('.blog-post');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Show jump image for WEB filter
            const existingJumpImg = document.querySelector('.filter-jump-img');
            if (existingJumpImg) {
                existingJumpImg.remove();
            }
            
            if (filter === 'web') {
                const jumpImg = document.createElement('img');
                jumpImg.src = 'images/works_ボタン/junp.png';
                jumpImg.className = 'filter-jump-img';
                jumpImg.style.cssText = `
                    position: absolute;
                    width: 80px;
                    height: auto;
                    top: -65px;
                    right: -50px;
                    z-index: 10;
                    animation: jumpBounce 0.5s ease-out;
                `;
                this.style.position = 'relative';
                this.appendChild(jumpImg);
            } else if (filter === 'app') {
                const flyImg = document.createElement('img');
                flyImg.src = 'images/works_ボタン/tobu.png';
                flyImg.className = 'filter-jump-img';
                flyImg.style.cssText = `
                    position: absolute;
                    width: 80px;
                    height: auto;
                    top: -65px;
                    right: -50px;
                    z-index: 10;
                    animation: flyFloat 0.8s ease-out;
                `;
                this.style.position = 'relative';
                this.appendChild(flyImg);
            } else if (filter === 'design') {
                const landImg = document.createElement('img');
                landImg.src = 'images/works_ボタン/tyakuti.png';
                landImg.className = 'filter-jump-img';
                landImg.style.cssText = `
                    position: absolute;
                    width: 80px;
                    height: auto;
                    top: -65px;
                    right: -20px;
                    z-index: 10;
                    animation: landingDrop 0.6s ease-in-out;
                `;
                this.style.position = 'relative';
                this.appendChild(landImg);
            }
            
            // Filter works
            workItems.forEach(item => {
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    item.style.display = 'block';
                    item.style.opacity = '0';
                    setTimeout(() => {
                        item.style.opacity = '1';
                    }, 100);
                } else {
                    item.style.display = 'none';
                }
            });
            
            // Filter blog posts
            blogPosts.forEach(post => {
                if (filter === 'all' || post.getAttribute('data-category') === filter) {
                    post.style.display = 'block';
                    post.style.opacity = '0';
                    setTimeout(() => {
                        post.style.opacity = '1';
                    }, 100);
                } else {
                    post.style.display = 'none';
                }
            });
        });
    });
    
    // Work modal functionality
    const workDetailButtons = document.querySelectorAll('.work-detail-btn');
    const modal = document.getElementById('work-modal');
    const modalClose = document.querySelector('.modal-close');
    
    // Sample work data
    const workData = {
        '1': {
            title: 'E-Commerce Platform',
            description: 'モダンなReactとNode.jsを使用したフルスタックE-Commerceプラットフォーム。ユーザー体験を重視したデザインと高いパフォーマンスを実現。',
            image: 'images/works/work1.webp',
            details: [
                'レスポンシブデザイン対応',
                'リアルタイム在庫管理',
                'セキュアな決済システム',
                '管理者ダッシュボード'
            ],
            technologies: ['React', 'Node.js', 'MongoDB', 'Express', 'Stripe API'],
            results: [
                'コンバージョン率 35% 向上',
                'ページ読み込み時間 50% 短縮',
                'モバイル売上 200% 増加'
            ]
        },
        '2': {
            title: 'Task Management App',
            description: 'チームの生産性向上を目的としたタスク管理アプリケーション。直感的なUIとリアルタイム同期機能を提供。',
            image: 'images/works/work2.webp',
            details: [
                'リアルタイム同期',
                'チーム機能',
                'プロジェクト管理',
                'レポート機能'
            ],
            technologies: ['React Native', 'Firebase', 'TypeScript', 'Redux'],
            results: [
                'チーム生産性 40% 向上',
                'タスク完了率 25% 改善',
                'ユーザー満足度 4.8/5'
            ]
        },
        '3': {
            title: 'Portfolio Website',
            description: 'Next.jsとTypeScriptを使用したポートフォリオサイト。パフォーマンスとSEOを重視した設計。',
            image: 'images/works/work3.webp',
            details: [
                'SSG/SSR対応',
                'SEO最適化',
                'パフォーマンス最適化',
                'CMSとの連携'
            ],
            technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Vercel'],
            results: [
                'Lighthouse スコア 100点',
                'ページ読み込み時間 1秒以内',
                'SEO順位 10位以内'
            ]
        },
        '4': {
            title: 'Brand Identity',
            description: 'スタートアップ企業向けのブランドアイデンティティデザイン。ロゴからWebサイトまで一貫したデザイン。',
            image: 'images/works/work4.webp',
            details: [
                'ロゴデザイン',
                'ブランドガイドライン',
                'Webサイトデザイン',
                '印刷物デザイン'
            ],
            technologies: ['Figma', 'Adobe Illustrator', 'Photoshop', 'InDesign'],
            results: [
                'ブランド認知度 60% 向上',
                '顧客満足度 95%',
                'デザイン賞受賞'
            ]
        },
        '5': {
            title: 'Corporate Website',
            description: 'Vue.jsとNuxt.jsを使用したコーポレートサイト。多言語対応とCMS連携を実現。',
            image: 'images/works/work5.webp',
            details: [
                '多言語対応',
                'CMS連携',
                'SEO対策',
                'アクセシビリティ対応'
            ],
            technologies: ['Vue.js', 'Nuxt.js', 'Contentful', 'Netlify'],
            results: [
                '問い合わせ件数 150% 増加',
                '海外からのアクセス 300% 増加',
                'SEO順位 5位以内'
            ]
        },
        '6': {
            title: 'Health Tracking App',
            description: 'Flutterを使用したヘルストラッキングアプリ。デバイス連携と詳細な分析機能を提供。',
            image: 'images/works/work6.webp',
            details: [
                'デバイス連携',
                'データ分析',
                '通知機能',
                'レポート生成'
            ],
            technologies: ['Flutter', 'Firebase', 'HealthKit', 'Google Fit'],
            results: [
                'DAU 10,000人突破',
                'App Store評価 4.7/5',
                'ユーザー継続率 80%'
            ]
        },
        // 新しい実績を追加する際は、以下のフォーマットをコピーして使用してください
        /*
        '番号': {
            title: 'プロジェクト名',
            description: 'プロジェクトの詳細説明',
            image: 'images/works/work番号.webp',
            details: [
                '実装した機能1',
                '実装した機能2',
                '実装した機能3'
            ],
            technologies: ['使用技術1', '使用技術2', '使用技術3'],
            results: [
                '達成した成果1',
                '達成した成果2',
                '達成した成果3'
            ]
        },
        */
        '19': {
            title: '一椀 - 創作和食レストラン',
            description: '中目黒の高級創作和食レストラン「一椀」のブランディングWebサイト。旬の食材と職人の技を表現した上質なデザインで、レストランの世界観を完璧に演出。',
            image: 'images/works/work19.webp',
            url: 'https://kasaman04.github.io/japanese-restaurant-website/',
            details: [
                'ミニマリストデザイン',
                '高品質な料理・店内写真',
                'オンライン予約システム',
                '季節メニュー更新機能',
                'バイリンガル対応（日英）'
            ],
            technologies: ['HTML5', 'CSS3', 'JavaScript', 'レスポンシブデザイン', 'GitHub Pages'],
            results: [
                '和の美学をWebデザインで表現',
                '食材の美しさを引き立てる写真レイアウト',
                'ブランドアイデンティティの統一感実現',
                '高級感と親しみやすさのバランス達成'
            ]
        }
    };
    
    workDetailButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            const workId = this.getAttribute('data-work');
            const work = workData[workId];
            
            if (work) {
                // Update modal content
                document.getElementById('modal-title').textContent = work.title;
                document.getElementById('modal-image').src = work.image;
                document.getElementById('modal-image').alt = work.title;
                document.getElementById('modal-description').textContent = work.description;
                
                // Update details
                const detailsList = document.getElementById('modal-details-list');
                detailsList.innerHTML = '';
                work.details.forEach(detail => {
                    const li = document.createElement('li');
                    li.textContent = detail;
                    detailsList.appendChild(li);
                });
                
                // Update results
                const resultsList = document.getElementById('modal-results-list');
                resultsList.innerHTML = '';
                work.results.forEach(result => {
                    const li = document.createElement('li');
                    li.textContent = result;
                    resultsList.appendChild(li);
                });
                
                // Update link
                const modalLink = document.getElementById('modal-link');
                console.log('Work data:', work);
                console.log('Work URL:', work.url);
                if (work.url) {
                    modalLink.href = work.url;
                    modalLink.style.display = 'inline-block';
                    console.log('Link set to:', work.url);
                } else {
                    modalLink.style.display = 'none';
                    console.log('No URL found, hiding link');
                }
                
                // Show modal
                modal.style.display = 'block';
                document.body.style.overflow = 'hidden';
            }
        });
    });
    
    // Close modal
    if (modalClose) {
        modalClose.addEventListener('click', function() {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    }
    
    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
    
    // Add no-scroll class to body
    const style = document.createElement('style');
    style.textContent = `
        .no-scroll {
            overflow: hidden;
        }
    `;
    document.head.appendChild(style);
    
    // Initialize header state
    if (window.location.pathname === '/index.html' || window.location.pathname === '/') {
        header.classList.add('header-transparent');
    } else {
        header.classList.add('header-fixed');
    }
    
    // Scroll Animation Character
    const scrollAnime = document.querySelector('.scroll__anime');
    const heroSection = document.querySelector('.hero');
    let isAnimating = false;
    
    function updateScrollAnimation() {
        if (!scrollAnime || !heroSection) return;
        
        const heroRect = heroSection.getBoundingClientRect();
        const scrollY = window.scrollY;
        const heroHeight = heroSection.offsetHeight;
        
        // キャラクターがheroセクション内にいる時のみアニメーション
        if (heroRect.bottom > 0 && heroRect.top < window.innerHeight) {
            // heroセクション内でのスクロール位置を計算
            const scrollInHero = Math.max(0, -heroRect.top);
            const scrollProgress = Math.min(1, scrollInHero / (heroHeight * 0.5));
            
            // 波のような動き
            const translateY = Math.sin(scrollProgress * Math.PI * 2) * 20;
            const translateX = Math.cos(scrollProgress * Math.PI * 2) * 10;
            const rotate = Math.sin(scrollProgress * Math.PI * 4) * 5;
            
            scrollAnime.style.transform = `translate(${translateX}px, ${translateY}px) rotate(${rotate}deg)`;
            
            // スクロールが進むにつれてフェードアウト
            const opacity = Math.max(0, 1 - scrollProgress * 0.8);
            scrollAnime.style.opacity = opacity;
        }
    }
    
    // スクロールイベントの最適化
    function handleScroll() {
        if (!isAnimating) {
            requestAnimationFrame(updateScrollAnimation);
            isAnimating = true;
            setTimeout(() => {
                isAnimating = false;
            }, 16);
        }
    }
    
    // Listen to scroll events
    window.addEventListener('scroll', handleScroll);
    
    // 初期表示時のアニメーション
    setTimeout(() => {
        updateScrollAnimation();
    }, 100);
    
    // Character interaction on hover
    if (scrollAnime) {
        scrollAnime.style.pointerEvents = 'auto';
        scrollAnime.style.cursor = 'pointer';
        
        scrollAnime.addEventListener('click', function() {
            this.classList.add('bounce');
            setTimeout(() => {
                this.classList.remove('bounce');
            }, 500);
        });
        
        let originalTransform = '';
        
        scrollAnime.addEventListener('mouseenter', function() {
            originalTransform = this.style.transform;
            this.style.transform = originalTransform + ' scale(1.1)';
        });
        
        scrollAnime.addEventListener('mouseleave', function() {
            this.style.transform = originalTransform;
        });
    }
    
    // Hanging Character Click Interaction
    const hangingCharacter = document.querySelector('.hanging-character');
    const hangingImg = document.querySelector('.hanging-img');
    const fallenCharacter = document.getElementById('fallenCharacter');
    let clickCount = 0;
    let hasClicked = false;
    
    if (hangingCharacter && hangingImg) {
        hangingCharacter.addEventListener('click', function(e) {
            if (hasClicked) return; // Prevent multiple triggers
            
            console.log('Character clicked! Touch device:', 'ontouchstart' in window);
            clickCount++;
            
            // Add shake effect on each click
            hangingCharacter.classList.add('shake-hanging');
            setTimeout(() => {
                hangingCharacter.classList.remove('shake-hanging');
            }, 300);
            
            // Visual feedback for click count
            console.log(`クリック回数: ${clickCount}/5`);
            
            // After 5 clicks, trigger the fall
            if (clickCount >= 5) {
                hasClicked = true;
                
                // Change to falling image
                hangingImg.src = 'images/Fall.png';
                hangingImg.alt = '落下中のキャラクター';
                
                // Wait a moment then start falling animation
                setTimeout(() => {
                    // Stop the swing animation
                    hangingImg.style.animation = 'none';
                    
                    // Add falling animation
                    hangingCharacter.classList.add('falling');
                    
                    // Reset after animation completes
                    setTimeout(() => {
                        // Hide the hanging character after falling
                        hangingCharacter.style.display = 'none';
                        
                        // Show the fallen character on the ground
                        if (fallenCharacter) {
                            console.log('Showing fallen character');
                            fallenCharacter.style.display = 'block';
                            const fallenSpeech = document.getElementById('fallenSpeech');
                            
                            setTimeout(() => {
                                fallenCharacter.classList.add('show');
                                console.log('Fallen character should be visible now');
                                
                                // Show speech bubble after character appears
                                if (fallenSpeech) {
                                    setTimeout(() => {
                                        fallenSpeech.classList.add('show');
                                        console.log('Speech bubble shown');
                                    }, 800); // Show speech bubble 0.8 seconds after character
                                }
                            }, 100);
                        } else {
                            console.log('Fallen character element not found');
                        }
                        
                        // Setup scroll detection to hide fallen character when out of view
                        let fallenCharacterVisible = true;
                        
                        function checkFallenCharacterVisibility() {
                            if (!fallenCharacterVisible || !fallenCharacter) return;
                            
                            const rect = fallenCharacter.getBoundingClientRect();
                            const windowHeight = window.innerHeight || document.documentElement.clientHeight;
                            const isVisible = rect.bottom > -50 && rect.top < windowHeight + 50;
                            
                            console.log('Checking visibility:', {
                                rectTop: rect.top,
                                rectBottom: rect.bottom,
                                windowHeight: windowHeight,
                                isVisible: isVisible
                            });
                            
                            if (!isVisible) {
                                console.log('Character is out of view, hiding...');
                                // Character is out of view, hide it
                                fallenCharacterVisible = false;
                                fallenCharacter.classList.remove('show');
                                setTimeout(() => {
                                    fallenCharacter.style.display = 'none';
                                    
                                    // Reset hanging character
                                    hangingCharacter.style.display = 'block';
                                    hangingCharacter.classList.remove('falling');
                                    hangingImg.src = 'images/burasagari.png';
                                    hangingImg.alt = 'ぶら下がりキャラクター';
                                    hangingImg.style.animation = 'swing 3s ease-in-out infinite';
                                    clickCount = 0;
                                    hasClicked = false;
                                    
                                    // Remove scroll listener
                                    window.removeEventListener('scroll', checkFallenCharacterVisibility);
                                }, 500);
                            }
                        }
                        
                        // Add scroll listener to check visibility (with delay to ensure character is visible first)
                        setTimeout(() => {
                            console.log('Starting scroll detection for fallen character');
                            window.addEventListener('scroll', checkFallenCharacterVisibility);
                        }, 1000); // Wait 1 second before starting scroll detection
                    }, 1500); // Duration of falling animation (1.5 seconds)
                }, 500); // Small delay before falling
            }
        });
        
        // Add hover/touch effect for hanging character
        hangingCharacter.addEventListener('mouseenter', function() {
            if (!hasClicked && !hangingCharacter.classList.contains('falling')) {
                hangingImg.style.transform = 'scale(1.1)';
            }
        });
        
        hangingCharacter.addEventListener('mouseleave', function() {
            if (!hasClicked && !hangingCharacter.classList.contains('falling')) {
                hangingImg.style.transform = 'scale(1)';
            }
        });
        
        // Add touch feedback for mobile
        hangingCharacter.addEventListener('touchstart', function(e) {
            if (!hasClicked && !hangingCharacter.classList.contains('falling')) {
                hangingImg.style.transform = 'scale(1.1)';
                // Don't prevent default to allow click events
            }
        });
        
        hangingCharacter.addEventListener('touchend', function(e) {
            if (!hasClicked && !hangingCharacter.classList.contains('falling')) {
                setTimeout(() => {
                    hangingImg.style.transform = 'scale(1)';
                }, 100);
            }
        });
    }
});