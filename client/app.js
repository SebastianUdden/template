(() => {
    const HEADER = document.getElementById("Header");
    const NAV = document.getElementById("Nav");
    let lastScrollPosition = 0;
    let lastClick = 0;
    
    showMenu = (scrollUp) => {
        if (scrollUp) {
            NAV.className = "menu"; 
            return;
        }
        if (NAV.className === "menu") {
            NAV.className += " responsive";
        } else {
            NAV.className = "menu";
        }
    }

    window.onscroll = () => {addNavMenu()};

    addNavMenu = () => {
        let newScrollPosition = window.scrollY;
        if (newScrollPosition < lastScrollPosition) {
            //upward - code here
            showMenu(true);
            if (window.pageYOffset < 50) {
                HEADER.classList.remove("hide");
                HEADER.classList.add("sticky");
                HEADER.classList.add("topSlide");
                HEADER.classList.remove("fade");
            }
            if (window.pageYOffset >= HEADER.offsetTop) {
                HEADER.classList.remove("hide");
                HEADER.classList.add("sticky");
                HEADER.classList.remove("fade");
            }
        } else {
            //downward - code here    
            if (window.pageYOffset > 160) {
                HEADER.classList.remove("sticky");
                HEADER.classList.remove("topSlide");
                HEADER.classList.add("fade");        
            }
        }
        lastScrollPosition = newScrollPosition;
    }

    goTo = (elementID) => {
        let target = document.getElementById(elementID);
        scrollTo(target.offsetTop, 500);
    }

    scrollTo = (targetY, duration) => {
        let delay = duration + 1;
        if (lastClick >= (Date.now() - delay)) { return };
        lastClick = Date.now();

        let start = document.documentElement.scrollTop || document.body.scrollTop;
        let diff = targetY - (document.documentElement.scrollTop || document.body.scrollTop ||  0);            
        let scrollStep = Math.PI / (duration / 10);
        let count = 0;
        let currY = 0;

        if ((targetY) <= (document.documentElement.scrollTop || document.body.scrollTop)) {
            /* Scroll Up */
            scrollInterval = setInterval(() => {                
                if ((document.documentElement.scrollTop || document.body.scrollTop) != 0) {
                    count++;   
                    currY = 200 * (0.5 - 0.5 * Math.cos(count * scrollStep));
                    if ((document.documentElement.scrollTop || document.body.scrollTop) <= (targetY - 10)) { clearInterval(scrollInterval); }
                    document.documentElement.scrollTop -= currY; 
                    document.body.scrollTop -= currY;
                } 
                else { clearInterval(scrollInterval); }
            }, 10);
        } else {
            /* Scroll Down */
            scrollInterval = setInterval(() => {                
                if ((document.documentElement.scrollTop || document.body.scrollTop) != targetY) {
                    count++;
                    currY = start + diff * (0.5 - 0.5 * Math.cos(count * scrollStep));
                    if (currY >= (targetY - 220)) { clearInterval(scrollInterval); }
                    document.documentElement.scrollTop = currY;
                    document.body.scrollTop = currY;
                } 
                else { clearInterval(scrollInterval); }
            }, 10);
        }
    }    
})();