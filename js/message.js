var APP_ID = 'vyz8Uc9RFcw4QCOHeaVEOuSV-gzGzoHsz';
var APP_KEY = 'HzuKGRzvSkzKnEIFqfo5Ihbq';

AV.init({
  appId: APP_ID,
  appKey: APP_KEY
});

var query = new AV.Query('Message');
  query.find().then(function (messages) {
    // console.log(messages[0].attributes)
    // console.log(messages[1].attributes)
    // console.log(messages[2].attributes)
    let array = messages.map(item=>item.attributes)
    // console.log(array)
    array.forEach(item => {
        let li = document.createElement('li')
        li.innerText = item.name+':'+item.content
        messageList.append(li)
    });
  }, function (error) {
    // 异常处理
    alert('提交失败')
    console.log(error)
  });

let myForm = document.querySelector('#postMessageForm')

myForm.addEventListener('submit',function(e){
    e.preventDefault()
    let content = myForm.querySelector('input[name=content]').value
    let name = myForm.querySelector('input[name=name]').value
    var Message = AV.Object.extend('Message');
    var message = new Message();
    message.save({
        'name':name,
        'content': content
    }).then(function (object) {
        // console.log('存入成功')
        let li = document.createElement('li')
        li.innerText = object.attributes.name+':'+object.attributes.content
        messageList.append(li)
        myForm.querySelector('input[name=content]').value = ''
        console.log(object)
    })
})

// var TestObject = AV.Object.extend('TestObject');
// var testObject = new TestObject();
// testObject.save({
//   words: 'Hello World!'
// }).then(function(object) {
//     console.log('success')
// })