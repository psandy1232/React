import React from 'react';
import _ from 'lodash';

class Sample extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            addItemsArray: [{name: ''}]
        }
    }    

    addItems() {
        const addItemsArray=  _.concat(this.state.addItemsArray, [{name: ''}]);
        this.setState({addItemsArray});
    }
    setValue() {
        if(field == 'name'){
            const existingPost = this.state.addItemsArray[index];
            const updatedPost = update(existingPost, { name: {$set: evt.target.value}});
            let updatedPosts = update(this.state.addItemsArray, { [index]: {$set: updatedPost} });
            await this.setState({addItemsArray: updatedPosts});
      }
    }
    /* It is invoked to return html content */
    render() {
        return (
            <div>

                {this.state.addItemsArray.map((data, index) => {
                  return <div key={index}>
                  <div className="form-group">
                    <label>Menu name</label>
                    <input type="text" className="form-control" placeholder="Enter your menu name" value={data.name} onChange={this.setValue.bind(this, 'name', index)} name={index}/>
                  </div>
                  <button type="button" className="btn btn-info" onClick={this.addItems.bind(this)} />

                  </div>
                })}
            
        </div>

        );
    }
}
export default Sample;
