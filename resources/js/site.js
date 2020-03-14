import barba from "@barba/core";
import gsap from "gsap";
import "alpinejs";

// Page transition with Barba.js and GSAP
// ----------------------------------------
barba.init({
  // debug: true,
  cacheIgnore: true,
  prefetchIgnore: true,
  transitions: [{
    leave() {
      let done = this.async();

      gsap.fromTo(".transition-background",
        { y: '100%' },
        { y: '0%', duration: .2, ease: "circ", onComplete: () => done() }
      )
    },
    after() {
      let done = this.async();
      gsap.to(".transition-background", { y: '-100%', duration: .2, delay: .3, ease: "circ", onComplete: () => done() })
    },
    enter() {
      gsap.from(".assignment-item", { delay: .3, duration: .5, translateY: 10, opacity: 0, stagger: 0.1 })
    },
    once() {
      gsap.from(".assignment-item", { delay: .2, duration: .5, translateY: 10, opacity: 0, stagger: 0.15 })
    }
  }]
});