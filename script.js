document.addEventListener('DOMContentLoaded', () => {
    const issueType = document.getElementById('issueType');
    const extraField = document.getElementById('extraField');
    const form = document.getElementById('dataForm');
    const message = document.getElementById('message');

    // رابط Google Web App النهائي
    const GOOGLE_WEB_APP_URL = "https://script.google.com/macros/s/AKfycbzr0LGKZlPwrylvfnC-zjmUgaqfLue-60l9a97okM9qIIvt4qfBARzKh0uA0dJR0L_g/exec";

    // إظهار الحقل الإضافي إذا اخترنا "ضغط منخفض"
    issueType.addEventListener('change', () => {
        extraField.style.display = (issueType.value === 'ضغط منخفض') ? 'block' : 'none';
    });

    // إرسال البيانات للـ Google Sheets
    form.addEventListener('submit', async (e) => {
        e.preventDefault(); // يمنع تغيير الرابط

        const formData = new FormData(form);
        const data = Object.fromEntries(formData);

        // حقل الصورة فارغ (رفع الصور يحتاج طريقة متقدمة)
        data.image = "";

        try {
            const response = await fetch(GOOGLE_WEB_APP_URL, {
                method: "POST",
                mode: "cors", // مهم للاتصال من صفحة HTML
                cache: "no-cache",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(data)
            });

            const result = await response.json();
            console.log(result); // تشخيص المشكلة لو حدث خطأ

            if(result.result === "success"){
                message.textContent = "✅ تم إرسال البيانات بنجاح!";
                message.style.color = "green";
                form.reset();
                extraField.style.display = 'none';
            } else {
                message.textContent = "❌ حدث خطأ أثناء الإرسال: " + (result.message || "");
                message.style.color = "red";
            }
        } catch(err) {
            message.textContent = "❌ حدث خطأ أثناء الإرسال.";
            message.style.color = "red";
            console.error("Error sending data:", err);
        }
    });
});
