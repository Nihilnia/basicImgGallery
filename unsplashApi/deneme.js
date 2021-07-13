var allButtonz = document.querySelectorAll(".btnTag");

allButtonz.forEach(x => {
    x.addEventListener('click', function(){
        console.log(x.textContent);
    })
})