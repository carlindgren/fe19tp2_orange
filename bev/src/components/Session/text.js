import React from "react";


export default class Layout extends React.Component {
    constructor() {
        super();
        this.state = {

            text: "vänlig kontakta admin."
        };

    }
    render() {
        return (
            <div>
                <p>
                    {this.state.text}


                </p>
            </div>
        );
    }
}
