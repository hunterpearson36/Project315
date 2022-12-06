

import React from 'react'

export default class Translate extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            text: this.props.text || "",
            trans_text: null,
            source: this.props.source || "en",
            target: this.props.target || navigator.language || "en"
        };

        this.state.source = this.state.source.slice(0,2);
        this.state.target = this.state.target.slice(0,2);

        this.API_KEY = process.env.REACT_APP_TRANSLATE_KEY;
        this.URL = `https://translation.googleapis.com/language/translate/v2?key=${this.API_KEY}`;
        this.URL += "&q=" + this.state.text;
        this.URL += "&source=" + this.state.source;
        this.URL += "&target=" + this.state.target;
    }

    componentWillMount() {
        this.translate();
    }

    translate = () => {
        if (this.state.text !== "" && this.state.source !== this.state.target) {
            fetch(this.URL, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json"
                }
            }).then(res => res.json()).then((response) => {
                let text = response.data.translations[0].translatedText;
                this.setState({trans_text : text});
            }).catch((error) => {
                console.log("There was an error translating");
            });
        }
    }

    render() {
        return(
            <div class = "translate">
                {
                this.state.trans_text ? 
                    this.state.trans_text :
                    this.state.text
                }
            </div>
        );
    }

}