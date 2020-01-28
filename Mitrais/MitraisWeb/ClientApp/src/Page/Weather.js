import React, { Component } from 'react';

export class Weather extends Component {
    static displayName = Weather.name;

    constructor(props) {
        super(props);
        
        this.state = {            
            items: []
          };
        
        
    }

    componentDidMount() {
        fetch('/controller')
        .then(res => res.json())
        .then((data) => {
            console.log("Data: ", data);
            
            this.setState({
                items: data
            });
          
        })
        .catch(console.log);
    }

    

    render(){ 
        console.log("Wea: " , this.state);

        return (
                
                <div>
                    <center><h1>Contact List</h1></center>
                    {this.state.items.map((contact)=> (
                        <div class="card">
                            <div class="card-body">
                            <h5 class="card-title">{contact.summary}</h5>
                            <h6 class="card-subtitle mb-2 text-muted">{contact.temperatureC}</h6>
                            <p class="card-text">{contact.temperatureF}</p>
                            </div>
                        </div>
                        ))
                    }
                </div>
       );
          
    }
}