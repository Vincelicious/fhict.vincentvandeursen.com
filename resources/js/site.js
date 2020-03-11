import barba from "@barba/core";
import gsap from "gsap";

barba.init({
  sync: true,
  transitions: [{
    leave() {
      const done = this.async();

      gsap.fromTo(".transition-background",
        { y: '100%' },
        { y: '0%', duration: .2, ease: "circ", onComplete: () => done() }
      )
    },
    after() {
      const done = this.async();

      gsap.to(".transition-background",
        { y: '-100%', duration: .2, delay: .3, ease: "circ", onComplete: () => done() }
      )
    }
  }]
});