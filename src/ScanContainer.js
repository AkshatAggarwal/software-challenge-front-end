import React from 'react';
import ScanList from './ScanList';
import {createScanData, createUserData} from './data'
import AddScan from "./AddScan";
import  "./ScanContainer.css";
import {SELECT,SCANS,ASEC,DESC,AtoZ, ZtoA,SORTBYELEVATION, SORTBYNAME,SORTBYUSER} from './const';

class ScanContainer extends React.Component {
    constructor(props){
        super(props);
        this.state={
            scans: createScanData(),
            users: createUserData(),
            value : '1',
            data:'',
            name_value: '',
            user_name_value:'',
        }   
        this.sortElevation=this.sortElevation.bind(this); //do camel case
        this.addScanData=this.addScanData.bind(this);
        this.sortAlphabeticallyName=this.sortAlphabeticallyName.bind(this);
        this.sortAlphabeticallyUsername=this.sortAlphabeticallyUsername.bind(this);
        this.newData=this.newData.bind(this);
    }
    //comments what we are doing here 
    sortElevation(event){
        this.setState({value : event.target.value})
            this.setState({scans : this.state.scans.sort( function (a,b){
                return a.elevationMax - b.elevationMax;
            })
        })
    }
    sortAlphabeticallyName(event){
        if(event.target.value == 'a-z')
        {   
            var sort_name=this.state.scans.sort((a,b) => (a.name.toLowerCase() > b.name.toLowerCase()) ? 1 : ((b.name.toLowerCase() > a.name.toLowerCase()) ? -1 : 0)); 
            this.setState({scans: sort_name});
        }
        
        else if (event.target.value == 'z-a')
        {
            var sort_name=this.state.scans.sort((a,b) => (b.name.toLowerCase() > a.name.toLowerCase()) ? 1 : ((a.name.toLowerCase() > b.name.toLowerCase()) ? -1 : 0)); 
            this.setState({scans: sort_name});
        }
        else{
            return;
        }
        
    }
    sortAlphabeticallyUsername(event){

        //adding the key for username
        for(var i =0;i<this.state.scans.length;i++){
            for(var j=0;j<this.state.users.length;j++)
            {
                if(this.state.scans[i].scannedByUserId==this.state.users[j].id)
                {
                    this.state.scans[i].username = this.state.users[j].name;
                }
            }
        }
        //sort data
        if(event.target.value == 'a-z')
        {
            var sort_user_name=this.state.scans.sort((a,b) => (a.username > b.username) ? 1 : ((b.username > a.username) ? -1 : 0)); 
            this.setState({scans: sort_user_name});
        }
        else if (event.target.value == 'z-a'){
            var sort_user_name=this.state.scans.sort((a,b) => (b.username > a.username) ? 1 : ((a.username > b.username) ? -1 : 0)); 
            this.setState({scans: sort_user_name});
        }
        else{
            return;
        }
        //deleting the key
        for(var i =0;i<this.state.scans.length;i++)
        {
            delete this.state.scans[i].username;
        }
    }
    addScanData(datanew){
        var newscans=[...this.state.scans,...datanew]
        this.setState({scans: newscans})
    }
    newData(data){
        this.state.scans[data.index].name=data.name;
        this.state.scans[data.index].scannedByUserId=data.scannedByUserId;
        this.setState({scans:this.state.scans});
    }
    render() {
        return (
            <div>
                <div className="Header">
                    <h2>{SCANS}</h2>
                </div>
                <div className="sort-container">
                    <div className="sorting">
                    <label className="sort-labels">{SORTBYELEVATION}</label>
                    <select onChange={this.sortElevation}>
                        <option value="select">{SELECT}</option>
                        <option value="1">{ASEC}</option>
                        <option value="2">{DESC}</option>
                    </select>
                    </div>
                    <div className="sorting">
                    <span><label className="sort-labels">{SORTBYNAME}</label></span>
                    <span>
                        <select onChange={this.sortAlphabeticallyName}>   
                        <option value="select">{SELECT}</option>             
                        <option value="a-z">{AtoZ}</option>
                        <option value="z-a">{ZtoA}</option>
                    </select>
                    </span>
                    </div>
                    <div className="sorting">
                    <label className="sort-labels">{SORTBYUSER}</label>
                    <select onChange={this.sortAlphabeticallyUsername}>
                        <option value="select">{SELECT}</option>
                        <option value="a-z">{AtoZ}</option>
                        <option value="z-a">{ZtoA}</option>
                    </select>
                    </div>
                </div>
                <AddScan newDataadd= {this.addScanData} users={this.state.users}/>
                <ScanList
                    scans={this.state.scans}
                    users={this.state.users}
                    newDatainParent={this.newData}
                />
            </div>
        );
    }
}

export default ScanContainer;
