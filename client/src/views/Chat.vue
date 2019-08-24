<template>
	<div id="app">
		<div class="header">
			<h1>Chatroom</h1>
  
			<p class="username">Username: {{ username }}</p>
			<p class="online">Online: {{ users.length }}</p>
		</div>
    <div v-if="state">
      <div v-html="state"></div>
    </div>
		<ChatRoom v-bind:messages="messages" v-on:sendMessage="this.sendMessage" />
		<!-- [1] -->

	</div>
</template>

<script>

import Cookies from 'js-cookie';
import io from 'socket.io-client';
import ChatRoom from '@/components/ChatRoom';

export default {
  name: 'chat',
  components: {
    ChatRoom,
  },
  data() {
    console.log(this.$route.params.userId)
    return {
      username: this.$route.params.userId,
      socket: io('http://localhost:3000'),
      messages: [],
      users: [],
      state: ''
    };
  },
  methods: {
    joinServer() {
      this.socket.on('loggedIn', (data) => {
        this.messages = data.messages;
        this.users = data.users;
        this.socket.emit('newuser', this.username);
      });

      this.listen();
    },
    listen() {
      this.socket.on('userOnline', (user) => {
        this.users.push(user);
      });
      this.socket.on('userLeft', (user) => {
        this.users.splice(this.users.indexOf(user), 1);
      });
      this.socket.on('msg', (message) => {
        console.log(message)
        this.messages.push(message);
      });
      this.socket.on('sys', (message) => {
        console.log(message)
        this.state = message.msg
      });
    },
    sendMessage(message) {
      this.socket.emit('msg', message);
    },
  },
  mounted() {
    // Cookies.set('name', 'Mattèo', { expires: 7 })
  
    this.joinServer();
  },
};
</script>

<style lang="scss">
body {
	font-family: 'Avenir', Helvetica, Arial, sans-serif;
	color: #2C3E50;
	margin: 0;
	padding: 0;
}

#app {
	display: flex;
	flex-direction: column;
	height: 100vh;
	width: 100%;
	max-width: 768px;
	margin: 0 auto;
	padding: 15px;
	box-sizing: border-box;
}

</style>
