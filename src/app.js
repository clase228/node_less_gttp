const http = require('http')
const getUsers = require('./modules/users')

const server = http.createServer((req,res)=>{
   const [path, queryParams] = req.url.split('?');
   const params = new URLSearchParams(queryParams);
   const name = params.get('hello') || 'Unknown';
   if (req.url === '/users') {
      res.status =200
      res.statusMessage = 'OK'
      res.header = 'Content-Type: application/json'
      res.write(getUsers())
      res.end()
      return
   }else if (path === '/hello' && name) {
      res.statusMessage = 'OK'
      res.header = 'Content-Type: text/plain'
      if (name === 'Unknown') {
         res.write(`Enter a name`)
         res.status = 400
      }else{
         res.write(`Hello,${name}`)
         res.status = 200
      }
      res.end()
      return
   }else if (req.url === '/'){
      res.status =200
      res.statusMessage = 'OK'
      res.header = 'Content-Type: text/plain'
      res.write(`Hello, world!`)
      res.end()
      return
   }else{
      res.status =500
      res.header = 'Content-Type: text/plain'
      res.write('')
      res.end()
      return
   }
})
server.listen(3003,()=>{
   console.log('Сервер запущен');
})