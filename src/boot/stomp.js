import { Client } from '@stomp/stompjs';
import { Dialog } from 'quasar';

class StompClient {
  constructor(brokerURL) {
    this.client = new Client({
      brokerURL: brokerURL,
      // onConnect: this.onConnect.bind(this),
      onStompError: this.onStompError.bind(this),
    });
    this.isConnected = false;
    this.subscriptions = {};
  }

  activate() {
    this.client.activate();
  }

  // onConnect() {
  //   this.isConnected = true;
  //
  //   console.log("Connected to broker");
  //   console.log(this.isConnected);
  // }

  connect() {
    return new Promise((resolve, reject) => {
      this.client.onConnect = () => {
        this.isConnected = true;
        console.log("Connected to broker");
        resolve();
      };

      this.client.onStompError = (frame) => {
        console.error(`Broker reported error: ${frame.headers['message']}`);
        console.error(`Additional details: ${frame.body}`);
        reject(frame);
      };

      this.client.activate();
    });
  }
  onStompError(frame) {
    console.error(`Broker reported error: ${frame.headers['message']}`);
  }

  sendMessage(destination, message, headers = {}) {
    console.warn('-----1----sendMessage----------------');
    console.log(this.isConnected);
    if (this.isConnected) {
      console.warn('-----2----sendMessage----------------');
      this.client.publish({ destination: destination, body: JSON.stringify(message), headers: headers });
      console.log(`Message sent to ${destination}:`, message);
      return true;
    }else {
      console.warn('Client is not connected.');
      //提示服务器连接中
      // Dialog.create({
      //   title: '服务器连接中',
      //   message: '请稍等...',
      //   ok: {
      //     label: '确定',
      //     color: 'primary'
      //   }
      // })
      return false;
    }
  }

  subscribe(destination, callback) {
    console.warn('-----1----subscribe----------------');
    console.log(this.isConnected);
    if (this.isConnected) {
      console.warn('----2-----subscribe----------------');
      if (this.subscriptions[destination]) {
        this.subscriptions[destination].unsubscribe();
      }
      this.subscriptions[destination] = this.client.subscribe(destination, message => {
        const parsedMessage = JSON.parse(message.body);
        callback(parsedMessage);
      });
      console.log(`Subscribed to ${destination}`);
    } else {
      console.warn('Client is not connected.');
    }
  }
}

export default StompClient;
