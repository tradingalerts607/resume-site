/* ═══════════════════════════════════════════════════════════════
   JACOB MONROE JOHNSON — RESUME INTERACTIONS
   Scroll reveals, smooth animations, subtle interactivity
   ═══════════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

    // ─── SCROLL REVEAL ───
    const revealSections = document.querySelectorAll(
        '.narrative-section, .duality-section, .skills-section, .projects-section, .experience-section, .education-section'
    );

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -60px 0px'
    });

    revealSections.forEach(section => {
        revealObserver.observe(section);
    });

    // ─── TIMELINE ITEM STAGGER ───
    const timelineItems = document.querySelectorAll('.timeline-item');

    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                entry.target.style.transitionDelay = `${index * 0.08}s`;
                entry.target.classList.add('timeline-visible');
                timelineObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -40px 0px'
    });

    timelineItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'opacity 0.5s ease-out, transform 0.5s ease-out';
        timelineObserver.observe(item);
    });

    // Add class-based reveal
    const style = document.createElement('style');
    style.textContent = `
        .timeline-visible {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);

    // ─── SKILL TAG HOVER RIPPLE ───
    document.querySelectorAll('.skill-tag').forEach(tag => {
        tag.addEventListener('mouseenter', () => {
            tag.style.transform = 'translateY(-2px) scale(1.02)';
        });
        tag.addEventListener('mouseleave', () => {
            tag.style.transform = 'translateY(0) scale(1)';
        });
    });

    // ─── PARALLAX ORB MOVEMENT ───
    let ticking = false;
    const orbs = document.querySelectorAll('.orb');

    window.addEventListener('mousemove', (e) => {
        if (!ticking) {
            requestAnimationFrame(() => {
                const x = (e.clientX / window.innerWidth - 0.5) * 2;
                const y = (e.clientY / window.innerHeight - 0.5) * 2;

                orbs.forEach((orb, i) => {
                    const speed = (i + 1) * 8;
                    orb.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
                });

                ticking = false;
            });
            ticking = true;
        }
    });

    // ─── DUALITY CARD TILT EFFECT ───
    document.querySelectorAll('.duality-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width - 0.5) * 6;
            const y = ((e.clientY - rect.top) / rect.height - 0.5) * 6;
            card.style.transform = `translateY(-4px) perspective(600px) rotateX(${-y}deg) rotateY(${x}deg)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) perspective(600px) rotateX(0) rotateY(0)';
        });
    });

    // ─── TYPING EFFECT FOR CODE WINDOW (on load) ───
    const codeBody = document.querySelector('.code-body code');
    if (codeBody) {
        const fullHTML = codeBody.innerHTML;
        codeBody.innerHTML = '';
        codeBody.style.visibility = 'visible';

        // Parse HTML and type character by character while preserving tags
        let charIndex = 0;
        let currentHTML = '';
        let insideTag = false;

        function typeChar() {
            if (charIndex >= fullHTML.length) return;

            const char = fullHTML[charIndex];

            if (char === '<') insideTag = true;
            if (insideTag) {
                // Add entire tag at once
                const tagEnd = fullHTML.indexOf('>', charIndex);
                currentHTML += fullHTML.substring(charIndex, tagEnd + 1);
                charIndex = tagEnd + 1;
                if (char === '<' && fullHTML[charIndex - 1] === '>') insideTag = false;
            } else {
                currentHTML += char;
                charIndex++;
            }

            codeBody.innerHTML = currentHTML;

            if (charIndex < fullHTML.length) {
                const delay = insideTag ? 0 : (Math.random() * 20 + 10);
                setTimeout(typeChar, delay);
                insideTag = false;
            }
        }

        // Start typing after hero animation
        setTimeout(typeChar, 800);
    }

    // ─── SMOOTH SECTION SCROLL HINT ───
    const hero = document.querySelector('.hero');
    if (hero) {
        const scrollHint = document.createElement('div');
        scrollHint.innerHTML = `
            <div style="
                text-align: center;
                margin-top: 2rem;
                animation: fadeInUp 0.6s ease-out 1.5s both;
            ">
                <div style="
                    display: inline-flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 0.3rem;
                    color: var(--text-muted);
                    font-size: 0.7rem;
                    font-family: var(--font-mono);
                    letter-spacing: 0.1em;
                    cursor: pointer;
                " id="scroll-hint">
                    <span>SCROLL</span>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style="animation: bounce 2s infinite;">
                        <path d="M4 6L8 10L12 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                    </svg>
                </div>
            </div>
        `;
        hero.appendChild(scrollHint);

        // Add bounce animation
        const bounceStyle = document.createElement('style');
        bounceStyle.textContent = `
            @keyframes bounce {
                0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
                40% { transform: translateY(4px); }
                60% { transform: translateY(2px); }
            }
        `;
        document.head.appendChild(bounceStyle);

        document.addEventListener('click', (e) => {
            if (e.target.closest('#scroll-hint')) {
                document.querySelector('#narrative').scrollIntoView({ behavior: 'smooth' });
            }
        });

        // Fade out scroll hint on scroll
        window.addEventListener('scroll', () => {
            const hint = document.querySelector('#scroll-hint');
            if (hint && window.scrollY > 100) {
                hint.style.transition = 'opacity 0.3s ease';
                hint.style.opacity = '0';
            }
        }, { passive: true });
    }

});
