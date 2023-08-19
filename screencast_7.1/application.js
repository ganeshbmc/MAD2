// Declare a Vuex store
const store = new Vuex.Store({
    state: {
        grand_total: 0
    },
    mutations: {
        increment_grand_total(state) {
            state.grand_total++;
        // Note that mutations are always synchronous!
        }
    },
    getters: {
        get_grand_total: function(state) {
            // return state.grand_total;
            // Format as decimal
            return state.grand_total.toLocaleString('en-IN', {
                minimumIntegerDigits: 3,
                useGrouping: false,
            });
        }
    },
    actions: {
        send_first_and_then_increment_grand_total(context) {
            // Note that actions can be asynchronous.
            // Also note that 'context' is used instead 'store' object and 
            // we use 'dispatch' instead of 'commit' when calling actions (see below in MessageBoard component)

            // STEPS
            // Fetch or ajax call (asychronous)

            // If successful, call commit
            context.commit('increment_grand_total');

            // If failed, don't call commit
        }
    }
});


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

                // Update 'grand_total' in Vuex store
                // store.state.grand_total++    // This will not the ideal way to update the state

                // Use Mutations instead of directly changing state
                // this.$store.commit('increment_grand_total');

                // Use Actions instead of mutations
                this.$store.dispatch('send_first_and_then_increment_grand_total');

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
    // data: {
    //     global_count: 0
    // },
    store: store,
    // methods: {
    //     count_global: function () {
    //         this.global_count += 1;
    //     }
    // },
    computed: {
        grand_total: function () {
            // return this.$store.state.grand_total;
            // return store.state.grand_total;

            // Access using getters
            return this.$store.getters.get_grand_total;
        }
    }
});






