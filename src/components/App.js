import React, {useState} from 'react';
import GIF from "./SearchGif.js";

const App = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [gifContainer, setGifContainer] = useState(false);

    return (
        <div className={"ui container"}>
            <div className = {"ui segment"}>
                <form onSubmit = {(event) => event.preventDefault()} className = {"ui form"}>
                    <div className = {"field"}>
                        <h3>GIPHY Search</h3>
                        <input
                            type={"text"}
                            className = {"input"}
                            placeholder = {"Enter Text"}
                            onChange = {(event) => setSearchTerm(event.target.value)}
                            value = {searchTerm}
                        />
                    </div>
                    <button className = "ui right floated orange button">Post</button>
                    <button onClick={() => setGifContainer(true)} className={"ui red button"}>GIF</button>
                    {(gifContainer) ? <GIF /> : null}
                </form>
            </div>
        </div>
    );
};

export default App;