Router.configure({
	// LayoutTemplate
	layoutTemplate: 'walletLayout'
});

Router.route('/', function(){
	//set redirect assosiated with '/'
	this.redirect('/sendEther');
});

// Set mapping between URL and Route template.
//Router.route('/dashboard', {name: 'dashboard'});
Router.route('/sendEther', {name: 'sendEther'});
Router.route('/Transaction', {name: 'Transaction'});
Router.route('/search', {name: 'search'});
