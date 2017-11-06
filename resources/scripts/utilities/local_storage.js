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
export const retrieveWithout = (key, ignored = []) => {

    let data = retrieve( key )

    if( data ) {

        let finalData = {}

        Object.keys(data).forEach(dataKey => {
            if( ignored.indexOf( dataKey ) === -1 ) {
                finalData[ dataKey ] = data[ dataKey ]
            }
        })

        return finalData

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

