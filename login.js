async function validateForm(event) {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    const users = await response.json(); // JSON array of all users
    //get username and password from text fields
    const usernameInput = document.getElementById("username").value;
    const passwordInput = document.getElementById("password").value;

    let userFound = false;

    for (const user of users) {
        if (user.username === usernameInput) {
            userFound = true;
            if(user.email === passwordInput){
                document.getElementById("login-message").textContent = "Login successful!";
            } else {
                document.getElementById("login-message").textContent = "Invalid password. Please try again";
            }
            break; //no need to continue loop if user is found
        }
    }
    if(!userFound) {
        document.getElementById("login-message").textContent = "Invalid username. Please try again";
    }
}