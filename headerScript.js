function afterGetHeader() {
    VerifyUser();
    // First we get the viewport height and we multiple it by 1% to get a value for a vh unit
    vh = window.innerHeight * 0.01;
    // Then we set the value in the --vh custom property to the root of the document
    document.documentElement.style.setProperty('--vh', `${vh}px`);

    //預設menu開合(小裝置關)
    if ($(window).width() < 991) {
        collapseMenu();
    }
    $("#desktopMenuBtn").click((e) => {
        //如果在這裡阻止冒泡，會造成收合時按.menu-btn打不開，所以在打開狀態下才阻止冒泡
        if (!$("#menu").hasClass("collapsed")) {
            //會跟#menu-header的click事件同時發生而抵銷，因此阻止冒泡(阻止#menu-header的click事件)
            e.stopPropagation();
            collapseMenu();
        }
    })
    $("#menu-header").click((e) => {
        openCollapsedMenu();
    })
    $("#mobileMenu").click((e) => {
        $("#menu").hasClass("collapsed") ? openCollapsedMenu() : collapseMenu();
        $("#mobileMenu").toggleClass("collapsed");
    })
    $("#menu-header").mouseover((e) => {
        //單純UI效果
        if ($(window).width() > 576) {
            if ($("#menu").hasClass("collapsed")) {
                $("#menu").addClass("bigger");
                $(".menu-holder").addClass("bigger");
            }
        }
    })
    $("#menu-header").mouseout((e) => {
        //單純UI效果
        if ($(window).width() > 576) {
            $("#menu").removeClass("bigger");
            $(".menu-holder").removeClass("bigger");
        }
    })
    $(".not-opening-url").click((e) => {
        alert("此項目尚未啟用！");
    })
}