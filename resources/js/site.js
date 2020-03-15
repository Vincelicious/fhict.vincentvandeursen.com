import barba from "@barba/core";
import gsap from "gsap";
import Vue from "vue";

function addVueScriptTag(element) {
  let script = document.createElement("script");
  script.src = "https://cdn.jsdelivr.net/npm/vue/dist/vue.js";
  element.container.appendChild(script);
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
  }],
  views: [
    {
      namespace: "assignments",
      beforeEnter({ next }) {
        addVueScriptTag(next)
        let site = new Vue({
          el: "#assignments",
          data: {
            cover: ""
          }
        })
      }
    }
  ]
});

// barba.hooks.beforeOnce(({ next }) => {
//   console.log(data)
// });

// barba.hooks.beforeEnter(({ next }) => {
//   console.log(next)
// });