import {generatePassword, encrypt, utf8ByteLength, toast} from './functions.js';

let password = generatePassword();

const createPaste = async (plainText, burnOnRead, expiry) => {
    password = generatePassword();
    const cipherText = await encrypt(plainText,password);
    try {
    const res = await fetch('/api', {
        body: JSON.stringify({
            cipherText,
            burnOnRead,
            expiry
        }),
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        }
    });
    const js = await res.json();
    if(js?.id){
        toast(js.message ?? "Paste created successfully");
        return js.id;
    } else {
        console.error(js);
        toast(js?.message ?? "Something went wrong",3000,"error");
        return false;
    }
    } catch (error) {
        console.error(error);
        toast('Something went wrong',3000,"error");
        return false;
    }
}

window.addEventListener('DOMContentLoaded', ()=>{
    const plainText = document.getElementById('plainText');
    const charCount = document.getElementById('charCount');
    const createBtn = document.getElementById('createBtn');
    const burnOnRead = document.getElementById('burnOnRead');
    const expiry = document.getElementById('expiry');
    const modalOverlay = document.getElementById('modalOverlay');
    const closeModal = document.getElementById('closeModal');
    const copyButton = document.getElementById('copyButton');
    const copyLink = document.getElementById('copyLink');
    let isLimitExceeded = false;

    function openModal() {
        modalOverlay.style.display = 'flex';
    }

    closeModal.addEventListener('click', () => {
        modalOverlay.style.display = 'none';
    });

    copyButton.addEventListener('click', () => {
        copyLink.select();
        navigator.clipboard.writeText(copyLink.value).then(() => {
            copyButton.textContent = "Copied!";
            setTimeout(() => copyButton.textContent = "Copy", 1500);
        });
    });

    plainText.oninput = (event) => {
        const len = utf8ByteLength(event.target.value);
        charCount.innerText = len;
        if(len > 4000){
            charCount.classList.add('danger');
            isLimitExceeded = true;
        }else if(isLimitExceeded){
            charCount.classList.remove('danger');
            isLimitExceeded = false;
        }
    }
    createBtn.onclick = async () => {
        createBtn.classList.add("loading");
        const len = utf8ByteLength(plainText.value);
        if(len === 0){
            toast("Please enter something", 3000, "error")
            createBtn.classList.remove("loading")
            return;
        }
        if(len > 4000){
            toast("Text cannot exceed 4000 characters", 3000, "error")
            createBtn.classList.remove("loading")
            return;
        }

        const id = await createPaste(plainText.value, burnOnRead.checked, Number(expiry.value));
        if(id){
            copyLink.value = window.location.origin + "/" + id + "#" + password;
            openModal();
        }
        createBtn.classList.remove("loading");
    }
})