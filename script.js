/* ═══════════════════════════════════════════════════════════════
   JACOB MONROE JOHNSON — RESUME INTERACTIONS
   Scroll reveals, smooth animations, subtle interactivity
   ═══════════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

    // ─── SCROLL REVEAL — DISABLED ───
    // Section fade-ins and timeline staggers removed.
    // All content is immediately visible via CSS.

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

    // ─── SCROLL HINT REMOVED — was inflating hero grid height ───

});
