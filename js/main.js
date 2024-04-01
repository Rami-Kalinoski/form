// IMPORTATIONS --------------------------------------------------------------------------------------------------------
// ELEMENTS ------------------------------------------------------------------------------------------------------------
// mode (dark or light) <<<<<<<<<<<<<<<<<<<<<<<<<<<<
const moonUrl = `./assets/moon.png`;
const sunUrl = `./assets/sun.png`;
const mode = document.querySelector("#mode");
const modeImg = document.querySelector("#mode-img");
// DOM elements
const favicon = document.querySelector("#favicon");
const body = document.querySelector("body");
const header = document.querySelector("header");
const form = document.querySelector("#form");
const labelsArray = document.querySelectorAll(".label");
const inputsArray = document.querySelectorAll(".input");
const messageInput = document.querySelector("#message");
const btnsArray = document.querySelectorAll(".btn");
const footerTop = document.querySelector(".footer-top");
const footerBot = document.querySelector(".footer-bot");
// form validation <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
// DOM elements
const nameCon = document.querySelector("#name-condition");
const lastNameCon = document.querySelector("#last-name-condition");
const emailCon = document.querySelector("#email-condition");
const phoneCon = document.querySelector("#phone-condition");
const countryCon = document.querySelector("#country-condition");
const cityCon = document.querySelector("#city-condition");
const clearBtn = document.querySelector("#clear-btn");
const submitBtn = document.querySelector("#submit-btn");

// STYLES & ANIMATIONS -------------------------------------------------------------------------------------------------
// mode (dark or light)
mode.addEventListener("click", ()=>{
    const modeImg = document.querySelector("#mode-img");
    if (modeImg.alt==="moon") { // right now it is in dark mode
        favicon.href = sunUrl;
        mode.classList.add("light-mode-div");
        modeImg.src = sunUrl;
        modeImg.alt = "sun";
        modeImg.classList.remove("dark-mode-img");
        modeImg.classList.add("light-mode-img");
        body.classList.add("light-body");
        header.classList.add("light-header");
        labelsArray.forEach(element => {
            element.classList.add("light-label");
        });
        inputsArray.forEach(element => {
            element.classList.add("light-input");
        });
        messageInput.classList.add("light-message-input");
        btnsArray.forEach(element => {
            element.classList.add("light-btn");
        });
        footerTop.classList.add("light-footer-top");
        footerBot.classList.add("light-footer-bot");
    } else { // right now it is in light mode
        favicon.href = moonUrl;
        mode.classList.remove("light-mode-div");
        modeImg.src = moonUrl;
        modeImg.alt = "moon";
        modeImg.classList.remove("light-mode-img");
        modeImg.classList.add("dark-mode-img");
        body.classList.remove("light-body");
        header.classList.remove("light-header");
        labelsArray.forEach(element => {
            element.classList.remove("light-label");
        });
        inputsArray.forEach(element => {
            element.classList.remove("light-input");
        });
        messageInput.classList.remove("light-message-input");
        btnsArray.forEach(element => {
            element.classList.remove("light-btn");
        });
        footerTop.classList.remove("light-footer-top");
        footerBot.classList.remove("light-footer-bot");
    };
});
// inputs
inputsArray.forEach(element => {
    const modeImg = document.querySelector("#mode-img");
    element.addEventListener("focus", ()=>{
        if (modeImg.alt==="moon") { // right now it is in dark mode
            element.classList.add("border-focus-white");
        } else { // right now it is in light mode
            element.classList.add("border-black");
        }
    });
    element.addEventListener("blur", ()=>{
        if (modeImg.alt==="moon") { // right now it is in dark mode
            if (element.value!=="") { // input has at leas 1 character
                element.classList.add("border-focus-white");
            } else { // input has not any characters
                element.classList.remove("border-focus-white");
            };
        } else { // right now it is in light mode
            if (element.value!=="") { // input has at leas 1 character
                element.classList.add("border-black");
            } else { // input has not any characters
                element.classList.remove("border-black");
            };
        }
    });
});
messageInput.addEventListener("focus", ()=>{
    if (modeImg.alt==="moon") { // right now it is in dark mode
        messageInput.classList.add("border-white");
    } else { // right now it is in light mode
        messageInput.classList.add("border-black");
    }
});
messageInput.addEventListener("blur", ()=>{
    if (modeImg.alt==="moon") { // right now it is in dark mode
        if (messageInput.value!=="") { // input has at leas 1 character
            messageInput.classList.add("border-white");
        } else { // input has not any characters
            messageInput.classList.remove("border-white");
        };
    } else { // right now it is in light mode
        if (messageInput.value!=="") { // input has at leas 1 character
            messageInput.classList.add("border-black");
        } else { // input has not any characters
            messageInput.classList.remove("border-black");
        };
    }
});

// FORM VALIDATION -----------------------------------------------------------------------------------------------------
// regular expressions <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
const expressions = {
	words: /^[a-zA-ZÀ-ÿ\s]{1,50}$/, // letters & spaces, regional characters
	email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/, // any email direction
    phone: /\+\d{1,3}[\s-](\(?\d{1,3}\)?)?(\s\d{1,2})?(([\s-]?\d{3,4}){2}|[\s-]\d{5,8})/ // complete phone number
}
// storage <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
sessionStorage.setItem("name-valid", JSON.stringify(false));
sessionStorage.setItem("last-name-valid", JSON.stringify(false));
sessionStorage.setItem("email-valid", JSON.stringify(false));
sessionStorage.setItem("phone-valid", JSON.stringify(false));
sessionStorage.setItem("country-valid", JSON.stringify(false));
sessionStorage.setItem("city-valid", JSON.stringify(false));
// validations <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
const validInput = (input, name)=>{
    input.classList.remove("border-invalid");
    input.classList.add("border-valid")
    document.querySelector(`#${name}-invalid-img`).classList.add("void");
    document.querySelector(`#${name}-valid-img`).classList.remove("void");
    document.querySelector(`#${name}-condition`).classList.add("hidden");
    sessionStorage.setItem(`${name}-valid`, JSON.stringify(true));
};
const invalidInput = (input, name)=>{
    input.classList.remove("border-valid");
    input.classList.add("border-invalid");
    document.querySelector(`#${name}-valid-img`).classList.add("void");
    document.querySelector(`#${name}-invalid-img`).classList.remove("void");
    document.querySelector(`#${name}-condition`).classList.remove("hidden");
    sessionStorage.setItem(`${name}-valid`, JSON.stringify(false));
};
const validateField = (input, name, value)=>{
    if (value==="") {
        emptyField(input, name, value);
    };
    if (name==="name"||name==="last-name"||name==="country"||name==="city") { // it's name, last-name, country, or city input
        if (expressions.words.test(value)) {
            validInput(input, name);
        } else {
            invalidInput(input, name);
        }
    } else if (name==="email") { // it's email input
        if (expressions.email.test(value)) {
            validInput(input, name);
        } else {
            invalidInput(input, name);
        }
    } else if (name==="phone") { // it's phone input
        if (expressions.phone.test(value)) {
            validInput(input, name);
        } else {
            invalidInput(input, name);
        }
    };
};
const emptyField = (input, name, value)=>{
    if (value==="") {
        input.classList.remove("border-invalid");
        input.classList.remove("border-valid");
        input.classList.remove("border-white");
        document.querySelector(`#${name}-invalid-img`).classList.add("void");
        document.querySelector(`#${name}-valid-img`).classList.add("void");
        document.querySelector(`#${name}-condition`).classList.add("hidden");
    };
}
inputsArray.forEach(element => {
    element.addEventListener("keyup", (e)=>{ validateField(e.target, e.target.name, e.target.value); });
    element.addEventListener("focus", (e)=>{ emptyField(e.target, e.target.name, e.target.value); })
    element.addEventListener("blur", (e)=>{ emptyField(e.target, e.target.name, e.target.value); })
});
// buttons <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
clearBtn.addEventListener("click", (e)=>{
    e.preventDefault();
    inputsArray.forEach(element => {
        element.value = "";
        emptyField(element, element.name, "");
    });
    messageInput.value = "";
    messageInput.classList.remove("border-invalid");
    messageInput.classList.remove("border-valid");
    messageInput.classList.remove("border-white");
});
submitBtn.addEventListener("click", (e)=>{
    e.preventDefault(); // stop any inmediate action
    let cansubmit = true; // look for any invalid field
    const inputsArrayAux = document.querySelectorAll(".input");
    inputsArrayAux.forEach(element => {
        if (!JSON.parse(sessionStorage.getItem(`${element.name}-valid`))) {
            cansubmit = false
        };
    });
    const modeImg = document.querySelector("#mode-img"); // determine the 
    const modeTextColour = modeImg.alt==="moon" ? "#eeeeee" : "#111111";
    const modeButtonBackground = modeImg.alt==="moon" ? "#333333" : "#bebebe";
    const modeButtonBackgroundHover = modeImg.alt==="moon" ? "#555555" : "#dfdfdf";
    const modeBackground = modeImg.alt==="moon" ? "#121212" : "#eeeeee";
    if (cansubmit) { // form is valid
        Swal.fire({
            html: `
            <img src="./assets/valid.png" alt="Valid" class="alert-img">
            <h2 class="alert-h2">Valid Form</h2>
            <p class="alert-p">Form completed correctly. Thanks for your help, we will submit this information right now. See you ;)</p>
            <p class="alert-s"><b id="b"></b></p>
            <style>
                .alert-img {
                    height: 7rem;
                    width: auto;
                    margin: 0rem 0rem 2.5rem 0rem;
                }
                .alert-h2 {
                    color: ${modeTextColour};
                    font-size: 5rem;
                    font-family: 'Inika', serif;
                    font-weight: 600;
                    font-style: normal;
                    margin: 1rem 0rem 5rem 0rem;
                }
                .alert-p {
                    color: ${modeTextColour};
                    font-size: 1.75rem; 
                    font-family: 'Inika', serif;
                    font-weight: 400;
                    font-style: normal;
                    margin: 2.5rem 0rem 2rem 0rem;
                }
                .alert-s {
                    color: ${modeTextColour};
                    font-size: 5rem;
                    font-family: 'Inika', serif;
                    font-weight: 400;
                    font-style: normal;
                    padding: 0rem 1.5rem;
                }
                @media screen and (max-width: 950px) {
                    .alert-h2 {
                        font-size: 4rem;
                    }
                    .alert-p {
                        font-size: 1.5rem;
                    }
                    .alert-s {
                        font-size: 1.5rem;
                    }
                }
            </style>`,
            background: modeBackground,
            width: "70%",
            padding: "5rem 2rem",
            allowOutsideClick: false,
            focusConfirm: false,
            timer: 10000,
            timerProgressBar: false,
            didOpen: () => {
                Swal.showLoading();
                const timer = Swal.getPopup().querySelector("#b");
                timerInterval = setInterval(() => {
                timer.textContent = `${parseInt(Swal.getTimerLeft()/1000)}`;
                }, 100);
            },
            willClose: () => {
                clearInterval(timerInterval);
            }
            }).then((result) => {
            /* Read more about handling dismissals below */
            if (result.dismiss === Swal.DismissReason.timer) {
                console.log("The alert was closed by the timer");
            }
        });
        // submit form
        setTimeout(()=>{
            form.submit();
        }, 10500);
    } else { // at least one field is not valid
        Swal.fire({
            html: `
            <img src="./assets/invalid.png" alt="Invalid" class="alert-img">
            <h2 class="alert-h2">Form Not Valid</h2>
            <p class="alert-p">At least one of the fields is not valid. Please, complete all fields with correct information.</p>
            <style>
                .alert-img {
                    height: 7rem;
                    width: auto;
                    margin: 0rem 0rem 2.5rem 0rem;
                }
                .alert-h2 {
                    color: ${modeTextColour};
                    font-size: 5rem;
                    font-family: 'Inika', serif;
                    font-weight: 600;
                    font-style: normal;
                    margin: 1rem 0rem 5rem 0rem;
                }
                .alert-p {
                    color: ${modeTextColour};
                    font-size: 1.75rem; 
                    font-family: 'Inika', serif;
                    font-weight: 400;
                    font-style: normal;
                    margin: 2.5rem 0rem 2rem 0rem;
                }
                .alert-button {
                    color: ${modeTextColour};
                    font-size: 1.75rem;
                    font-family: 'Inika', serif;
                    font-weight: 400;
                    font-style: normal;
                    border: solid 1px ${modeButtonBackground};
                    border-radius: 5px;
                    padding: 1rem 1.5rem;
                    cursor: pointer;
                }
                .alert-button:hover {
                    border: solid 1px ${modeButtonBackgroundHover};
                    background-color: ${modeButtonBackgroundHover};
                }
                @media screen and (max-width: 950px) {
                    .alert-h2 {
                        font-size: 4rem;
                    }
                    .alert-p {
                        font-size: 1.5rem;
                    }
                    .alert-button {
                        font-size: 1.5rem;
                    }
                }
            </style>`,
            background: modeBackground,
            width: "70%",
            padding: "5rem 2rem",
            confirmButtonText: `<p class="alert-button">OK</p>`,
            confirmButtonColor: modeButtonBackground,
            focusConfirm: false
        });
    };
});