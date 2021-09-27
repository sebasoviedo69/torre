
var idForm = document.getElementById("user-form");

// post user id to process
idForm.addEventListener('submit', function(e){
    
    fetch('/results', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            user: {
                name: "John",
                email: "john@torre.co"
            }
        })
    });
});
