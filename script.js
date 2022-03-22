$(function () {
    // First we get the viewport height and we multiple it by 1% to get a value for a vh unit
    let vh = window.innerHeight * 0.01;
    // Then we set the value in the --vh custom property to the root of the document
    document.documentElement.style.setProperty('--vh', `${vh}px`);

    //預設menu開合(小裝置關)
    if ($(window).width() < 991) {
        collapseMenu();
    }

    $(".hide-when-collapsed").removeClass("hide").addClass("show");
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
        $("#menu").hasClass("collapsed")? openCollapsedMenu():collapseMenu();
        $("#mobileMenu").toggleClass("collapsed");
    })
    $("#menu-header").hover((e) => {
        //單純UI效果
        if($(window).width() > 576){
            $("#menu").toggleClass("bigger");
            $("#menu-holder").toggleClass("bigger");
        }
    })
    $(window).resize(() => {
        //保持特定尺寸預設menu開合(大裝置開，小裝置關)
        $(window).width() < 991 ? collapseMenu() : openCollapsedMenu();
        //手機版menu設定(預設關閉menu)
        if($(window).width() < 575)
            $("#mobileMenu").addClass("collapsed")
        vh = window.innerHeight * 0.01;
        // Then we set the value in the --vh custom property to the root of the document
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    })

    function collapseMenu() {
        $("#menu").addClass("collapsed");
        $("#menu-holder").addClass("collapsed");
        $(".hide-when-collapsed").removeClass("show").addClass("hide");
        $("#menu .collapse").collapse("hide");
    }

    function openCollapsedMenu() {
        if ($("#menu").hasClass("collapsed")) {
            $(".hide-when-collapsed").animate({
                opacity: 0
            }, 400, () => {
                $(".hide-when-collapsed").removeClass("hide").addClass("show");
                $(".hide-when-collapsed").animate({
                    opacity: 1
                }, 200)
            })
            $("#menu").removeClass("collapsed");
            $("#menu-holder").removeClass("collapsed");
        }
    }
})