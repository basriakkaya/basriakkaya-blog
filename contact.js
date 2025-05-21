document.addEventListener('DOMContentLoaded', () => {
    const terminalContent = document.getElementById('terminalContent');
    const currentCommand = document.getElementById('currentCommand');
    let blinkInterval;

    // Terminal commands and responses
    const commands = [
        'help',
        'clear',
        'about',
        'skills',
        'contact'
    ];

    const commandResponses = {
        'help': `Available commands:
- help: Show this help message
- clear: Clear terminal
- about: About Basri Akkaya
- skills: List skills and expertise
- contact: Show contact information`,
        'about': `Basri Akkaya
- Siber Güvenlik Araştırmacısı
- Penetration Tester
- Güvenlik Danışmanı`,
        'skills': `Technical Skills:
- Web Application Security
- Network Security
- Malware Analysis
- Incident Response
- Security Automation
- Vulnerability Assessment`,
        'contact': `Contact Information:
Email: hello@basriakkaya.com
Twitter: @basrikkya
Discord: https://discord.gg/QNCkRy4hBw
LinkedIn: https://mk.linkedin.com/in/basriakkaya`
    };

    // Start blinking cursor
    function startCursorBlink() {
        if (blinkInterval) clearInterval(blinkInterval);
        blinkInterval = setInterval(() => {
            currentCommand.textContent = currentCommand.textContent === '_' ? '' : '_';
        }, 500);
    }

    // Add new line to terminal
    function addLine(command) {
        const line = document.createElement('div');
        line.className = 'line';
        line.innerHTML = `<span class="prompt">kage@terminal:~$</span> <span class="command">${command}</span>`;
        terminalContent.insertBefore(line, currentCommand.parentElement);

        if (command === 'clear') {
            clearTerminal();
            return;
        }

        const response = commandResponses[command];
        if (response) {
            const output = document.createElement('div');
            output.className = 'output';
            output.textContent = response;
            terminalContent.insertBefore(output, currentCommand.parentElement);
        } else {
            const error = document.createElement('div');
            error.className = 'output';
            error.style.color = '#ff0000';
            error.textContent = `Command not found: ${command}. Type 'help' for available commands.`;
            terminalContent.insertBefore(error, currentCommand.parentElement);
        }

        terminalContent.scrollTop = terminalContent.scrollHeight;
    }

    // Clear terminal
    function clearTerminal() {
        const lines = terminalContent.getElementsByClassName('line');
        const outputs = terminalContent.getElementsByClassName('output');
        
        while (lines.length > 1) {
            lines[0].remove();
        }
        while (outputs.length > 0) {
            outputs[0].remove();
        }
    }

    // Handle keyboard input
    let currentInput = '';
    let commandHistory = [];
    let historyIndex = -1;

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            if (currentInput.trim()) {
                addLine(currentInput);
                commandHistory.push(currentInput);
                historyIndex = commandHistory.length;
                currentInput = '';
                currentCommand.textContent = '_';
            }
        } else if (e.key === 'Backspace') {
            currentInput = currentInput.slice(0, -1);
            currentCommand.textContent = currentInput + '_';
        } else if (e.key === 'ArrowUp') {
            if (historyIndex > 0) {
                historyIndex--;
                currentInput = commandHistory[historyIndex];
                currentCommand.textContent = currentInput + '_';
            }
        } else if (e.key === 'ArrowDown') {
            if (historyIndex < commandHistory.length - 1) {
                historyIndex++;
                currentInput = commandHistory[historyIndex];
                currentCommand.textContent = currentInput + '_';
            } else {
                historyIndex = commandHistory.length;
                currentInput = '';
                currentCommand.textContent = '_';
            }
        } else if (e.key.length === 1) {
            currentInput += e.key;
            currentCommand.textContent = currentInput + '_';
        }
    });

    // Start cursor blinking
    startCursorBlink();

    // Add initial help message
    setTimeout(() => {
        const output = document.createElement('div');
        output.className = 'output';
        output.innerHTML = 'Welcome to the terminal! Type <span style="color: #00ff00">\'help\'</span> for available commands.';
        terminalContent.insertBefore(output, currentCommand.parentElement);
    }, 500);
}); 