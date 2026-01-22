const GOOGLE_WEB_APP_URL = "https://script.google.com/macros/s/AKfycbzr0LGKZlPwrylvfnC-zjmUgaqfLue-60l9a97okM9qIIvt4qfBARzKh0uA0dJR0L_g/exec";

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    data.image = ""; // placeholder للصور

    try {
        const response = await fetch(GOOGLE_WEB_APP_URL, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {'Content-Type': 'application/json'}
        });

        const result = await response.json();
        console.log(result); // هتظهر نتيجة الاستجابة في console

        if(result.result === "success"){
            message.textContent = "تم إرسال البيانات بنجاح!";
            form.reset();
            extraField.style.display = 'none';
        } else {
            message.textContent = "حدث خطأ أثناء الإرسال: " + (result.message || "");
        }
    } catch(err) {
        message.textContent = "حدث خطأ أثناء الإرسال.";
        console.error(err);
    }
});
