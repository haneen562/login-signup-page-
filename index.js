// DOM elements
const welcomeSection = document.getElementById('welcome-section');
const welcomeBtn = document.getElementById('welcome-btn');
const loginForm = document.getElementById('login-form');
const signupForm = document.getElementById('signup-form');
const showSignup = document.getElementById('show-signup');
const showLogin = document.getElementById('show-login');

// Toggle between forms
showSignup.addEventListener('click', (e) => {
    e.preventDefault();
    loginForm.style.display = 'none';
    signupForm.style.display = 'block';
    welcomeSection.querySelector('h1').textContent = 'Welcome!';
    welcomeSection.querySelector('p').textContent = 'Register to access all features';
    welcomeBtn.textContent = 'Login';
});

showLogin.addEventListener('click', (e) => {
    e.preventDefault();
    signupForm.style.display = 'none';
    loginForm.style.display = 'block';
    welcomeSection.querySelector('h1').textContent = 'Welcome Back!';
    welcomeSection.querySelector('p').textContent = 'Please login to your account';
    welcomeBtn.textContent = 'Sign Up';
});

welcomeBtn.addEventListener('click', () => {
    if (welcomeBtn.textContent === 'Sign Up') {
        loginForm.style.display = 'none';
        signupForm.style.display = 'block';
        welcomeSection.querySelector('h1').textContent = 'Welcome!';
        welcomeSection.querySelector('p').textContent = 'Register to access all features';
        welcomeBtn.textContent = 'Login';
    } else {
        signupForm.style.display = 'none';
        loginForm.style.display = 'block';
        welcomeSection.querySelector('h1').textContent = 'Welcome Back!';
        welcomeSection.querySelector('p').textContent = 'Please login to your account';
        welcomeBtn.textContent = 'Sign Up';
    }
});

// Password visibility toggle
function setupPasswordToggle(inputId, buttonId) {
    const input = document.getElementById(inputId);
    const button = document.getElementById(buttonId);

    button.addEventListener('click', () => {
        const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
        input.setAttribute('type', type);
        button.classList.toggle('fa-eye-slash');
    });
}

setupPasswordToggle('password', 'toggle-password');
setupPasswordToggle('password2', 'toggle-password2');
setupPasswordToggle('passwordd', 'toggle-passwordd');

// Form validation and Firebase auth
document.getElementById('form').addEventListener('submit', async(e) => {
    e.preventDefault();
    if (validateSignUp()) {
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        try {
            const userCredential = await auth.createUserWithEmailAndPassword(email, password);
            alert("Account created successfully!");
            window.location.href = 'dashboard.html';
        } catch (error) {
            showError('email', firebaseErrorToMessage(error.code));
        }
    }
});

document.getElementById('form2').addEventListener('submit', async(e) => {
    e.preventDefault();
    if (validateLogin()) {
        const email = document.getElementById('email2').value;
        const password = document.getElementById('passwordd').value;
        const rememberMe = document.getElementById('remeberMe').checked;

        try {
            const userCredential = await auth.signInWithEmailAndPassword(email, password);
            alert("Login successful!");

            if (rememberMe) {
                localStorage.setItem('rememberedEmail', email);
            } else {
                localStorage.removeItem('rememberedEmail');
            }

            window.location.href = 'app.html';
        } catch (error) {
            showError('email2', firebaseErrorToMessage(error.code));
        }
    }
});

// Password recovery functionality
document.getElementById('forgot-password').addEventListener('click', async(e) => {
    e.preventDefault();
    const email = prompt("Please enter your email address to reset your password:");

    if (email) {
        try {
            await auth.sendPasswordResetEmail(email);
            alert("Password reset email sent! Please check your inbox.");
        } catch (error) {
            alert("Error: " + firebaseErrorToMessage(error.code));
        }
    }
});

// ... (rest of the validation functions remain the same as previous version)