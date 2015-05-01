Items = new Mongo.Collection("items");
Clubs = new Mongo.Collection("clubs");

//Code that runs on startup.
Meteor.startup(function () {
	console.log("Successful startup");
	console.log(Clubs.find().fetch());
	Meteor.publish("items", function() {
		return Items.find();
	});
	Meteor.publish("clubs", function() {
		return Clubs.find();
	});
});

Meteor.methods({

	insertSuggestion: function (name, email, subject, body, link, image) {
		if (!image) {
			image = "http://placekitten.com/g/300/200";
		}

		Items.insert({
			name: name,
			email: email,
			subject: subject,
			body: body,
			display: false,
			link: link,
			image: image,
		});

		return true;
	},

	insertClubSuggestion: function (name, email, subject, body, link, image) {
		if (!image) {
			image = "http://placekitten.com/g/300/200";
		}

		Clubs.insert({
			name: name,
			email: email,
			subject: subject,
			body: body,
			display: false,
			link: link,
			image: image,
		});

		return true;
	},
	
	getClubs: function () {
		var itemList = Clubs.find({}).fetch();
		console.log(itemList);
		return itemList;
	},

	getItems: function () {
		var itemList = Items.find({}).fetch();
		console.log(itemList);
		return itemList;
	},

	updateItem: function(id, subject, message, image, link, display) {
		if (!image) {
			image = "http://placekitten.com/g/300/200";
		}

		Items.update({_id: id}, {
			subject: subject, 
			body: message,
			image:image,
			link:link,
			display: display,
		});

		return true;
	}
});