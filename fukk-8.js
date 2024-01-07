document.title = localStorage.getItem('title');

const commandHistory = [];

document.addEventListener('DOMContentLoaded', function() {
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
                fukkContainer.innerHTML = '';
                break;
            case 'echo':
                echo(commandParts.slice(1).join(' '));
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
            case 'whoami':
                whoami();
                break;
            case 'encode64':
                encode64(commandParts.slice(1).join(' '));
                break;
            case 'decode64':
                decode64(commandParts.slice(1).join(' '));
                break;
            case 'cloak':
                cloak(commandParts.slice(1).join(' '));
                break;
            case 'reset':
                reset();
                break;
            case 'transrights':
                addLine("#TransRights 🏳️‍⚧️💜");
                break;
            case 'exec':
                exec(commandParts.slice(1).join(' '));
                break;
            case 'version':
                version();
                break;
            case 'help':
                help();
                break;
            default:
                unknown();
        };

        userInput.value = '';
    };

    userInput.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            const command = userInput.value.trim();
            handleCommand(command);
        };
    });

    function unknown() {
        addLine('Command not recognized.');
    };

    function showHistory() {
        const historyLines = getHistoryLines();

        if (historyLines.length > 0) {
            addLine('Current Command History:');
            historyLines.forEach((line, index) => {
                addLine(`${index + 1}. ${line}`);
            });
            addLine(' ')
        } else {
            addLine('No command history available.');
        };
    };

    function getHistoryLines(maxHistoryLines = 10) {
        const startIndex = Math.max(0, commandHistory.length - maxHistoryLines);
        return commandHistory.slice(startIndex);
    };

    function echo(str) {
        if (str.trim() === '') {
            addLine('Invalid parameters. Usage: echo <text>');
        } else {
            addLine(`> ${str}`);
        }
    }

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

    function whoami() {
        addLine('Who Am I?');
        addLine(`User Agent: ${navigator.userAgent}`);
        addLine(`Operating System: ${navigator.platform}`);
        addLine(`Language: ${navigator.language}`);

    };

    function encode64(text) {
        if (text.trim() === '') {
            addLine('Invalid parameters. Usage: encode64 <text>');
        } else {
            const encodedText = btoa(text);
            addLine(`Base64 Encoded: ${encodedText}`);
        };
    };

    function decode64(encodedText) {
        if (encodedText.trim() === '') {
            addLine('Invalid parameters. Usage: decode64 <encodedText>');
        } else {
            try {
                const decodedText = atob(encodedText);
                addLine(`Base64 Decoded: ${decodedText}`);
            } catch (error) {
                addLine('Error decoding Base64. Make sure the input is valid Base64-encoded text.');
            };
        };
    };

    function cloak(title) {
        localStorage.setItem('title', title);
        document.title = localStorage.getItem('title');
        addLine(`Title Set to ${title}`);
    };

    function reset() {
        localStorage.setItem("title", "FUKK-8");
        document.title = localStorage.getItem("title");
        addLine('Reset LocalStorage Values');
    };

    function exec(code) {
        eval(code);
    };

    function version() {
        addLine('FUKK-8');
        addLine('Version: v0.1.0 (Beta Release)');
        addLine('License: MIT');
        addLine('Source Code: https://github.com/entrpix/FUKK-8');
    };

    function help() {
        addLine('clear - Clears the console');
        addLine('echo <text> - Writes <text> to the console');
        addLine('time - Writes the current time to the console');
        addLine('date - Writes the current date to the console');
        addLine('random <min> <max> - Writes a random number to the console between <mix> and <max>');
        addLine('history - Writes previously run commands to the console (refreshing pages clears it)')
        addLine('whoami - Writes information about the user to the console');
        addLine('encode64 <text> - Encodes <text> in Base64 and writes it to the console');
        addLine('decode64 <text> - Decodes <text> in Base64 and writes it to the console');
        addLine('cloak <text> - Sets the pages title to <text> (works across refreshses)');
        addLine('reset - Resets the cloaked title (resets LocalStorage values)');
        addLine('exec <code> - Runs <code> (Uses eval)');
        addLine('version - Writes the version of FUKK-8 to the console');
        addLine('transrights - #TransRights <3333');
        addLine('help - Ya just ran it :3');
    };

});