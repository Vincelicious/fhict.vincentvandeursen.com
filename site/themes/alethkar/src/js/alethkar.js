import barba from "@barba/core";
import barbaPrefetch from "@barba/prefetch";
import gsap from "gsap";
import axios from "axios";

// Changing and animating cover image
// ----------------------------------------

const fetchAssignmentCover = id => {
  return axios
    .get(`/!/Fetch/entry/${id}`)
    .then(response => {
      return response.data.data.cover;
    })
    .catch(error => {
      return error.message;
    });
};

function changeAssignmentCover(newCover) {
  document.querySelector(".assignments-image").src = newCover;
}

function animateAssignmentCover(newCover) {
  let tl = gsap.timeline();
  tl.to(".assignments-image", {
    x: "-40",
    opacity: 0,
    duration: 0.2,
    onComplete: changeAssignmentCover,
    onCompleteParams: [newCover]
  });
  tl.to(".assignments-image", { x: 0, opacity: 1, duration: 0.2 });
}

function isDuplicateCover(newCover) {
  let oldCover = document.querySelector(".assignments-image");

  if (oldCover.src.includes(newCover)) {
    return true;
  }

  return false;
}

let previousTitle = "";

function addAssignmentCoverAnimation() {
  document.querySelectorAll(".assignment-title").forEach(assignment => {
    assignment.addEventListener("mouseenter", () => {
      if (!previousTitle) {
        previousTitle = assignment.innerText;

        fetchAssignmentCover(assignment.dataset.id)
          .then(cover => {
            animateAssignmentCover(cover);
          })
          .catch(error => {
            console.log(error.message);
          });
      } else if (previousTitle !== assignment.innerText) {
        previousTitle = assignment.innerText;

        fetchAssignmentCover(assignment.dataset.id)
          .then(cover => {
            if (!isDuplicateCover(cover)) {
              animateAssignmentCover(cover);
            }
          })
          .catch(error => {
            console.log(error.message);
          });
      }
    });
  });
}

// Page transition with Barba.js and GSAP
// ----------------------------------------
barba.use(barbaPrefetch);

barba.init({
  transitions: [
    {
      once() {
        if (document.querySelector(".assignment-item")) {
          gsap.from(".assignment-item", {
            delay: 0.2,
            translateY: 10,
            opacity: 0,
            stagger: 0.1
          });
        }
      },
      leave() {
        let done = this.async();

        gsap.fromTo(
          ".transition-background",
          { y: "100%" },
          { y: "0%", duration: 0.2, ease: "circ", onComplete: () => done() }
        );
      },
      after() {
        let done = this.async();

        if (document.querySelector(".assignment-item")) {
          gsap.from(".assignment-item", {
            delay: 0.5,
            translateY: 10,
            opacity: 0,
            stagger: 0.1
          });
        }
        window.scrollTo(0, 0);
        gsap.to(".transition-background", {
          y: "-100%",
          duration: 0.2,
          delay: 0.3,
          ease: "circ",
          onComplete: () => done()
        });
      }
    }
  ]
});

barba.hooks.afterOnce(data => {
  if (document.querySelector(".assignments-image")) {
    addAssignmentCoverAnimation();
  }
});

barba.hooks.after(data => {
  if (document.querySelector(".assignments-image")) {
    addAssignmentCoverAnimation();
  }
});
