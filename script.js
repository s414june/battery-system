$(function () {
    //預設menu開合(小裝置關)
    if ($(window).width() < 991) {
        collapseMenu();
    }

    $(".hide-when-collapsed").removeClass("hide").addClass("show");
    $(".menu-btn").click((e) => {
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
    $("#menu-header").hover((e) => {
        //單純UI效果
        $("#menu").toggleClass("bigger");
    })
    $(window).resize(() => {
        //保持特定尺寸預設menu開合(大裝置開，小裝置關)
        $(window).width() < 991 ? collapseMenu() : openCollapsedMenu();
    })

    function collapseMenu() {
        $("#menu").addClass("collapsed");
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
        }
    }
})