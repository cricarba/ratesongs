var app = new Vue({
    el: '#app',
    data: {
      album :{},
      canciones :[],
      seleccion30: 10,
      top3O:[],   
       
      db : firebase.firestore()
    },
    created: function (){ 
      this.db.settings({ timestampsInSnapshots: true });
      this.ObtenerCanciones();
    },
    methods:{
      ActualizarCancion: function(id)
      {

        var cityRef = this.db.collection('Album').doc(id);

        var setWithMerge = cityRef.set({
                     Nombre: "Sex Magic"
                  }, { merge: true }).then(function() {
                    console.log("Document successfully UPDATED!");
                })
                .catch(function(error) {
                    console.error("Error writing document: ", error);
                });;
          },
      ObtenerAlbum : function(id){
         this.db.collection("Album").doc(id).get().then(function(snapshot){
          app.album = snapshot.data(); 
        });    
        this.db.collection("Canciones").where("album", "==", id).get().then(function(querySnapshot) {            
            querySnapshot.forEach(function(doc) {
              var objeto = {
                            Nombre : doc.data().Nombre,
                            Duracion : doc.data().Duracion,
                            Album : doc.data().album,
                            Id : doc.id
                           };      
              console.log("song", objeto);
              app.canciones.push(objeto);
            });
         });
        
      },
      ObtenerCanciones: function(){     
          this.db.collection("Canciones").get().then(function(querySnapshot) {            
            querySnapshot.forEach(function(doc) {
              console.log("song", doc.ref);
              var objeto = {
                Nombre : doc.data().Nombre,
                Duracion : doc.data().Duracion,
                Album : doc.data().album,
                Id : doc.id
               };      
  console.log("song", objeto);     
              app.canciones.push(objeto);
            });
         });
      },
      CalificarCancion: function(cancion){     
        if(app.seleccion30 === 0)
          return false;

        app.seleccion30--   
        app.top3O.push(cancion);
      },
      Next: function(){     
        app.canciones = app.top3O;
        app.seleccion30 =5;
        app.top3O = [];
      },
      CalificarCancion20: function(item){     
        if(app.seleccion20 === 0)
          return false;

        app.seleccion20--   
        app.top2O.push(cancion);
      },
      CrearCancion : function(song, top){
        localStorage.setItem(top, JSON.stringify(song));        
        
       app.db.collection("CancionesCalificadas").add({
            song: song.Id,
            top: top , 
            ialbum : firebase.firestore().doc('/Album/khOSXqYqmLg5ON4ROI')        
        }).then(function() {
          console.log("Document successfully INSERTED!");
      })
      .catch(function(error) {
          console.error("Error writing document: ", error);
      });
      
     
      }
  }
});

