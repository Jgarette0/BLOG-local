
 const close = document.querySelector('.x');
 const send = document.querySelector('.y');
 const navbar = document.querySelector(".navbar-container");
 const writeButton = document.querySelector('.write');
 const blogContainer = document.querySelector('.blog-container');
 let prevScrollTop = window.pageYOffset;

 document.querySelector('.button').addEventListener('click', () => {
   close.classList.toggle('close');
   send.classList.toggle('send');
 });
 close.addEventListener('click', () => {
    close.classList.toggle('close');
    send.classList.toggle('send');
  });


  window.onscroll = function() {
    const currentScrollTop = window.pageYOffset;
    if (prevScrollTop > currentScrollTop) {
        navbar.style.top = "0";

    } else {
        navbar.style.top = "-68px";
    }
    prevScrollTop = currentScrollTop;
};

writeButton.addEventListener('click', function() {
  // Toggle the visibility of the blog container
  if (blogContainer.style.display === 'none') {
    blogContainer.style.display = 'block';
  } else {
    blogContainer.style.display = 'none';
  }
});

