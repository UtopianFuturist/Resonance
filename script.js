// Resonance Browser JavaScript
document.addEventListener("DOMContentLoaded", function() {
    // Get DOM elements
    const browserFrame = document.getElementById("browserFrame");
    const urlInput = document.getElementById("urlInput");
    const goBtn = document.getElementById("goBtn");
    const backBtn = document.getElementById("backBtn");
    const forwardBtn = document.getElementById("forwardBtn");
    const refreshBtn = document.getElementById("refreshBtn");
    const loadingOverlay = document.getElementById("loadingOverlay");
    const dropdownLinks = document.querySelectorAll(".dropdown-content a");
    
    // Browser history management (for internal navigation if any, or just for URL bar)
    let browserHistory = ["https://duckduckgo.com/"];
    let currentHistoryIndex = 0;
    
    // Initialize
    updateUrlInput();
    updateNavigationButtons();
    
    // Dropdown link click handlers
    dropdownLinks.forEach(link => {
        link.addEventListener("click", function(e) {
            e.preventDefault();
            const url = this.getAttribute("data-url");
            if (url) {
                // Open in new tab due to iframe security restrictions
                window.open(url, "_blank");
                // Optionally, load a default page in the iframe or keep current
                // browserFrame.src = "https://duckduckgo.com/"; 
                // updateUrlInput();
            }
            // Close dropdown after selection
            const dropdown = this.closest(".dropdown");
            if (dropdown) {
                dropdown.classList.remove("active");
            }
        });
    });
    
    // Go button click handler
    goBtn.addEventListener("click", function() {
        const url = urlInput.value.trim();
        if (url) {
            // Open in new tab due to iframe security restrictions
            window.open(url, "_blank");
            // Optionally, load a default page in the iframe or keep current
            // browserFrame.src = "https://duckduckgo.com/";
            // updateUrlInput();
        }
    });
    
    // URL input enter key handler
    urlInput.addEventListener("keypress", function(e) {
        if (e.key === "Enter") {
            const url = this.value.trim();
            if (url) {
                // Open in new tab due to iframe security restrictions
                window.open(url, "_blank");
                // Optionally, load a default page in the iframe or keep current
                // browserFrame.src = "https://duckduckgo.com/";
                // updateUrlInput();
            }
        }
    });
    
    // Browser control handlers (these will now mostly affect the URL bar, not the iframe content directly)
    backBtn.addEventListener("click", function() {
        if (currentHistoryIndex > 0) {
            currentHistoryIndex--;
            const url = browserHistory[currentHistoryIndex];
            urlInput.value = url; // Update URL bar
            updateNavigationButtons();
            // No actual iframe navigation here due to security
        }
    });
    
    forwardBtn.addEventListener("click", function() {
        if (currentHistoryIndex < browserHistory.length - 1) {
            currentHistoryIndex++;
            const url = browserHistory[currentHistoryIndex];
            urlInput.value = url; // Update URL bar
            updateNavigationButtons();
            // No actual iframe navigation here due to security
        }
    });
    
    refreshBtn.addEventListener("click", function() {
        // Refreshing the parent page, not the iframe content directly
        location.reload();
    });
    
    // Load URL function (modified to open in new tab)
    function loadUrl(url) {
        // Ensure URL has protocol
        if (!url.startsWith("http://") && !url.startsWith("https://")) {
            url = "https://" + url;
        }
        
        // Add to history for URL bar display
        if (currentHistoryIndex < browserHistory.length - 1) {
            browserHistory = browserHistory.slice(0, currentHistoryIndex + 1);
        }
        
        browserHistory.push(url);
        currentHistoryIndex = browserHistory.length - 1;
        
        // Update URL bar
        updateUrlInput();
        
        // Open in new tab
        window.open(url, "_blank");
        
        // Hide loading overlay immediately as iframe won't load
        hideLoading();
    }
    
    // Update URL input field
    function updateUrlInput() {
        if (browserHistory[currentHistoryIndex]) {
            urlInput.value = browserHistory[currentHistoryIndex];
        }
    }
    
    // Update navigation button states
    function updateNavigationButtons() {
        backBtn.disabled = currentHistoryIndex <= 0;
        forwardBtn.disabled = currentHistoryIndex >= browserHistory.length - 1;
        
        // Update button opacity based on state
        backBtn.style.opacity = backBtn.disabled ? "0.5" : "1";
        forwardBtn.style.opacity = forwardBtn.disabled ? "0.5" : "1";
    }
    
    // Show loading overlay (will be hidden immediately after opening new tab)
    function showLoading() {
        loadingOverlay.classList.add("show");
    }
    
    // Hide loading overlay
    function hideLoading() {
        loadingOverlay.classList.remove("show");
    }
    
    // Iframe load event handler (now mostly for initial load or if a local page is loaded)
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
    
    // Enhanced dropdown interactions
    const dropdowns = document.querySelectorAll(".dropdown");
    
    dropdowns.forEach(dropdown => {
        const button = dropdown.querySelector(".nav-button");
        const content = dropdown.querySelector(".dropdown-content");
        
        // Close dropdown when clicking outside
        document.addEventListener("click", function(e) {
            if (!dropdown.contains(e.target)) {
                dropdown.classList.remove("active");
            }
        });
        
        // Toggle dropdown on button click
        button.addEventListener("click", function(e) {
            e.stopPropagation();
            
            // Close other dropdowns
            dropdowns.forEach(otherDropdown => {
                if (otherDropdown !== dropdown) {
                    otherDropdown.classList.remove("active");
                }
            });
            
            // Toggle current dropdown
            dropdown.classList.toggle("active");
        });
    });
    
    // Smooth scrolling for better UX
    document.querySelectorAll("a[href^=\"#\"]").forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute("href"));
            if (target) {
                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }
        });
    });
    
    // Add keyboard shortcuts
    document.addEventListener("keydown", function(e) {
        // Ctrl/Cmd + R for refresh
        if ((e.ctrlKey || e.metaKey) && e.key === "r") {
            e.preventDefault();
            refreshBtn.click();
        }
        
        // Alt + Left Arrow for back
        if (e.altKey && e.key === "ArrowLeft") {
            e.preventDefault();
            backBtn.click();
        }
        
        // Alt + Right Arrow for forward
        if (e.altKey && e.key === "ArrowRight") {
            e.preventDefault();
            forwardBtn.click();
        }
        
        // Ctrl/Cmd + L to focus URL bar
        if ((e.ctrlKey || e.metaKey) && e.key === "l") {
            e.preventDefault();
            urlInput.focus();
            urlInput.select();
        }
    });
    
    // Add visual feedback for interactions
    const interactiveElements = document.querySelectorAll("button, .nav-button, .dropdown-content a");
    
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
    document.querySelectorAll(".nav-button, .go-btn, .control-btn").forEach(button => {
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
        
        button, .nav-button {
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
        document.getElementById("backBtn").click();
    },
    
    goForward: function() {
        document.getElementById("forwardBtn").click();
    },
    
    refresh: function() {
        document.getElementById("refreshBtn").click();
    }
};

