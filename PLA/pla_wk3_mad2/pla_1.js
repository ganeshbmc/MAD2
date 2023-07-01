var app = new Vue({
    el: "#app",
    data: {
        message: "No replies so far",
        visitor_name: "",
        visitors: [],
        isActive: false
        // count: 0
    },
    methods: {
        sayHi: function() {
            this.visitors.push(this.visitor_name);
            this.visitor_name = "";
            this.message = this.count + " replies so far";
        },
        toggleTheme: function () {
            this.isActive = !this.isActive;
        }
    },
    computed: {
        count: function() {
            return this.visitors.length;
        }
    }
})