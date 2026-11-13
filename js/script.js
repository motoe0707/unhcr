// 사파리 높이값 버그 수정
let vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty('--vh', `${vh}px`);

window.addEventListener('resize', () => {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
});


// ======================== sec1 fadeIn ==========================
$(function(){
  $(sec1).addClass('ani');
});


// ====================== sec1 scroll trigger =========================
gsap.registerPlugin(ScrollTrigger);

function initSec1ClassEvent() {

    // 모바일 전용
    if (window.innerWidth > 850) return;

    ScrollTrigger.create({
        trigger: ".sec1",
        start: "top top",
        end: "+=500",
        pin: true,
        scrub: false,
        toggleActions: "play none none reverse",

        onUpdate: (self) => {
            if (self.progress > 0.1) {
                document.querySelector(".sec1").classList.add("on");
            } else {
                document.querySelector(".sec1").classList.remove("on");
            }
        }
    });
}

initSec1ClassEvent();


// ========================= floating banner =====================================
const sec1 = document.querySelector('.sec1');
const floating = document.querySelector('.floating_bn');

const observerSec1 = new IntersectionObserver((entries) => {
    entries.forEach(entry => {

        if (entry.isIntersecting) {
            floating.classList.remove('show');
        } else {
            floating.classList.add('show');
        }

    });
}, { threshold: 0.5 });

observerSec1.observe(sec1);


// ============================= sec2 fadeIn =====================================
const sec2 = document.querySelector('.sec2');

const observerSec2 = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            sec2.classList.add('ani');      
        }
    });
}, { threshold: 0.5 });

observerSec2.observe(sec2);


// =============================== sec3 fadeIn =================================
const sec3 = document.querySelector('.sec3');

const observerSec3 = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            sec3.classList.add('ani');      
        }
    });
}, { threshold: 0.5 });

observerSec3.observe(sec3);


// ============================= sec4 event ================================
let sec4Ready = false;
const sec4 = document.querySelector('.sec4');

// fadeIn
const observerSec4 = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            sec4.classList.add('ani');

            setTimeout(() => {
                sec4Ready = true;
                updateSlideAnimation(swiper1);
            }, 600);
        }
    });
}, { threshold: 0.5 });

observerSec4.observe(sec4);


// ========================== Swiper - sec4 편지 슬라이더 ================================
$(function () {

    const isMobile = window.matchMedia("(max-width: 767px)").matches;

    window.swiper1 = new Swiper('.sec4 .swiper1', {
        effect: 'fade',
        fadeEffect: { crossFade: true },
        speed: 800,
        loop: false,
        slidesPerView: 1,
        allowTouchMove: isMobile,
        // iOS 터치 끊김 방지
        touchStartPreventDefault: false,
        passiveListeners: false,

        navigation: {
            nextEl: '.sec4 .btn_next',
            prevEl: '.sec4 .btn_prev'
        },

        on: {
            init: function () {
                updateSlideAnimation(this);
                updateButtons(this);
            },
            slideChange: function () {
                updateSlideAnimation(this);
                updateButtons(this);
            }
        }
    });

    // 이미지 컨트롤
    function updateSlideAnimation(swiper) {
        $('.sec4 [class*="img_box_"]').removeClass('slide_ani');

        const $currentImg = $(swiper.slides[swiper.activeIndex])
            .find('[class*="img_box_"]');

        $currentImg.addClass('slide_ani');
    }

    // 버튼 컨트롤
    function updateButtons(swiper) {
        const total = swiper.slides.length;
        const idx = swiper.activeIndex;

        const $prev = $('.sec4 .btn_prev');
        const $next = $('.sec4 .btn_next');

        $prev.addClass('on');
        $next.addClass('on');

        if (idx === 0) {
            $prev.removeClass('on');
        }
        if (idx === total - 1) {
            $next.removeClass('on');
        }
    }
});


// ============================= sec5 fadeIn ==================================
const sec5 = document.querySelector('.sec5');

const observerSec5 = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            sec5.classList.add('ani');         
            sec5.classList.add('on');         
        }
    });
}, { threshold: 0.5 });

observerSec5.observe(sec5);


// ====================== sec5 - btm event ========================
const btnMinus = document.querySelector('.btn_minus');
const btnPlus = document.querySelector('.btn_plus');
const countNum = document.querySelector('.count_num');
const priceEl = document.querySelector('.price');
const donateLinks = sec5.querySelectorAll('.btn_go_donate');

let count = 1;          
const min = 1;
const max = 4;

const unitPrice = 15000;
const baseUrl = 'https://campaign.unhcr.or.kr/donate/support.do?seq=94&sptType=M';

updateButtons();
updatePrice(count * unitPrice);
updateLinks(count * unitPrice);

btnPlus.addEventListener('click', () => {
    if (count < max) {
        count++;
        countNum.value = count;
        updateButtons();
        updatePrice(count * unitPrice);
        updateLinks(count * unitPrice);
        playStarAnimation(count);
    }
});

btnMinus.addEventListener('click', () => {
    if (count > min) {
        count--;
        countNum.value = count;
        updateButtons();
        updatePrice(count * unitPrice);
        updateLinks(count * unitPrice);
        playStarAnimation(count);
    }
});

// 버튼 상태 함수
function updateButtons() {
    // minus
    if (count === min) {
        btnMinus.classList.add("disabled");
    } else {
        btnMinus.classList.remove("disabled");
    }

    // plus
    if (count === max) {
        btnPlus.classList.add("disabled");
    } else {
        btnPlus.classList.remove("disabled");
    }
}

// 가격 카운팅 함수
function updatePrice(newPrice) {
    const currentPrice = parseInt(priceEl.textContent.replace(/[^0-9]/g, ""), 10);

    const duration = 300; 
    const startTime = performance.now();

    function animate(now) {
        const progress = Math.min((now - startTime) / duration, 1);
        const value = Math.floor(currentPrice + (newPrice - currentPrice) * progress);

        priceEl.textContent = value.toLocaleString() + "원";

        if (progress < 1) {
            requestAnimationFrame(animate);
        }
    }

    requestAnimationFrame(animate);
}

// 링크 업데이트 함수
// function updateLinks(price) {
//     donateLinks.forEach(link => {
//         link.href = `${baseUrl}&priceType=${price}`;
//     });
// }
function updateLinks(price) {
    donateLinks.forEach(link => {
        link.onclick = function() {
            let actionUrl = `${baseUrl}&priceType=${price}&mrm_s=${utmSrc}&mrm_m=${utmMid}&mrm_c=${utmCmpn}`;
            var UserAgent = navigator.userAgent;
            if (UserAgent.match(/iPhone|iPod|Android|Windows CE|BlackBerry|Symbian|Windows Phone|webOS|Opera Mini|Opera Mobi|POLARIS|IEMobile|lgtelecom|nokia|SonyEricsson/i) != null || UserAgent.match(/LG|SAMSUNG|Samsung/) != null) {
                document.getElementById("mobile_frm").target = "_blank";
                $("#mobile_frm").attr('action', actionUrl);
                $("#mobile_frm").submit();
            } else {
                document.getElementById("desk_frm").target = "_blank";
                $("#desk_frm").attr('action', actionUrl);
                $("#desk_frm").submit();
            }
            return false;
        };
    });
}

// 하단 별똥별 함수
function playStarAnimation() {
    const stars = document.querySelectorAll('.sec5 .star');

    stars.forEach(star => {
        star.classList.remove('on');
        void star.offsetWidth;
    });

    stars.forEach(star => {
        star.classList.add('on');
    });
}


// ============================== mouse trick ===============================
const goods = document.querySelector('.sec6 .goods');
const imgWrap = goods?.querySelector('.img_wrap');
const bg = goods?.querySelector('.goods_bg');

const RANGE_Y = 700;
let isGoodsVisible = false;
let rafId = null;
let lastX = 0;
let lastY = 0;

// 화면에 있을 때만 활성화
const goodsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        isGoodsVisible = entry.isIntersecting;

        if (!isGoodsVisible) {
            bg.style.transform = `translate(-50%, 0px)`;
            imgWrap.style.transform = `translate(0px, 0px)`;
        }
    });
}, { threshold: 0.1 });

if (goods) {
    goodsObserver.observe(goods);
}

if (window.innerWidth > 850 && goods && imgWrap && bg) {

    window.addEventListener('mousemove', (e) => {
        if (!isGoodsVisible) return;

        lastX = e.clientX;
        lastY = e.clientY;

        if (rafId !== null) return;

        rafId = requestAnimationFrame(() => {
            updateMousePosition(lastX, lastY);
            rafId = null;
        });
    }, { passive: true });
}

function updateMousePosition(clientX, clientY) {
    const rect = goods.getBoundingClientRect();
    const centerY = rect.top + rect.height / 2;
    const diffY = clientY - centerY;

    if (Math.abs(diffY) > RANGE_Y) {
        bg.style.transform = `translate(-50%, 0px)`;
        imgWrap.style.transform = `translate(0px, 0px)`;
        return;
    }

    const centerX = rect.left + rect.width / 2;
    const diffX = clientX - centerX;

    const moveX = diffX / 20;
    const moveY = diffY / 20;

    bg.style.transform = `translate3d(calc(-50% + ${moveX}px), ${moveY}px, 0)`;
    imgWrap.style.transform = `translate3d(${-moveX}px, ${-moveY}px, 0)`;
}


// ========================== sec6 - scroll fadeIn ===============================
gsap.registerPlugin(ScrollTrigger);

const isMobile = window.matchMedia("(max-width: 767px)").matches;

let sequence = [];

if (isMobile) {
    // mo
    sequence = gsap.utils.toArray(
        ".sec6 .news_wrap.mo > figure, .sec6 .news_wrap.mo > .des"
    );
} else {
    // pc
    const leftItems = gsap.utils.toArray(".sec6 .news_wrap.pc .left figure");
    const rightItems = gsap.utils.toArray(".sec6 .news_wrap.pc .right figure");
    const des = document.querySelector(".sec6 .news_wrap.pc .des");

    for (let i = 0; i < Math.max(leftItems.length, rightItems.length); i++) {
        if (leftItems[i]) sequence.push(leftItems[i]);
        if (i === 1 && des) sequence.push(des);
        if (rightItems[i]) sequence.push(rightItems[i]);
    }
}

sequence.forEach((item, i) => {
    gsap.fromTo(
        item,
        { opacity: 0, y: 40 },
        {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: i * 0.1,
            ease: "power2.out",
            scrollTrigger: {
                trigger: item,
                start: "top 85%",
                toggleActions: "play none none none",
                once: true
            }
        }
    );
});


// ========================= img marquee =============================
const track = document.querySelector(".marquee_track");
const btnNext = document.querySelector(".marquee_control .btn_next");
const btnPrev = document.querySelector(".marquee_control .btn_prev");

// 속도 설정
const initialSpeed = 90;   // 기본 속도
const boostSpeed = 220;    // 가속 속도

let baseSpeed = initialSpeed;
let speed = baseSpeed;
let targetSpeed = baseSpeed;

let direction = -1; // -1: 왼쪽, 1: 오른쪽
let x = 0;

let isBoosted = false;
let isFastMode = false;

let itemWidth = 0;
let bufferWidth = 0;

// 타임 기반 애니메이션
let lastTime = performance.now();

// 트랙 채우기
function fillTrack() {
    const parentWidth = window.innerWidth;
    const originals = Array.from(track.children);

    while (track.scrollWidth < parentWidth * 3) {
        originals.forEach(item => {
            track.appendChild(item.cloneNode(true));
        });
    }

    const first = track.children[0];
    const gap = parseFloat(getComputedStyle(first).marginRight) || 0;
    itemWidth = first.offsetWidth + gap;
    bufferWidth = itemWidth * 2.5;
}

// 애니메이션 루프
function loop(now) {
    const delta = (now - lastTime) / 1000;
    lastTime = now;
    speed += (targetSpeed - speed) * 0.12;

    // 프레임 독립 이동 (iOS / Android 동일 체감)
    x += speed * direction * delta;

    const first = track.children[0];
    const last = track.children[track.children.length - 1];
    const gap = parseFloat(getComputedStyle(first).marginRight) || 0;
    const w = first.offsetWidth + gap;

    if (!isFastMode) {
        if (direction === -1 && Math.abs(x) >= w) {
            track.appendChild(first);
            x += w;
        }

        if (direction === 1 && x >= 0) {
            track.insertBefore(last, track.firstChild);
            x -= w;
        }
    } else {
        const buffer = w * 2.5;

        if (direction === -1 && Math.abs(x) >= buffer) {
            const count = Math.floor(Math.abs(x) / w);
            for (let i = 0; i < count; i++) {
                track.appendChild(track.children[0]);
            }
            x += count * w;
        }

        if (direction === 1 && x >= buffer) {
            const count = Math.floor(x / w);
            for (let i = 0; i < count; i++) {
                track.insertBefore(
                    track.children[track.children.length - 1],
                    track.firstChild
                );
            }
            x -= count * w;
        }
    }

    track.style.transform = `translate3d(${x}px,0,0)`;
    requestAnimationFrame(loop);
}

window.addEventListener("load", () => {
    fillTrack();
    lastTime = performance.now();
    requestAnimationFrame(loop);
});

// 다음 버튼 (가속)
btnNext.addEventListener("click", () => {
    direction = -1;

    if (!isBoosted) {
        baseSpeed = boostSpeed;
        targetSpeed = baseSpeed;
        isBoosted = true;
        isFastMode = true;
    }
});

// 이전 버튼 (원속도)
btnPrev.addEventListener("click", () => {
    direction = 1;

    baseSpeed = initialSpeed;
    targetSpeed = baseSpeed;
    isBoosted = false;
    isFastMode = false;
});


// ==================== swiper2 - 인플루언서 슬라이더 ======================
$(function() {
    // JSON 파일 로드
    $.getJSON('./data/influencers.json', function(influencerData) {
        const $wrapper = $('.inf_sec .swiper2 .swiper-wrapper');
        const slidesHTML = influencerData.map(data => `
            <div class="swiper-slide slide">
                <div class="card">
                    <a>
<!--                    <a href="${data.link}" target="_blank">-->
                        <div class="card_base">
                            <div class="profile">
                                <figure class="img" style="background-image: url(${data.profileImg});"></figure>
                                <p class="name">${data.id}</p>
                            </div>
                            <figure class="thumb">
                                <img src="${data.thumbImg}" alt="${data.id} 인스타 썸네일">
                            </figure>
                            <div class="action">
                                <div>
                                    <i class="ico_like"></i>
                                    <i class="ico_cmt"></i>
                                    <i class="ico_share"></i>
                                </div>
                                <i class="ico_save"></i>
                            </div>
                        </div>
<!--                    </a>-->
                    </a>
                </div>
            </div>
        `).join('');
        $wrapper.html(slidesHTML);

        $('.inf_sec .swiper-slide.slide').first().find('.thumb img').css('object-position', 'bottom');

        // card_focus 텍스트 업데이트 함수
        function updateCardFocus(swiper) {
            const realIndex = swiper.realIndex;
            const comment = influencerData[realIndex].comment;
            const formattedComment = comment.replace(/\n/g, '<br>');

            $('.inf_sec .card_focus p').html(formattedComment);
        }

        let activeSlideData = {
            isActiveSlideTouch: false,
            startX: undefined
        };

        // 링크 상태 업데이트 함수
        function updateLinkStates() {
            $('.inf_sec .swiper-slide a').css('pointer-events', 'none');
            $('.inf_sec .swiper-slide-active a, .inf_sec .swiper-slide-duplicate-active a').css('pointer-events', 'auto');
        }

        // Swiper 초기화
        setTimeout(function() {
            try {
                window.swiper2 = new Swiper('.inf_sec .swiper2', {
                    loop: true,
                    speed: 800,
                    autoplay: {
                        delay: 3000,
                        disableOnInteraction: false,
                    },
                    slidesPerView: 'auto',
                    centeredSlides: true,
                    centerInsufficientSlides: true,
                    watchSlidesProgress: true,
                    slideToClickedSlide: true,

                    // 드래그/터치 활성화
                    allowTouchMove: true,
                    // iOS 터치 끊김 방지
                    touchStartPreventDefault: false,
                    passiveListeners: true,

                    freeMode: false,
                    freeModeSticky: false,
                    freeModeMomentum: false,

                    breakpoints: {
                        320: {
                            slidesPerView: 2
                        },
                        768: {
                            slidesPerView: 3
                        },
                        1240: {
                            slidesPerView: 4
                        },
                        1400: {
                            slidesPerView: 5
                        },
                    },
                    on: {
                        touchStart: function(swiper, event) {
                            const clickedSlide = event.target.closest('.swiper-slide');
                            const isActive = clickedSlide && clickedSlide.classList.contains('swiper-slide-active');

                            if (isActive) {
                                activeSlideData.isActiveSlideTouch = true;
                                activeSlideData.startX = event.clientX || (event.touches && event.touches[0].clientX);
                            } else {
                                activeSlideData.isActiveSlideTouch = false;
                            }
                        },
                        touchMove: function(swiper, event) {
                            if (activeSlideData.isActiveSlideTouch && activeSlideData.startX !== undefined) {
                                const currentX = event.clientX || (event.touches && event.touches[0].clientX);
                                const moveDistance = Math.abs(currentX - activeSlideData.startX);

                                if (moveDistance > 5) {
                                    swiper.allowTouchMove = true;
                                } else {
                                    swiper.allowTouchMove = false;
                                }
                            }
                        },
                        touchEnd: function(swiper) {
                            swiper.allowTouchMove = true;
                            activeSlideData.isActiveSlideTouch = false;
                            activeSlideData.startX = undefined;
                        },
                        slideChange: function () {
                            updateCardFocus(this);
                            $('.inf_sec .card_focus').removeClass('active');
                            setTimeout(function() {
                                $('.inf_sec .card_focus').addClass('active');
                                updateLinkStates();
                            }, 250);
                        },
                        init: function() {
                            updateCardFocus(this);
                            setTimeout(function() {
                                $('.inf_sec .card_focus').addClass('active');
                                updateLinkStates();
                            }, 250);
                        },
                    }
                });

                setTimeout(function() {
                    if (window.swiper2) {
                        window.swiper2.update();
                    }
                }, 100);

            } catch (error) {
                console.error('❌ Swiper 초기화 실패:', error);
            }
        }, 500);

    }).fail(function(jqXHR, textStatus, errorThrown) {
        console.error('❌ JSON 파일 로드 실패:', textStatus, errorThrown);
        console.error('파일 경로를 확인하세요: ./data/influencers.json');
    });

});


// =========================== faq =============================
$('.faq .question').click(function () {
    const faq = $(this).closest('.faq');
    const answer = faq.find('.answer');

    // $('.faq').not(faq).removeClass('on').find('.answer').slideUp();

    faq.toggleClass('on');
    answer.stop(true, true).slideToggle();
});