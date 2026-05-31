document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. ระบบอนิเมชั่นการเลื่อนหน้าจอ ---
    const scrollBtn = document.querySelector('.scroll-btn');
    if(scrollBtn) {
        scrollBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    }

    // --- 2. การเชื่อมโยงข้อมูลกับฐานข้อมูล Google Sheets ---
    // ⚠️ อย่าลืมใส่ URL ใหม่ที่เพิ่ง Deploy มา
    const scriptURL = 'https://script.google.com/macros/s/AKfycbyJQJuPBPTHQ95-IdX6hXM-57HPRdlIAlvk9CM49Fud6oyIU3DZ9N6-9Z2zMDrW42V_aw/exec'; 
    
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
                        
                        successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });

                        registrationForm.reset();

                        document.querySelectorAll('input[type="text"]').forEach(input => {
                            input.style.borderColor = 'var(--border-color)';
                            input.style.boxShadow = 'none';
                        });

                        setTimeout(() => { successMessage.style.display = 'none'; }, 6000);
                    } else {
                        alert('เกิดข้อผิดพลาดจากฝั่งเซิร์ฟเวอร์ กรุณาลองใหม่อีกครั้ง');
                    }
                })
                .catch(error => {
                    console.error('Error!', error.message);
                    alert('การเชื่อมต่อล้มเหลว โปรดตรวจสอบว่าใส่ URL ของ Web App ถูกต้องหรือไม่');
                })
                .finally(() => {
                    submitBtn.innerText = originalText;
                    submitBtn.style.opacity = "1";
                    submitBtn.disabled = false;
                });
        });
    }

    // --- 3. ตกแต่งเอฟเฟกต์แสงไฟเรืองแสงขณะกรอกข้อมูล ---
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

    // --- 4. ระบบเติมข้อมูลทดสอบอัตโนมัติ (เพิ่มข้อมูลติดต่อของทุกคนแล้ว) ---
    const testFillBtn = document.getElementById('testFillBtn');
    
    if(testFillBtn) {
        testFillBtn.addEventListener('click', () => {
            
            // 4.1 ข้อมูลทีมและหัวหน้า 
            document.getElementById('teamName').value = "God of Testing";
            document.getElementById('leaderContact').value = "081-234-5678 (Line: leader_z)";
            document.getElementById('leaderRealName').value = "นาย สมชาย สายแครี่";
            document.getElementById('leaderNickname').value = "Somchai_Pro";
            document.getElementById('leaderRoom').value = "ม.5/1";

            // 4.2 ข้อมูลผู้เล่น 1-4 (มีช่องทางการติดต่อเพิ่มเข้ามา)
            const players = [
                { real: "นาย ยิงหัว แตกกระจาย", nick: "Headshot_X", room: "ม.5/1", contact: "082-111-2222" },
                { real: "นาย ซุ่มยิง นิ่งสงบ", nick: "Sniper_Z", room: "ม.5/1", contact: "IG: sniper.z" },
                { real: "นาย สายแทงค์ แข็งแกร่ง", nick: "Tanker_Boy", room: "ม.5/2", contact: "083-333-4444" },
                { real: "นาย วิ่งไว ไม่คิดชีวิต", nick: "Runner_Fast", room: "ม.5/2", contact: "IG: runner_ff" }
            ];

            for(let i = 1; i <= 4; i++) {
                const realInput = document.querySelector(`input[name="p${i}_real"]`);
                const nickInput = document.querySelector(`input[name="p${i}_nick"]`);
                const roomInput = document.querySelector(`input[name="p${i}_room"]`);
                const contactInput = document.querySelector(`input[name="p${i}_contact"]`);
                
                if (realInput) realInput.value = players[i-1].real;
                if (nickInput) nickInput.value = players[i-1].nick;
                if (roomInput) roomInput.value = players[i-1].room;
                if (contactInput) contactInput.value = players[i-1].contact;
            }

            // 4.3 ข้อมูลตัวสำรอง
            const subReal = document.querySelector('input[name="sub_real"]');
            const subNick = document.querySelector('input[name="sub_nick"]');
            const subRoom = document.querySelector('input[name="sub_room"]');
            const subContact = document.querySelector('input[name="sub_contact"]');
            
            if (subReal) subReal.value = "นาย สำรอง อดทน";
            if (subNick) subNick.value = "Sub_Support";
            if (subRoom) subRoom.value = "ม.5/3";
            if (subContact) subContact.value = "089-999-9999";

            // 4.4 ทริกเกอร์ Event เปลี่ยนสีขอบ
            document.querySelectorAll('input[type="text"]').forEach(input => {
                input.dispatchEvent(new Event('input'));
            });
            
            alert('🛠️ เติมข้อมูลสำหรับทดสอบเรียบร้อยแล้ว! กด "ส่งข้อมูลลงทะเบียน" ได้เลย');
        });
    }
});
