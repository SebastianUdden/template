(function() {
    myFunction = (scrollUp) => {
        let x = document.getElementById("NavMenu");
        if (scrollUp) {
            x.className = "menu"; 
            return;
        }
        if (x.className === "menu") {
            x.className += " responsive";
        } else {
            x.className = "menu";
        }
    }

    let lastScrollPosition = 0;
    let header = document.getElementById("Menu");
    let sticky = header.offsetTop;
    let lastClick = 0;

    window.onscroll = function() {addNavMenu()};

    addNavMenu = () => {
        let newScrollPosition = window.scrollY;
        if (newScrollPosition < lastScrollPosition) {
            //upward - code here
            myFunction(true);
            if (window.pageYOffset == 0) {
                header.classList.remove("hide");
                header.classList.add("sticky");
                header.classList.add("topSlide");
                header.classList.remove("fade");
            }
            if (window.pageYOffset >= sticky) {
                header.classList.remove("hide");
                header.classList.add("sticky");
                header.classList.remove("fade");
            }
        } else {
            //downward - code here
            header.classList.remove("sticky");
            header.classList.remove("topSlide");
            header.classList.add("fade");        
        }
        lastScrollPosition = newScrollPosition;
    }

    scrollTo = (targetY, duration) => {
        let delay = duration + 1;
        if (lastClick >= (Date.now() - delay)) { return };
        lastClick = Date.now();

        let start = document.documentElement.scrollTop;
        let diff = targetY - (document.documentElement.scrollTop || document.body.scrollTop ||  0);            
        let scrollStep = Math.PI / (duration / 10);
        let count = 0;
        let currY = 0;

        if ((targetY) <= (document.documentElement.scrollTop)) {
            /* Scroll Up */
            scrollInterval = setInterval(function() {                
                if (document.documentElement.scrollTop != 0) {
                    count++;   
                    currY = 100 * (0.5 - 0.5 * Math.cos(count * scrollStep));
                    if (document.documentElement.scrollTop <= (targetY - 10)) { clearInterval(scrollInterval); }
                    document.documentElement.scrollTop -= currY;                   
                } 
                else { clearInterval(scrollInterval); }
            }, 10);
        } else {
            /* Scroll Down */
            scrollInterval = setInterval(function() {                
                if (document.body.scrollTop != targetY) {
                    count++;
                    currY = start + diff * (0.5 - 0.5 * Math.cos(count * scrollStep));
                    if (currY >= (targetY - 140)) { clearInterval(scrollInterval); }
                    document.documentElement.scrollTop = currY;
                } 
                else { clearInterval(scrollInterval); }
            }, 10);
        }
    }

    goTo = (elementID) => {
        let target = document.getElementById(elementID);
        scrollTo(target.offsetTop, 500);
    }
})();