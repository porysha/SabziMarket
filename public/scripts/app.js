let closeNavBtn = document.querySelector(".close-btn");
let barsNavBtn = document.querySelector(".bars-icon");
let navbar = document.querySelector(".navbar");
let arrdown1 = document.querySelector(".arr-down-one");
let concertWatchStatus = document.querySelector(".submenu");
let bg_video = document.getElementById("myvideo");
let overlay = document.querySelector(".overlay");
// let albumCover = document.querySelector(".ablum-cover");
let closeLogin = document.querySelector(".closeLogin");
let nav_item = document.querySelectorAll(".nav-items");
let login_btn = document.querySelector(".login-btn");
let subLogin = document.querySelector(".sublogin");
let secObs = document.querySelectorAll(".secItem");
// /////////////////////////////////////////////////////////
let user_phone = document.querySelector("#user-phone");
let err_login = document.querySelector(".erorr_login");
let tnx_login = document.querySelector(".tnx_login");
let phone_submit = document.querySelector("#form");

async function checkNumber(num) {
    try {
        const res = await fetch(
            "https://sabzimarket-6b2a5-default-rtdb.firebaseio.com/users.json"
        );
        const data = await res.json();
        let allData = Object.entries(data);
        let thisNum = allData.some((data) => num == data[1].user_number);
        return thisNum;
    } catch (err) {
        console.log(err);
        return false;
    }
}

console.log();

phone_submit.addEventListener("submit", (e) => {
    e.preventDefault();
    let userInfo;
    if (user_phone.value.trim() === "") {
        loginMsg(err_login, "لطفا شماره همراه خود را وارد کنید !", 2000);
        return;
    }

    checkNumber(user_phone.value).then((result) => {
        if (!result) {
            userInfo = {
                user_number: user_phone.value,
            };
            fetch(
                "https://sabzimarket-6b2a5-default-rtdb.firebaseio.com/users.json",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(userInfo),
                }
            )
                .then((res) => {
                    console.log(res);
                    clearForm();
                    loginMsg(tnx_login, "از ثبت نام شما سپاسگزاریم.", 3000);
                })
                .catch((err) => console.log(err));
        } else {
            loginMsg(err_login, "شما قبلا ثبت نام کرده اید !", 2000);
        }
    });
});

function loginMsg(elm, msg, timer) {
    elm.innerHTML = msg;
    elm.classList.replace("hidden", "block");
    setTimeout(() => {
        elm.classList.replace("block", "hidden");
    }, timer);
}
function clearForm() {
    user_phone.value = "";
}

// /////////////////////////////////////////////////////////
const revealSection = function (entries, observer) {
    const [entry] = entries;

    if (!entry.isIntersecting) return;

    entry.target.classList.replace("opacity-0", "opacity-100");
    entry.target.classList.remove("translate-y-6");
    observer.unobserve(entry.target);
};

const obs = new IntersectionObserver(revealSection, {
    root: null,
    threshold: 0.15,
});
secObs.forEach((sec) => {
    console.log(sec);
    obs.observe(sec);

    sec.classList.remove("opacity-100");
    sec.classList.add("translate-y-6");
});

// ////////////////////////////////////////////////////////
login_btn.addEventListener("click", () => {
    console.log("add");
    subLogin.classList.replace("hidden", "flex");
});
closeLogin.addEventListener("click", () => {
    console.log("remove");

    subLogin.classList.replace("flex", "hidden");
});
//
document.querySelectorAll(".arr-down").forEach((arr) => {
    arr.addEventListener("click", (e) => {
        // پیدا کردن والد (parent) اصلی که شامل زیرمنو (sub-head) است
        let parentElement = arr.closest("li");
        // پیدا کردن زیرمنوی مربوطه
        let subHead = parentElement.querySelector(".sub-head");
        // تغییر کلاس hidden برای نمایش یا مخفی کردن زیرمنو
        if (subHead.classList.contains("hidden")) {
            subHead.classList.replace("hidden", "flex");
            arr.classList.add("rotate-180");
            nav_item.forEach((item) => {
                item.addEventListener("click", () => {
                    item.classList.add("text-green-400");
                });
            });
        } else {
            arr.classList.remove("rotate-180");

            nav_item.forEach((item) => {
                item.addEventListener("click", () => {
                    item.classList.remove("text-green-400");
                });
            });
            subHead.classList.replace("flex", "hidden");
        }
    });
});
//

barsNavBtn.addEventListener("click", () => {
    overlay.classList.replace("hidden", "block");

    navbar.classList.replace("translate-x-[100%]", "translate-x-[0%]");
});
function closehandeler() {
    navbar.classList.replace("translate-x-[0%]", "translate-x-[100%]");
    overlay.classList.replace("block", "hidden");
}
closeNavBtn.addEventListener("click", closehandeler);
closeLogin.addEventListener("click", () => {
    subLogin.classList.replace("block", "hidden");
});
overlay.addEventListener("click", closehandeler);
//  ///////////////////////////////////////////////
//
// const sectionHome = document.querySelector(".home");

// const obs = new IntersectionObserver(
//     function (entries) {
//         const ent = entries[0];
//         console.log(ent);
//         if (ent.isIntersecting === false) {
//             document
//                 .querySelector(".navbarhome")
//                 .classList.add("bg-zinc-700/50");
//         } else
//             document
//                 .querySelector(".navbarhome")
//                 .classList.remove("bg-zinc-700/50");
//     },
//     {
//         root: null,
//         threshold: 0,
//     }
// );
// obs.observe(sectionHome);
///////////////////////////////////////
// Tabbed component
const tabs = document.querySelectorAll(".operations__tab");
const tabsContainer = document.querySelector(".operations__tab-container");
const tabsContent = document.querySelectorAll(".operations__content");
tabsContainer.addEventListener("click", function (e) {
    const clicked = e.target.closest(".operations__tab");
    console.log("hi");

    if (!clicked) return;

    tabs.forEach((t) =>
        t.classList.replace("operations__content--active", "hidden")
    );
    tabsContent.forEach((c) =>
        c.classList.replace("operations__content--active", "hidden")
    );

    clicked.classList.replace("hidden", "operations__content--active");
    document
        .querySelector(`.operations__content--${clicked.dataset.tab}`)
        .classList.replace("hidden", "operations__content--active");
});
////////////////////////////LOGIN REMMBER///////////////////////////////////////////////////////

function setCookie(key, value, ex) {
    let now = new Date();
    now.setTime(now.getTime() + ex * 24 * 60 * 60 * 1000);
    document.cookie = `${key}=${value};path=/;expires=${now}`;
}

function getCookie(cookiname) {
    let cookieArr = document.cookie.split(";");
    let maincookie = null;

    cookieArr.some((co) => {
        if (co.includes(cookiname)) {
            maincookie = co.substring(co.indexOf("=") + 1);
            return true;
        }
    });
    return maincookie;
}
// let loginbtn = document.querySelector("tm");
// let remmberChecker = document.querySelector("tm");
// let usernameInput = document.querySelector("tm");
// let passInput = document.querySelector("tm");
function clearInput() {
    usernameInput = "";
    passInput = "";
}
if (location.pathname === "/public/profull.html") {
    // تغییر URL بدون بارگذاری مجدد صفحه
    history.pushState(null, "", "/public/pro");
}
// loginbtn.addEventListener("click", (e) => {
//     e.preventDefault();
//     if (remmberChecker.checked) {
//         setCookie(usernameInput, passInput, 30);
//     }
//     clearInput();
// });
