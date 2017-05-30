import io from 'socket.io-client';
let socket = io.connect(`http://${window.location.hostname}:3000`);

export default socket