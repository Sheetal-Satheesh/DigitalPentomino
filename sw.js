
  //ON INSTALL 
  // -> cache all functionality
  self.addEventListener('install', function(event) {
    var indexPage = new Request('/');
    event.waitUntil(
      fetch(indexPage).then(function(response) {
        return caches.open('offline').then(function(cache) {
          return cache.put(indexPage, response);
        });
    }));
  });
  
  // ON REGISTER NEW SW 
  // -> update service worker after UI click
  let fetchNewData = false;
  self.addEventListener('message', function (event) {
      if (event.data.action === 'skipWaiting') {
        //flag to set new data into the cache
        fetchNewData = true;
        //activate new Service Worker 
        self.skipWaiting();
        //call fetch event
        //window.location.reload();
      }
    });
 
  // ON FETCH  
  // -> update cache with server data, or serve from cache if not possible
  self.addEventListener('fetch', function(event) {
    event.respondWith(
      caches.open('offline').then(function(cache) {

        //get new cache in case of new service worker
        if (fetchNewData){
          fetch(event.request).then(function(response) {
            cache.put(event.request, response.clone());
            console.log("Fetched new data from network.");
            fetchNewData = false;
            return response; 
          }); 
        }

        return cache.match(event.request).then(function (response) {
          console.log("Take existing data from cache.");
          return response || fetch(event.request).then(function(response) {
            cache.put(event.request, response.clone());
            console.log("Fetched new data from network.");
            return response; 
          });
        });
      })
    );
  });  
 
 




  