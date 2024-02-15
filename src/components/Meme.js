import React from 'react';

export default function Meme() {
    const [meme, setMeme] = React.useState({
        topText: "",
        bottomText: "",
        randomImage: "https://i.imgflip.com/1bij.jpg"
    });
    const [memesData, setMemesData] = React.useState([]);

    React.useEffect(() => {
        fetch('https://api.imgflip.com/get_memes')
            .then(response => response.json())
            .then(data => {
                setMemesData(data.data.memes)
            })
            .catch(error => console.error('Error:', error));
    },[])

    function getMemeImage() {
        const x = Math.floor((Math.random() * memesData.length));
        const meme = memesData[x].url;
        setMeme(prevMeme => {
            return {
                ...prevMeme,
                randomImage: meme
            }
        })
    }

    function handleChange(event) {
        const { name, value } = event.target

        setMeme(prevState => {
            return {
                ...prevState,
                [name]: value
            }
        })
    }

    return (
        <main>
            <div className="form">
                <input type="text" className="form--input" name="topText" placeholder="Top text" onChange={handleChange} value={meme.topText} />
                <input type="text" className="form--input" name="bottomText" placeholder="Bottom text" onChange={handleChange} value={meme.bottomText} />
                <button onClick={getMemeImage} className="form--button">Get a new Image🖼️</button>
            </div>
            <div className="meme">
                <img className="meme--image" src={meme.randomImage} />
                <h2 className="meme--text top">{meme.topText}</h2>
                <h2 className="meme--text bottom">{meme.bottomText}</h2>
            </div>
        </main>
    )
}