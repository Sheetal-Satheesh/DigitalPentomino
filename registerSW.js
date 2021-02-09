//general functionality of service worker
if ("serviceWorker" in navigator){
    //Register the service worker
    navigator.serviceWorker.register("sw.js").then(registration => {

        console.log("1: Registration of SW.");

        //Check if new service worker is aquired
        registration.addEventListener('updatefound', ev => {
            
            //Save new service Worker from state registration.installing
            installingWorker = registration.installing;
            console.log("2: Installing Worker state: " + installingWorker.state);
            console.log(installingWorker.state);

            installingWorker.onstatechange = function (){
                switch (installingWorker.state) {
                
                    //Check if new service worker is installed
                    case 'installed':

                      console.log("3: Installing Worker state: " + installingWorker.state);
                      if (navigator.serviceWorker.controller) {
                        // new updated service Worker available
                        /*TBD: console.log("New updated service Worker available.");
                        let notification = document.getElementById('notification');
                        notification.className = 'show';
                        console.log("3: Show notification bar...");*/
                      }
                      // No update available
                      break;
                  }
            }

        });

        console.log("SW registered!");
        console.log(registration);
    }).catch(error => {
        console.log("SW Registration failed!");
        console.log(error);
    })

    //Refreshing
    let refreshing;
    navigator.serviceWorker.addEventListener('controllerchange', function () {
      if (refreshing) return;
      refreshing = true;
    });



} else {
    console.log("Nothing found.");
}
