// פונקציה המביאה את הערך של כל input ובודקת אם אחד מהם ריק או תקין
function signUp() {
    const obj = {
        fullName: document.querySelector(".fullName").value,
        email: document.querySelector(".email").value,
        userName: document.querySelector(".userName").value,
        password: document.querySelector("input[type=password]").value,
    };

    if (!obj.fullName) {
        snackbar("נא למלא שם פרטי ");
        return;
    }

    if (!obj.email) {
        snackbar("נא למלא אימייל ");
        return;
    } else if (!(obj.email).includes("@") || !(obj.email).includes(".")) {
        snackbar("נא למלא איימיל תקין");
        return;
    }

    if (!obj.userName) {
        snackbar("נא למלא שם משתמש");
        return;
    }

    if (!obj.password) {
        snackbar("נא למלא סיסמא");
        return;
    }

    loader(true);
    // מקבלים את התוכן מהשרת
    fetch("https://api.shipap.co.il/signup", {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(obj),
    })
        .then(res => res.json())
        .then(() => {
            document.querySelector('.signUp').style.display = 'none';
            document.querySelector('.congrats').style.display = 'block'; // אם ההתחברות הייתה מוצלחת המשתמש מקבל התראה על כך
            loader(false);
        })
        .catch(() => {
            snackbar("שם משתמש כבר תפוס"); // אם יש שם משתמש או סיסמא זהים בשרת catch תופס את זה ומידע את המשתש 
            loader(false);
        })
}
//במקרה של הרשמה אנחנו עוברים לחלון ההתחברות
function goToLogin() {
    window.location.replace("login.html");
}

function loader(isShowing = false) {
    const loaderFrame = document.querySelector('.loaderFrame');

    if (isShowing) {
        loaderFrame.style.display = 'flex';
    } else {
        loaderFrame.style.display = 'none';
    }
}

function snackbar(message) {
    const elem = document.getElementById("snackbar");
    elem.innerHTML = message;
    elem.classList.add("show");
    setTimeout(() => elem.classList.remove("show"), 3000);
}