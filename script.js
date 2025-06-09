// Resonance Browser JavaScript - Updated for Individual Pages
document.addEventListener("DOMContentLoaded", function() {
    // Get DOM elements
    const browserFrame = document.getElementById("browserFrame");
    const urlInput = document.getElementById("urlInput");
    const goBtn = document.getElementById("goBtn");
    const backBtn = document.getElementById("backBtn");
    const forwardBtn = document.getElementById("forwardBtn");
    const refreshBtn = document.getElementById("refreshBtn");
    const loadingOverlay = document.getElementById("loadingOverlay");
    
    // Browser history management (for internal navigation if any, or just for URL bar)
    let browserHistory = ["https://duckduckgo.com/"];
    let currentHistoryIndex = 0;
    
    // Initialize only if elements exist (for main page)
    if (urlInput && goBtn && backBtn && forwardBtn && refreshBtn) {
        updateUrlInput();
        updateNavigationButtons();
        
        // Go button click handler
        goBtn.addEventListener("click", function() {
            const url = urlInput.value.trim();
            if (url) {
                loadUrl(url);
            }
        });
        
        // URL input enter key handler
        urlInput.addEventListener("keypress", function(e) {
            if (e.key === "Enter") {
                const url = this.value.trim();
                if (url) {
                    loadUrl(url);
                }
            }
        });
        
        // Browser control handlers
        backBtn.addEventListener("click", function() {
            if (currentHistoryIndex > 0) {
                currentHistoryIndex--;
                const url = browserHistory[currentHistoryIndex];
                loadUrl(url);
                updateNavigationButtons();
            }
        });
        
        forwardBtn.addEventListener("click", function() {
            if (currentHistoryIndex < browserHistory.length - 1) {
                currentHistoryIndex++;
                const url = browserHistory[currentHistoryIndex];
                loadUrl(url);
                updateNavigationButtons();
            }
        });
        
        refreshBtn.addEventListener("click", function() {
            if (browserFrame) {
                browserFrame.src = browserFrame.src;
                showLoading();
            } else {
                location.reload();
            }
        });
        
        // Iframe load event handler
        if (browserFrame) {
            browserFrame.addEventListener("load", function() {
                hideLoading();
                // Try to update URL input with actual iframe URL (may be blocked by CORS)
                try {
                    const iframeUrl = browserFrame.contentWindow.location.href;
                    if (iframeUrl && iframeUrl !== "about:blank") {
                        urlInput.value = iframeUrl;
                        // Update history if URL changed
                        if (browserHistory[currentHistoryIndex] !== iframeUrl) {
                            browserHistory[currentHistoryIndex] = iframeUrl;
                        }
                    }
                } catch (e) {
                    // CORS restriction - can't access iframe URL
                    console.log("Cannot access iframe URL due to CORS policy");
                }
            });
            
            // Iframe error handler
            browserFrame.addEventListener("error", function() {
                hideLoading();
                console.log("Error loading page in iframe");
            });
        }
    }
    
    // Load URL function
    function loadUrl(url) {
        // Ensure URL has protocol
        if (!url.startsWith("http://") && !url.startsWith("https://")) {
            url = "https://" + url;
        }
        
        // Add to history
        if (currentHistoryIndex < browserHistory.length - 1) {
            browserHistory = browserHistory.slice(0, currentHistoryIndex + 1);
        }
        
        browserHistory.push(url);
        currentHistoryIndex = browserHistory.length - 1;
        
        // Load the URL in iframe if it exists, otherwise open in new tab
        if (browserFrame) {
            browserFrame.src = url;
            updateUrlInput();
            updateNavigationButtons();
            showLoading();
        } else {
            window.open(url, "_blank");
        }
    }
    
    // Update URL input field
    function updateUrlInput() {
        if (urlInput && browserHistory[currentHistoryIndex]) {
            urlInput.value = browserHistory[currentHistoryIndex];
        }
    }
    
    // Update navigation button states
    function updateNavigationButtons() {
        if (backBtn && forwardBtn) {
            backBtn.disabled = currentHistoryIndex <= 0;
            forwardBtn.disabled = currentHistoryIndex >= browserHistory.length - 1;
            
            // Update button opacity based on state
            backBtn.style.opacity = backBtn.disabled ? "0.5" : "1";
            forwardBtn.style.opacity = forwardBtn.disabled ? "0.5" : "1";
        }
    }
    
    // Show loading overlay
    function showLoading() {
        if (loadingOverlay) {
            loadingOverlay.classList.add("show");
        }
    }
    
    // Hide loading overlay
    function hideLoading() {
        if (loadingOverlay) {
            loadingOverlay.classList.remove("show");
        }
    }
    
    // Add keyboard shortcuts
    document.addEventListener("keydown", function(e) {
        // Ctrl/Cmd + R for refresh
        if ((e.ctrlKey || e.metaKey) && e.key === "r") {
            e.preventDefault();
            if (refreshBtn) {
                refreshBtn.click();
            }
        }
        
        // Alt + Left Arrow for back
        if (e.altKey && e.key === "ArrowLeft") {
            e.preventDefault();
            if (backBtn) {
                backBtn.click();
            }
        }
        
        // Alt + Right Arrow for forward
        if (e.altKey && e.key === "ArrowRight") {
            e.preventDefault();
            if (forwardBtn) {
                forwardBtn.click();
            }
        }
        
        // Ctrl/Cmd + L to focus URL bar
        if ((e.ctrlKey || e.metaKey) && e.key === "l") {
            e.preventDefault();
            if (urlInput) {
                urlInput.focus();
                urlInput.select();
            }
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
    document.querySelectorAll(".nav-button, .go-btn, .control-btn, .link-card a, .back-button").forEach(button => {
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
        hideLoading();
        console.log("Resonance Browser initialized successfully");
    }, 1000);
    
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

// Export functions for potential external use
window.ResonanceBrowser = {
    loadUrl: function(url) {
        const event = new CustomEvent("loadUrl", { detail: { url: url } });
        document.dispatchEvent(event);
    },
    
    goBack: function() {
        const backBtn = document.getElementById("backBtn");
        if (backBtn) backBtn.click();
    },
    
    goForward: function() {
        const forwardBtn = document.getElementById("forwardBtn");
        if (forwardBtn) forwardBtn.click();
    },
    
    refresh: function() {
        const refreshBtn = document.getElementById("refreshBtn");
        if (refreshBtn) refreshBtn.click();
    }
};

