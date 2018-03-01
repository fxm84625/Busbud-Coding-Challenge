import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

class GameContainer extends React.Component {
    constructor( props ) { super( props ); }

    onInput( event, inputType ) {
        const charCode = event.which;
        if( charCode === 8 ) {
            if     ( inputType === 'city' ) this.props.onInputDel();
            else if( inputType === 'lat' )  this.props.onLatitudeDel();
            else if( inputType === 'long' ) this.props.onLongitudeDel();
            return;
        }
        const letter = String.fromCharCode( charCode );
        if     ( inputType === 'city' ) this.props.onInputAdd( letter );
        else if( inputType === 'lat' )  this.props.onLatitudeAdd( letter );
        else if( inputType === 'long' ) this.props.onLongitudeAdd( letter );
    }

    getCityDataElement() {
        return(
        <table className="datatable">
            <tr>
                <th>Name</th>
                <th>Latitude</th>
                <th>Longitude</th>
                <th>Score</th>
            </tr>
            {this.props.cityArr.map( cityObj => (
                <tr key={ cityObj.key }>
                    <td>{ cityObj.name }</td>
                    <td>{ cityObj.lat }</td>
                    <td>{ cityObj.long }</td>
                    <td>{ cityObj.score }</td>
                </tr>
            ))}
        </table>
        );
    }

    render() {
        return (
            <div>
                <input className="textbox" type="text" value={this.props.userInput}     placeholder="City Name" onKeyPress={ (e) => this.onInput(e, 'city') } /><br/>
                <input className="textbox" type="text" value={this.props.userLatitude}  placeholder="Latitude"  onKeyPress={ (e) => this.onInput(e, 'lat' ) } /><br/>
                <input className="textbox" type="text" value={this.props.userLongitude} placeholder="Longitude" onKeyPress={ (e) => this.onInput(e, 'long') } /><br/>
                <input className="submitbox" type="submit" value="Search" onClick={ () => this.props.onSearch() } /><br/>
                <br/>
                <div className="wordbox">
                    { this.getCityDataElement() }
                </div>
            </div>
        );
    }
}

GameContainer.propTypes = {
    cityArr: PropTypes.array,
    userInput: PropTypes.string,
    userLatitude: PropTypes.string,
    userLongitude: PropTypes.string,

    onInputAdd: PropTypes.func,
    onLatitudeAdd: PropTypes.func,
    onLongitudeAdd: PropTypes.func,

    onInputDel: PropTypes.func,
    onLatitudeDel: PropTypes.func,
    onLongitudeDel: PropTypes.func,

    onSearch: PropTypes.func,
};

const mapStateToProps = ( state ) => {
    return {
        cityArr: state.gameState.cityArr,
        userInput: state.gameState.userInput,
        userLatitude: state.gameState.userLatitude,
        userLongitude: state.gameState.userLongitude,
    };
};

const mapDispatchToProps = ( dispatch ) => {
    return {
        onInputAdd: ( letter ) => dispatch({ type: 'CHAR_ADDED',      letter: letter }),
        onLatitudeAdd: ( letter ) => dispatch({ type: 'LAT_CHAR_ADDED',  letter: letter }),
        onLongitudeAdd: ( letter ) => dispatch({ type: 'LONG_CHAR_ADDED', letter: letter }),

        onInputDel: () => dispatch({ type: 'CHAR_REMOVED'      }),
        onLatitudeDel: () => dispatch({ type: 'LAT_CHAR_REMOVED'  }),
        onLongitudeDel: () => dispatch({ type: 'LONG_CHAR_REMOVED' }),

        onSearch: () => dispatch({ type: 'SEARCH_CITIES' }),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(GameContainer);
