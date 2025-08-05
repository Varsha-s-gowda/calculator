
const display = document.getElementById('display');
const buttons = document.querySelectorAll('.inputs input[type="button"]');

let currentValue = '';
let lastInput = '';

function isOperator(char) {
    return ['+', '-', '*', '/', '.'].includes(char);
}

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.getAttribute('data-value');
        if (button.id === 'clear') {
            currentValue = '';
            display.value = '';
            lastInput = '';
        } else if (button.id === 'delete') {
            currentValue = currentValue.slice(0, -1);
            display.value = currentValue;
            lastInput = currentValue.slice(-1);
        } else if (button.id === 'equals') {
            try {
                if (currentValue === '' || /[+\-*/.]$/.test(currentValue)) {
                    display.value = 'Error';
                    currentValue = '';
                } else {
                    let result = eval(currentValue);
                    if (typeof result === 'number') {
                        result = Math.round(result * 1e8) / 1e8;
                    }
                    display.value = result;
                    currentValue = result.toString();
                }
            } catch {
                display.value = 'Error';
                currentValue = '';
            }
            lastInput = '';
        } else if (value) {
            if (isOperator(value) && (currentValue === '' || isOperator(lastInput))) {
                if (value !== '-' || currentValue !== '') {
                    return;
                }
            }
            
            if (value === '.') {
                const parts = currentValue.split(/[-+*/]/);
                if (parts[parts.length - 1].includes('.')) {
                    return;
                }
            }
            currentValue += value;
            display.value = currentValue;
            lastInput = value;
        }
    });
});
