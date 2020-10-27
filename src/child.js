let index = 0;
function temp() {
    process.stdout.write("Message from stdout");
    process.stderr.write("Message from stderr");
    console.log("Message from console.log");
    if (index < 3) {
        index++;
        setTimeout(temp, 2000);
    }
}

console.log('PATH: ' + JSON.stringify(process.env.PATH))
console.log('Running from: ' + process.execPath);

//temp();