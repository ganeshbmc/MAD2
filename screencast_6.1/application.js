// Note that data is a function in vue component
const About = Vue.component("about", {
    template: `
        <div>
            <h4>About</h4>
            <p>This is the about page of our company.</p>
            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
            </p>
        </div>`
});

const PrivacyPolicy = Vue.component("privacy-policy", {
    template: `
        <div>
            <h4>Privacy Policy</h4>
            <p>This is the privacy policy of our company.</p>
            <p>What is Lorem Ipsum?
            It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
            </p>
        </div>`
});

const MessageBoard = Vue.component("message-board", {
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
        </div>`,

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
});


// Routes for the application defined here
const routes = [{
    path: '/',
    component: MessageBoard
}, {
    path: '/about',
    component: About
}, {
    path: '/privacy-policy',
    component: PrivacyPolicy
}];


// Create Vue Router instance
const router = new VueRouter({
    routes
});


let app = new Vue({
    el: "#app",
    router: router,
    data: {
        global_count: 0
    },
    methods: {
        count_global: function () {
            this.global_count += 1;
        }
    },
});






