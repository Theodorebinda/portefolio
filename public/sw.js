if(!self.define){let e,s={};const i=(i,a)=>(i=new URL(i+".js",a).href,s[i]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=s,document.head.appendChild(e)}else e=i,importScripts(i),s()})).then((()=>{let e=s[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(a,n)=>{const t=e||("document"in self?document.currentScript.src:"")||location.href;if(s[t])return;let c={};const r=e=>i(e,t),o={module:{uri:t},exports:c,require:r};s[t]=Promise.all(a.map((e=>o[e]||r(e)))).then((e=>(n(...e),c)))}}define(["./workbox-4754cb34"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/Mon CV.pdf",revision:"f498b35249a937f5271f64778b60a29e"},{url:"/_next/app-build-manifest.json",revision:"9657a28d211937355dd987c2a58a31ba"},{url:"/_next/static/Lm35qLje674VfeK2lLBtM/_buildManifest.js",revision:"ef5024a1277f1a02d84f82d72e5bdd61"},{url:"/_next/static/Lm35qLje674VfeK2lLBtM/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/109-2a28eb7a5f32dd34.js",revision:"Lm35qLje674VfeK2lLBtM"},{url:"/_next/static/chunks/201-ab06c7c641800ef2.js",revision:"Lm35qLje674VfeK2lLBtM"},{url:"/_next/static/chunks/23-bfd2936ea77240ff.js",revision:"Lm35qLje674VfeK2lLBtM"},{url:"/_next/static/chunks/48-b00c29e950efa0c6.js",revision:"Lm35qLje674VfeK2lLBtM"},{url:"/_next/static/chunks/53c13509-86c97e8a4b235d7f.js",revision:"Lm35qLje674VfeK2lLBtM"},{url:"/_next/static/chunks/608-40e3ea1bb4c225da.js",revision:"Lm35qLje674VfeK2lLBtM"},{url:"/_next/static/chunks/746-134b2b36f8cff01d.js",revision:"Lm35qLje674VfeK2lLBtM"},{url:"/_next/static/chunks/887-9d8637955133f8f1.js",revision:"Lm35qLje674VfeK2lLBtM"},{url:"/_next/static/chunks/8e1d74a4-db64e51dd3cb09e1.js",revision:"Lm35qLje674VfeK2lLBtM"},{url:"/_next/static/chunks/94730671-a13ddc04f1fb6e43.js",revision:"Lm35qLje674VfeK2lLBtM"},{url:"/_next/static/chunks/9c4e2130-cb8f08831e44b726.js",revision:"Lm35qLje674VfeK2lLBtM"},{url:"/_next/static/chunks/app/(main-route)/about/page-a28c1fbd01a19a5d.js",revision:"Lm35qLje674VfeK2lLBtM"},{url:"/_next/static/chunks/app/(main-route)/competences/page-20b328a9e6fc494e.js",revision:"Lm35qLje674VfeK2lLBtM"},{url:"/_next/static/chunks/app/(main-route)/contact/page-91f875dfe14611cb.js",revision:"Lm35qLje674VfeK2lLBtM"},{url:"/_next/static/chunks/app/(main-route)/layout-8ce91ec731e1e467.js",revision:"Lm35qLje674VfeK2lLBtM"},{url:"/_next/static/chunks/app/(main-route)/page-82261eee50bc153d.js",revision:"Lm35qLje674VfeK2lLBtM"},{url:"/_next/static/chunks/app/(main-route)/realisation/page-05ef7c55e7d350a7.js",revision:"Lm35qLje674VfeK2lLBtM"},{url:"/_next/static/chunks/app/_not-found/page-1f63b54993e0d57d.js",revision:"Lm35qLje674VfeK2lLBtM"},{url:"/_next/static/chunks/app/layout-3d7cb7dac9a79a96.js",revision:"Lm35qLje674VfeK2lLBtM"},{url:"/_next/static/chunks/fd9d1056-12028d2b14b52334.js",revision:"Lm35qLje674VfeK2lLBtM"},{url:"/_next/static/chunks/framework-bdf76ccd7590db8f.js",revision:"Lm35qLje674VfeK2lLBtM"},{url:"/_next/static/chunks/main-app-d4a2945991cf183f.js",revision:"Lm35qLje674VfeK2lLBtM"},{url:"/_next/static/chunks/main-e6ee2ac46dd2f483.js",revision:"Lm35qLje674VfeK2lLBtM"},{url:"/_next/static/chunks/pages/_app-6a626577ffa902a4.js",revision:"Lm35qLje674VfeK2lLBtM"},{url:"/_next/static/chunks/pages/_documents-00b26edd6142af7e.js",revision:"Lm35qLje674VfeK2lLBtM"},{url:"/_next/static/chunks/pages/_error-1be831200e60c5c0.js",revision:"Lm35qLje674VfeK2lLBtM"},{url:"/_next/static/chunks/polyfills-78c92fac7aa8fdd8.js",revision:"79330112775102f91e1010318bae2bd3"},{url:"/_next/static/chunks/webpack-d3ac448a2d6143b9.js",revision:"Lm35qLje674VfeK2lLBtM"},{url:"/_next/static/css/8c5f14651f6ad93f.css",revision:"8c5f14651f6ad93f"},{url:"/_next/static/css/dd6352b73f7b8949.css",revision:"dd6352b73f7b8949"},{url:"/_next/static/css/e3f6dd86b47c8396.css",revision:"e3f6dd86b47c8396"},{url:"/_next/static/media/26a46d62cd723877-s.woff2",revision:"befd9c0fdfa3d8a645d5f95717ed6420"},{url:"/_next/static/media/3d-javascript-logo-design-free-png 1.e2f52f5b.svg",revision:"47527558499cb586ba0501cac473bd88"},{url:"/_next/static/media/55c55f0601d81cf3-s.woff2",revision:"43828e14271c77b87e3ed582dbff9f74"},{url:"/_next/static/media/581909926a08bbc8-s.woff2",revision:"f0b86e7c24f455280b8df606b89af891"},{url:"/_next/static/media/6d93bde91c0c2823-s.woff2",revision:"621a07228c8ccbfd647918f1021b4868"},{url:"/_next/static/media/97e0cb1ae144a2a9-s.woff2",revision:"e360c61c5bd8d90639fd4503c829c2dc"},{url:"/_next/static/media/Capture_monyaya.5c81ee06.png",revision:"cc5f5aecd0d29d46579b1ef9a4e3a447"},{url:"/_next/static/media/Collab-pana 1.0884e472.png",revision:"3726badb26263c4b5fd97fdc165315b5"},{url:"/_next/static/media/Light bulb-bro 1 (1).f8153f65.png",revision:"0a7f420f1d7e051d41bcfb2339b2127e"},{url:"/_next/static/media/Programming-bro 1 (1).6fb2d6fe.png",revision:"e9ba78962694b050fa0d7d48cd6f7ca8"},{url:"/_next/static/media/R-removebg-preview 1.9c3b6f9b.svg",revision:"56e7eb8e60629fd2384c8c15c8697bf3"},{url:"/_next/static/media/a34f9d1faa5f3315-s.p.woff2",revision:"d4fe31e6a2aebc06b8d6e558c9141119"},{url:"/_next/static/media/df0a9ae256c0569c-s.woff2",revision:"d54db44de5ccb18886ece2fda72bdfe0"},{url:"/_next/static/media/flutter_icon.0fe96252.png",revision:"91fe3c0a5e8b3d61722c37e9885e7066"},{url:"/_next/static/media/htmlLogo.ae18eff3.svg",revision:"cd10926e6589aaabd49f04c955313855"},{url:"/_next/static/media/next.fc12d013.svg",revision:"c41f4e94cbfc048d009a0e13ad039736"},{url:"/_next/static/media/nodeJs.361bb36f.svg",revision:"c7444da5a881afa6ae49f6930849a476"},{url:"/_next/static/media/png-transparent-typescript-language-javascript-static-type-typescript-logo-frontend-3d-icon-thumbnail-removebg-preview.8f1e8013.png",revision:"cfaf79cb9c8a9c2287931fcd1068d332"},{url:"/_next/static/media/prismaLogo.84e23706.svg",revision:"d614f0fbeb898e90506dad328953bdf4"},{url:"/_next/static/media/react.01c422a2.svg",revision:"f715d60cc55c915977e5842e5379751e"},{url:"/_next/static/media/resolutionProbleme.74797d45.png",revision:"36533e7dcf1d509afdd932439d419a1c"},{url:"/_next/static/media/screencapture-chef-d-oeuvre-s.6a6954f3.png",revision:"5da8d85d382834e018c174488bb3d0d1"},{url:"/_next/static/media/screencapture-opi-b.f128bb36.png",revision:"706e7fdc71563e0603099939506564fb"},{url:"/_next/static/media/tailwindCssLogo.f37bbde4.svg",revision:"ce9e4ccfb14c7d68676a2d3e5d9568b6"},{url:"/_next/static/media/theodore-removebg-preview.68db7631.png",revision:"bc8ee3760a095f41063b1dd82e7671e1"},{url:"/icons/Google.png",revision:"ff09b1f372a7e6bf33a16fa6c38b8e52"},{url:"/icons/TwitterX.png",revision:"b4a9c0da08c5128b3533c13425881300"},{url:"/icons/facebook.png",revision:"9ab52d422a261679137e0d9713be6ab1"},{url:"/icons/linkedin.png",revision:"871ce591702f8d27b081168d4ed04fd0"},{url:"/icons/theoFormatApp - Copie.png",revision:"1c918820bf335cfc17bb16aa67eadf81"},{url:"/icons/theodoreAppDes - Copie.png",revision:"d7455b1e9bd921ae2c5b886943fad280"},{url:"/icons/youtube.png",revision:"e8800f3d49cba5f90585fa8b28cfdd4d"},{url:"/images/3d-javascript-logo-design-free-png 1.svg",revision:"47527558499cb586ba0501cac473bd88"},{url:"/images/Capture_monyaya.png",revision:"cc5f5aecd0d29d46579b1ef9a4e3a447"},{url:"/images/Collab-pana 1.png",revision:"3726badb26263c4b5fd97fdc165315b5"},{url:"/images/Light bulb-bro 1 (1).png",revision:"0a7f420f1d7e051d41bcfb2339b2127e"},{url:"/images/Programming-bro 1 (1).png",revision:"e9ba78962694b050fa0d7d48cd6f7ca8"},{url:"/images/R-removebg-preview 1.svg",revision:"56e7eb8e60629fd2384c8c15c8697bf3"},{url:"/images/cssLogo.svg",revision:"39a8a9a432894b151bfc3fe819b068ff"},{url:"/images/figmaLogo.svg",revision:"b46ec7ee76c633af0317ccb3f7fff3b3"},{url:"/images/flutter_icon.png",revision:"91fe3c0a5e8b3d61722c37e9885e7066"},{url:"/images/htmlLogo.svg",revision:"cd10926e6589aaabd49f04c955313855"},{url:"/images/next.svg",revision:"c41f4e94cbfc048d009a0e13ad039736"},{url:"/images/nodeJs.svg",revision:"c7444da5a881afa6ae49f6930849a476"},{url:"/images/postgreSQL.svg",revision:"060bbda3a78e42bc4cb9eb8e3f6553cb"},{url:"/images/prismaLogo.svg",revision:"d614f0fbeb898e90506dad328953bdf4"},{url:"/images/react.svg",revision:"f715d60cc55c915977e5842e5379751e"},{url:"/images/resolutionProbleme.png",revision:"36533e7dcf1d509afdd932439d419a1c"},{url:"/images/screencapture-chef-d-oeuvre-s.png",revision:"5da8d85d382834e018c174488bb3d0d1"},{url:"/images/screencapture-opi-b.png",revision:"706e7fdc71563e0603099939506564fb"},{url:"/images/tailwindCssLogo.svg",revision:"ce9e4ccfb14c7d68676a2d3e5d9568b6"},{url:"/manifest.json",revision:"905d370c0fa54c376b3006a7a5ce8418"},{url:"/png-transparent-typescript-language-javascript-static-type-typescript-logo-frontend-3d-icon-thumbnail-removebg-preview.png",revision:"cfaf79cb9c8a9c2287931fcd1068d332"},{url:"/theodore - Copie.jpg",revision:"1870507a12d6e7c8655b88fdab8a2f44"},{url:"/theodore-removebg-preview.png",revision:"bc8ee3760a095f41063b1dd82e7671e1"},{url:"/young-black-businessman-with-quizzical-confused-look_1194-20807-removebg-preview.png",revision:"f19bd6befffc854d5cb6041b6d1da5d4"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:i,state:a})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
