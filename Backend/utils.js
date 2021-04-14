const utils = {

    getCurrentDate: function () {
        let today = new Date();
        const dd = String(today.getDate()).padStart(2, '0');
        const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        const yyyy = today.getFullYear();
        const hh = today.getHours();
        const min = today.getMinutes()
        const sec = today.getSeconds()

        today = mm + '_' + dd + '_' + yyyy + '-' + hh + '_' + min + '_'+ sec;
        return today
    },
    b: function () {
        console.log("b")
    }
}

module.exports = utils
