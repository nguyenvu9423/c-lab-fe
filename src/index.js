import React from 'react';
import ReactDOM from 'react-dom';
import 'semantic-ui-css/semantic.min.css';
import { Button } from 'semantic-ui-react';
import { BrowserRouter, Route } from 'react-router-dom';


class Button1 extends React.Component{
    render()
    {
        return <Button>Button 1</Button>
    }
}

class Button2 extends React.Component{
    render()
    {
        return <Button>Button 2</Button>
    }
}

ReactDOM.render(
    <BrowserRouter>
        <div>
            <Route exact path="/" component={Button1}/>
            <Route path="/login" component={Button2} />
        </div>
    </BrowserRouter>,
    document.getElementById("root")
);