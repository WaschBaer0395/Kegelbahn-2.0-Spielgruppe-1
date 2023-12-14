import mqtt from 'async-mqtt'

const client = mqtt.connect('mqtt://10.40.72.110:1883')

export function Client_Subscribe(){
    client.on("connect",() => {
        console.log("Verbunden!")
        client.subscribe("Kegelbahn/Kegel")
    })
}

export function Client_On_Message():JSX.Element{
    var scoredata = ""
    Client_Subscribe()
    client.on("message", (topic, message) =>{
        if (topic === "Kegelbahn/Kegel"){
            scoredata = JSON.parse(message.toString())
            console.log(scoredata)
        }
    })
    return <div>scoredata</div>

}