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
        randomMsgArray: ['Ok!' , 'Va bene!' , "Ci sarò senz'altro" , 'Mi dispiace, non posso...']
      }
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
            };
            
            this.newMsg = '';

            setTimeout(this.receiveMessage, 2000);
        },

        receiveMessage() {
            let randomMsgArrayIndex =  Math.floor(Math.random() * (this.randomMsgArray.length)); 

            let newMsgRec = {
                date: currentDate,
                message: this.randomMsgArray[randomMsgArrayIndex],
                status: 'received'
            };

            this.contacts[this.activeChatIndex].messages.push(newMsgRec);
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

        getLastAccess() {

            //TO BE MODIFIED!!!!

            let lastAccessDate = this.changeDateFormat(this.contacts[this.activeChatIndex].messages[this.contacts[this.activeChatIndex].messages.length - 1].date);
            let lastStatus = this.contacts[this.activeChatIndex].messages[this.contacts[this.activeChatIndex].messages.length - 1].status;

            if (lastStatus == 'received') {
                return lastAccessDate;
            } else {
                return '';
            }
            
        }

    }
  }).mount('#app')







