const commandHistory = [];

document.addEventListener('DOMContentLoaded', function () {
    const fukkContainer = document.getElementById('fukk-container');
    const userInput = document.getElementById('user-input');

    function addLine(text) {
        const line = document.createElement('div');
        line.textContent = text;
        fukkContainer.appendChild(line);
        fukkContainer.scrollTop = fukkContainer.scrollHeight;
    };

    function handleCommand(command) {
        addLine('$ ' + command);
        commandHistory.push(command);

        const commandParts = command.split(' ');
        const commandName = commandParts[0].toLowerCase();

        switch (commandName) {
            case 'clear':
                clear();
                break;
            case 'echo':
                echo(commandParts.slice(1).join(' '));
                break;
            case 'help':
                help();
                break;
            case 'time':
                time();
                break;
            case 'date':
                date();
                break;
            case 'random':
                random(commandParts.slice(1));
                break;
            case 'history':
                showHistory();
                break;
            default:
                unknown();
        };

        userInput.value = '';
    };

    function clear() {
        fukkContainer.innerHTML = '';
    };

    function echo(str) {
        if (str.trim() === '') {
            addLine('Invalid parameters. Usage: echo <text>');
        } else {
            addLine(`> ${str}`);
        }
    }
    function unknown() {
        addLine('Command not recognized.');
    };

    function help() {
        addLine("clear - Clears the console\necho <text> - Displays <text> to the console\ntime - Displays current time (12 & 24 hour clock)\ndate - Displays the current date\nhelp - You just ran it :3");
    };

    function time() {
        const currentTime24 = new Date();
        const hours24 = currentTime24.getHours();
        const minutes24 = currentTime24.getMinutes();
        const seconds24 = currentTime24.getSeconds();
        const time24 = `${hours24}:${minutes24}:${seconds24}`;

        const currentTime = new Date();
        let hours = currentTime.getHours();
        const minutes = currentTime.getMinutes();
        const seconds = currentTime.getSeconds();
    
        const amPM = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12 || 12;
    
        const time = `${hours}:${minutes}:${seconds} ${amPM}`;
        addLine(`Current Time: ${time} | ${time24}`);
    };

    userInput.addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            const command = userInput.value.trim();
            handleCommand(command);
        };
    });

    function date() {
        const currentDate = new Date();
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const date = currentDate.toLocaleDateString('en-US', options);
        addLine(`Current Date: ${date}`);
    };

    function random(params) {
        if (params.length === 2) {
            const min = parseInt(params[0]);
            const max = parseInt(params[1]);
    
            if (!isNaN(min) && !isNaN(max)) {
                const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
                addLine(`Random Number: ${randomNumber}`);
            } else {
                addLine('Invalid parameters. Usage: random <min> <max>');
            };
        } else {
            addLine('Invalid parameters. Usage: random <min> <max>');
        };
    };

    function showHistory() {
        const historyLines = getHistoryLines();
        if (historyLines.length > 0) {
            addLine('Command History:');
            historyLines.forEach((line, index) => {
                addLine(`${index + 1}. ${line}`);
            });
        } else {
            addLine('No command history available.');
        };
    };

    function getHistoryLines(maxHistoryLines = 10) {
        const startIndex = Math.max(0, commandHistory.length - maxHistoryLines);
        return commandHistory.slice(startIndex);
    }
    
});
