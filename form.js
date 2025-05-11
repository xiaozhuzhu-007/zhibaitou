document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.contact-form');
    if (form) {
        form.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const formData = {
                name: document.getElementById('name').value,
                phone: document.getElementById('phone').value,
                email: document.getElementById('email').value,
                message: document.getElementById('message').value,
                timestamp: new Date().toISOString()
            };

            try {
                const response = await fetch('/api/reservation', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                });

                if (response.ok) {
                    alert('预约提交成功！我们会尽快与您联系。');
                    form.reset();
                } else {
                    throw new Error('提交失败');
                }
            } catch (error) {
                console.error('Error:', error);
                alert('预约提交失败，请稍后再试。');
            }
        });
    }
});
