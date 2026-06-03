var settings = {
  social: {
    twitchUsername: "uwu_akyla",
    youtubeUsername: "uwu_akyla",
    instagramUsername: "uwu_akylka",
    telegramUsername: "uwu_akyla_official"
  },

  popup: {
    // 1 = enabled, 0 = disabled
    enableTwitch: 1,
    enableYoutube: 1,
    enableInstagram: 1,
    enableTelegram: 1,

    // Time each popup stays on screen, in seconds
    aTime: 4,

    // Delay before the full cycle starts again, in seconds
    pauseTime: 60,

    // Smooth closing animation time, in seconds
    closeTime: 0.65
  }
};

// Load social network names
document.querySelectorAll(".popup .right span").forEach(function (span) {
  var socialName = settings.social[span.dataset.name] || "";
  span.textContent = socialName;
});

// Enable / disable popups
document.querySelectorAll(".popup").forEach(function (popup) {
  var isEnabled = settings.popup[popup.dataset.box];

  if (isEnabled === 1) {
    popup.classList.add("animate-popup");
  } else {
    popup.classList.add("no-popup");
  }
});

// Animate popups
var popups = Array.prototype.slice.call(document.querySelectorAll(".animate-popup"));
var currentIndex = 0;
var animationTime = settings.popup.aTime * 1000;
var pauseTime = settings.popup.pauseTime * 1000;
var closeTime = settings.popup.closeTime * 1000;

function animatePopup() {
  if (!popups.length) {
    return;
  }

  if (currentIndex >= popups.length) {
    currentIndex = 0;
    window.setTimeout(animatePopup, pauseTime);
    return;
  }

  var currentPopup = popups[currentIndex];
  currentIndex += 1;

  currentPopup.classList.remove("hiding-popup");
  currentPopup.classList.add("show-popup");

  window.setTimeout(function () {
    currentPopup.classList.add("hiding-popup");

    window.setTimeout(function () {
      currentPopup.classList.remove("show-popup");
      currentPopup.classList.remove("hiding-popup");
      animatePopup();
    }, closeTime);
  }, animationTime);
}

animatePopup();
