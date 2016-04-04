riot.tag2('restaurant-reg-form', '<input type="text" name="name"> <input type="submit" onclick="{addRestaurant}">', '', '', function(opts) {
        this.addRestaurant = function() {
            console.log("hi");
            console.log(this.name.value);
            var restaurantDetails = {
                name: this.name.value
            };
            var site = fermata.json("")(['restaurants']).post(restaurantDetails, function (err, resp) {
                console.log("done")

            })
        }.bind(this)
});