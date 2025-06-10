// Resonance Browser JavaScript - Updated for Individual Pages

// Data for site links
const siteData = {
    "llms": [
        // ... (add LLM links here if managing dynamically)
    ],
    "tools": [
        // ... (add Tool links here if managing dynamically)
    ],
    "social": [
        // ... (add Social links here if managing dynamically)
    ],
    "games": [
        // ... (add Game links here if managing dynamically)
    ],
    "articles": [
        // ... (add Article links here if managing dynamically)
    ],
    "videos": [
        // ... (add Video links here if managing dynamically)
    ],
    "quotes": [
        // ... (add Quote links here if managing dynamically)
    ],
    "music": [
        // ... (add Music links here if managing dynamically)
    ],
    "news": [
        // ... (add News links here if managing dynamically)
    ],
    "fun": [
        {
            "title": "Neal Fun",
            "description": "A collection of fun, interactive web experiences and games.",
            "url": "https://neal.fun/"
        },
        {
            "title": "Little Alchemy 2",
            "description": "Combine elements to create new and surprising items.",
            "url": "https://littlealchemy2.com/"
        },
        {
            "title": "GeoGuessr",
            "description": "Test your geography skills by guessing locations from Street View images.",
            "url": "https://www.geoguessr.com/"
        }
    ]
};

// Function to load links into the current page
function loadLinks(category) {
    const linksGrid = document.querySelector('.links-grid');
    if (!linksGrid) {
        console.error("Error: '.links-grid' element not found on this page.");
        return;
    }

    const links = siteData[category];
    if (!links || links.length === 0) {
        linksGrid.innerHTML = '<p>No links available for this category yet.</p>';
        return;
    }

    linksGrid.innerHTML = ''; // Clear existing links (e.g., placeholders)
    links.forEach(link => {
        const linkCard = document.createElement('div');
        linkCard.classList.add('link-card');

        const title = document.createElement('h3');
        title.textContent = link.title;

        const description = document.createElement('p');
        description.textContent = link.description;

        const anchor = document.createElement('a');
        anchor.href = link.url;
        anchor.target = '_blank'; // Open in new tab
        anchor.textContent = `Visit ${link.title}`;

        linkCard.appendChild(title);
        linkCard.appendChild(description);
        linkCard.appendChild(anchor);
        linksGrid.appendChild(linkCard);
    });

    // Re-apply ripple effect to newly added buttons
    document.querySelectorAll(".link-card a").forEach(button => {
        button.addEventListener("click", createRipple);
    });
}


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

