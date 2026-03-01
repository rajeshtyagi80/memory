const imageTemp = document.getElementById("image-template");
const container = document.getElementById("wrapperDiv");
const startBtn = document.getElementById("startBtn");
const scoreElem = document.querySelectorAll(".score");
const playerTurnElem = document.querySelector("#playerTurn");
const resultElem = document.querySelector("#result");
const finalScore = document.querySelector("#finalScore");
const firstPlayerElem = document.getElementById("player_1");
const secondPlayerElem = document.getElementById("player_2");

firstPlayerElem.value = localStorage.getItem("firstPlayer")
secondPlayerElem.value = localStorage.getItem("secondPlayer")

function pokemon() {

    let canClick = true;
    let count = 0;
    let arrayPhotos = [];
    let playerOneScore = 0;
    let playerTwoScore = 0;
    let totalScore = 0;
    let i;
    let uniquePokemon = 11;
    let startnumber = 51


    container.textContent = "";
    resultElem.parentElement.classList.add("hidden");
    scoreElem[0].textContent = 0;
    scoreElem[1].textContent = 0;
    playerTurnElem.parentElement.classList.remove("hidden");

    const firstPlayer = firstPlayerElem.value;
    const secondPlayer = secondPlayerElem.value;
    const playerOne = firstPlayer || "Player_1";
    const playerTwo = secondPlayer || "Player_2";

    playerTurnElem.textContent = `${playerOne}'s Turn`;

    localStorage.setItem("firstPlayer", firstPlayer);
    localStorage.setItem("secondPlayer", secondPlayer);



    function handleClick(e, image, pokeName) {
        if (e.target.tagName === "IMG" || e.target.tagName === "H4" || e.target.classList.contains("hiddenDiv")) {
        } else {
            count++
        }

        if (count === 2) {
            playerTurnElem.textContent = `${playerTwo}'s Turn`;
        }

        if (count === 4) {
            playerTurnElem.textContent = `${playerOne}'s Turn`;
            count = 0;
        }

        image.classList.remove("hidden");
        image.classList.add("visible");
        pokeName.classList.remove("hidden");
        pokeName.classList.add("visible");

        const visibleElems = document.querySelectorAll(".visible");

        if (visibleElems[3]) {

            if (visibleElems[1].textContent === visibleElems[3].textContent) {

                setTimeout(() => {

                    visibleElems[1].parentElement.classList.add("hiddenDiv");
                    visibleElems[3].parentElement.classList.add("hiddenDiv");

                    visibleElems.forEach(element => {
                        element.remove();
                    })


                    if (playerTurnElem.textContent === `${playerOne}'s Turn`) {
                        playerTwoScore++;
                        totalScore++;
                        scoreElem[1].textContent = playerTwoScore;
                    } else {
                        playerOneScore++;
                        totalScore++;
                        scoreElem[0].textContent = playerOneScore;
                    }


                    if (i === totalScore) {
                        container.textContent = "";
                        resultElem.textContent = playerOneScore > playerTwoScore ? `${playerOne} Won!` : playerOneScore < playerTwoScore ?
                            `${playerTwo} Won!` : "Game Draw!";
                        playerTurnElem.parentElement.classList.add("hidden");
                        resultElem.parentElement.classList.remove("hidden")
                        finalScore.textContent = `${playerOneScore}-${playerTwoScore}`;
                    }
                }, 300)


            } else {
                visibleElems.forEach(element => {
                    element.classList.remove("visible");
                    setTimeout(() => {
                        element.classList.add("hidden");
                    }, 400)
                })
            }
        }
    };


    (async function fetchPhotos() {

        for (i = startnumber; i <= uniquePokemon + startnumber - 1; i++) {
            for (let j = 1; j <= 2; j++) {

                let response;
                const clone = imageTemp.content.cloneNode(true);
                const card = clone.querySelector("div");
                const image = card.querySelector("img");
                const pokeName = card.querySelector("h4");
                let data;

                try {

                    response = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
                    data = await response.json();
                    pokeName.textContent = data.name.toUpperCase();
                    image.src = data.sprites.other["official-artwork"].front_default;
                } catch (error) {
                    console.error(error)
                    console.log("hello")
                    response = await fetch(`https://api.unsplash.com/photos/random?client_id=vLWPu4HPf9jVw6Mxk89Fv_7PYQfLqcYuJayi2CnFHDE`);
                    data = await response.json();


                    pokeName.textContent = data.user.first_name.toUpperCase();
                    image.src = data.urls.small;
                }

                card.addEventListener("click", (e) => {

                    if(!canClick) return;
                    canClick = false;
                    handleClick(e, image, pokeName)

                    setTimeout(() => {
                        canClick = true;
                    },400)

                })

                const cardClone = card.cloneNode(true);
                const image2 = cardClone.querySelector("img");
                const pokeName2 = cardClone.querySelector("h4");

                cardClone.addEventListener("click", (e) => {

                     if(!canClick) return;
                    canClick = false;
                    handleClick(e, image2, pokeName2)

                     setTimeout(() => {
                        canClick = true;
                    },400)
                })

                arrayPhotos.push(card);
                arrayPhotos.push(cardClone);

            }


        };
        arrayPhotos.sort(() => Math.random() - 0.5);

        arrayPhotos.forEach(elem => {
            container.appendChild(elem);

        })

        i = uniquePokemon * 2;
       
    })();
}


// {"id":"7j1-L_F1ihc","slug":"st-pauls-cathedral-viewed-between-modern-buildings-7j1-L_F1ihc","alternative_slugs":
//     {"en":"st-pauls-cathedral-viewed-between-modern-buildings-7j1-L_F1ihc","es":"catedral-de-san-pablo-vista-entre-edificios-modernos-7j1-L_F1ihc",
//         "ja":"現代の建物の間から見た聖パウロ大聖堂-7j1-L_F1ihc","fr":"cathedrale-saint-paul-vue-entre-des-batiments-modernes-7j1-L_F1ihc",
//         "it":"cattedrale-di-san-paolo-vista-tra-edifici-moderni-7j1-L_F1ihc","ko":"현대-건물-사이에서-본-성-바오로-대성당-7j1-L_F1ihc",
//         "de":"st-pauls-kathedrale-zwischen-modernen-gebauden-betrachtet-7j1-L_F1ihc","pt":"catedral-de-st-paul-vista-entre-edificios-modernos-7j1-L_F1ihc",
//         "id":"katedral-st-paul-dilihat-di-antara-bangunan-modern-7j1-L_F1ihc"},"created_at":"2026-01-21T18:02:40Z","updated_at":"2026-02-18T06:05:57Z",
//         "promoted_at":"2026-01-29T00:06:00Z","width":4096,"height":5943,"color":"#d9d9d9","blur_hash":"LjF~jeMx01oz_MRjIBj[R*j[t7WB",
//             "description":null,"alt_description":"St. paul's cathedral viewed between modern buildings","breadcrumbs":[],"urls":
//             {"raw":"https://images.unsplash.com/photo-1769018552719-3bf65711db7b?ixid=M3w4NzcwNTZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NzE0MTAxMzF8\u0026ixlib=rb-4.1.0",
//                 "full":"https://images.unsplash.com/photo-1769018552719-3bf65711db7b?crop=entropy\u0026cs=srgb\u0026fm=jpg\u0026ixid=M3w4NzcwNTZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NzE0MTAxMzF8\u0026ixlib=rb-4.1.0\u0026q=85",
//                 "regular":"https://images.unsplash.com/photo-1769018552719-3bf65711db7b?crop=entropy\u0026cs=tinysrgb\u0026fit=max\u0026fm=jpg\u0026ixid=M3w4NzcwNTZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NzE0MTAxMzF8\u0026ixlib=rb-4.1.0\u0026q=80\u0026w=1080",
//                 "small":"https://images.unsplash.com/photo-1769018552719-3bf65711db7b?crop=entropy\u0026cs=tinysrgb\u0026fit=max\u0026fm=jpg\u0026ixid=M3w4NzcwNTZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NzE0MTAxMzF8\u0026ixlib=rb-4.1.0\u0026q=80\u0026w=400",
//                 "thumb":"https://images.unsplash.com/photo-1769018552719-3bf65711db7b?crop=entropy\u0026cs=tinysrgb\u0026fit=max\u0026fm=jpg\u0026ixid=M3w4NzcwNTZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NzE0MTAxMzF8\u0026ixlib=rb-4.1.0\u0026q=80\u0026w=200",
//                 "small_s3":"https://s3.us-west-2.amazonaws.com/images.unsplash.com/small/photo-1769018552719-3bf65711db7b"},"links":{"self":"https://api.unsplash.com/photos/st-pauls-cathedral-viewed-between-modern-buildings-7j1-L_F1ihc",
//                     "html":"https://unsplash.com/photos/st-pauls-cathedral-viewed-between-modern-buildings-7j1-L_F1ihc","download":"https://unsplash.com/photos/7j1-L_F1ihc/download?ixid=M3w4NzcwNTZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NzE0MTAxMzF8",
//                     "download_location":"https://api.unsplash.com/photos/7j1-L_F1ihc/download?ixid=M3w4NzcwNTZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NzE0MTAxMzF8"},
//                     "likes":21,"liked_by_user":false,"bookmarked":false,"current_user_collections":[],"sponsorship":null,"topic_submissions":{},
//                     "asset_type":"photo","user":{"id":"5eI6LH5mnB8","updated_at":"2026-01-23T16:40:46Z",
//                         "username":"alexvarelo","name":"Alex varela","first_name":"Alex","last_name":"varela","twitter_username":"alexvarelo",
//                         "portfolio_url":null,"bio":"Welcome!\r\nInstagram: @alexvarelo.raw","location":null,"links":{"self":"https://api.unsplash.com/users/alexvarelo",
//                             "html":"https://unsplash.com/@alexvarelo","photos":"https://api.unsplash.com/users/alexvarelo/photos",
//                             "likes":"https://api.unsplash.com/users/alexvarelo/likes","portfolio":"https://api.unsplash.com/users/alexvarelo/portfolio"},
//                             "profile_image":{"small":"https://images.unsplash.com/profile-1767043887767-6c2c049d5874?ixlib=rb-4.1.0\u0026crop=faces\u0026fit=crop\u0026w=32\u0026h=32",
//                                 "medium":"https://images.unsplash.com/profile-1767043887767-6c2c049d5874?ixlib=rb-4.1.0\u0026crop=faces\u0026fit=crop\u0026w=64\u0026h=64",
//                                 "large":"https://images.unsplash.com/profile-1767043887767-6c2c049d5874?ixlib=rb-4.1.0\u0026crop=faces\u0026fit=crop\u0026w=128\u0026h=128"},
//                                 "instagram_username":"alexvarelo.raw","total_collections":15,"total_likes":1,"total_photos":256,"total_free_photos":256,"total_promoted_photos":17,
//                                 "total_illustrations":0,"total_free_illustrations":0,"total_promoted_illustrations":0,"accepted_tos":true,"for_hire":true,
//                                 "social":{"instagram_username":"alexvarelo.raw","portfolio_url":null,"twitter_username":"alexvarelo","paypal_email":null}}
//                                 ,"exif":{"make":"FUJIFILM","model":"X-S10","name":"FUJIFILM, X-S10","exposure_time":"1/2000","aperture":"3.6",
//                                     "focal_length":"31.5","iso":640},"location":{"name":null,"city":null,"country":null,"position":{"latitude":null,"longitude":null}},
//                                     "meta":{"index":true},"public_domain":false,"tags":[{"type":"search","title":"building"},{"type":"search","title":"architecture"},
//                                         {"type":"search","title":"london"},{"type":"search","title":"street"},{"type":"search","title":"europe"},{"type":"search",
//                                             "title":"cityscape"},{"type":"search","title":"tourism"},{"type":"search","title":"people walking"},{"type":"search",
//                                                 "title":"cathedral"},{"type":"search","title":"travel destination"},{"type":"search","title":"landmark"},
//                                                 {"type":"search","title":"dome"},{"type":"search","title":"st pauls cathedral"},{"type":"search",
//                                                     "title":"religious building"}],"views":314272,"downloads":2038,"topics":[]}
