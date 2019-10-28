import React, { useState, useEffect } from 'react'
function PictureLoader(props) {

    let [status, setStatus] = useState("loading");
    let [url, setUrl] = useState("");

    function loadingPicture(count) {

        console.log(count);

        if (count === 3) {
            setStatus("l")
            return false;
        }
        // fetch
        fetch("http://www.splashbase.co/api/v1/images/1").then((response) => {
            if (response.ok) {
                response.json().then((result) => {
                    setStatus("l")
                    setUrl(result.url)
                    return;
                });
            } else {
                loadingPicture(count + 1)
            }
        });
    }

    useEffect(() => {
        console.log(url);
        console.log("Call url");
        loadingPicture(0);
    }, [url]);
    // loadingPicture(0)


    return (
        <div>
            {status === "loading" ?
                < p > loading</p> : url ? <img src={url} /> : <p> Fail</p>
            }
        </div>
    )

}

export default PictureLoader;