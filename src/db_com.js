import firebase from './firebase';

var get_user = (user_id) => {
    if(typeof user_id !== "string") {
        return null;
    }

    //get user from database and return
    return firebase.database().ref('/users/' + user_id).once('value').then(function(snapshot) {
        var name        = (snapshot.val() && snapshot.val().name)       || "";
        var major       = (snapshot.val() && snapshot.val().major)      || "";
        var email_list  = (snapshot.val() && snapshot.val().email_list) || false;
        var year        = (snapshot.val() && snapshot.val().year)      || 0;
        return {
            name,
            major,
            email_list,
            year
        }
    });
};

var add_user = (user_id, name, major, email_list, year, event_id) => {
    if(     (typeof user_id     !== "string") 
        &&  (typeof name        !== "string")
        &&  (typeof major       !== "string")
        &&  (typeof year        !== "string")
        &&  (typeof event_id    !== "number")
        &&  (typeof email_list  !== "boolean")) {

            console.log("error adding user")
            return false;    
    }

    firebase.database().ref('users/' + user_id).set({
        name: name,
        major: major,
        email_list: email_list,
        year: year,
    }); 

    firebase.database().ref('events/' + event_id + '/users').push().set({user_id : user_id});
    
    //add user
    return true;
}

var get_event_list = () => {
    //return list of {event_id, event_name}
    var itemVal;
    var keys=[];
    var events=[];

    return new Promise((resolve, reject) => {
        var ref = firebase.database().ref().child('/events/');
        ref.once('value', (snap) => {
            snap.forEach((item) => {
                itemVal = item.val();
                keys.push(itemVal);
            });
            for (var i=0; i < keys.length; i++) {
                events.push({
                    event_name: keys[i].event_name,
                    event_id: i,
                    semester_year: keys[i].semester_year
                });
            };
            resolve(events)
        });
    });
}

var add_event = (event_id, event_name, semester_year) => {
    if(typeof event_name !== "string" && typeof semester_year !== "string") {
        return false;
    }

    return new Promise((resolve, reject) => {
        firebase.database().ref('events/' + event_id).set({
            event_name: event_name,
            semester_year: semester_year,
            users : {0 : "dummy"}
        }).then(e => (
            resolve()
        ));
    });
}

var get_years = () => {
    var itemVal;
    var keys=[];
    var years=[];

    return new Promise((resolve, reject) => {
        var ref = firebase.database().ref().child('/years/');
        ref.once('value', (snap) => {
            snap.forEach((item) => {
                itemVal = item.val();
                keys.push(itemVal);
            });
            for (var i=0; i < keys.length; i++) {
                years.push({
                    year: keys[i],
                    year_id: i,
                });
            };
            resolve(years)
        });
    });
}

// getEvents() {
//     db_com.get_event_list()
//     .then(events => {
//         this.setState({
//             [c.event_list]: events
//         });
//     });
// }


export default {
    get_user,
    add_user,
    get_event_list,
    add_event,
    get_years
}