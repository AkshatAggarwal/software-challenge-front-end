import React from 'react';
import './ScanList.css'
import EditScan from './EditScan';


class ScanList extends React.Component {
    constructor(props){
        super(props);
        this.getFromChildsave=this.getFromChildsave.bind(this);
    }

    getFromChildsave(data){
        this.props.newDatainParent(data);
    }

    render() {
        return (
            <div>
                <div className="ScanList">
                    {this.props.scans.map((scan, i) => {
                        const user = this.props.users.find(u => u.id === scan.scannedByUserId);
                        return (
                            <div
                                className="ScanListItem"
                                key={i}
                            >
                                <h3>{scan.name}</h3>
                                <div className="UserName">
                                    by {user.name}
                                </div>
                                <div> <EditScan scan={scan} ind={i} users={this.props.users} saveData={this.getFromChildsave}/></div>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }
}

export default ScanList;
