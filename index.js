var http = require('http')
var createHandler = require('github-webhook-handler')
var handler = createHandler({ path: '/push', secret: 'ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQC5jMsBE0I47mnrNVn/hD7x2Mx67FU/jpufe5vHeBZDgOlnYgKCWgigFhI674MwLU34LGjf2gul96ISLhta4OpH/66g/ziY0TKkRiIUu+reyofO2LtrkSFt7pculthmg8Alhc9/SHRRlILfHVPbDkIKf6LEu19cQLZBX3ES4SEro4ccCKgu7nbp1r4qgnRl3p7ueie0UehL5IA0/miVH+MApHopt5CzAysrdW7n+cYoBlep6P+v6jB4CqdxCm6W1yv4lM9rEzK3DyXDG7EgIAd8bG+x+BRoEZWUtUCiRJK2cDJYEYje6qmeHcUhK58jWpSiJKFc1gyxGs2PPamwRHfb 1447388624@qq.com' }) 
// 上面的 secret 保持和 GitHub 后台设置的一致
 
function run_cmd(cmd, args, callback) {
  var spawn = require('child_process').spawn;
  var child = spawn(cmd, args);
  var resp = "";
 
  child.stdout.on('data', function(buffer) { resp += buffer.toString(); });
  child.stdout.on('end', function() { callback (resp) });
}
 
http.createServer(function (req, res) {
  handler(req, res, function (err) {
    res.statusCode = 404
    res.end('no such location')
  })
}).listen(7777)
 
handler.on('error', function (err) {
  console.error('Error:', err.message)
})
 
handler.on('push', function (event) {
  console.log('Received a push event for %s to %s',
    event.payload.repository.name,
    event.payload.ref);
  run_cmd('sh', ['./deploy-dev.sh'], function(text){ console.log(text) });
})
 
/*
handler.on('issues', function (event) {
  console.log('Received an issue event for % action=%s: #%d %s',
    event.payload.repository.name,
    event.payload.action,
    event.payload.issue.number,
    event.payload.issue.title)
})
*/