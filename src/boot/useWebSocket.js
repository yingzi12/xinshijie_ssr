import { ref, onMounted, onUnmounted } from 'vue';
import io from 'socket.io-client';

const useWebSocket = (url) => {
  const socket = io(url);
  const messages = ref([]);

  const sendMessage = (message) => {
    socket.emit('message', message);
  };

  const handleMessage = (message) => {
    messages.value.push(message);
  };

  onMounted(() => {
    socket.on('message', handleMessage);
  });

  onUnmounted(() => {
    socket.off('message', handleMessage);
    socket.disconnect();
  });

  return {
    messages,
    sendMessage
  };
};

export default useWebSocket;
