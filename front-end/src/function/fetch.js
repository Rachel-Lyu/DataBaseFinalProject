const baseURL = "api";

function makeURL(url, params = {}) {
    let newURL = new URL(url, window.location.origin);
    Object.keys(params).forEach(key => newURL.searchParams.append(key, params[key]));
    return newURL;
}


function handleRtn(rsp, callback) {
    if (rsp.code === 0) {
        callback(rsp.data);
    } else {
        alert(rsp.msg);
        if(rsp.code==2)
            localStorage.removeItem('log');
    }
}

let postFetch = (url, body, callback) => {
    let completeURL = baseURL + url;
    console.log(JSON.stringify(body));
    fetch(completeURL, {
        method: "POST",
        mode: "cors",
        cache:'default',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    }).then(rsp => rsp.json().then(rsp => {
        handleRtn(rsp, callback);
    }))
};

let deleteFetch = (url, body, callback) => {
    let completeURL = baseURL + url;
    fetch(completeURL, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
        credentials: 'include'
    }).then(rsp => rsp.then(rsp => {
        console.log(rsp)
    }))
};

let getFetch = (url, params, callback) => {
    let completeURL = makeURL(baseURL + url, params).href;
    console.log(completeURL)
    fetch(completeURL, {
        method: "GET",
        cache:'default',
        mode: "cors"
    }).then(rsp => rsp.json().then(rsp => {
        console.log(rsp)
        handleRtn(rsp, callback);
    }));
    // let completeURL = baseURL + url;
    // axios.get(completeURL, {
    //     params: params,
    //     headers: {
    //         'Authorization': "Bearer " + sessionStorage.getItem("token")
    //     }
    // }).then((rsp) => callback(rsp));
};

export {postFetch, deleteFetch, getFetch}