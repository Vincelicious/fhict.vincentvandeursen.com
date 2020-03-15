import barba from "@barba/core";
import barbaPrefetch from '@barba/prefetch';
import gsap from "gsap";
import axios from "axios";

const fetchAssignmentCover = id => {
  return axios.get(`/api/collections/assignments/entries?filter[id:is]=${id}`)
  .then(response => {
    return response.data.data[0].cover[0]
  })
  .catch(error => {
    return error.message
  })
}

function changeAssignmentCover(newCover) {
  document.querySelector(".assignments-image").src = newCover.url
}

function animateAssignmentCover(newCover) {
  let tl = gsap.timeline();
  tl.to(".assignments-image", {x: "-40", opacity: 0, duration: .2, onComplete: changeAssignmentCover, onCompleteParams: [newCover]});
  tl.to(".assignments-image", {x: 0, opacity: 1, duration: .2})
}

// Page transition with Barba.js and GSAP
// ----------------------------------------
barba.use(barbaPrefetch);

barba.init({
  transitions: [{
    once() {
      if (document.querySelector(".assignment-item")) {
        gsap.from(".assignment-item", { delay: .2, translateY: 10, opacity: 0, stagger: 0.1 })
      }
    },
    leave() {
      let done = this.async();

      gsap.fromTo(".transition-background",
        { y: '100%' },
        { y: '0%', duration: .2, ease: "circ", onComplete: () => done() }
      )
    },
    after() {
      let done = this.async();

      if (document.querySelector(".assignment-item")) {
        gsap.from(".assignment-item", { delay: .5, translateY: 10, opacity: 0, stagger: 0.1 })
      }
      gsap.to(".transition-background", { y: '-100%', duration: .2, delay: .3, ease: "circ", onComplete: () => done() })
    }
  }]
});

barba.hooks.afterOnce(data => {
  document.querySelectorAll(".assignment-title").forEach(assignment => {
    assignment.addEventListener("mouseenter", () => {
      fetchAssignmentCover(assignment.dataset.id)
        .then(cover => {
          animateAssignmentCover(cover)
        })
        .catch(error => {
          console.log(error.message)
        })
    })
  })
});

barba.hooks.after(data => {
  document.querySelectorAll(".assignment-title").forEach(assignment => {
    assignment.addEventListener("mouseenter", () => {
      fetchAssignmentCover(assignment.dataset.id)
        .then(cover => {
          animateAssignmentCover(cover)
        })
        .catch(error => {
          console.log(error.message)
        })
    })
  })
});