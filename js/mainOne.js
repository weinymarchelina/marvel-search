const track = document.querySelector(".carousel__track"),
  slides = Array.from(document.querySelectorAll(".carousel__child")),
  leftBtn = document.querySelector(".left"),
  rightBtn = document.querySelector(".right"),
  dotsNav = document.querySelector(".carousel_nav"),
  dots = Array.from(document.querySelectorAll(".indicator")),
  slideWidth = slides[0].getBoundingClientRect().width;
slides.forEach((e, t) => {
  e.style.left = slideWidth * t + "px";
});
const moveToSlide = (e, t, l) => {
    (e.style.transform = `translateX(-${l.style.left})`),
      t.classList.remove("current-slide"),
      l.classList.add("current-slide");
  },
  updateDots = (e, t) => {
    e.classList.remove("current-slide"), t.classList.add("current-slide");
  },
  updateBtn = (e) => {
    0 === e
      ? (leftBtn.style.display = "none")
      : e === slides.length - 1
      ? ((leftBtn.style.display = "block"), (rightBtn.style.display = "none"))
      : ((leftBtn.style.display = "block"), (rightBtn.style.display = "block"));
  };
leftBtn.addEventListener("click", (e) => {
  const t = track.querySelector(".current-slide"),
    l = t.previousElementSibling,
    r = dotsNav.querySelector(".current-slide"),
    s = r.previousElementSibling,
    n = slides.findIndex((e) => e === l);
  moveToSlide(track, t, l), updateDots(r, s), updateBtn(n);
}),
  rightBtn.addEventListener("click", (e) => {
    const t = track.querySelector(".current-slide"),
      l = t.nextElementSibling,
      r = dotsNav.querySelector(".current-slide"),
      s = r.nextElementSibling,
      n = slides.findIndex((e) => e === l);
    moveToSlide(track, t, l), updateDots(r, s), updateBtn(n);
  }),
  dotsNav.addEventListener("click", (e) => {
    const t = e.target.closest("button");
    if ((console.log(t), !t)) return;
    const l = track.querySelector(".current-slide"),
      r = dotsNav.querySelector(".current-slide"),
      s = dots.findIndex((e) => e === t),
      n = slides[s];
    moveToSlide(track, l, n), updateDots(r, t), updateBtn(s);
  });
const mainEndpoint = "https://gateway.marvel.com/v1/public",
  queryString =
    "ts=1&apikey=ffab3772fcbccb99f5afc9bd0b19c7ec&hash=c943498f362b6eb739af46796faf4036",
  urlType = (a) => `${mainEndpoint}/${a}?${queryString}`,
  fetchStuff = async (a) => {
    const t = await fetch(a);
    return await t.json();
  },
  characterURL = async (a) => {
    const t = `${`${mainEndpoint}/${"characters"}?${queryString}`}&name=${a}`;
    return await fetchStuff(t);
  },
  specificComicUrl = async (a) => {
    const t = `https://gateway.marvel.com/v1/public/comics/${a}?apikey=ffab3772fcbccb99f5afc9bd0b19c7ec&hash=c943498f362b6eb739af46796faf4036`;
    return await fetchStuff(t);
  },
  comicUrl = async (a) => {
    const t = `https://gateway.marvel.com/v1/public/comics?titleStartsWith=${a}&limit=100&offset=0&ts=1&apikey=ffab3772fcbccb99f5afc9bd0b19c7ec&hash=c943498f362b6eb739af46796faf4036`;
    return await fetchStuff(t);
  },
  eventUrl = async (a) => {
    const t = `https://gateway.marvel.com/v1/public/events?nameStartsWith=${a}&limit=100&ts=1&apikey=ffab3772fcbccb99f5afc9bd0b19c7ec&hash=c943498f362b6eb739af46796faf4036`;
    return await fetchStuff(t);
  },
  invokeFuncInDataTemplate = async (a, t, c, e) => {
    t((await c(a)).data.results[0], e);
  },
  invokeFuncInData = async (a, t) => {
    a((await characterURL(t)).data.results[0]);
  },
  getImgLink = (a) => `${a.thumbnail.path}.${a.thumbnail.extension}`,
  invokeFuncFullResponse = async (a, t) => {
    a(await characterURL(t));
  };
export {
  fetchStuff,
  invokeFuncInDataTemplate,
  invokeFuncFullResponse,
  invokeFuncInData,
  characterURL,
  getImgLink,
  comicUrl,
  eventUrl,
  specificComicUrl,
};
const searchBox = document.querySelector(".searchbox"),
  matchList = document.querySelector(".match--list"),
  fetchSet = async (e) => {
    const t = await fetch(e);
    return await t.json();
  },
  searchCharacter = async (e) => {
    if (!e.length) return void (matchList.innerHTML = "");
    let t = (
      await fetchSet(
        `https://gateway.marvel.com/v1/public/characters?nameStartsWith=${e}&limit=5&ts=1&apikey=ffab3772fcbccb99f5afc9bd0b19c7ec&hash=c943498f362b6eb739af46796faf4036`
      )
    )?.data?.results;
    e.length
      ? t.length
        ? outputHTML(t)
        : (matchList.innerHTML = "")
      : (t = []);
  },
  outputHTML = (e) => {
    const t = (e) =>
      `${e.thumbnail.path}/landscape_small.${e.thumbnail.extension}`;
    if (e.length > 0) {
      const a = e
        .map((e) =>
          e.name.length > 15
            ? `<li class="box" tabindex="0">\n                  <img src="${t(
                e
              )}" alt="${
                e.name
              }" class="box__img " onerror="this.onerror=null;this.src='./img/error.png'">\n          <div class="box__container">\n                  <h3 class="box__container__name" style="font-size:calc(0.45rem + 0.5vw);">${
                e.name
              }</h3></div>\n                  </li>`
            : e.name.length > 25
            ? `<li class="box" tabindex="0">\n                  <img src="${t(
                e
              )}" alt="${
                e.name
              }" class="box__img" onerror="this.onerror=null;this.src='./img/error.png'">\n          <div class="box__container">\n                  <h3 class="box__container__name tinier-font" style="font-size:calc(0.35rem + 0.5vw);">${
                e.name
              }</h3></div>\n                  </li>`
            : `<li class="box" tabindex="0">\n                  <img src="${t(
                e
              )}" alt="${
                e.name
              }" class="box__img" onerror="this.onerror=null;this.src='./img/error.png'">\n          <div class="box__container">\n                  <h3 class="box__container__name" >${
                e.name
              }</h3></div>\n                  </li>`
        )
        .join("");
      matchList.innerHTML = a;
    }
  };
searchBox.addEventListener("input", () => {
  searchCharacter(searchBox.value),
    setTimeout(() => {
      if (matchList.hasChildNodes()) {
        matchList.childNodes.forEach((e) => {
          e.addEventListener("click", () => {
            const t = e.children[1].children[0].innerText;
            localStorage.setItem("selectedCharacter", t),
              (window.document.location = "./marvelHero.html");
          }),
            e.addEventListener("focus", () => {
              e.addEventListener("keyup", (t) => {
                13 === t.keyCode && e.click();
              });
            });
        });
      }
    }, 1e3);
}),
  document.addEventListener("click", (e) => {
    e.target !== searchBox && searchCharacter("");
  }),
  matchList.addEventListener("click", (e) => {
    if (e.target.matches(".box__container")) {
      const t = Array.from(e.target.children)[0].innerText;
      localStorage.setItem("selectedCharacter", t),
        (window.document.location = "./marvelHero.html");
    } else if (e.target.matches(".box__container__name")) {
      const t = e.target.innerText;
      localStorage.setItem("selectedCharacter", t),
        (window.document.location = "./marvelHero.html");
    } else if (e.target.matches(".box__img")) {
      const t = e.target.getAttribute("alt");
      localStorage.setItem("selectedCharacter", t),
        (window.document.location = "./marvelHero.html");
    }
  });
const faders = Array.from(document.querySelectorAll(".slide")),
  subtitle = document.querySelector(".subtitle"),
  comingSoon = document.querySelector(".coming--soon"),
  panel = Array.from(document.querySelectorAll(".panel"));
faders.unshift(subtitle), faders.push(comingSoon, ...panel);
const appearOpts = { threshold: 1, rootMargin: "0px 0px 100px" },
  appearOnScroll = new IntersectionObserver((t, e) => {
    t.forEach((t) => {
      t.isIntersecting &&
        ((t.target.style.opacity = "1"),
        t.target.classList.contains("from-left")
          ? t.target.classList.add("slide-left")
          : t.target.classList.contains("from-right")
          ? t.target.classList.add("slide-right")
          : (t.target.classList.contains("subtitle") ||
              t.target.classList.contains("coming--soon")) &&
            t.target.classList.add("slide-top"),
        e.unobserve(t.target));
    });
  }, appearOpts);
faders.forEach((t) => {
  appearOnScroll.observe(t);
});
const carouselTrack = document.querySelector(".carousel__track"),
  carouselImg = carouselTrack.querySelectorAll("img"),
  carouselTitle = document.querySelectorAll(".car-title"),
  carouselText = document.querySelectorAll(".car-text"),
  clickSlide = document.querySelectorAll(".carousel__child "),
  updateMain = (e, t) => {
    carouselImg[t].setAttribute("src", e.img),
      (carouselTitle[t].innerText = e.title),
      (carouselText[t].innerText = e.desc),
      clickSlide[t].addEventListener("click", () => {
        window.document.location = e.directLink;
      });
  },
  factoryFuncMain = (e, t, n, c) => ({
    img: e,
    title: t,
    desc: n,
    directLink: c,
  }),
  wandaVisionMain = factoryFuncMain(
    "https://res.cloudinary.com/tigervision/image/upload/v1641880503/samples/road-trip-with-raj-o4c2zoVhjSw-unsplash_pjkagj.jpg",
    "Spider-Man: No Way Home",
    "Check out one of the most popular MCU Movie, Spider-Man: No Way Home!",
    "https://www.spidermannowayhome.movie/"
  );
updateMain(wandaVisionMain, 0);
const updateSlideEvent = (e, t) => {
    carouselImg[t].setAttribute("src", getImgLink(e)),
      (carouselTitle[t].innerText = e.title),
      (carouselText[
        t
      ].innerText = `Check out one of the Marvel's event that's been sought after recently, ${e.title}!`),
      clickSlide[t].addEventListener("click", () => {
        window.document.location = e.urls[0].url;
      });
  },
  updateSlideComic = (e, t) => {
    carouselImg[t].setAttribute("src", getImgLink(e)),
      (carouselTitle[t].innerText = e.title),
      (carouselText[
        t
      ].innerText = `Check out one of the Marvel's comic that's been talked after recently, ${e.title}!`),
      clickSlide[t].addEventListener("click", () => {
        window.document.location = e.urls[0].url;
      });
    const n = document.querySelectorAll(".car-title");
    e.title.includes("Trade Paperback") &&
      (n[t].style.fontSize = "calc(0.75rem + 0.75vw)");
  };
invokeFuncInDataTemplate("spider-verse", updateSlideEvent, eventUrl, 1),
  invokeFuncInDataTemplate("spider-island", updateSlideEvent, eventUrl, 2),
  invokeFuncInDataTemplate("spider-verse", updateSlideComic, comicUrl, 3),
  invokeFuncInDataTemplate("spider-man: one", updateSlideComic, comicUrl, 4);
const checkComic = async (e) =>
    (async (t, n) => {
      console.log(`${e.name}: ${e.id}`);
      const c = `https://gateway.marvel.com/v1/public/characters/${e.id}/comics?titleStartsWith=${t}&limit=100&offset=0&ts=1&apikey=ffab3772fcbccb99f5afc9bd0b19c7ec&hash=c943498f362b6eb739af46796faf4036`,
        l = (await fetchStuff(c)).data.results;
      console.log(l);
      const a = l[n];
      return console.log(a), a.resourceURI;
    })("avengers", 0),
  slideContainer = document.querySelector(".slide-container"),
  slideImg = slideContainer.querySelectorAll("img"),
  slideName = document.querySelectorAll(".slide_name"),
  slideBtn = document.querySelectorAll(".slide__btn"),
  invokeFuncInDataSlide = async (e, t, n) => {
    e((await characterURL(t)).data.results[0], n);
  },
  updateSlide = (e) => {
    const t = (e, t) => {
      slideImg[t].setAttribute("src", getImgLink(e)),
        (slideName[t].innerText = e.name),
        slideBtn[t].addEventListener("click", (t) => {
          localStorage.setItem("selectedCharacter", e.name),
            (window.document.location = "./marvelHero.html");
        });
    };
    for (const n in e) invokeFuncInDataSlide(t, e[n], n);
  },
  featured = [
    "spider-man (peter parker)",
    "green goblin (norman osborn)",
    "doctor octopus",
    "may parker",
    "electro",
    "lizard",
  ];
updateSlide(featured);
const panelImg = document.querySelectorAll(".panel__img"),
  thePanel = document.querySelectorAll(".panel"),
  panelName = document.querySelectorAll(".panel__title"),
  updatePanel = (e) => {
    const t = (e, t) => {
      panelImg[t].setAttribute("src", getImgLink(e)),
        (panelName[t].innerText = e.name),
        thePanel[t].addEventListener("click", (t) => {
          localStorage.setItem("selectedCharacter", e.name),
            (window.document.location = "./marvelHero.html");
        });
    };
    for (const n in e) invokeFuncInDataSlide(t, e[n], n);
  },
  others = ["doctor strange", "scarlet witch", "ancient one"];
updatePanel(others);
