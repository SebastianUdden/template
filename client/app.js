(function() {
    let lastScrollPosition = 0;
    let header = document.getElementById("Menu");
    let sticky = header.offsetTop;
    let lastClick = 0;

    window.onscroll = function() {addNavMenu()};

    addNavMenu = () => {
        let newScrollPosition = window.scrollY;
        if (newScrollPosition < lastScrollPosition) {
            //upward - code here
            if (window.pageYOffset >= sticky) {
                header.classList.add("sticky");
            }
        } else {
            //downward - code here
            header.classList.remove("sticky");        
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
            scrollInterval = setInterval(function() {                
                if (document.documentElement.scrollTop != 0) {
                    count++;   
                    currY = 100 * (0.5 - 0.5 * Math.cos(count * scrollStep));
                    if (document.documentElement.scrollTop <= (targetY - 61)) { clearInterval(scrollInterval); }
                    document.documentElement.scrollTop -= currY;                   
                } 
                else { clearInterval(scrollInterval); }
            }, 10);
        } else {
            scrollInterval = setInterval(function() {                
                if (document.body.scrollTop != targetY) {
                    count++;
                    currY = start + diff * (0.5 - 0.5 * Math.cos(count * scrollStep));
                    if (currY >= (targetY - 61)) { clearInterval(scrollInterval); }
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