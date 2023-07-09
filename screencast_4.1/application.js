// Rudimentary JavaScript code to display a message in the browser
// let message = "Hello World";
// document.getElementById("app").innerHTML = message;

// Using Vue.js without component. This just displays single message board.
/*
var app = new Vue({
    el: "#app",
    data: {
        visitor_name: "",
        visitor_message: "",
        messages: []
    },
    methods: {
        sayHi: function() {
            this.messages.push(
                                {
                                    "visitor_name": this.visitor_name, 
                                    "visitor_message": this.visitor_message
                                }
                            );
            this.visitor_name = "";
            this.visitor_message = "";
        }
    },
    computed: {
        count: function() {
            return this.messages.length;
        }
    }
});
*/

// Using Vue component.
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
    }
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
    }
})