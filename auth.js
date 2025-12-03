// ========== 标签切换功能 ==========
const tabs = document.querySelectorAll('.tab');
const tabIndicator = document.querySelector('.tab-indicator');
const forms = document.querySelectorAll('.auth-form');

tabs.forEach(tab => {
    tab.addEventListener('click', function() {
        // 移除所有active类
        tabs.forEach(t => t.classList.remove('active'));
        forms.forEach(form => form.classList.remove('active'));
        
        // 添加active类到当前标签
        this.classList.add('active');
        
        // 移动指示器
        const index = Array.from(tabs).indexOf(this);
        if (tabIndicator) {
            tabIndicator.style.transform = `translateX(${index * 100}%)`;
        }
        
        // 显示对应的表单
        const tabId = this.getAttribute('data-tab');
        document.getElementById(`${tabId}-form`).classList.add('active');
    });
});

// ========== 切换登录/注册链接 ==========
const switchToRegister = document.getElementById('switch-to-register');
if (switchToRegister) {
    switchToRegister.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector('.tab[data-tab="register"]').click();
    });
}

const switchToLogin = document.getElementById('switch-to-login');
if (switchToLogin) {
    switchToLogin.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector('.tab[data-tab="login"]').click();
    });
}

// ========== 密码显示/隐藏功能 ==========
function setupPasswordToggle(passwordId, toggleId) {
    const passwordInput = document.getElementById(passwordId);
    const toggleIcon = document.getElementById(toggleId);
    
    if (passwordInput && toggleIcon) {
        toggleIcon.addEventListener('click', function() {
            if (passwordInput.type === 'password') {
                passwordInput.type = 'text';
                toggleIcon.classList.remove('fa-eye');
                toggleIcon.classList.add('fa-eye-slash');
            } else {
                passwordInput.type = 'password';
                toggleIcon.classList.remove('fa-eye-slash');
                toggleIcon.classList.add('fa-eye');
            }
        });
    }
}

setupPasswordToggle('login-password', 'login-password-toggle');
setupPasswordToggle('register-password', 'register-password-toggle');

// ========== 用户类型选择 ==========
const userTypeOptions = document.querySelectorAll('.user-type-option');
const userTypeInput = document.getElementById('user-type');

userTypeOptions.forEach(option => {
    option.addEventListener('click', function() {
        userTypeOptions.forEach(opt => opt.classList.remove('selected'));
        this.classList.add('selected');
        if (userTypeInput) {
            userTypeInput.value = this.getAttribute('data-type');
        }
    });
});

// ========== 密码强度检测 ==========
const passwordInput = document.getElementById('register-password');
const strengthBar = document.getElementById('password-strength-bar');
const strengthText = document.getElementById('password-strength-text');

if (passwordInput && strengthBar && strengthText) {
    passwordInput.addEventListener('input', function() {
        const password = this.value;
        let strength = 0;
        let text = '密码强度：弱';
        let className = 'strength-weak';
        
        if (password.length >= 8) strength++;
        if (/[A-Z]/.test(password)) strength++;
        if (/[0-9]/.test(password)) strength++;
        if (/[^A-Za-z0-9]/.test(password)) strength++;
        
        if (strength > 3) {
            text = '密码强度：强';
            className = 'strength-strong';
        } else if (strength > 1) {
            text = '密码强度：中';
            className = 'strength-medium';
        }
        
        strengthBar.className = `password-strength-bar ${className}`;
        strengthText.textContent = text;
    });
}

// ========== 表单验证功能 ==========
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePassword(password) {
    return password.length >= 8 && /[A-Za-z]/.test(password) && /[0-9]/.test(password);
}

function showError(elementId, errorId) {
    const element = document.getElementById(elementId);
    const errorElement = document.getElementById(errorId);
    if (element && errorElement) {
        element.classList.add('error');
        errorElement.style.display = 'flex';
    }
}

function hideError(elementId, errorId) {
    const element = document.getElementById(elementId);
    const errorElement = document.getElementById(errorId);
    if (element && errorElement) {
        element.classList.remove('error');
        errorElement.style.display = 'none';
    }
}

function showSuccess(messageId) {
    const messageElement = document.getElementById(messageId);
    if (messageElement) {
        messageElement.style.display = 'flex';
        setTimeout(() => {
            messageElement.style.display = 'none';
        }, 3000);
    }
}

function setLoading(buttonId, isLoading) {
    const button = document.getElementById(buttonId);
    if (button) {
        if (isLoading) {
            button.classList.add('btn-loading');
            button.disabled = true;
        } else {
            button.classList.remove('btn-loading');
            button.disabled = false;
        }
    }
}

// ========== 登录表单提交 ==========
const loginForm = document.getElementById('login-form');
if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        let isValid = true;
        
        const email = document.getElementById('login-email');
        const password = document.getElementById('login-password');
        
        // 验证邮箱
        if (!validateEmail(email.value)) {
            showError('login-email', 'login-email-error');
            isValid = false;
        } else {
            hideError('login-email', 'login-email-error');
        }
        
        // 验证密码
        if (password.value.length < 1) {
            showError('login-password', 'login-password-error');
            isValid = false;
        } else {
            hideError('login-password', 'login-password-error');
        }
        
        if (isValid) {
            setLoading('login-btn', true);
            
            // 模拟API调用
            setTimeout(() => {
                setLoading('login-btn', false);
                showSuccess('login-success');
                
                // 在实际应用中，这里会重定向到用户仪表板
                setTimeout(() => {
                    alert('登录成功！在实际应用中，这里会跳转到用户仪表板。');
                    // window.location.href = 'dashboard.html';
                }, 1000);
            }, 1500);
        }
    });
}

// ========== 注册表单提交 ==========
const registerForm = document.getElementById('register-form');
if (registerForm) {
    registerForm.addEventListener('submit', function(e) {
        e.preventDefault();
        let isValid = true;
        
        const name = document.getElementById('register-name');
        const email = document.getElementById('register-email');
        const password = document.getElementById('register-password');
        const confirm = document.getElementById('register-confirm');
        const agreeTerms = document.getElementById('agree-terms');
        
        // 验证姓名
        if (name.value.length < 1) {
            showError('register-name', 'register-name-error');
            isValid = false;
        } else {
            hideError('register-name', 'register-name-error');
        }
        
        // 验证邮箱
        if (!validateEmail(email.value)) {
            showError('register-email', 'register-email-error');
            isValid = false;
        } else {
            hideError('register-email', 'register-email-error');
        }
        
        // 验证密码
        if (!validatePassword(password.value)) {
            showError('register-password', 'register-password-error');
            isValid = false;
        } else {
            hideError('register-password', 'register-password-error');
        }
        
        // 验证确认密码
        if (confirm.value !== password.value) {
            showError('register-confirm', 'register-confirm-error');
            isValid = false;
        } else {
            hideError('register-confirm', 'register-confirm-error');
        }
        
        // 验证同意条款
        const agreeTermsError = document.getElementById('agree-terms-error');
        if (!agreeTerms.checked) {
            if (agreeTermsError) {
                agreeTermsError.style.display = 'flex';
            }
            isValid = false;
        } else {
            if (agreeTermsError) {
                agreeTermsError.style.display = 'none';
            }
        }
        
        if (isValid) {
            setLoading('register-btn', true);
            
            // 模拟API调用
            setTimeout(() => {
                setLoading('register-btn', false);
                showSuccess('register-success');
                
                // 在实际应用中，这里会重定向到登录页面或用户仪表板
                setTimeout(() => {
                    alert('注册成功！在实际应用中，这里会跳转到登录页面或用户仪表板。');
                    // window.location.href = 'index.html';
                }, 1000);
            }, 1500);
        }
    });
}

// ========== 输入框实时验证 ==========
document.querySelectorAll('.form-input').forEach(input => {
    input.addEventListener('blur', function() {
        if (this.value.trim() !== '') {
            this.classList.add('success');
        } else {
            this.classList.remove('success');
        }
    });
});

// ========== 表单输入即时验证 ==========
document.querySelectorAll('.form-input').forEach(input => {
    input.addEventListener('input', function() {
        this.classList.remove('error');
        this.classList.remove('success');
        
        if (this.value.trim() !== '') {
            this.classList.add('success');
        }
    });
});

// ========== 回车键提交表单 ==========
document.querySelectorAll('.form-input').forEach(input => {
    input.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            const form = this.closest('form');
            if (form) {
                const submitBtn = form.querySelector('button[type="submit"]');
                if (submitBtn) {
                    submitBtn.click();
                }
            }
        }
    });
});

// ========== 忘记密码功能 ==========
const forgotPasswordLink = document.querySelector('.forgot-password');
if (forgotPasswordLink) {
    forgotPasswordLink.addEventListener('click', function(e) {
        e.preventDefault();
        const email = prompt('请输入您的邮箱地址，我们将发送重置密码链接：');
        if (email && validateEmail(email)) {
            alert('重置密码链接已发送到您的邮箱，请查收！');
            // 实际应用中这里会调用API发送重置密码邮件
        } else if (email) {
            alert('请输入有效的邮箱地址！');
        }
    });
}