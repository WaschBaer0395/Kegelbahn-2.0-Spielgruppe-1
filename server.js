const express = require('express');
const mqtt = require('mqtt');


const app = express();

const client = mqtt.connect('mqtt://10.40.72.110:1883');
const topic = 'kegelbahn/bahn';
const message1 = 'Test';
const message2 = 'Neu';


//Aufbau MQTT-Verbindung
client.on('connect', () => {
    console.log('Connection established successfully!');

    client.subscribe(topic);
    console.log(client.connected);
    if(client.connected === true){
        client.publish("kegelbahn/player", "Hallo");
    }
});

function test(req, res, next){
    if(client.connected === true){
        client.publish(topic, message2);
    }
    next();
}

//Empfangen von Nachrichten
client.on('message', (top, msg) => {
    console.log(`message: ${msg}, topic: ${top}`);
})

app.set('view engine', 'ejs');
app.use(test);

app.get('/', (req, res) => {
    //Antwort des Servers
    console.log('Test');
    res.render('index');
})
app.listen(3000);
