// Menu Switch

var header = document.querySelector('header');
var menuSwitchButton = header.querySelector('.menuSwitcButton');
var nav = header.querySelector('nav');
console.log(nav);

function menuSwitch(){
    if(menuSwitchButton.classList.contains('active')){
        nav.style.transform = 'translateY(-100vh)';
        menuSwitchButton.classList.remove('active');
    }
    nav.style.transform = 'translateY(1vh)';
    menuSwitchButton.classList.add('active')
}