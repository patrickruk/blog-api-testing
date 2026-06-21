function login(password){
    if(password !== "myScret"){
        throw new Error("Wrong password");
        
    }
    return "login successful";
}
module.exports = login;