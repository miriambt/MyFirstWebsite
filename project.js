var url = "https://jediweb-json-server.herokuapp.com/users"

var LogIn = async e => {
    e.preventDefault();
    if( !getFormData() ) return;
    
    var form = document.forms["loginForm"];
    var user_in = form["signin-email"].value;
    var pass_in = form["signin-password"].value;

    try {
        var result = await axios.get(url)
        var user = result.data.find( user => user.email === user_in &&  user.password === pass_in )
        if (user){
            window.location = "main.html"
        }
        else {
            alert("User not found.")
        }
    } 
    catch(error){
        console.log(error)
    }
};

var SignUp = async e => {
    e.preventDefault();
    if( !getFormData() ) return;
    
    var form = document.forms["loginForm"];
    var user_mail = form["signin-email"].value;
    var pass_in = form["signin-password"].value;
    var user_in = form["signin-username"].value;

    try {
        var result = await axios.get(url)
        var user = result.data.find( user => user.email === user_mail )
        var id = result.data.length+1
        if (!user) {
            var object = {"id": id , "username":user_in, "email":user_mail, "password":pass_in}
            var post = await axios.post(url,object)
            window.location = "log-in.html"
        }
        else{
            alert("There is already an account with this email")
        }
    } 
    catch(error){
        console.log(error)
    }
};


const getFormData = () => {

    var element = document.getElementById('form-alert');
    var wrapper = document.getElementById('parent-container');
    var form = document.forms["loginForm"];
    var fields = [...form.elements];

    const popAlert = () => {
        if(element) return false;
        /**var alert = document.createElement('section');
        alert.id = "form-alert";
        alert.className = "alert alert-danger text-center col-xs-8 col-md-8"
        alert.innerHTML = "All fields are required!";
        wrapper.insertBefore( alert, wrapper.firstChild);*/
        alert("All fields are required!")
        return false;
    };
    
    const cleanAlert = () => {
        if(!element) return;
        wrapper.removeChild(element);
    }

    var inputs = fields.splice(0, fields.length-1);
    if(inputs.find( e => e.value.trim() === '' && e.value !== null)) {
        return popAlert();
    } else cleanAlert();

    return true;
}