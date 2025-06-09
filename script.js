// Resonance Browser JavaScript - Updated for Individual Pages
document.addEventListener("DOMContentLoaded", function() {
    // Add keyboard shortcuts
    document.addEventListener("keydown", function(e) {
        // Ctrl/Cmd + R for refresh
        if ((e.ctrlKey || e.metaKey) && e.key === "r") {
            e.preventDefault();
            // Removed refreshBtn logic
            location.reload();
        }
        
        // Alt + Left Arrow for back
        if (e.altKey && e.key === "ArrowLeft") {
            e.preventDefault();
            // Removed backBtn logic
            window.history.back();
        }
        
        // Alt + Right Arrow for forward
        if (e.altKey && e.key === "ArrowRight") {
            e.preventDefault();
            // Removed forwardBtn logic
            window.history.forward();
        }
        
        // Ctrl/Cmd + L to focus URL bar
        if ((e.ctrlKey || e.metaKey) && e.key === "l") {
            e.preventDefault();
            // Removed urlInput logic
        }
    });
    
    // Add visual feedback for interactions
    const interactiveElements = document.querySelectorAll("button, .nav-button, .link-card a, .back-button");
    
    interactiveElements.forEach(element => {
        element.addEventListener("mousedown", function() {
            this.style.transform = "scale(0.95)";
        });
        
        element.addEventListener("mouseup", function() {
            this.style.transform = "";
        });
        
        element.addEventListener("mouseleave", function() {
            this.style.transform = "";
        });
    });
    
    // Add ripple effect to buttons
    function createRipple(event) {
        const button = event.currentTarget;
        const circle = document.createElement("span");
        const diameter = Math.max(button.clientWidth, button.clientHeight);
        const radius = diameter / 2;
        
        circle.style.width = circle.style.height = `${diameter}px`;
        circle.style.left = `${event.clientX - button.offsetLeft - radius}px`;
        circle.style.top = `${event.clientY - button.offsetTop - radius}px`;
        circle.classList.add("ripple");
        
        const ripple = button.getElementsByClassName("ripple")[0];
        if (ripple) {
            ripple.remove();
        }
        
        button.appendChild(circle);
    }
    
    // Apply ripple effect to buttons
    document.querySelectorAll(".nav-button, .link-card a, .back-button").forEach(button => { // Removed .go-btn, .control-btn
        button.addEventListener("click", createRipple);
    });
    
    // Add CSS for ripple effect
    const style = document.createElement("style");
    style.textContent = `
        .ripple {
            position: absolute;
            border-radius: 50%;
            background-color: rgba(255, 255, 255, 0.6);
            transform: scale(0);
            animation: ripple-animation 0.6s linear;
            pointer-events: none;
        }
        
        @keyframes ripple-animation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        button, .nav-button, .link-card a, .back-button {
            position: relative;
            overflow: hidden;
        }
    `;
    document.head.appendChild(style);
    
    // Initialize with a slight delay to ensure everything is loaded
    setTimeout(() => {
        // hideLoading(); // Removed as loadingOverlay is removed
        console.log("Resonance Interface initialized successfully"); // Updated message
    }, 100); // Reduced delay
    
    // Smooth page transitions
    const navLinks = document.querySelectorAll(".nav-button, .back-button");
    navLinks.forEach(link => {
        if (link.getAttribute("href") && !link.getAttribute("target")) {
            link.addEventListener("click", function(e) {
                e.preventDefault();
                const href = this.getAttribute("href");
                
                // Add fade out effect
                document.body.style.opacity = "0.8";
                document.body.style.transition = "opacity 0.3s ease";
                
                setTimeout(() => {
                    window.location.href = href;
                }, 150);
            });
        }
    });
});

// Additional utility functions
function isValidUrl(string) {
    try {
        new URL(string);
        return true;
    } catch (_) {
        return false;
    }
}

function formatUrl(url) {
    if (!url.startsWith("http://") && !url.startsWith("https://")) {
        return "https://" + url;
    }
    return url;
}

// Export functions for potential external use (now empty or can be removed)
window.ResonanceBrowser = {
    // Functions related to iframe browser have been removed
};

