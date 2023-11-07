class ImoCache {
     constructor(api, key) {
          this.enabled = this.isLocalStorageAvailable()
          this.api = api
          this.cache = {}
          this.lastUpdate = -1
          this.key = 'imo_invest_state_' + key
     }

     hydrate() {
          if (!this.enabled) return
          const item = localStorage.getItem(this.key)

          if (item) {
               const json = JSON.parse(item)
               if ('content' in json && 'lastUpdate' in json) {
                    this.cache = json.content
                    this.lastUpdate = json.lastUpdate
               } else {
                    localStorage.removeItem(this.key)
               }
          }
     }

     save() {
          if (!this.enabled) return
          localStorage.setItem(this.key, JSON.stringify({ content: this.cache, lastUpdate: this.lastUpdate }))
     }

     get() {
          return new Promise((resolve, reject) => {
               if (!(Date.now() - this.lastUpdate > 5 * 60 * 1000)) {
                    resolve(this.cache || undefined)
                    return
               }

               this.api
                    .get()
                    .then((json) => {
                         this.cache = json
                         this.lastUpdate = Date.now()
                         this.save()
                         resolve(this.cache)
                    })
                    .catch((e) => {
                         reject(e)
                    })
          })
     }

     isLocalStorageAvailable() {
          var storage
          try {
               storage = window.localStorage
               var x = '__storage_test__'
               storage.setItem(x, x)
               storage.removeItem(x)
               return true
          } catch (e) {
               return (
                    e instanceof DOMException &&
                    // everything except Firefox
                    (e.code === 22 ||
                         // Firefox
                         e.code === 1014 ||
                         // test name field too, because code might not be present
                         // everything except Firefox
                         e.name === 'QuotaExceededError' ||
                         // Firefox
                         e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
                    // acknowledge QuotaExceededError only if there's something already stored
                    storage &&
                    storage.length !== 0
               )
          }
     }
}

export default ImoCache
