import React from 'react';
import Modal from 'react-modal';
import './EditScan.css';
import {EDIT, USERNAME, EDITNAME, EDITSCANDATA, CLOSE, SAVE} from './const';



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

class EditScan extends React.Component{

    constructor(){
        super();
        this.state = {
            modalIsOpen: false,
            scan_name:'',
            scan_user:''
          };
        this.Edit=this.Edit.bind(this); //why this if we are binding down also 
        this.afterOpenModal = this.afterOpenModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.saveName=this.saveName.bind(this);
        this.saveUser=this.saveUser.bind(this);
        this.Save=this.Save.bind(this);
    }
    Edit(editTraget,index){
        this.setState({modalIsOpen: true});
        this.setState({scan_name: editTraget.name});
        this.setState({scan_user: editTraget.scannedByUserId});
    }

    saveName(event){
        this.setState({scan_name: event.target.value});
    }
    saveUser(event){
        this.setState({scan_user:event.target.value});
    }
     
      afterOpenModal() {
            this.subtitle.style.color = '#282c33';
            this.subtitle.style.marginBottom = '20px';
      }
     
      closeModal() {
        this.setState({modalIsOpen: false});
      }

      Save(){
        var saveData={
            name:this.state.scan_name,
            scannedByUserId:Number(this.state.scan_user),
            index:this.props.ind
        }
        this.props.saveData(saveData);
        this.setState({modalIsOpen: false});

      }
    render(){
        return(
            <div key= {this.props.ind}>
            <button onClick={this.Edit.bind(null,this.props.scan,this.props.ind)}>{EDIT}</button>
            <Modal
              isOpen={this.state.modalIsOpen}
              onAfterOpen={this.afterOpenModal}
              onRequestClose={this.closeModal}
              style={customStyles}
              contentLabel="Edit Scan Data"
            >
     
              <h3 ref={subtitle => this.subtitle = subtitle}>{EDITSCANDATA}</h3>
              <form>
                <div className="edit-data-div"><label>{EDITNAME}</label><input type="text" name="scan_name" value={this.state.scan_name} onChange={this.saveName}/></div>
                <div className="edit-data-div"><label>{USERNAME}</label>
                <select className="edit-data-div" onChange={this.saveUser}>
                    {this.props.users.map((user) => <option key={user.id} value={user.id}>{user.name}</option>)}
                </select>
                </div>
              </form>
              <button onClick={this.Save}>{SAVE}</button>
              <button onClick={this.closeModal}>{CLOSE}</button>
            </Modal>
            </div>
        )   
    }

}

export default EditScan;

