// //consider 4 ids:
// // ids: defaultTheme, dayTheme, iceTheme, blackAndWhiteTheme


// console.log('Theme switcher initiated');

// // let themeSwitches = document.getElementById('jsonform-4-elt-theming.theme');
// // console.log(themeSwitches);
// let style = localStorage.getItem('style');


// if (style == null){
//     setTheme('default');
// } 
// else{
//     setTheme(style);
// } 

// let themeSwitches = ['defaultTheme', 'dayTheme', 'iceTheme', 'blackAndWhiteTheme'];
// for(let i of themeSwitches){
//     document.getElementById(i).addEventListener('click', function(){
//         let theme = this.dataset.theme;
//         console.log(theme);
//         setTheme(theme);
//     });
// }

// function setTheme(theme){
//     if(theme == 'defaultTheme'){
//         document.getElementById('switcher-id').href = 'resources/css/style.css';
//     }
//     else if(theme == 'dayTheme'){
//         document.getElementById('switcher-id').href = 'resources/css/day-theme.css';
//     }
//     else if (theme == 'iceTheme') {
//         document.getElementById('switcher-id').href = 'resources/css/ice-theme.css';
//     }
//     else if(theme == 'blackAndWhiteTheme') {
//         document.getElementById('switcher-id').href = 'resources/css/blackandwhitetheme.css';
//     }
//     localStorage.setItem('style', theme);
// }