import React from 'react';
import './css/variables.css'
import './css/dialog.css'
import {ThrallMap} from "./components/ThrallMap";
import {Thrall} from "./model/Thrall";


interface MapData {
    "map_lq": string;
    "map_hq": string;
    minZoom: number;
    maxZoom: number;
    data: Thrall[];
    bounds: {
        south: number,
        west: number,
        north: number,
        east: number
    }
}

interface AppState {
    data: MapData;
    loaded: boolean;
}



export class App extends React.Component<any, AppState> {


    constructor(props: any) {
        super(props);
        this.state = {
            loaded: false,
            data: {
                data: [],
                map_hq: '',
                map_lq: '',
                minZoom: -12,
                maxZoom: -4,
                bounds: {
                    east: 0,
                    north: 0,
                    south: 0,
                    west: 0
                }
            }
        }
    }

    componentDidMount() {
        fetch(process.env.PUBLIC_URL + "/data.json")
            .then(value => value.json())
            .then(data => this.setState({data, loaded: true}))
    }

    render() {
        if (!this.state.loaded) {
            return <div>Map Loading...</div>
        }
        const bounds = this.state.data.bounds;
        return (
            <div>
                <ThrallMap data={this.state.data.data}
                           minZoom={this.state.data.minZoom}
                           maxZoom={this.state.data.maxZoom}
                           mapHq={this.state.data.map_hq}
                           mapLq={this.state.data.map_lq}
                           north={bounds.north}
                           west={bounds.west}
                           east={bounds.east}
                           south={bounds.south}
                />
            </div>
        );
    }
}

export default App;
