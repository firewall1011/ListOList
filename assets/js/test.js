//User Controller Handles
const handle_create_user = document.getElementById("create_user");
const handle_find_user = document.getElementById("find_user");
const handle_update_user = document.getElementById("update_user");
const handle_remove_user = document.getElementById("remove_user");

//List Controller Handles
const handle_create_list = document.getElementById("create_list");
const handle_find_root = document.getElementById("find_root");
const handle_rename_list = document.getElementById("rename_list");
const handle_check_list = document.getElementById("check_list");
const handle_remove_list = document.getElementById("remove_list");

/**
 * Creates user, adds root, friends and thrash
 */
handle_create_user.onsubmit = (event) => {
    event.preventDefault();
    //Create User
    axios.
    post('/create_user', {name: event.target[0].value})
    .then(res => {
        let owner_name = res.data.name;
        //Create root
        axios
        .post('/create_list', {owner: owner_name, parent: -1, name: 'root'})
        .then(res => {
            console.log(res.data);
            //Create Friends
            axios.post('/create_list', {owner: owner_name, parent: res.data.id, name: 'amigos'})
            .then(res => {console.log(res.data)})
            .catch(err => {console.log('error: ' + err)});
            
            //Create Thrash
            axios.post('/create_list', {owner: owner_name, parent: res.data.id, name: 'lixeira'})
            .then(res => {console.log(res.data)})
            .catch(err => {console.log('error: ' + err)});
        })
        .catch(err => {console.log('error: ' + err)});
    })
    .catch(err => {console.log(err)}); 
    
};

handle_find_user.onsubmit = (event) => {
    event.preventDefault();
    axios.
    get('/find_user?name='+event.target[0].value)
    .then(res => {
        console.log(res);
    })
    .catch(err => {console.log(err)});
};

handle_update_user.onsubmit = (event) => {
    event.preventDefault();
    axios.
    post('/update_user', {name: event.target[0].value, theme: event.target[1].value})
    .then(res => {
        console.log(res);
    })
    .catch(err => {console.log(err)});
};

handle_remove_user.onsubmit = (event) => {
    event.preventDefault();
    axios.
    post('/remove_user', {name: event.target[0].value})
    .then(res => {
        console.log(res.data);
    })
    .catch(err => {console.log(err)});
};

/*====================================ListHandler========================================*/
handle_find_root.onsubmit = (event) => {
    event.preventDefault();
    axios.
    get('/find_root?owner='+event.target[0].value)
    .then(res => {
        console.log(res);
    })
    .catch(err => {console.log(err)});
};

handle_rename_list.onsubmit = (event) => {
    event.preventDefault();
    console.log(event.target);
    axios.
    post('/rename_list', {id: event.target[0].value, name: event.target[1].value})
    .then(res => {
        console.log(res.data);
    })
    .catch(err => {console.log(err)});
};

handle_check_list.onsubmit = (event) => {
    event.preventDefault();
    let check = (event.target[1].value == 'true') ? true : false;
    axios.
    post('/check_list', {id: event.target[0].value, checked: check})
    .then(res => {
        console.log(res.data);
    })
    .catch(err => {console.log(err)});
};

handle_create_list.onsubmit = (event) => {
    event.preventDefault();
    axios.
    post('/create_list', {owner: event.target[0].value, parent: event.target[1].value, name: event.target[2].value})
    .then(res => {
        console.log(res.data);
    })
    .catch(err => {console.log(err)});
};

handle_remove_list.onsubmit = (event) => {
    event.preventDefault();
    axios.
    post('/remove_list', {id: event.target[0].value})
    .then(res => {
        console.log(res.data);
    })
    .catch(err => {console.log(err)});
};