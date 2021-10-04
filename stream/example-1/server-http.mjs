import http from 'http'
import { readFileSync, createReadStream } from 'fs'

// node -e "process.stdout.write(crypto.randomBytes(1e9))" > big.file
http.createServer((req, res) => {
  createReadStream('big.file').pipe(res)
}).listen(9020, () => console.log('Running at 9020'))
