const runCommand = async (cmd: string, cwd: string) => {
    const args = cmd.split(' ');
    const command = new Deno.Command(args[0], {
        args: args.slice(1),
        cwd, // Ustawiamy katalog roboczy
        stdout: 'piped',
        stderr: 'piped',
    });
    const child = command.spawn();

    // Pobieramy wynik z stdout
    const output = await child.stdout.pipeTo(
        new WritableStream({
            write(chunk) {
                console.log(`%c[${cwd}]`, new TextDecoder().decode(chunk));
            },
        }),
    );

    // Pobieramy wynik z stderr
    const errorOutput = await child.stderr.pipeTo(
        new WritableStream({
            write(chunk) {
                console.error(`[${cwd}]`, new TextDecoder().decode(chunk));
            },
        }),
    );

    return await child.status;
};

// Uruchamiamy oba polecenia równolegle
const [status1, status2] = await Promise.all([
    runCommand('deno task dev:server', './'),
    runCommand('deno task dev', './client'),
]);

console.log('Status 1:', status1.success ? 'Success' : 'Failed');
console.log('Status 2:', status2.success ? 'Success' : 'Failed');
