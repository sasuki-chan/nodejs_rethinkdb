var websocket = io.connect("http://localhost:6969");
 
window.onload = function()
{
    websocket.on("sendEvent",enviardatos)
    
    function enviardatos(data)
    {
        var chat = document.getElementById('zchat');
        var span = document.createElement('span');
        var txt = document.createTextNode(data);
        span.appendChild(txt);
        if(chat.hasChildNodes())
            chat.insertBefore(span, chat.firstChild);
        else
            chat.appendChild(span);
    };
 
    var form = document.getElementById('zform');
    var message = document.getElementById('zmessage');
    form.onsubmit = function(e)
    {
        websocket.emit("newMessage", message.value);
        message.value = '';
        return false;
    };

    function onform(e)
    {
     window.alert("Se ha enviado el formulario");
    }
};