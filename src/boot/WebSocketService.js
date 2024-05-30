import io from 'socket.io-client';

const serverUrl = 'http://localhost:8099'; // 后端 WebSocket 服务器地址

class WebSocketService {
  constructor() {
    this.socket = io(serverUrl);
    this.socket.on('connect', () => {
      console.log('Connected to WebSocket server');
    });
  }

  sendMessage(message) {
    this.socket.emit('chat.sendMessage', message);
  }

  addUser(user) {
    this.socket.emit('chat.addUser', user);
  }

  onMessageReceived(callback) {
    this.socket.on('chat.sendMessage', (message) => {
      callback(message);
    });
  }

  onUserJoined(callback) {
    this.socket.on('chat.addUser', (user) => {
      callback(user);
    });
  }
}

export default WebSocketService;
