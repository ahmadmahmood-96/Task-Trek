let content = document.getElementsByTagName('body')[0];
let darkMode = document.getElementById('dark-change');
let nameForm = document.getElementById('name');
let emailForm = document.getElementById('email');
let passwordForm = document.getElementById('password');
let box1 = document.getElementById('box1');
let confirmPasswordForm = document.getElementById('confirmPassword');
let reset = document.getElementById('reset');
let submit = document.getElementById('submit');
let logo = document.getElementById('logo');
let errorContainer = document.getElementById('error');

const isDarkMode = localStorage.getItem("darkMode") === "true";
if (isDarkMode) {
    content.classList.add("night");
    darkMode.classList.add("active");
    darkMode.src = '../static/night-mode.png';
    nameForm.style.backgroundColor = 'rgb(0, 0, 0, 0.5)';
    nameForm.style.color = 'white';
    emailForm.style.color = 'white';
    passwordForm.style.color = 'white';
    confirmPasswordForm.style.color = 'white';
    emailForm.style.backgroundColor = 'rgb(0, 0, 0, 0.5)';
    passwordForm.style.backgroundColor = 'rgb(0, 0, 0, 0.5)';
    confirmPasswordForm.style.backgroundColor = 'rgb(0, 0, 0, 0.5)';
    box1.style.backgroundColor = 'rgb(0, 0, 0, 0.7)';
}
darkMode.addEventListener('click', function run() {
    darkMode.classList.toggle('active');
    content.classList.toggle('night');
    nameForm.style.backgroundColor = 'rgb(0, 0, 0, 0.5)';
    emailForm.style.backgroundColor = 'rgb(0, 0, 0, 0.5)';
    passwordForm.style.backgroundColor = 'rgb(0, 0, 0, 0.5)';
    confirmPasswordForm.style.backgroundColor = 'rgb(0, 0, 0, 0.5)';
    box1.style.backgroundColor = 'rgb(0, 0, 0, 0.7)';
    nameForm.style.color = 'white';
    emailForm.style.color = 'white';
    passwordForm.style.color = 'white';
    confirmPasswordForm.style.color = 'white';

    if (darkMode.src.match('../static/sun.png')) {
        darkMode.src = '../static/night-mode.png';
        localStorage.setItem("darkMode", "true");
    } else {
        darkMode.src = '../static/sun.png';
        localStorage.setItem("darkMode", "false");
        nameForm.style.backgroundColor = 'white';
        emailForm.style.backgroundColor = 'white';
        passwordForm.style.backgroundColor = 'white';
        confirmPasswordForm.style.backgroundColor = 'white';
        box1.style.backgroundColor = '#f2f2f2';
        nameForm.style.color = 'black';
        emailForm.style.color = 'black';
        passwordForm.style.color = 'black';
        confirmPasswordForm.style.color = 'black';
    }
});

logo.addEventListener('click', () => {
    window.location.href = '/';
});

submit.addEventListener('click', () => {
    const fullName = nameForm.value;
    const email = emailForm.value;
    const password = passwordForm.value;
    const confirmPassword = confirmPasswordForm.value;
    if (fullName === '' || email === '' || password === '' || confirmPassword === '') {
        errorContainer.textContent = 'Please enter credentials!';
    }

    else if (!/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(email)) {
        errorContainer.textContent = "Email should be properly formatted!";
    }

    else if (password !== confirmPassword){
        errorContainer.textContent = "Password is not matching!";
    }

    else {
        // Make a POST request to the login API endpoint
        fetch('/api/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    fullName,
                    email,
                    password
                })
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    // Login successful, redirect to dashboard
                    window.location.href = '/';
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

reset.addEventListener('click', () => {
    emailForm.value = ''
    nameForm.value = ''
    passwordForm.value = '';
    confirmPasswordForm.value = '';
    errorContainer.textContent = '';
});