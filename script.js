const themeBtn = document.querySelector('.theme-btn'),
keys = document.querySelectorAll('.key'),
prevResult = document.querySelector('.calc__screen .prev-result'),
result = document.querySelector('.calc__screen .result');


// THEME
let themeId = localStorage.getItem('theme');

if (themeId) {
    document.body.classList.remove(`theme1`, `theme2`, `theme3`);
    document.body.classList.add(`theme${themeId}`);
    themeBtn.addEventListener('click', ()=>{
        +themeId++;
        if (themeId > 3) { themeId = 1 }
        document.body.classList.remove(`theme1`, `theme2`, `theme3`);
        document.body.classList.add(`theme${themeId}`);
        localStorage.setItem('theme', themeId);
    });
} else{
    let id = 2;
    themeBtn.addEventListener('click', ()=>{
        document.body.classList.remove(`theme1`, `theme2`, `theme3`);
        document.body.classList.add(`theme${id}`);
        localStorage.setItem('theme', id);
        id++;
        if (id > 3) { id = 1 }
    });
}



keys.forEach(key=>{
    key.addEventListener('mousedown', ()=>{
        key.style.boxShadow = 'none';
        key.style.transform = 'translateY(4px)';
    });

    key.addEventListener('mouseup', ()=>{

        key.style.boxShadow = '';
        key.style.transform = 'translateY(0px)';


        if (key.classList.contains('equal')) {
            prevResult.textContent += result.textContent;
            result.textContent = eval(prevResult.textContent);
            if (result.textContent.match('.')) {
                result.textContent = eval(prevResult.textContent).toFixed(3);
            }
            prevResult.textContent = '';

        } else if (key.classList.contains('reset')) {
            prevResult.textContent = '';
            result.textContent = '0';

        } else if (key.classList.contains('delete')) {
            if (result.textContent.substring(0, result.textContent.length - 1) == '') {
                result.textContent = '0';
            } else {
                result.textContent = result.textContent.substring(0, result.textContent.length - 1);
            }

        } else{
            if (result.textContent == 0) { result.textContent = ''; }
            if (result.textContent.length < 15) {
                if (key.textContent == 'x') {
                    result.textContent += '*';
                } else {
                    result.textContent += key.textContent;
                }

            }

            if (key.classList.contains('sign')) {
                prevResult.textContent += result.textContent;
                result.textContent = '0';
            }
        }
    });
});
