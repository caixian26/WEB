function nightMode() {
    document.querySelector('body').style.backgroundColor='black';
    document.querySelector('body').style.color='white'

    let links = document.querySelectorAll('a');
  links.forEach(link => {
    link.style.color = 'white';
  });
}

function dayMode() {
    document.querySelector('body').style.backgroundColor='white';
    document.querySelector('body').style.color='black'

    let links = document.querySelectorAll('a');
  links.forEach(link => {
    link.style.color = 'black';
  });
}