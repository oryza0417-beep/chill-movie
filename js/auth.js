// ==========================
// FORM AUTH (LOGIN / REGISTER)
// ==========================

const form = document.querySelector("form");

if (form) {
    form.addEventListener("submit", function(e) {
        e.preventDefault();

        const username = document.querySelector("input[name='username']").value;
        const password = document.querySelector("input[name='password']").value;
        const confirmPassword = document.querySelector("input[name='confirmPassword']");

        const isRegister = window.location.pathname.includes("register");

        // VALIDASI REGISTER
        if (isRegister && confirmPassword) {
            if (password !== confirmPassword.value) {
                alert("Password tidak sama!");
                return;
            }
        }

        if (username && password) {
            localStorage.setItem("user", JSON.stringify({
                username: username
            }));

            alert(isRegister ? "Register berhasil!" : "Login berhasil!");

            // ✅ FIX PATH
            window.location.href = "index.html";
        } else {
            alert("Isi dulu semua field");
        }
    });
}


// ==========================
// GOOGLE LOGIN / REGISTER
// ==========================

function handleCredentialResponse(response) {
    const data = parseJwt(response.credential);

    console.log("USER:", data);

    localStorage.setItem("user", JSON.stringify({
        name: data.name,
        email: data.email,
        picture: data.picture
    }));

    const isRegister = window.location.pathname.includes("register");

    alert(
        isRegister 
        ? "Register Google berhasil: " + data.name 
        : "Login Google berhasil: " + data.name
    );

    // ✅ FIX PATH
    window.location.href = "index.html";
}


// ==========================
// PARSE JWT TOKEN
// ==========================

function parseJwt(token) {
    let base64Url = token.split('.')[1];
    let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');

    let jsonPayload = decodeURIComponent(
        atob(base64)
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );

    return JSON.parse(jsonPayload);
}