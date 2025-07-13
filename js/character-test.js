// Character interaction system
document.addEventListener('DOMContentLoaded', function() {
    const character = document.getElementById('mainCharacter');
    const speechBubble = document.getElementById('speechBubble');
    const speechText = document.getElementById('speechText');
    
    // Messages
    const messages = {
        initial: "こんなサイトきても時間の無駄だよ。それでもいいなら見てきなよ",
        waiting: "もう話すことは無いってば！下に行きなよ",
        returned: "しつこい人だな・・",
        scrolled: "やっと行ったか..."
    };
    
    // State management
    let messageState = 'initial';
    let hasScrolled = false;
    let hasReturned = false;
    let waitingTimer = null;
    let isTyping = false;
    
    // Check session storage for returning user
    const visitData = sessionStorage.getItem('characterVisit');
    if (visitData) {
        const visit = JSON.parse(visitData);
        hasScrolled = visit.hasScrolled || false;
        hasReturned = visit.hasReturned || false;
    }
    
    // Type message with animation
    function typeMessage(message, callback) {
        if (isTyping) return;
        
        isTyping = true;
        speechText.textContent = '';
        speechBubble.classList.add('show');
        
        let index = 0;
        const typingInterval = setInterval(() => {
            if (index < message.length) {
                speechText.textContent += message[index];
                index++;
            } else {
                clearInterval(typingInterval);
                isTyping = false;
                if (callback) callback();
            }
        }, 50);
    }
    
    // Hide message
    function hideMessage() {
        speechBubble.classList.remove('show');
    }
    
    // Show initial message
    function showInitialMessage() {
        setTimeout(() => {
            typeMessage(messages.initial, () => {
                // Set waiting timer
                waitingTimer = setTimeout(() => {
                    if (!hasScrolled && messageState === 'initial') {
                        messageState = 'waiting';
                        character.classList.add('shake');
                        setTimeout(() => {
                            character.classList.remove('shake');
                            typeMessage(messages.waiting);
                        }, 500);
                    }
                }, 8000);
            });
        }, 1000);
    }
    
    // Scroll detection
    let lastScrollTop = 0;
    let scrollCheckTimer = null;
    
    window.addEventListener('scroll', function() {
        clearTimeout(scrollCheckTimer);
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 200 && !hasScrolled) {
            hasScrolled = true;
            messageState = 'scrolled';
            hideMessage();
            
            // Save state
            sessionStorage.setItem('characterVisit', JSON.stringify({
                hasScrolled: true,
                hasReturned: false
            }));
            
            // Clear waiting timer
            if (waitingTimer) clearTimeout(waitingTimer);
        }
        
        // Check if returned to top
        scrollCheckTimer = setTimeout(() => {
            if (scrollTop < 100 && hasScrolled && !hasReturned) {
                hasReturned = true;
                messageState = 'returned';
                
                // Change character image if available
                // character.src = 'images/character_annoyed.gif';
                
                character.classList.add('bounce');
                setTimeout(() => {
                    character.classList.remove('bounce');
                    typeMessage(messages.returned);
                }, 600);
                
                // Save state
                sessionStorage.setItem('characterVisit', JSON.stringify({
                    hasScrolled: true,
                    hasReturned: true
                }));
            }
        }, 500);
        
        lastScrollTop = scrollTop;
    });
    
    // Character click interaction
    character.addEventListener('click', function() {
        if (!isTyping) {
            character.classList.add('bounce');
            setTimeout(() => {
                character.classList.remove('bounce');
            }, 600);
            
            // Show random reaction
            const reactions = [
                "なに？触らないでよ",
                "クリックしても何も起きないよ",
                "暇なの？",
                "...何か用？"
            ];
            const randomReaction = reactions[Math.floor(Math.random() * reactions.length)];
            typeMessage(randomReaction);
            
            // Hide after 3 seconds
            setTimeout(hideMessage, 3000);
        }
    });
    
    // Character hover effect
    character.addEventListener('mouseenter', function() {
        if (!character.classList.contains('bounce') && !character.classList.contains('shake')) {
            character.style.transform = 'scale(1.05) rotate(-5deg)';
        }
    });
    
    character.addEventListener('mouseleave', function() {
        character.style.transform = 'scale(1) rotate(0deg)';
    });
    
    // Initialize based on state
    if (hasReturned) {
        messageState = 'returned';
        setTimeout(() => {
            typeMessage(messages.returned);
        }, 1000);
    } else if (hasScrolled) {
        messageState = 'scrolled';
        // Don't show message if already scrolled
    } else {
        showInitialMessage();
    }
    
    // Clear session on page unload (optional)
    // window.addEventListener('beforeunload', function() {
    //     sessionStorage.removeItem('characterVisit');
    // });
});