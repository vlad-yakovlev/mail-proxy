import bunyan from 'bunyan';
import { ChildProcess, spawn } from 'child_process';
import through from 'through';

const isDevelopment: boolean = process.env.NODE_ENV === 'development';

function createPrettyStream(): NodeJS.WriteStream {
    const stream: NodeJS.WriteStream = through();

    const formatter: ChildProcess = spawn('npx', ['bunyan'], {
        stdio: [null, process.stdout, process.stderr],
    });
    stream.pipe(formatter.stdin);

    return stream;
}

const logger: bunyan = bunyan.createLogger({
    level: isDevelopment ? 'debug' : 'info',
    name: 'app',
    serializers: bunyan.stdSerializers,
    stream: process.stdout.isTTY ? createPrettyStream() : process.stdout,
});

export default logger;
