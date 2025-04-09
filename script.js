const bg = document.getElementById("bg");
const char = document.getElementById("char");

const headline = document.querySelector(".headline");
const deck = document.querySelector(".deck");
const author = document.querySelector(".author");

const positions = ["15%", "30%", "50%", "70%"];
const scroller = scrollama();

let currentStep = -1;
let charLoaded = false;

// ✅ When the page loads: show bg1 and headline immediately
window.addEventListener("DOMContentLoaded", () => {
  const i = 1;
  bg.src = `assets/bg${i}.png`;
  bg.style.opacity = 1;
  headline.classList.add("visible");
});

// ✅ Disable scrolling (used when fading out on last step)
function disableScroll() {
  document.body.style.overflow = "hidden";
  document.addEventListener("wheel", preventDefault, {passive: false});
  document.addEventListener("touchmove", preventDefault, {passive: false});
}

// ✅ Re-enables scrolling (after fade-out is done)
function enableScroll() {
  document.body.style.overflow = "auto";
  document.removeEventListener("wheel", preventDefault);
  document.removeEventListener("touchmove", preventDefault);
}

// ✅ Used to prevent default scroll behavior when called in event listener
function preventDefault(e) {
  e.preventDefault();
}

// ✅ Set up Scrollama step tracking
scroller
  .setup({
    step: ".step",
    offset: 0.5,
    debug: false,
  })
  .onStepEnter(async (response) => {
    const i = response.index + 1;
    if (response.index === currentStep) return;
    currentStep = response.index;

    // ✅ Cleanup to prevent lingering elements when scrolling backwards
    if (response.index < 2) author.classList.remove("visible");
    if (response.index < 1) deck.classList.remove("visible");
    if (response.index < 1 && charLoaded) char.style.opacity = 0;

    // ✅ First time entering step 0: show char1 (character 1)
    if (!charLoaded && response.index === 0) {
      charLoaded = true;
      char.src = `assets/char${i}.png`;
      char.style.left = positions[0];
      char.style.opacity = 1;
      return;
    }

    // ✅ Entering step 4: fade out everything and temporarily disable scroll
    if (response.index === 4) {
      disableScroll();

      // Speed up fade out
      [bg, char, headline, deck, author].forEach((el) => {
        el.classList.add("fast-fade");
      });

      // Hide all elements
      bg.style.opacity = 0;
      char.style.opacity = 0;
      headline.classList.remove("visible");
      deck.classList.remove("visible");
      author.classList.remove("visible");

      fadeOutTopSection();

      // Re-enable scroll (animation duration should match CSS transition)
      setTimeout(() => {
        enableScroll();
      }, 0); // If fade-out is visible, use 500 or match your .fast-fade duration
      return;
    }

    // ✅ Normal step: update character image, position, and show corresponding text
    [bg, char, headline, deck, author].forEach((el) => {
      el.classList.remove("fast-fade");
    });

    char.style.opacity = 0.5;
    await new Promise((r) => setTimeout(r, 200));
    bg.src = `assets/bg${i}.png`;
    char.src = `assets/char${i}.png`;
    char.style.left = positions[response.index];
    bg.style.opacity = 1;
    char.style.opacity = 1;

    if (response.index >= 0) headline.classList.add("visible");
    if (response.index >= 1) deck.classList.add("visible");
    if (response.index >= 2) author.classList.add("visible");

    showTopSection();
  })
  .onStepExit((response) => {
    // ✅ When exiting step 1: hide deck
    if (response.index === 1) deck.classList.remove("visible");
    // ✅ When exiting step 2: hide author
    if (response.index === 2) author.classList.remove("visible");
    // ✅ When exiting step 0: hide character
    if (response.index === 0) char.style.opacity = 0;
  });

// ✅ Update scrollama dimensions on window resize
window.addEventListener("resize", scroller.resize);

// ✅ Fade out the top section (used on final step)
function fadeOutTopSection() {
  const topSection = document.getElementById("top");
  topSection.style.transition = "opacity 1s ease-out";
  topSection.style.opacity = 0;
}

// ✅ Restore top section visibility (used in all steps except final)
function showTopSection() {
  const topSection = document.getElementById("top");
  topSection.style.transition = "opacity 1s ease-in";
  topSection.style.opacity = 1;
}

// ✅ Progress bar logic: fill bar based on scroll percentage
window.addEventListener("scroll", () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrolled = (scrollTop / docHeight) * 100;
  document.getElementById("progress-bar").style.width = `${scrolled}%`;
});
