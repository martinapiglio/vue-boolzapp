const DateTime = luxon.DateTime;
let currentDate = DateTime.now().toFormat('dd/mm/yyyy HH:mm:ss')
const { createApp } = Vue

  createApp({
    data() {
      return {
        contacts: [
            {
                name: 'Michele',
                avatar: './img/avatar_1.jpg',
                visible: true,
                messages: [
                    {
                        date: '10/01/2020 15:30:55',
                        message: 'Hai portato a spasso il cane?',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 15:50:00',
                        message: 'Ricordati di stendere i panni',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 16:15:22',
                        message: 'Tutto fatto!',
                        status: 'received'
                    }
                ],
            },
            {
                name: 'Fabio',
                avatar: './img/avatar_2.jpg',
                visible: true,
                messages: [
                    {
                        date: '20/03/2020 16:30:00',
                        message: 'Ciao come stai?',
                        status: 'sent'
                    },
                    {
                        date: '20/03/2020 16:30:55',
                        message: 'Bene grazie! Stasera ci vediamo?',
                        status: 'received'
                    },
                    {
                        date: '20/03/2020 16:35:00',
                        message: 'Mi piacerebbe ma devo andare a fare la spesa.',
                        status: 'sent'
                    }
                ],
            },
            {
                name: 'Samuele',
                avatar: './img/avatar_3.jpg',
                visible: true,
                messages: [
                    {
                        date: '28/03/2020 10:10:40',
                        message: 'La Marianna va in campagna',
                        status: 'received'
                    },
                    {
                        date: '28/03/2020 10:20:10',
                        message: 'Sicuro di non aver sbagliato chat?',
                        status: 'sent'
                    },
                    {
                        date: '28/03/2020 16:15:22',
                        message: 'Ah scusa!',
                        status: 'received'
                    }
                ],
            },
            {
                name: 'Alessandro B.',
                avatar: './img/avatar_4.jpg',
                visible: true,
                messages: [
                    {
                        date: '10/01/2020 15:30:55',
                        message: 'Lo sai che ha aperto una nuova pizzeria?',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 15:50:00',
                        message: 'Si, ma preferirei andare al cinema',
                        status: 'received'
                    }
                ],
            },
            {
                name: 'Alessandro L.',
                avatar: './img/avatar_5.jpg',
                visible: true,
                messages: [
                    {
                        date: '10/01/2020 15:30:55',
                        message: 'Ricordati di chiamare la nonna',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 15:50:00',
                        message: 'Va bene, stasera la sento',
                        status: 'received'
                    }
                ],
            },
            {
                name: 'Claudia',
                avatar: './img/avatar_6.jpg',
                visible: true,
                messages: [
                    {
                        date: '10/01/2020 15:30:55',
                        message: 'Ciao Claudia, hai novità?',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 15:50:00',
                        message: 'Non ancora',
                        status: 'received'
                    },
                    {
                        date: '10/01/2020 15:51:00',
                        message: 'Nessuna nuova, buona nuova',
                        status: 'sent'
                    }
                ],
            },
            {
                name: 'Federico',
                avatar: './img/avatar_7.jpg',
                visible: true,
                messages: [
                    {
                        date: '10/01/2020 15:30:55',
                        message: 'Fai gli auguri a Martina che è il suo compleanno!',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 15:50:00',
                        message: 'Grazie per avermelo ricordato, le scrivo subito!',
                        status: 'received'
                    }
                ],
            },
            {
                name: 'Davide',
                avatar: './img/avatar_8.jpg',
                visible: true,
                messages: [
                    {
                        date: '10/01/2020 15:30:55',
                        message: 'Ciao, andiamo a mangiare la pizza stasera?',
                        status: 'received'
                    },
                    {
                        date: '10/01/2020 15:50:00',
                        message: 'No, l\'ho già mangiata ieri, ordiniamo sushi!',
                        status: 'sent'
                    },
                    {
                        date: '10/01/2020 15:51:00',
                        message: 'OK!!',
                        status: 'received'
                    }
                ],
            }
        ],
        activeChatIndex: 0,
        newMsg: '',
        searchText: '',
        randomMsgArray: ['Ok!' , 'Va bene!' , "Ci sarò senz'altro" , 'Mi dispiace, non posso...'],
        currentStatus: ''
      }
    },

    mounted() {
        this.setLastAccess();
    },

    methods: {

        changeActiveChat(chatIndex) {
            this.activeChatIndex = chatIndex;
        },

        changeDateFormat(dateString) {
            let formatDate = DateTime.fromFormat(dateString, 'dd/mm/yyyy HH:mm:ss').toFormat('HH:mm')
            return formatDate;
        },

        sendMessage() {
            let newMsgEl = {
                date: currentDate,
                message: this.newMsg,
                status: 'sent'
            };

            if (this.newMsg.trim() == '' || this.newMsg.trim() == null) {
                return false;
            } else {
                this.contacts[this.activeChatIndex].messages.push(newMsgEl);
                this.lastMsgScroll();
            };
            
            this.newMsg = '';

            this.receiveMessage();

        },

        receiveMessage() {
            let randomMsgArrayIndex =  Math.floor(Math.random() * (this.randomMsgArray.length)); 

            let newMsgRec = {
                date: currentDate,
                message: this.randomMsgArray[randomMsgArrayIndex],
                status: 'received'
            };

            let correctChatIndex = this.activeChatIndex;

            this.currentStatus = 'Ultimo accesso oggi alle ' + this.getLastAccess();

            setTimeout(() => {
                this.currentStatus = 'Online';
            }, 2000);

            setTimeout(() => {
                this.currentStatus = 'Sta scrivendo...'
            }, 6000);

            setTimeout(() => {
                this.contacts[correctChatIndex].messages.push(newMsgRec);
                this.lastMsgScroll();
            }, 10000);
            
              setTimeout(() => {
                this.currentStatus = 'Online';
            }, 10100);

            setTimeout(() => {
                this.currentStatus = 'Ultimo accesso oggi alle ' + this.getLastAccess();
            }, 15000);
            
        },

        searchName() {

            this.contacts.forEach((contact) => {

                let contactLower = contact.name.toLowerCase();
                let searcTextLower = this.searchText.toLowerCase();

                if(contactLower.includes(searcTextLower)) {
                    
                    contact.visible = true;

                } else {

                    contact.visible = false;
                    
                };

            });

        },        

        deleteMessage(msgIndex) {
            this.contacts[this.activeChatIndex].messages.splice(msgIndex, 1)
        },

        deleteAllMessages() {
            let chatMsgLength = this.contacts[this.activeChatIndex].messages.length - 1;
            this.contacts[this.activeChatIndex].messages.splice(0, chatMsgLength);
        },

        deleteChat() {
            this.contacts.splice(this.activeChatIndex, 1);
        },

        getLastAccess() {

            const receivedMsg = this.contacts[this.activeChatIndex].messages.filter((elemento) => {
                if (elemento.status == 'received') {
                    return true
                }
            });

            let lastAccessDate = this.changeDateFormat(receivedMsg[receivedMsg.length - 1].date);

            return lastAccessDate;

        },

        setLastAccess() {
            this.currentStatus = 'Ultimo accesso oggi alle ' + this.getLastAccess();
            return this.currentStatus;
        },

        lastMsgScroll() {

            Vue.nextTick(function() {
                let msgContainer = document.getElementById('right-section-msg');
                msgContainer.scrollTop = msgContainer.scrollHeight;
            });
        },

        addChat() {

            let newChatName = prompt('A chi vuoi scrivere? Inserisci nome e cognome');
                                    
            let newChat = {
                name: newChatName,
                avatar: 'https://picsum.photos/50',
                visible: true,
                messages: [{
                    date: currentDate,
                    message: '',
                    status: ''
                }]
            }
    
            this.contacts.push(newChat);
    
        }
    
    }
  }).mount('#app')







