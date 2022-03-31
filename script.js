$(function () {
    VerifyUser();
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
    $("#menu-header").mouseover((e) => {
        //單純UI效果
        if($(window).width() > 576){
            if($("#menu").hasClass("collapsed")){
                $("#menu").addClass("bigger");
                $("#menu-holder").addClass("bigger");
            }
        }
    })
    $("#menu-header").mouseout((e) => {
        //單純UI效果
        if($(window).width() > 576){
            $("#menu").removeClass("bigger");
            $("#menu-holder").removeClass("bigger");
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

    $(".not-opening-url").click((e)=>{
        alert("此項目尚未啟用！");
        // e.stopPropagation();
    })
})

function VerifyUser(){
    const testAccount = "tatung";
    const testPassword = "70771557Car";
    let Account = localStorage.getItem("Account");
    let Password = localStorage.getItem("Password");
    if(Account==testAccount && Password==testPassword){
        return;
    }
    else{
        alert("請登入");
        location.assign("./login.html");
    }    
}
function Logout(){
    if(confirm("你確定要登出？")){
        alert("已登出系統！");
        localStorage.removeItem("Account");
        localStorage.removeItem("Password");
        location.assign("./login.html");
    }
}
$(window).resize(()=>{
    document.documentElement.style.setProperty('--vh', `${vh}px`);
})