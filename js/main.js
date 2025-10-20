document.addEventListener('DOMContentLoaded', function() {
    initNavigation();
    initFormValidation();
    initMasks();
    initAnimations();
    initDonationForm();
});

function initNavigation() {
    const navToggle = document.querySelector('.nav__toggle');
    const navMenu = document.querySelector('.nav__menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });

        const navLinks = document.querySelectorAll('.nav__link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            });
        });

        document.addEventListener('click', function(e) {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            }
        });
    }
}

function initFormValidation() {
    const form = document.getElementById('registrationForm');
    if (!form) return;

    const inputs = form.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });

        input.addEventListener('input', function() {
            clearFieldError(this);
        });
    });

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateForm()) {
            showSuccessMessage();
            console.log('Form is valid, ready to submit');
        } else {
            showErrorMessage('Por favor, corrija os erros no formulário.');
        }
    });

    const clearBtn = document.getElementById('clearForm');
    if (clearBtn) {
        clearBtn.addEventListener('click', function() {
            if (confirm('Tem certeza que deseja limpar o formulário?')) {
                form.reset();
                clearAllErrors();
            }
        });
    }
}

function validateField(field) {
    const value = field.value.trim();
    const fieldName = field.name;
    const errorElement = document.getElementById(fieldName + '-error');
    
    clearFieldError(field);

    if (field.hasAttribute('required') && !value) {
        showFieldError(field, 'Este campo é obrigatório.');
        return false;
    }

    switch (fieldName) {
        case 'fullName':
            if (value && value.length < 2) {
                showFieldError(field, 'Nome deve ter pelo menos 2 caracteres.');
                return false;
            }
            break;

        case 'email':
            if (value && !isValidEmail(value)) {
                showFieldError(field, 'Digite um e-mail válido.');
                return false;
            }
            break;

        case 'cpf':
            if (value && !isValidCPF(value)) {
                showFieldError(field, 'Digite um CPF válido.');
                return false;
            }
            break;

        case 'phone':
            if (value && !isValidPhone(value)) {
                showFieldError(field, 'Digite um telefone válido.');
                return false;
            }
            break;

        case 'birthDate':
            if (value && !isValidBirthDate(value)) {
                showFieldError(field, 'Data de nascimento inválida.');
                return false;
            }
            break;

        case 'cep':
            if (value && !isValidCEP(value)) {
                showFieldError(field, 'Digite um CEP válido.');
                return false;
            }
            break;

        case 'motivation':
            if (value && value.length < 20) {
                showFieldError(field, 'Motivação deve ter pelo menos 20 caracteres.');
                return false;
            }
            break;
    }

    return true;
}

function validateForm() {
    const form = document.getElementById('registrationForm');
    if (!form) return true;

    let isValid = true;
    const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
    
    inputs.forEach(input => {
        if (!validateField(input)) {
            isValid = false;
        }
    });

    const interests = form.querySelectorAll('input[name="interests"]:checked');
    if (interests.length === 0) {
        const interestsError = document.getElementById('interests-error');
        if (interestsError) {
            interestsError.textContent = 'Selecione pelo menos uma área de interesse.';
        }
        isValid = false;
    }

    const terms = form.querySelector('input[name="terms"]');
    if (terms && !terms.checked) {
        const termsError = document.getElementById('terms-error');
        if (termsError) {
            termsError.textContent = 'Você deve aceitar os termos e condições.';
        }
        isValid = false;
    }

    return isValid;
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidCPF(cpf) {
    cpf = cpf.replace(/\D/g, '');
    
    if (cpf.length !== 11) return false;
    
    if (/^(\d)\1{10}$/.test(cpf)) return false;
    let sum = 0;
    for (let i = 0; i < 9; i++) {
        sum += parseInt(cpf.charAt(i)) * (10 - i);
    }
    let remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(cpf.charAt(9))) return false;
    
    sum = 0;
    for (let i = 0; i < 10; i++) {
        sum += parseInt(cpf.charAt(i)) * (11 - i);
    }
    remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(cpf.charAt(10))) return false;
    
    return true;
}

function isValidPhone(phone) {
    const phoneRegex = /^\(\d{2}\)\s\d{4,5}-\d{4}$/;
    return phoneRegex.test(phone);
}

function isValidBirthDate(date) {
    const birthDate = new Date(date);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    
    return age >= 16 && age <= 100;
}

function isValidCEP(cep) {
    const cepRegex = /^\d{5}-\d{3}$/;
    return cepRegex.test(cep);
}

function showFieldError(field, message) {
    const errorElement = document.getElementById(field.name + '-error');
    if (errorElement) {
        errorElement.textContent = message;
    }
    field.classList.add('error');
}

function clearFieldError(field) {
    const errorElement = document.getElementById(field.name + '-error');
    if (errorElement) {
        errorElement.textContent = '';
    }
    field.classList.remove('error');
}

function clearAllErrors() {
    const errorElements = document.querySelectorAll('.form__error');
    errorElements.forEach(error => {
        error.textContent = '';
    });
    
    const errorFields = document.querySelectorAll('.error');
    errorFields.forEach(field => {
        field.classList.remove('error');
    });
}

function showSuccessMessage() {
    const message = document.createElement('div');
    message.className = 'success-message';
    message.innerHTML = `
        <div style="background: #10b981; color: white; padding: 1rem; border-radius: 8px; margin: 1rem 0; text-align: center;">
            <h3>Cadastro realizado com sucesso!</h3>
            <p>Obrigado por se cadastrar. Entraremos em contato em breve.</p>
        </div>
    `;
    
    const form = document.getElementById('registrationForm');
    form.parentNode.insertBefore(message, form);
    
    message.scrollIntoView({ behavior: 'smooth' });
    
    setTimeout(() => {
        message.remove();
    }, 5000);
}

function showErrorMessage(message) {
    const existingError = document.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.innerHTML = `
        <div style="background: #dc2626; color: white; padding: 1rem; border-radius: 8px; margin: 1rem 0; text-align: center;">
            <h3>Erro no formulário</h3>
            <p>${message}</p>
        </div>
    `;
    
    const form = document.getElementById('registrationForm');
    form.parentNode.insertBefore(errorDiv, form);
    
    errorDiv.scrollIntoView({ behavior: 'smooth' });
}

function initMasks() {
    const cpfInput = document.getElementById('cpf');
    if (cpfInput) {
        cpfInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            value = value.replace(/(\d{3})(\d)/, '$1.$2');
            value = value.replace(/(\d{3})(\d)/, '$1.$2');
            value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
            e.target.value = value;
        });
    }

    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            value = value.replace(/(\d{2})(\d)/, '($1) $2');
            value = value.replace(/(\d{4,5})(\d{4})$/, '$1-$2');
            e.target.value = value;
        });
    }

    const cepInput = document.getElementById('cep');
    if (cepInput) {
        cepInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            value = value.replace(/(\d{5})(\d)/, '$1-$2');
            e.target.value = value;
        });
    }
}

function initDonationForm() {
    const amountSelect = document.getElementById('amount');
    const customAmountDiv = document.getElementById('custom-amount');
    const customValueInput = document.getElementById('custom-value');
    
    if (amountSelect && customAmountDiv && customValueInput) {
        amountSelect.addEventListener('change', function() {
            if (this.value === 'custom') {
                customAmountDiv.style.display = 'block';
                customValueInput.required = true;
            } else {
                customAmountDiv.style.display = 'none';
                customValueInput.required = false;
                customValueInput.value = '';
            }
        });
    }

    const donationForm = document.querySelector('.donation__form');
    if (donationForm) {
        donationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const amount = amountSelect.value === 'custom' ? 
                customValueInput.value : amountSelect.value;
            
            if (!amount || amount <= 0) {
                alert('Por favor, selecione um valor válido para doação.');
                return;
            }
            
            showDonationSuccess(amount);
        });
    }
}

function showDonationSuccess(amount) {
    const message = document.createElement('div');
    message.className = 'donation-success';
    message.innerHTML = `
        <div style="background: #10b981; color: white; padding: 2rem; border-radius: 8px; margin: 1rem 0; text-align: center;">
            <h3>Obrigado pela sua doação!</h3>
            <p>Valor: R$ ${parseFloat(amount).toFixed(2).replace('.', ',')}</p>
            <p>Você será redirecionado para o pagamento...</p>
        </div>
    `;
    
    const form = document.querySelector('.donation__form');
    form.parentNode.insertBefore(message, form);
    
    message.scrollIntoView({ behavior: 'smooth' });
    
    setTimeout(() => {
        alert('Em um sistema real, você seria redirecionado para o gateway de pagamento.');
        message.remove();
    }, 3000);
}

function initAnimations() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.stat__item, .project__card, .step__item, .impact__item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function initAccessibility() {
    const skipLink = document.createElement('a');
    skipLink.href = '#main';
    skipLink.textContent = 'Pular para o conteúdo principal';
    skipLink.className = 'skip-link';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 6px;
        background: #000;
        color: #fff;
        padding: 8px;
        text-decoration: none;
        z-index: 1000;
        transition: top 0.3s;
    `;
    
    skipLink.addEventListener('focus', function() {
        this.style.top = '6px';
    });
    
    skipLink.addEventListener('blur', function() {
        this.style.top = '-40px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);

    const main = document.querySelector('.main');
    if (main && !main.id) {
        main.id = 'main';
    }
}

document.addEventListener('DOMContentLoaded', initAccessibility);

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        isValidEmail,
        isValidCPF,
        isValidPhone,
        isValidBirthDate,
        isValidCEP
    };
}
