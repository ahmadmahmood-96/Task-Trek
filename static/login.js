let content = document.getElementsByTagName("body")[0];
let darkMode = document.getElementById("dark-change");
let emailForm = document.getElementById("email");
let passwordForm = document.getElementById("password");
let logo = document.getElementById("logo");
let login = document.getElementById('login');
let errorContainer = document.getElementById('error');

// Load user's preference from localStorage
const isDarkMode = localStorage.getItem("darkMode") === "true";
if (isDarkMode) {
    content.classList.add("night");
    darkMode.classList.add("active");
    emailForm.style.backgroundColor = "rgb(0, 0, 0, 0.5)";
    passwordForm.style.backgroundColor = "rgb(0, 0, 0, 0.5)";
    emailForm.style.color = 'white';
    passwordForm.style.color = 'white';
    darkMode.src = "../static/night-mode.png";
}

darkMode.addEventListener("click", function run() {
    darkMode.classList.toggle("active");
    content.classList.toggle("night");
    emailForm.style.backgroundColor = "rgb(0, 0, 0, 0.5)";
    passwordForm.style.backgroundColor = "rgb(0, 0, 0, 0.5)";
    emailForm.style.color = 'white';
    passwordForm.style.color = 'white';

    if (darkMode.classList.contains("active")) {
        // Set user's preference to dark mode in localStorage
        localStorage.setItem("darkMode", "true");
        darkMode.src = "../static/night-mode.png";
    } else {
        // Set user's preference to light mode in localStorage
        localStorage.setItem("darkMode", "false");
        darkMode.src = "../static/sun.png";
        emailForm.style.backgroundColor = "white";
        passwordForm.style.backgroundColor = "white";
        emailForm.style.color = 'black';
        passwordForm.style.color = 'black';
    }
});

logo.addEventListener('click', () => {
    window.location.href = '/';
});

login.addEventListener('click', () => {
    const email = emailForm.value;
    const password = passwordForm.value;
    if (email === '' || password === '') {
        errorContainer.textContent = 'Email or Password cannot be empty!';
    }

    else if (!/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(email)) {
        errorContainer.textContent = "Email Address should be in the proper format!";
    }

    else {
        // Make a POST request to the login API endpoint
        fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email,
                    password
                })
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    // Login successful, redirect to dashboard
                    window.location.href = '/home';
                } else {
                    // Login failed, display error message
                    errorContainer.textContent = data.message;
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }
});