// breaking news scrolling none
const scrolling = document.querySelector('.home-right-side .breaking-news');
if(window.innerWidth < 768){
  scrolling.style.overflow = 'visible';
  scrolling.style.maxHeight = '200vh';
}

// home left side read more button 
const readMoreBtn = document.querySelector('.home-left-side .read-more');
const articleParagraph = document.querySelector('.home-left-side .image-article p');
let isExpanded = false;
readMoreBtn.addEventListener('click', () => {
  if (!isExpanded) {
    articleParagraph.style.overflow = 'visible';
    articleParagraph.style.display = 'block';
    articleParagraph.style.webkitLineClamp = 'unset';
    articleParagraph.style.lineClamp = 'unset';
    articleParagraph.style.webkitBoxOrient = 'unset';
    articleParagraph.style.textOverflow = 'unset';
    articleParagraph.style.whiteSpace = 'normal';
    readMoreBtn.textContent = 'Less';
    isExpanded = true;
  } else {
    articleParagraph.style.overflow = '';
    articleParagraph.style.display = '';
    articleParagraph.style.webkitLineClamp = '';
    articleParagraph.style.lineClamp = '';
    articleParagraph.style.webkitBoxOrient = '';
    articleParagraph.style.textOverflow = '';
    articleParagraph.style.whiteSpace = '';
    readMoreBtn.textContent = 'More';
    isExpanded = false;
  }
});
