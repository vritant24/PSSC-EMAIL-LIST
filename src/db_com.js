var get_user = (user_email) => {
    if(typeof user_email !== "String") {
        return null;
    }

    //get user from database and return

    //return null if user doesn't exist
    return null;
};

var add_user = (user_email, user_name, major, email_list, event_id) => {
    if(     (typeof user_email  !== "String") 
        &&  (typeof user_name   !== "String")
        &&  (typeof major       !== "String")
        &&  (typeof email_list  !== "Boolean") 
        &&  (typeof event       !== "Number")) {
            return false;    
    }

    //add user
    return true;
}

var get_event_list = () => {
    //return list of {event_id, event_name}
    return [];
}

var add_event = (event_name, semester_year) => {
    if(typeof event_name !== "String" && typeof semester_year !== "String") {
        return null;
    }

    //return event_id
    return -1;
}