import { spawn } from 'child_process';
import { cwd, platform } from 'process';
import { join } from 'path';

enum HactoolBinaries {
    WINDOWS = '/assets/hactool/bin/hactool-win.exe',
    MAC = '/assets/hactool/bin/hactool-mac',
    LINUX = '/assets/hactool/bin/hactool-linux'
}

export class HactoolRunner {
    // TODO: Think about if we can pass the keyfile dynamically as File
    constructor(private readonly keyfile: string) {}

    private getHactoolBinaryForCurrentOS() {
        switch (platform) {
            case 'win32':
                return HactoolBinaries.WINDOWS;
            case 'darwin':
                return HactoolBinaries.MAC;
            case 'linux':
                return HactoolBinaries.LINUX;
            default:
                // TODO: Maybe add a UI error handling later?
                throw new Error('Unsupported operating system');
        }
    }

    public extractXCI(): void {
        console.log(`Current path is ${cwd()}`);
        const hactoolPath = join(cwd(), this.getHactoolBinaryForCurrentOS());
        console.log(`Derived hactool path is ${hactoolPath}`);

        const process = spawn(hactoolPath, ['-h']);
        process.stdout.on('data', data => {
            console.log(`stdout: ${data}`);
        });

        process.stderr.on('data', data => {
            console.log(`stderr: ${data}`);
        });

        process.on('close', code => {
            console.log(`Hactool exited with ${code}`);
        });
    }
}
