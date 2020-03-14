import barba from "@barba/core";
import gsap from "gsap";

barba.init({
  // sync: true,
  // debug: true,
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

// const searchClient = algoliasearch('GAHT5OTCHA', 'e237c3400dab85b69d126de1bcad9ea8');

// const search = instantsearch({
//   indexName: 'assignments',
//   searchClient,
// });

// search.addWidgets([
//   instantsearch.widgets.searchBox({
//     container: '#searchbox',
//     placeholder: 'Search'
//   }),

//   instantsearch.widgets.hits({
//     container: '#hits',
//     templates: {
//       item: `
//         <li class="flex items-baseline border-b px-8 pb-2 mb-10">
//           <div class="w-64">
//             <span class="opacity-25 dot-after">{{ date }}</span>
//             <a  href="#" class="opacity-25">{{ class }}</a>
//           </div>
//           <a href="{{ url }}">
//             <h4 class="assignment-title text-3xl relative" @mouseover='cover = "/assets/{{ cover }}"'>
//               {{ title }}
//             </h4>
//           </a>
//         </li>
//       `,
//     },
//   })
// ]);

// search.start();
