const  scrollFunction = btsBtn => {
  const scrollDist = window.innerHeight * .5;

  if (document.body.scrollTop > scrollDist || document.documentElement.scrollTop > scrollDist) {
    btsBtn.classList.add('state-visible');
  } else {
    btsBtn.classList.remove('state-visible');
  }
}

export const init = () => {
  const btsBtn = document.querySelector('.btt');

  if (btsBtn) {
    btsBtn.addEventListener('click', () => {
      const target = window.location.href.split("#")[0];
      history.pushState('', document.title, target);

      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });

    window.onscroll = () => {scrollFunction(btsBtn)};
  }
};

