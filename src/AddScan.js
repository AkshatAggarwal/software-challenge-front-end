import React, {Component} from 'react';
import Modal from 'react-modal';
import './AddScan.css';
import {ADDSCAN, ADDSCANNAME, ADDELEVATIONMIN, ADDELEVATIONMAX, CLOSE, SAVE, USERNAME} from './const';

const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)'
    }
  };

class AddScan extends Component {
    constructor(props){
        super(props);
        this.state={
            scan_name:'',
            elevation_min:'',
            elevation_max: '',
            user_name: '',
            errScan:''
        }

        this.openModal = this.openModal.bind(this);
        this.afterOpenModal = this.afterOpenModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.addScan = this.addScan.bind(this);
        this.scanName = this.scanName.bind(this);
        this.elevationMin = this.elevationMin.bind(this);
        this.elevationMax = this.elevationMax.bind(this);
        this.userName = this.userName.bind(this);
    }

    openModal() {
        this.setState({modalIsOpen: true});
      }
     
      afterOpenModal() {
        this.subtitle.style.color = '#282c33';
        this.subtitle.style.marginBottom = '20px';
      }
     
      closeModal() {
        this.setState({errScan:""});
        this.setState({modalIsOpen: false});
      }
     

    scanName(event){
        this.setState({scan_name : event.target.value})
    }
    elevationMin(event){
        this.setState({elevation_min : event.target.value})
    }
    elevationMax(event){
        this.setState({elevation_max : event.target.value})
    }
    userName(event){
        this.setState({user_name : event.target.value})
    }
    addScan(){
        if(this.state.scan_name.trim().length<=0)
        {
            this.setState({errScan:"Enter a valid details"});
            return;
        }
        else{
            let newScan=[{
                name: this.state.scan_name,
                elevationMax:Number(this.state.elevation_max),
                elevationMin:Number(this.state.elevation_min),
                scannedByUserId:Number(this.state.user_name)
            }]
            this.props.newDataadd(newScan);
            this.setState({errScan:''});
            this.setState({modalIsOpen: false});
        }
    }
    render() {
        return (
            <div  className="add-scan">
                <button onClick={this.openModal} className="add-btn">{ADDSCAN}</button>
                <Modal
                isOpen={this.state.modalIsOpen}
                onAfterOpen={this.afterOpenModal}
                onRequestClose={this.closeModal}
                style={customStyles}
                contentLabel="Add Scan"
                >
     
                <h3 ref={subtitle => this.subtitle = subtitle}>{ADDSCAN}</h3>
                <form>
                    <label>{ADDSCANNAME}</label><input type="text" name="scan_name" value={this.state.scanData} onChange={this.scanName}/>
                    <label>{ADDELEVATIONMIN}</label><input type="number" name="elevation_min" value={this.state.elevation_min} onChange={this.elevationMin} />
                    <label>{ADDELEVATIONMAX}</label><input type="number" name="elevation_max" value={this.state.elevation_max} onChange={this.elevationMax} />
                    <label>{USERNAME}</label>
                    <select onChange={this.userName} >
                    {this.props.users.map((user) => <option key={user.id} value={user.id}>{user.name}</option>)}
                    </select>
                </form>
                <label className="error">{this.state.errScan}</label>
                <button onClick={this.addScan}>{SAVE}</button>
                <button onClick={this.closeModal}>{CLOSE}</button>
            </Modal>
            </div>
        );
    }
}

export default AddScan;
