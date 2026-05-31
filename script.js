document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. ระบบอนิเมชั่นการเลื่อนหน้าจอ (Smooth Scrolling) ---
    const scrollBtn = document.querySelector('.scroll-btn');
    if(scrollBtn) {
        scrollBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    }

    // --- 2. การเชื่อมโยงข้อมูลกับฐานข้อมูล Google Sheets ---
    // คัดลอก "URL ของเว็บแอป" ที่ได้จากการ Deploy ใน Google Apps Script มาวางแทนที่ด้านล่างนี้
    const scriptURL = 'วาง_URL_เว็บแอปของ_GOOGLE_APPS_SCRIPT_ที่นี่'; 
    
    const registrationForm = document.getElementById('registrationForm');
    const successMessage = document.getElementById('successMessage');
    const submitBtn = document.querySelector('.submit-btn');

    if(registrationForm) {
        registrationForm.addEventListener('submit', e => {
            e.preventDefault();

            const originalText = submitBtn.innerText;
            submitBtn.innerText = "กำลังส่งข้อมูลเข้าระบบ...";
            submitBtn.style.opacity = "0.7";
            submitBtn.disabled = true;

            const formData = new FormData(registrationForm);

            fetch(scriptURL, { method: 'POST', body: formData })
                .then(response => response.json())
                .then(data => {
                    if(data.result === 'success') {
                        successMessage.style.display = 'block';
                        successMessage.style.animation = 'fadeIn 0.5s forwards';
                        
                        successMessage.scrollIntoView({
                            behavior: 'smooth',
                            block: 'center'
                        });

                        registrationForm.reset();

                        setTimeout(() => {
                            successMessage.style.display = 'none';
                        }, 6000);
                    } else {
                        alert('เกิดข้อผิดพลาดในการบันทึกข้อมูล กรุณาลองใหม่อีกครั้ง');
                    }
                })
                .catch(error => {
                    console.error('Error!', error.message);
                    alert('การเชื่อมต่อล้มเหลว ไม่สามารถส่งข้อมูลสมัครได้ในขณะนี้');
                })
                .finally(() => {
                    submitBtn.innerText = originalText;
                    submitBtn.style.opacity = "1";
                    submitBtn.disabled = false;
                });
        });
    }

    // --- 3. ตกแต่งเอฟเฟกต์แสงไฟเรืองแสงขณะกรอกข้อมูลข้อมูล (Dynamic Glowing) ---
    const allInputs = document.querySelectorAll('input[type="text"]');
    
    allInputs.forEach(input => {
        input.addEventListener('input', function() {
            if (this.value.trim() !== '') {
                this.style.borderColor = '#ff7a00';
                this.style.boxShadow = '0 0 10px rgba(255, 122, 0, 0.2)';
            } else {
                this.style.borderColor = '#ff2a2a';
                this.style.boxShadow = '0 0 10px rgba(255, 42, 42, 0.3)';
            }
        });

        input.addEventListener('blur', function() {
            if (this.value.trim() === '') {
                this.style.borderColor = 'var(--border-color)';
                this.style.boxShadow = 'none';
            }
        });
    });
});