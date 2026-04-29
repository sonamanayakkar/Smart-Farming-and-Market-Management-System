
export let apicall = () => {
    let url =''
    const host = window.location.hostname

    if (host == 'localhost') {
        // url=`http://localhost:4500/api/v1/agreesmart/`
         url=`https://smart-farming-backend-server.onrender.com/api/v1/agreesmart/`
    }
    else{
        url=`https://smart-farming-backend-server.onrender.com/api/v1/agreesmart/`
    }
    return url
}