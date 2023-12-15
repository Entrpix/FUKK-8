document.addEventListener('DOMContentLoaded', function () {
    const fukkContainer = document.getElementById('fukk-container');
    const userInput = document.getElementById('user-input');

    function addLine(text) {
        const line = document.createElement('div');
        line.textContent = text;
        fukkContainer.appendChild(line);
        fukkContainer.scrollTop = fukkContainer.scrollHeight;
    }

    function handleCommand(command) {
        addLine('$ ' + command);

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
            default:
                unknown();
        }

        userInput.value = '';
    }

    function clear() {
        fukkContainer.innerHTML = '';
    }

    function echo(str) {
        addLine(`> ${str}`);
    }

    function unknown() {
        addLine('Command not recognized.');
    }

    function help() {
        addLine("clear - clears the console\necho <text> - displays <text> to the console\nhelp - you just ran it :3");
    }

    userInput.addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            const command = userInput.value.trim();
            handleCommand(command);
        }
    });
});
