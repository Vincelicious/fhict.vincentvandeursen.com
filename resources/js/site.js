import barba from "@barba/core";
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

// Page transition with Barba.js and GSAP
// ----------------------------------------
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
      fetchAssignmentCover(assignment.dataset.id).then(cover => {
        document.querySelector(".assignments-image").src = cover.url
      })
    })
  })
});

barba.hooks.after(data => {
  document.querySelectorAll(".assignment-title").forEach(assignment => {
    assignment.addEventListener("mouseenter", () => {
      fetchAssignmentCover(assignment.dataset.id)
        .then(cover => {
        document.querySelector(".assignments-image").src = cover.url
        })
        .catch(error => {
          console.log(error.message)
        })
    })
  })
});