// ========== 移动端菜单切换 ==========
const mobileMenuBtn = document.querySelector('.mobile-menu');
const navLinks = document.querySelector('.nav-links');
const menuIcon = mobileMenuBtn?.querySelector('i');

if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener('click', function() {
        const isExpanded = this.getAttribute('aria-expanded') === 'true' || false;
        navLinks.classList.toggle('active');
        this.setAttribute('aria-expanded', !isExpanded);
        
        if (navLinks.classList.contains('active')) {
            menuIcon.classList.remove('fa-bars');
            menuIcon.classList.add('fa-times');
        } else {
            menuIcon.classList.remove('fa-times');
            menuIcon.classList.add('fa-bars');
        }
    });
    
    // 点击导航链接关闭移动端菜单
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768 && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
                menuIcon.classList.remove('fa-times');
                menuIcon.classList.add('fa-bars');
            }
        });
    });
}

// ========== 平滑滚动 ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
            
            // 更新URL哈希（不滚动）
            history.pushState(null, null, targetId);
        }
    });
});

// ========== 导航栏滚动效果 ==========
const header = document.querySelector('header');
window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// ========== 智能聊天助手功能 ==========
const aiAssistant = document.querySelector('.ai-assistant');
const minimizeBtn = document.querySelector('.minimize-btn');

if (aiAssistant) {
    // 延迟显示聊天助手
    setTimeout(() => {
        aiAssistant.classList.add('active');
    }, 2000);
    
    // 最小化/恢复聊天助手
    if (minimizeBtn) {
        minimizeBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            aiAssistant.classList.toggle('minimized');
            const isMinimized = aiAssistant.classList.contains('minimized');
            this.textContent = isMinimized ? '+' : '−';
            this.setAttribute('aria-label', isMinimized ? '展开聊天助手' : '最小化聊天助手');
        });
    }
    
    // 点击最小化状态恢复
    aiAssistant.addEventListener('click', function(e) {
        if (this.classList.contains('minimized')) {
            this.classList.remove('minimized');
            minimizeBtn.textContent = '−';
            minimizeBtn.setAttribute('aria-label', '最小化聊天助手');
        }
    });
    
    // 快速操作按钮
    document.querySelectorAll('.quick-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const action = this.getAttribute('data-action');
            let message = '';
            
            switch(action) {
                case 'emergency':
                    message = '正在为您跳转到紧急求助页面...';
                    break;
                case 'volunteer':
                    message = '正在为您跳转到志愿者注册页面...';
                    break;
                case 'donate':
                    message = '正在为您跳转到捐赠页面...';
                    break;
            }
            
            const messagesDiv = document.querySelector('.chat-messages');
            if (messagesDiv) {
                const newMessage = document.createElement('div');
                newMessage.className = 'message assistant';
                newMessage.textContent = message;
                messagesDiv.appendChild(newMessage);
                messagesDiv.scrollTop = messagesDiv.scrollHeight;
                
                // 模拟跳转（实际项目中应替换为真实跳转）
                setTimeout(() => {
                    const actionText = action === 'emergency' ? '紧急求助' : action === 'volunteer' ? '志愿者注册' : '捐赠';
                    console.log(`跳转到${actionText}页面`);
                    // 实际跳转代码：window.location.href = `/${action}-page.html`;
                }, 1000);
            }
        });
    });
}

// ========== 模拟地图点点击 ==========
document.querySelectorAll('.map-point').forEach(point => {
    point.addEventListener('click', function() {
        const type = this.getAttribute('data-type');
        const typeText = type === 'emergency' ? '紧急求助' : type === 'high-priority' ? '高优先级' : '中等优先级';
        console.log(`您点击了一个${typeText}需求点，正在为您加载详细信息...`);
    });
    
    // 键盘导航支持
    point.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            this.click();
        }
    });
});

// ========== 案例筛选功能 ==========
document.addEventListener('DOMContentLoaded', function() {
    const filterTags = document.querySelectorAll('.filter-tag');
    const caseCards = document.querySelectorAll('.case-card');
    
    filterTags.forEach(tag => {
        tag.addEventListener('click', function() {
            // 移除所有active类
            filterTags.forEach(t => t.classList.remove('active'));
            // 添加active类到当前标签
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            caseCards.forEach(card => {
                if (filterValue === 'all') {
                    card.style.display = 'block';
                    card.style.animation = 'fadeIn 0.5s ease-out';
                } else {
                    const categories = card.getAttribute('data-category').split(' ');
                    if (categories.includes(filterValue)) {
                        card.style.display = 'block';
                        card.style.animation = 'fadeIn 0.5s ease-out';
                    } else {
                        card.style.display = 'none';
                    }
                }
            });
        });
    });
});

// ========== 动态更新统计数据 ==========
function updateStats() {
    const statValue1 = document.querySelector('.stat-card.gradient-1 .stat-value');
    const statValue2 = document.querySelector('.stat-card.gradient-2 .stat-value');
    const statValue3 = document.querySelector('.stat-card.gradient-3 .stat-value');
    
    if (statValue1 && statValue2 && statValue3) {
        // 模拟动态数据
        const newValue1 = (94.7 + Math.random() * 0.5).toFixed(1) + '%';
        const newValue2 = Math.floor(20 + Math.random() * 8) + '分钟';
        const newValue3 = Math.floor(1247 + Math.random() * 50);
        
        // 添加动画效果
        statValue1.style.opacity = '0.5';
        statValue2.style.opacity = '0.5';
        statValue3.style.opacity = '0.5';
        
        setTimeout(() => {
            statValue1.textContent = newValue1;
            statValue1.style.opacity = '1';
            
            statValue2.textContent = newValue2;
            statValue2.style.opacity = '1';
            
            statValue3.textContent = newValue3.toLocaleString();
            statValue3.style.opacity = '1';
            
            // 更新进度条
            const progressFill = document.querySelector('.progress-fill');
            if (progressFill) {
                const newWidth = parseFloat(newValue1);
                progressFill.style.width = newWidth + '%';
            }
        }, 300);
    }
}

// 每10秒更新一次统计数据
let statsInterval;
if (document.querySelector('.stat-card')) {
    statsInterval = setInterval(updateStats, 10000);
}

// ========== 页面加载动画 ==========
document.addEventListener('DOMContentLoaded', function() {
    // 添加滚动动画
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // 观察需要动画的元素
    document.querySelectorAll('.feature-card, .case-card, .role-card, .stat-card, .badge-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(el);
    });
    
    // 页面可见性变化时处理
    document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
            clearInterval(statsInterval);
        } else {
            if (document.querySelector('.stat-card')) {
                statsInterval = setInterval(updateStats, 10000);
            }
        }
    });
});

// ========== 错误处理 ==========
window.addEventListener('error', function(e) {
    console.error('页面错误:', e.error);
});

// ========== 加载动画 ==========
window.addEventListener('load', function() {
    // 移除页面加载动画
    const loader = document.getElementById('page-loader');
    if (loader) {
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.display = 'none';
            }, 500);
        }, 500);
    }
});

// ========== 表单验证工具函数 ==========
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePhone(phone) {
    const re = /^1[3-9]\d{9}$/;
    return re.test(phone);
}

function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
        <span>${message}</span>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// ========== 图像懒加载 ==========
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ========== 添加到收藏夹功能 ==========
function addToFavorites() {
    if (window.sidebar && window.sidebar.addPanel) {
        // Firefox
        window.sidebar.addPanel(document.title, window.location.href, "");
    } else if (window.external && ('AddFavorite' in window.external)) {
        // IE
        window.external.AddFavorite(window.location.href, document.title);
    } else if (window.opera && window.print) {
        // Opera
        const elem = document.createElement('a');
        elem.setAttribute('href', window.location.href);
        elem.setAttribute('title', document.title);
        elem.setAttribute('rel', 'sidebar');
        elem.click();
    } else {
        // 其他浏览器
        alert('请按 Ctrl+D 添加到收藏夹');
    }
}

// ========== 分享功能 ==========
function sharePage() {
    if (navigator.share) {
        navigator.share({
            title: document.title,
            text: '发现一个很棒的社会援助平台 - 援手社区',
            url: window.location.href,
        })
        .then(() => console.log('分享成功'))
        .catch(error => console.log('分享失败:', error));
    } else {
        // 复制链接到剪贴板
        const url = window.location.href;
        navigator.clipboard.writeText(url).then(() => {
            showNotification('链接已复制到剪贴板！', 'success');
        });
    }
}