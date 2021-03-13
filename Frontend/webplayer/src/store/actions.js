import axios from 'axios'

const actions = {
    async fetchApiAction({ commit }) {
        axios.get('http://localhost:3000/api')
            .then(response => {
                commit('ALBUMS_MUTATION', response.data)
            })
    },
    // kolejne akcje, jeśli potrzebne

    // fetchCovers({commit}) {
    //     axios.post('http://localhost:3000/' , { coversRequest: true })
    //         .then(res => {
    //         console.log(res.data);
    //         commit('COVERS_MUTATIONS',res.data)
    //     })
    // }

        fetchCovers({commit}) {
            const requestOptions = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                },
                // body: JSON.stringify({coversRequest: true})
                body: { coversRequest: true }
            };
            fetch("http://localhost:3000/", requestOptions)
                .then(res => {
                    console.log(res.json())
                    commit('COVERS_MUTATIONS', res.data)
                })
                .catch(err => {
                    console.warn('STORE->ACTION Error: ', err);
                    return err;

                });
        }



}

export default actions
