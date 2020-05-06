function e(e){return e&&"object"==typeof e&&"default"in e?e.default:e}var t=e(require("ra-realtime")),r=e(require("request-promise")),n=require("rxjs"),i=require("firebase/app");require("firebase/auth"),require("firebase/firestore");var a=require("react-admin");function s(e,t){u&&console.log(e,t)}var o,u=!1,c=function(e){this.resources={},this.app=i.apps.length?i.app():i.initializeApp(e),this.db=this.app.firestore()};function d(e,t){try{var r=e()}catch(e){return t(e)}return r&&r.then?r.then(void 0,t):r}function l(e,t){f&&console.log("FirebaseAuthProvider: "+e,t)}c.prototype.parseFireStoreDocument=function(e){var t=e.data();return Object.keys(t).forEach(function(e){var r=t[e];r&&r.toDate&&r.toDate instanceof Function&&(t[e]=r.toDate().toISOString())}),Object.assign({},{id:e.id},t)},c.prototype.initPath=function(e){try{var t=this;return new Promise(function(r){if(t.resources[e])return r();var n=t.db.collection(e),i=t.getCollectionObservable(n);i.subscribe(function(n){var i=n.docs.map(function(e){return t.parseFireStoreDocument(e)});t.setList(i,e),r()});var a={collection:n,list:[],observable:i,path:e};t.resources[e]=a,s("initPath",{path:e,r:a,"this.resources":t.resources})})}catch(e){return Promise.reject(e)}},c.prototype.getFirebaseSource=function(e){try{return new Promise(function(t,r){i.firestore().collection(e).get().then(function(e){e.empty&&t([]);var r=[];e.forEach(function(e){r.push(Object.assign({},{id:e.id},e.data()))}),t(r)}).catch(function(e){r()})})}catch(e){return Promise.reject(e)}},c.prototype.insertDataInFirebaseWithId=function(e,t){try{return new Promise(function(r,n){var a=t.data.myId.toLowerCase(),s=i.firestore().collection(e).doc(a);delete t.data.myId,s.set(Object.assign({},t.data,{createdate:i.firestore.FieldValue.serverTimestamp(),lastupdate:i.firestore.FieldValue.serverTimestamp(),createdByUid:i.auth().currentUser.uid,updatedByUid:i.auth().currentUser.uid,createdByEmail:i.auth().currentUser.email,updatedByEmail:i.auth().currentUser.email})).then(function(){r({id:a})}).catch(function(e){n()})})}catch(e){return Promise.reject(e)}},c.prototype.addDataInFirebase=function(e,t){try{return new Promise(function(r,n){i.firestore().collection(e).add(Object.assign({},t.data,{createdate:i.firestore.FieldValue.serverTimestamp(),lastupdate:i.firestore.FieldValue.serverTimestamp(),createdByUid:i.auth().currentUser.uid,updatedByUid:i.auth().currentUser.uid,createdByEmail:i.auth().currentUser.email,updatedByEmail:i.auth().currentUser.email})).then(function(e){r({id:e.id})}).catch(function(e){n()})})}catch(e){return Promise.reject(e)}},c.prototype.updateDataInFirebase=function(e,t,r){try{return new Promise(function(n,a){i.firestore().collection(e).doc(r).set(Object.assign({},t.data,{lastupdate:i.firestore.FieldValue.serverTimestamp(),updatedByUid:i.auth().currentUser.uid,updatedByEMail:i.auth().currentUser.email})).then(function(e){n({id:r})}).catch(function(e){a()})})}catch(e){return Promise.reject(e)}},c.prototype.apiGetList=function(e,t){try{var r=this;return Promise.resolve(r.tryGetResource(e)).then(function(n){function a(){var e=t.pagination||{},r=e.page;void 0===r&&(r=1);var n=e.perPage;void 0===n&&(n=-1);var i=(r-1)*n;return{data:t.pagination?l.slice(i,i+n):l,total:l.length}}var o=n.list,u=t.sort||{},c=u.field;void 0===c&&(c="id");var d=u.order;void 0===d&&(d="asc"),r.sortArray(o,c,"asc"==d.toString().toLowerCase()?"asc":"desc"),s("apiGetList",{resourceName:e,resource:n,params:t});var l=r.filterArray(o,t.filter||{}),f=function(){if(-1!==["analysisActionsUsers","analysisDataUsers","analysisProductionUsers","analysisSystemUsers","analysisTeamUsers"].indexOf(e)){var n=r.filterArray(o,t.filter||{}).filter(function(e){return e.createdByUid===i.auth().currentUser.uid&&!0===e.published});return Promise.resolve(r.getFirebaseSource(e.replace("Users",""))).then(function(e){var i=r.filterArray(e,t.filter||{}).filter(function(e){return!0===e.published}).filter(function(e){return n.filter(function(t){return t.questionId===e.id}).length<1}).map(function(e){return Object.assign({},e,{questionId:e.id})});l=n.concat(i)})}}();return f&&f.then?f.then(a):a()})}catch(e){return Promise.reject(e)}},c.prototype.apiGetOne=function(e,t){try{var r,n=this;function a(){if(r.length<1)throw new Error("react-admin-firebase: No id found matching: "+t.id);return{data:r.pop()}}var s=function(){if(-1!==["analysisActionsUsers","analysisDataUsers","analysisProductionUsers","analysisSystemUsers","analysisTeamUsers"].indexOf(e))return Promise.resolve(n.getFirebaseSource(e)).then(function(i){r=i.filter(function(e){return e.id===t.id});var a=function(){if(r.length<1)return Promise.resolve(n.getFirebaseSource(e.replace("Users",""))).then(function(e){r=(i=e).filter(function(e){return e.id===t.id}).map(function(e){return Object.assign({},e,{questionId:e.id})})})}();if(a&&a.then)return a.then(function(){})});var a=function(){if("users"===e&&!t.id)return Promise.resolve(n.tryGetResource(e)).then(function(e){r=e.list.filter(function(e){return e.id===i.auth().currentUser.uid})});var a="profile"===e?Promise.resolve(n.getFirebaseSource("users")).then(function(e){var n=e.filter(function(e){return e.id===i.auth().currentUser.uid});r=[],n.forEach(function(e){r.push(Object.assign({},e,{id:t.id}))})}):Promise.resolve(n.tryGetResource(e)).then(function(e){r=e.list.filter(function(e){return e.id===t.id})});return a&&a.then?a.then(function(){}):void 0}();return a&&a.then?a.then(function(){}):void 0}();return s&&s.then?s.then(a):a()}catch(e){return Promise.reject(e)}},c.prototype.apiCreate=function(e,t){try{var r=this;return Promise.resolve(r.tryGetResource(e)).then(function(n){return s("apiCreate",{resourceName:e,resource:n,params:t}),Promise.resolve(t.data.myId?r.insertDataInFirebaseWithId(e,t):n.collection.add(Object.assign({},t.data,{createdate:i.firestore.FieldValue.serverTimestamp(),lastupdate:i.firestore.FieldValue.serverTimestamp(),createdByUid:i.auth().currentUser.uid,updatedByUid:i.auth().currentUser.uid,createdByEmail:i.auth().currentUser.email,updatedByEmail:i.auth().currentUser.email}))).then(function(e){return{data:Object.assign({},t.data,{id:e.id})}})})}catch(e){return Promise.reject(e)}},c.prototype.apiUpdate=function(e,t){try{var n=this;function a(){s("apiUpdate",{resourceName:e,resource:o,params:t});var a=Object.assign({},t.data,{lastupdate:i.firestore.FieldValue.serverTimestamp(),updatedByUid:i.auth().currentUser.uid,updatedByEMail:i.auth().currentUser.email});if(-1!==["analysisActionsUsers","analysisDataUsers","analysisProductionUsers","analysisSystemUsers","analysisTeamUsers"].indexOf(e))return o.list.filter(function(e){return e.id===c}).length<1?(t.data.questionId=c,Promise.resolve(n.addDataInFirebase(e,t)).then(function(e){return Promise.resolve(r(u)).then(function(e){return{data:Object.assign({},t.data,{id:c})}})})):Promise.resolve(n.updateDataInFirebase(e,t,c)).then(function(e){return Promise.resolve(r(u)).then(function(e){return{data:Object.assign({},t.data,{id:c})}})});{function d(){return{data:Object.assign({},a,{id:c})}}var l=function(){if("profile"===e)return Promise.resolve(n.updateDataInFirebase("users",t,i.auth().currentUser.uid)).then(function(){});var s="users"===e?(u.body.id=c,Promise.resolve(r(u)).then(function(e){return Promise.resolve(o.collection.doc(c).update(a)).then(function(){})})):Promise.resolve(o.collection.doc(c).update(a)).then(function(){});return s&&s.then?s.then(function(){}):void 0}();return l&&l.then?l.then(d):d()}}var o,u={method:"POST",uri:"https://us-central1-bandwitt-techreach.cloudfunctions.net/widgets/calculateScoring",body:{source:e,id:i.auth().currentUser.uid},json:!0},c=t.id;delete t.data.id;var d="profile"===e?(o={},Promise.resolve(n.getFirebaseSource("users")).then(function(e){o.list=e})):Promise.resolve(n.tryGetResource(e)).then(function(e){o=e});return d&&d.then?d.then(a):a()}catch(e){return Promise.reject(e)}},c.prototype.apiUpdateMany=function(e,t){try{return delete t.data.id,Promise.resolve(this.tryGetResource(e)).then(function(r){s("apiUpdateMany",{resourceName:e,resource:r,params:t});for(var n=[],a=function(){var a=u[o];r.collection.doc(a).update(Object.assign({},t.data,{lastupdate:i.firestore.FieldValue.serverTimestamp(),updatedByUid:i.auth().currentUser.uid,updatedByEmail:i.auth().currentUser.email})),n.push(Object.assign({},t.data,{id:a})),-1!==["analysisActionsUsers","analysisDataUsers","analysisProductionUsers","analysisSystemUsers","analysisTeamUsers"].indexOf(e)&&(r.list.filter(function(e){return e.id===a}).length<1?i.firestore().collection(e).add(Object.assign({},t.data,{createdate:i.firestore.FieldValue.serverTimestamp(),createdByUid:i.auth().currentUser.uid,createdByEmail:i.auth().currentUser.email})):i.firestore().collection(e).doc(a).update(Object.assign({},t.data,{lastupdate:i.firestore.FieldValue.serverTimestamp(),updatedByUid:i.auth().currentUser.uid,updatedByEmail:i.auth().currentUser.email})))},o=0,u=t.ids;o<u.length;o+=1)a();return{data:n}})}catch(e){return Promise.reject(e)}},c.prototype.apiDelete=function(e,t){try{return Promise.resolve(this.tryGetResource(e)).then(function(r){return s("apiDelete",{resourceName:e,resource:r,params:t}),r.collection.doc(t.id).delete(),{data:t.previousData}})}catch(e){return Promise.reject(e)}},c.prototype.apiDeleteMany=function(e,t){try{var r=this;return Promise.resolve(r.tryGetResource(e)).then(function(n){s("apiDeleteMany",{resourceName:e,resource:n,params:t});for(var i=[],a=r.db.batch(),o=0,u=t.ids;o<u.length;o+=1){var c=u[o];a.delete(n.collection.doc(c)),i.push({id:c})}return a.commit(),{data:i}})}catch(e){return Promise.reject(e)}},c.prototype.apiGetMany=function(e,t){try{var r=this;function n(){return{data:i}}var i,a=new Set(t.ids),s=-1!==["analysisActionsUsers","analysisDataUsers","analysisProductionUsers","analysisSystemUsers","analysisTeamUsers"].indexOf(e)?Promise.resolve(r.getFirebaseSource(e)).then(function(t){i=t.filter(function(e){return a.has(e.id)});var n=function(){if(i.length<1)return Promise.resolve(r.getFirebaseSource(e.replace("Users",""))).then(function(e){i=e.filter(function(e){return a.has(e.id)})})}();if(n&&n.then)return n.then(function(){})}):Promise.resolve(r.tryGetResource(e)).then(function(e){i=e.list.filter(function(e){return a.has(e.id)})});return s&&s.then?s.then(n):n()}catch(e){return Promise.reject(e)}},c.prototype.apiGetManyReference=function(e,t){try{var r,n=this;function i(){if(null!=t.sort){var e=t.sort;n.sortArray(r,e.field,"ASC"===e.order?"asc":"desc")}var i=(t.pagination.page-1)*t.pagination.perPage;return{data:a.slice(i,i+t.pagination.perPage),total:a.length}}var a,s=t.target,o=t.id,u=-1!==["analysisActionsUsers","analysisDataUsers","analysisProductionUsers","analysisSystemUsers","analysisTeamUsers"].indexOf(e)?Promise.resolve(n.getFirebaseSource(e)).then(function(t){a=(r=t).filter(function(e){return e[s]===o});var i=function(){if(a.length<1)return Promise.resolve(n.getFirebaseSource(e.replace("Users",""))).then(function(e){a=(r=e).filter(function(e){return e[s]===o})})}();if(i&&i.then)return i.then(function(){})}):Promise.resolve(n.tryGetResource(e)).then(function(e){a=(r=e.list).filter(function(e){return e[s]===o})});return u&&u.then?u.then(i):i()}catch(e){return Promise.reject(e)}},c.prototype.GetResource=function(e){return this.tryGetResource(e)},c.prototype.sortArray=function(e,t,r){e.sort(function(e,n){var i=e[t]?e[t].toString().toLowerCase():"",a=n[t]?n[t].toString().toLowerCase():"";return i>a?"asc"===r?-1:1:i<a?"asc"===r?1:-1:0})},c.prototype.filterArray=function(e,t){if("{}"==JSON.stringify(t))return e;var r=Object.keys(t);return e.filter(function(e){return r.reduce(function(r,n){var i=t[n].toLowerCase(),a=e[n];if(null==a)return!1;var s=a.toLowerCase().includes(i);return r||s},!1)})},c.prototype.setList=function(e,t){try{return Promise.resolve(this.tryGetResource(t)).then(function(t){t.list=e})}catch(e){return Promise.reject(e)}},c.prototype.tryGetResource=function(e){var t=this.resources[e];if(!t)throw new Error('react-admin-firebase: Cant find resource: "'+e+'"');return t},c.prototype.getCollectionObservable=function(e){return n.Observable.create(function(t){return e.onSnapshot(t)})};var f=!1,h=function(e){l("Auth Client: initializing..."),this.app=i.apps.length?i.app():i.initializeApp(e),this.auth=i.auth(),this.db=this.app.firestore()};h.prototype.HandleAuthLogin=function(e){try{var t=this,r=e.username,n=e.password;return console.log("HandleAuthLogin......"),d(function(){return console.log("no hay token,signInWithEmailAndPassword"),Promise.resolve(t.auth.signInWithEmailAndPassword(r,n)).then(function(e){l("HandleAuthLogin: user sucessfully logged in",{user:e})})},function(){throw l("HandleAuthLogin: invalid credentials",{params:e}),new Error("Login error: invalid credentials")})}catch(e){return Promise.reject(e)}},h.prototype.HandleAuthLogout=function(e){try{return console.log("HandleAuthLogout"),Promise.resolve(this.auth.signOut()).then(function(){})}catch(e){return Promise.reject(e)}},h.prototype.HandleAuthError=function(e){},h.prototype.HandleAuthCheck=function(e){try{var t=this;return d(function(){return Promise.resolve(t.getUserLogin()).then(function(e){l("HandleAuthCheck: user is still logged in",{user:e}),console.log("HandleAuthCheck: user is still logged in",{user:e})})},function(e){return l("HandleAuthCheck: ",{e:e}),console.log("HandleAuthCheck: ",{e:e}),Promise.reject()})}catch(e){return Promise.reject(e)}},h.prototype.getUserLogin=function(){try{var e=this;return new Promise(function(t,r){e.auth.onAuthStateChanged(function(e){e?t(e):r("User not logged in")})})}catch(e){return Promise.reject(e)}},h.prototype.getPermissions=function(){try{var e=this;return new Promise(function(t,r){e.auth.onAuthStateChanged(function(e){e?i.firestore().collection("users").doc(e.uid||"").get().then(function(e){t(e.exists&&e.data().isAdmin?"admin":"user")}).catch(function(e){console.log("Error getting document",e),r()}):(console.log("no hay permisos......"),t("guest"))})})}catch(e){return Promise.reject(e)}},h.prototype.getUserPermissions=function(e){try{return new Promise(function(t,r){i.firestore().collection("users").doc(e).get().then(function(e){t(!!e.exists&&e.data().isAdmin)}).catch(function(e){console.log("Error getting document",e),r()})})}catch(e){return Promise.reject(e)}},exports.FirebaseRealTimeSaga=function(e,r){return t(function(e,t){return function(r,n,i){if((!t||!Array.isArray(t.watch)||t.watch.includes(n))&&!(t&&Array.isArray(t.dontwatch)&&t.dontwatch.includes(n)))return{subscribe:function(t){var a=o.GetResource(n).observable.subscribe(function(){e(r,n,i).then(function(e){return t.next(e)}).catch(function(e){return t.error(e)})});return{unsubscribe:function(){a.unsubscribe()}}}}}}(e,r))},exports.FirebaseDataProvider=function(e){if(!e)throw new Error("Please pass the Firebase config.json object to the FirebaseDataProvider");return u=e.debug,o=new c(e),function(e,t,r){try{return Promise.resolve(o.initPath(t)).then(function(){switch(e){case a.GET_MANY:return o.apiGetMany(t,r);case a.GET_MANY_REFERENCE:return o.apiGetManyReference(t,r);case a.GET_LIST:return o.apiGetList(t,r);case a.GET_ONE:return o.apiGetOne(t,r);case a.CREATE:return o.apiCreate(t,r);case a.UPDATE:return o.apiUpdate(t,r);case a.UPDATE_MANY:return o.apiUpdateMany(t,r);case a.DELETE:return o.apiDelete(t,r);case a.DELETE_MANY:return o.apiDeleteMany(t,r);default:return{}}})}catch(e){return Promise.reject(e)}}},exports.FirebaseAuthProvider=function(e){if(!e)throw new Error("Please pass the Firebase config.json object to the FirebaseAuthProvider");f=e.debug;var t=new h(e);return function(e,r){try{switch(l("Auth Event: ",{type:e,params:r}),e){case a.AUTH_LOGIN:return Promise.resolve(t.HandleAuthLogin(r)).then(function(){});case a.AUTH_LOGOUT:return Promise.resolve(t.HandleAuthLogout(r)).then(function(){});case a.AUTH_ERROR:return Promise.resolve(t.HandleAuthError(r)).then(function(){});case a.AUTH_CHECK:return Promise.resolve(t.HandleAuthCheck(r)).then(function(){});case a.AUTH_GET_PERMISSIONS:return Promise.resolve(t.getPermissions());default:throw new Error("Unhandled auth type:"+e)}}catch(e){return Promise.reject(e)}}};
//# sourceMappingURL=index.js.map
