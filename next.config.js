module.exports = {
    exportPathMap: function(defaultPathMap) {
        return {
            '/': {
                page: '/',
                query: {
                    lng: 'sk'
                }
            },
            '/en': {
                page: '/',
                query: {
                    lng: 'en'
                }
            }
        }
    }
}
