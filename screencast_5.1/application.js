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

            <ul>
                <li v-for="message in messages">{{ message["visitor_name"] }} : {{ message["visitor_message"] }}</li>
            </ul>
        </div>
    `,

    data: function () {
        return {
        visitor_name: "",
        visitor_message: "",
        messages: []
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
            this.visitor_name = "";
            this.visitor_message = "";
            this.$emit("add-to-global-count")
        }
    },

    computed: {
        count: function () {
            return this.messages.length;
        }
    },

    // Comeback and uncomment the following within component after checking out the code in Vue app below.
    // Note that the following functions will be called once for each component  
    
    // beforeCreate: function () {
    //     console.log('Component beforeCreate called');
    // },
    // created: function () {
    //     console.log('Component created called');
    // },
    // beforeMount: function () {
    //     console.log('Component beforeMount called');
    // },
    // mounted: function () {
    //     console.log('Component mounted called');
    // },
    // beforeUpdate: function () {
    //     console.log('Component beforeUpdate called');
    // },
    // updated: function () {
    //     console.log('Component updated called');
    // }
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
    // Trying various lifecycle hooks in Vue.
    // Open the 'application.html' in brower and refresh everytime you add a new hook function
    // Check out when it gets called
    // Important: Do NOT use arrow function to define lifecycle hooks
    // Read more at: Options/Lifecycle Hooks on Vue 2 documentation site
    beforeCreate: function () {
        console.log('App beforeCreate called');
        console.log(this.global_count); // No access to data, therefore it will show 'undefined'
    },
    created: function () {
        console.log('App created called');
        console.log(this.global_count); // Has access to data, will show default value of 'global_count'  
    },
    beforeMount: function () {
        console.log('App beforeMount called');
        console.log(this.global_count);
    },
    mounted: function () {
        console.log('App mounted called');
        console.log(this.global_count);
    },
    beforeUpdate: function () {
        console.log('App beforeUpdate called');
        console.log(this.global_count);
    },
    updated: function () {
        console.log('App updated called');
        console.log(this.global_count);
    }
    // Can try others like beforeDestroy, destroyed

    // Now go up and uncomment the code in the 'component' section to see how 'app hooks' and 'component hooks' are called.
})