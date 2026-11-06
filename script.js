(function(){
  var root=document.documentElement, btn=document.getElementById('theme');
  var mq=window.matchMedia('(prefers-color-scheme: dark)');
  function isDark(){var t=root.getAttribute('data-theme');return t?t==='dark':mq.matches}
  function sync(){var d=isDark();btn.textContent=d?'Light mode':'Dark mode';btn.setAttribute('aria-pressed',d)}
  btn.addEventListener('click',function(){root.setAttribute('data-theme',isDark()?'light':'dark');sync()});
  sync();

  document.getElementById('print').addEventListener('click',function(){window.print()});
  document.getElementById('yr').textContent=new Date().getFullYear();

  // highlight the current section in the side nav
  var links=[].slice.call(document.querySelectorAll('nav a'));
  var map={};links.forEach(function(a){map[a.getAttribute('href').slice(1)]=a});
  if('IntersectionObserver' in window){
    var io=new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        if(e.isIntersecting){
          links.forEach(function(a){a.classList.remove('active');a.removeAttribute('aria-current')});
          var a=map[e.target.id];if(a){a.classList.add('active');a.setAttribute('aria-current','true')}
        }
      });
    },{rootMargin:'-20% 0px -70% 0px'});
    document.querySelectorAll('main section[id]').forEach(function(s){io.observe(s)});
  }
})();