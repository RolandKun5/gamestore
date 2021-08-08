(function(){
    class PubSub{
        constructor(){
            this.topics = [];
        }
        hasHandler(topicName){
            return this.topics.hasOwnProperty(topicName);
        }
        subscribe(topicName,handler){
            if(this.hasHandler(topicName) === false){
                this.topics[topicName] = [];
            }
            this.topics[topicName].push(handler);
        }
        publish(topicName,data){
            if(!this.hasHandler(topicName)){
                console.log(`Hiba, a(z) ${topicName} nincs feliratkozva!`);
            }
            else{
                this.topics[topicName].forEach((handler)=>{
                    handler(data);
                })
            }
        }
    }

    window.PubSub = new PubSub();

})();