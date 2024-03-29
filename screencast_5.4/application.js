// Vue life cycle hooks
// beforeCreate, created, beforeMount, mounted, beforeUpdate, updated, beforeDestroy, destroyed

// Note that data is a function in vue component
Vue.component("message-board", {
    props: ['title'],
    template: `
       <div>
            <h4>{{ title }}</h4>
            <p>Your name: <input type="text" v-model="visitor_name"/></p>
            <p>Your message: <input type="text" v-model="visitor_message"/></p>
            <button v-on:click="sayHi">Say Hi!</button>
            <!-- Add upload cloud icon (using bootstrap icons) -->
            <i class="bi bi-cloud-arrow-up-fill" v-bind:class="savedIconClass"></i>

            <ul>
                <li v-for="message in messages">{{ message["visitor_name"] }} : {{ message["visitor_message"] }}</li>
            </ul>
        </div>
    `,

    data: function () {
        return {
        visitor_name: "",
        visitor_message: "",
        savedIconClass: "text-success",
        messages: [],
        }
    },

    methods: {
        sayHi: function () {
            this.messages.push(
                {
                    "visitor_name": this.visitor_name,
                    "visitor_message": this.visitor_message
                }
            );

            // Save to backend using API here (not implemented)
            // Just posting to 'https://httpbin.org/post' for testing purpose
            // Change the icon color to indicate that the message is being saved  
            this.savedIconClass = "text-warning";

                fetch('https://httpbin.org/post', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({"for": this.title, "visitor_name": this.visitor_name, "visitor_message": this.visitor_message})
                })
                .then(response => response.json())
                .then(data => {
                    console.log('Success:', data);
                    this.savedIconClass = "text-success";
                })
                .catch((error) => {
                    console.error('Error:', error);
                    this.savedIconClass = "text-danger";
                });
                
                this.visitor_name = "";
                this.visitor_message = "";
                this.$emit("add-to-global-count");
        }
    },

    computed: {
        count: function () {
            return this.messages.length;
        }
    },
    // mounted: function () {
    //     // Get the previous messages sent to Ganesh message-board
    //     // Just consider that the following is the response from the backend API  
    //     this.messages = [{"for": "ganesh", "visitor_name": "gp", "visitor_message": "Hello world!"}];
    // },
    mounted: async function () {
        // Just use a dummy backend API  
        r = await fetch('http://localhost:8000/messages.json');     // Use 'http://localhost:8000/application.html' in browser
        data = await r.json();
        this.messages = data;
    },
})


let app = new Vue({
    el: "#app",
    data: {
        global_count: 0
    },
    methods: {
        count_global: function () {
            this.global_count += 1;
        }
    },
})