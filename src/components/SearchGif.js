import React from "react";

class GIF extends React.Component {
    constructor() {
        super();

        this.state = {
            searchResults: null,
            searchTerm: '',
            gifReceived: false,
            singleImageSRC: null,
            closeGifContainer: false
        }
    }

    fetchDataFromAPI = async () => {
        const response = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=${process.env.REACT_APP_API_KEY}&q=${this.state.searchTerm}&limit=10`)
            .then((res) => {return res.json()})
            .then((res) => res.data.map((result) => {
                return result.images.fixed_height.url;
            }))
            .catch((error) => console.log(error))

        this.setState({
            searchResults: response,
            gifReceived: true
        });
    }

    gifSearchBar = () => {
        return (
            <div>
                <div>
                    {(this.state.closeGifContainer) ? null :
                        (<div>
                            <br />
                            <input
                                type={"text"}
                                placeholder={"Search GIFs"}
                                onChange={(event) => this.setState({searchTerm: event.target.value})}
                                value={this.state.searchTerm}
                                onInputCapture={this.fetchDataFromAPI}
                            />
                        </div>)
                    }
                </div>
            </div>
        )
    }

    allImagesContainer = () => {
        return (
            <div>
                {(!this.state.gifReceived) ? null :
                    (<div>
                        {this.state.searchResults.map((gif) => {
                            return (
                                <div>
                                    <br />
                                    <img
                                        src={gif}
                                        alt={"GIF"}
                                        className={"ui small images"}
                                        onClick= {(event) => {
                                            this.setState({
                                                singleImageSRC: event.target.currentSrc,
                                                gifReceived: false
                                            });
                                        }}
                                    />
                                </div>
                            );
                        })}
                    </div>)
                }
            </div>
        )
    }

    singleImageContainer = () => {
        return (
            <div>
                {(!this.state.singleImageSRC) ? null :
                    (<div className={"ui raised very padded text container segment"}>
                        <img
                            src={this.state.singleImageSRC}
                            alt={"SINGLE_GIF"}
                            className={"ui small images"}
                            onLoad={() => this.setState({closeGifContainer: true})}
                        />
                    </div>)
                }
            </div>
        )
    }

    render() {
        return (
            <div className={"ui text container"}>
                <div className = "ui form">
                    <div className = "field">
                        {this.gifSearchBar()}
                        {this.allImagesContainer()}
                        {this.singleImageContainer()}
                    </div>
                </div>
            </div>
        )
    }
}

export default GIF;