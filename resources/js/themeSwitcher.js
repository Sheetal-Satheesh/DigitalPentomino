console.log('Theme switcher initiated');

let themeSwitches = document.getElementsByClassName('theme-switches');
let style = localStorage.getItem('style');


if (style == null){
    setTheme('default');
} 
else{
    setTheme(style);
} 

for(let i of themeSwitches){
    i.addEventListener('click', function(){
        let theme = this.dataset.theme;
        console.log(theme);
        setTheme(theme);
    });
}

function setTheme(theme){
    if(theme == 'default'){
        document.getElementById('switcher-id').href = 'resources/css/style.css';
    }
    else if(theme == 'light'){
        document.getElementById('switcher-id').href = 'resources/css/day-theme.css';
    }else if (theme == 'ice') {
        document.getElementById('switcher-id').href = 'resources/css/ice-theme.css';
    }
    localStorage.setItem('style', theme);
}