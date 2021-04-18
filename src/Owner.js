import React from 'react';
import axios from 'axios';
import style from './com/Owner.module.css'
import ModalWindow from './ModalWindow';
import { Input, InputNumber } from 'antd';
import 'antd/dist/antd.css'
import { PresetColorTypes } from 'antd/lib/_util/colors';
import ColumnGroup from 'antd/lib/table/ColumnGroup';
//const { TextArea } = Input;
export default class Owner extends React.Component {
  state = {
    name: '',
    error: null,
    isLoaded: false,
    dataq: [],
    modal: '',
    value: "",
    handleFocus: '',
    colorModal: { backgroundColor: "red" },
  }
  handleChange = event => {
    
    this.setState({ name: event.target.value });
  }
  handleChangeList = event => {
    
    this.setState({ value: event.target.value });
  }
  handleSubmit = event => {
    event.preventDefault();
    var user = {
      name: this.state.name,
      value: this.state.value
    };
    const TimeoutModal = () => { setTimeout(() => { this.setState({ modal: '' }) }, 2000); }
    if (user.value.length < 1 && user.name.length < 1) { this.setState({ modal: 'select status and insert text!' }); TimeoutModal() }
    if (user.value.length < 1 && user.name.length > 1) { this.setState({ modal: 'select status !' }); TimeoutModal() }
    if (user.value.length > 1 && user.name.length < 1) { this.setState({ modal: 'INSERT TEXT!' }); TimeoutModal() }
    if (user.value.length > 1 && user.name.length > 1 && user.value != user.name) {
      axios.post(`http://172.17.11.44:3004/w`, { user },   {
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
        })
        .then(res => {
          document.querySelector('textarea').value = ''
          this.state.name = ''
          
          this.setState({ modal: 'Data succefull added!', colorModal: { backgroundColor: 'green' } })
          this.state.colorModal = { backgroundColor: 'red' }
          TimeoutModal()
        })
    }
  }
  handleSubmitt = event => {
    event.preventDefault();
    axios.get(`http://172.17.11.44:3004/g`)
      .then(res => {
       
        this.setState({ dataq: res.data })
        
      })
  }
  
  render() {
    var w = this.state.dataq.map((r) => <h2 ><p>{r}</p></h2>)
    var colorModal = this.state.colorModal
    return (
      <div className={style.allform}>
        {/* //<TextArea rows={3}  /> */}
        <div className={style.modal}>
          <ModalWindow state={this.state} colorModal={colorModal} />
        </div>
          <textarea  className={style.taskname} value1={this.state.name}
            type="text" name="name" onChange={this.handleChange} cols="30" rows="10"></textarea>
        <button className={style.button} onClick={this.handleSubmit}><h2>send task</h2></button>
          <select className={style.status} value={this.state.value} onChange={this.handleChangeList}  >
            <option value="">select status</option>
            <option value='resolved'>resolved</option>
            <option value='not resolved'>not resolved</option>
          </select>
          <button className={style.button2} onClick={this.handleSubmitt} ><h2>see all tasks</h2></button>
        <div className={style.dbdata1} >{w}</div>
      </div>
    )
  }
}
