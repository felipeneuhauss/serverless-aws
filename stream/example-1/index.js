const stdin = process.stdin.on('data', ms => console.log('data is', ms.toString()))
stdin.pipe(process.stdout)
