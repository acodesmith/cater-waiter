/**
 * Store data in localStorage
 *
 * @param key
 * @param data
 */
export const storeLocal = (key, data) => {

    if( typeof window.localStorage === 'object' ) {

        window.localStorage.setItem( key, JSON.stringify( data ) )
    }else
        noLocalStorage()
}

/**
 * Get localStorage from browser
 *
 * @param key
 * @returns {null}
 */
export const retrieve = (key) => {

    let data = null

    if( typeof window.localStorage === 'object' ) {

        let data = window.localStorage.getItem( key )

        return JSON.parse( data ? data : "{}" )
    }

    if( ! data ) {

        noLocalStorage()
        return null
    }
}

/**
 * Retrieve localStorage data but remove certain keys.
 * Used to allow certain config information from the server
 * to override any locally stored information.
 *
 * @param key
 * @param ignored
 * @returns {*}
 */
export const retrieveWithout = (key, ignored = {}) => {

    let data = retrieve( key )

    if( data ) {
        
        //@todo make recursive for Nth depth
        Object.keys(ignored).forEach(key => {

            if( ignored[ key ] !== null
                && Object.keys( ignored[ key ] ).length ) {

                Object.keys( ignored[ key ] ).forEach(subKey => {

                    if( data[ key ] )
                        delete data[ key ][ subKey ];
                })

            }else{
                delete data[ key ];
            }
        })

        return data;

    } else {

        noLocalStorage()
        return null
    }

}



export const clear = (key) => {

    if( typeof window.localStorage === 'object' ) {

        window.localStorage.clear( key )
    }else
        noLocalStorage()
}

/**
 * Common error for no localStorage
 */
const noLocalStorage = () => {
    console.error( 'localStorage not supported by browser!' );
}

