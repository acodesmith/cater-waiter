/**
 * Build a new history array based on the new view
 *
 * @param view
 * @param history
 */
export const jumpToView = (view, history) => {
    return history.slice( history.indexOf( view ), history.indexOf( view ) )
}