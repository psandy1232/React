/* Importing the node modules, child components, services and controllers used 
   inside IntranetHome component */
import React from 'react';
import { Component } from 'react';
import $ from "jquery";
import { Link } from 'react-router-dom';
import axios from 'axios';
import update from 'react-addons-update';
import Servicecalls from './Servicecalls';


var httpRequest = new Servicecalls();
/* IntranetHome Component initialization */
class RegForm extends Component {
    /* Initializing objects of its IntranetHome class */
    constructor(props) {
        super(props)
        this.state = {
            email:'',
            password:'',
            cpassword:'',
            firstname:'',
            lastname:'',
            gender:'',
            phone:'',
            city:'',
            hobbies: [
                { value: 'Reading Books' },
                { value: 'Playing Cricket' },
                { value: 'Watching TV' }
            ],
            about:'',
            errors : {

            },
            arrHobbies: [
                { value: '' },
                { value: '' },
                { value: '' }
            ],
            status : '',
            userInfo : '',
            showhide:-1,
            uemail:'',
            ufirstname:'',
            ulastname:'',
            uphone:'',
            ucity:''
            
        }        
    }   

    componentDidMount() {
        //console.log("testt");
        $("#email").focus();
        
        let _this = this;
        axios.get('http://localhost/practise/get.php')
        .then(function (response) {
            _this.setState({
                userInfo: response.data
            });
        })
        .catch(function (error) {
            console.log(error);
        }); 

        $("#menuIcon").click(function(){
            $(".toggleTable").slideToggle();            
        });

        $(document).ready(function(){
            $(".toggleTable").hide();
        });

    }
    



    setValue(field, e) {
        //console.log(field,"Field",e,"Event");
        
        var object = {};
        object[field] = e.target.value;
        this.setState(object);
    }
    sendValues(){
        var err =[];
        if(this.state.email == ""){
            err['email']= "Email cannot be empty";
        }else if(this.state.email != ""){
            var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
            if (reg.test(this.state.email) == false) {
                err['email']= "Invalid Email address format";                
            }
        }

        if(this.state.password == ""){
            err['password'] = "Password cannot be empty";
        }else if(this.state.password != ""){
            if(this.state.password.length < 6){
                err['password'] = "Password should be atleast 6 characters";
            }
        }

        if(this.state.cpassword == ""){
            err['cpassword'] = "Please confirm password";
        }else if(this.state.cpassword != ""){
            if(this.state.cpassword.length < 6){
                err['cpassword'] = "Password should be atleast 6 characters";
            }
        }

        if(this.state.password != this.state.cpassword){
            err['cpassword'] = "Password and Confirm password should be same";
        }
        if(this.state.firstname == ""){
            err['firstname'] = "Please enter firstname";
        }  
        if(this.state.lastname == ""){
            err['lastname'] = "Please enter lastname";
        }
        if(this.state.gender == ""){
            err['gender'] = "Please select gender";
        }
        if(this.state.phone == ""){
            err['phone'] = "Please enter phonenumber";
        } else if(this.state.phone != ""){
            if(this.state.phone.length != 10){
                err['phone'] = "Phone number should be 10 digit number";
            }
        } 
        if(this.state.city == ""){
            err['city'] = "Please enter city";
        }
        var errNum = 0;
        for(let i=0;i<this.state.arrHobbies.length; i++){
            if(this.state.arrHobbies[i].value != ''){
                errNum++;
            }
        }
        if(errNum == 0){
            err['hobbies'] = "Please select atleast one hobbie.";
        }
        
        if(this.state.about == ""){
            err['about'] = "Please enter about";
        } 
        
        
        if(Object.keys(err).length > 0){
            this.setState({errors:err}); 
        }else{
           const data ={
                "email":this.state.email,
                "password":this.state.password,
                "first_name":this.state.firstname,
                "last_name":this.state.lastname,
                "gender":this.state.gender,
                "phone":this.state.phone,
                "city":this.state.city,
                "hobbies":this.state.arrHobbies,
                "about":this.state.about
            }
            const userInfo = _.concat(this.state.userInfo, data);
            this.setState({ userInfo });
            //data = JSON.stringify(data);

            const response =  httpRequest.requestPostWithURLEncoded("http://localhost/practise/index.php", data, {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",                
                }
            });

            // this.setState({email:'',phone:'',password:'',firstname:'',lastname:'',gender:'',city:'',hobbies:'',about:''});
            // $(".toggleTable").show();


            //console.log(response,"ResponseData");
            //this.setState({status : response});
            

        }
    }

    editTableRow(i){
        this.setState({showhide:i});
        //console.log("UserInfo", this.state.userInfo);
        this.setState({uemail:this.state.userInfo[i].email, ufirstname:this.state.userInfo[i].first_name, ulastname:this.state.userInfo[i].last_name, uphone:this.state.userInfo[i].phone, ucity:this.state.userInfo[i].city} );
        //this.setState({uemail:this.state.userInfo[i].email, ufirstname:this.state.userInfo[i].first_name});
       
    }
    cancelTableRow(){
        this.setState({showhide:-1});
    }

    async deleteTableRow(i) {
        //console.log(this.state.userInfo);
        
         var email = this.state.userInfo[i].email;
         var deleteRow = {'email':email};
         const response =  await httpRequest.requestPostWithURLEncoded("http://localhost/practise/delete.php", deleteRow, {
             headers: {
                 "Content-Type": "application/x-www-form-urlencoded",                
             }
         });
        // console.log(response, 'testing');   
         if(response.status == 'Success'){
            await delete this.state.userInfo[i];
            let remainData = this.state.userInfo;
            this.setState({ userInfo: remainData });

            this.setState({status:'Data has deleted successfully'});
            $(".errorTextBox").fadeIn("slow");
            setTimeout(function(){ $(".errorTextBox").fadeOut("slow"); }, 3000);
         }else{
            this.setState({status:'Unable to delete, please try again.'});
            $(".errorTextBox").fadeIn("slow");
            setTimeout(function(){ $(".errorTextBox").fadeOut("slow"); }, 3000);
         }        
    }

    async saveTableRow(i,updateEmail){
        var err =[];
        if(this.state.uemail == ""){
            err['uemail']= "Email cannot be empty";
        }else if(this.state.uemail != ""){
            var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
            if (reg.test(this.state.uemail) == false) {
                err['uemail']= "Invalid Email address format";                
            }
        }
        if(this.state.ufirstname == ""){
            err['ufirstname'] = "Please enter firstname";
        }  
        if(this.state.ulastname == ""){
            err['ulastname'] = "Please enter lastname";
        }
        if(this.state.uphone == ""){
            err['uphone'] = "Please enter Phone";
        }  
        if(this.state.ucity == ""){
            err['ucity'] = "Please enter City";
        }
        if(Object.keys(err).length > 0){
            this.setState({errors:err}); 
        }else{
            const data ={
                "email":this.state.uemail,
                "first_name":this.state.ufirstname,
                "last_name":this.state.ulastname,
                "phone":this.state.uphone,
                "city":this.state.ucity,
                "updateEmail":updateEmail                
            }

            const response = await httpRequest.requestPostWithURLEncoded("http://localhost/practise/update.php", data, {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",                
                }
            });
            
            if($.trim(response.status) == 'Success'){
                const existingPost = this.state.userInfo[i];
                const updatedPost = update(existingPost, { email: { $set: this.state.uemail }, phone : { $set: this.state.uphone }, city: { $set: this.state.ucity }, first_name: { $set: this.state.ufirstname }, last_name: { $set: this.state.ulastname } });
                let updatedPosts = update(this.state.userInfo, { [i]: { $set: updatedPost } });
                this.setState({ userInfo: updatedPosts });
                this.setState({showhide:-1});
                
                this.setState({status:'Data has updated successfully'});
                $(".errorTextBox").fadeIn("slow");
                setTimeout(function(){ $(".errorTextBox").fadeOut("slow"); }, 3000);                
            }else{
                this.setState({status:'Unable to update data'});
                $(".errorTextBox").fadeIn("slow");
                setTimeout(function(){ $(".errorTextBox").fadeOut("slow"); }, 3000);
            }
        }
    }
    



    async valueSet(field, i, evt) {
        const existingPost = this.state.arrHobbies[i];
        const updatedPost = update(existingPost, { value: { $set: evt.target.checked ? evt.target.value : '' } });
        let updatedPosts = update(this.state.arrHobbies, { [i]: { $set: updatedPost } });
        //console.log(updatedPosts,'cheVALLL>>');
        await this.setState({ arrHobbies: updatedPosts });
    }

    /* It is invoked to return html content */
    render() {
        //console.log(this.state.errors,"Errors");
        //console.log(this.state.data,"Table Data");
        //console.log(this.state.showhide,"Table Data");
        //console.log("UEMail", this.state.uemail);

        
        return (
            <div className="bgcolor">
                 <div className="errorTextBox">
                    { this.state.status != '' ? this.state.status : '' }
                 </div>
                 
                 <div id="menuIcon"><i className="fa fa-list"></i></div>
                 <div className="toggleTable">
                    <table className="tableStyle">
                        <thead>
                            <th>S.No</th>
                            <th>Email</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Phone</th>
                            <th>City</th>
                            <th>Actions</th>
                        </thead>

                        {this.state.userInfo.length > 0 ? this.state.userInfo.map((dynamicComponent, index) => <tbody key={index}>
                            
                            {index  == this.state.showhide ? 
                            <tr id={'tr_'+index}>
                                <td>{index+1}</td>
                                <td>
                                    <input className="form-control" type="email" required id="uemail" placeholder='Email *' onChange={this.setValue.bind(this, 'uemail')} defaultValue={dynamicComponent.email} />
                                    { Object.keys(this.state.errors).length > 0 ? <p className="errorTxt">{this.state.errors.uemail}</p>: '' }
                                </td>
                                <td>
                                    <input className="form-control" required id="ufirstname" placeholder='First Name' onChange={this.setValue.bind(this, 'ufirstname')} defaultValue={dynamicComponent.first_name} />
                                    { Object.keys(this.state.errors).length > 0 ? <p className="errorTxt">{this.state.errors.ufirstname}</p>: '' }
                                </td>
                                <td>
                                    <input className="form-control" required id="ulastname" placeholder='Last Name' onChange={this.setValue.bind(this, 'ulastname')} defaultValue={dynamicComponent.last_name} />
                                    { Object.keys(this.state.errors).length > 0 ? <p className="errorTxt">{this.state.errors.ulastname}</p>: '' }    
                                </td>
                                <td>
                                    <input className="form-control" required id="uphone" placeholder='Phone' onChange={this.setValue.bind(this, 'uphone')} defaultValue={ dynamicComponent.phone} />
                                    { Object.keys(this.state.errors).length > 0 ? <p className="errorTxt">{this.state.errors.uphone}</p>: '' }    
                                </td>
                                <td>
                                    <input className="form-control" required id="ucity" placeholder='City' onChange={this.setValue.bind(this, 'ucity')} defaultValue={dynamicComponent.city} />
                                    { Object.keys(this.state.errors).length > 0 ? <p className="errorTxt">{this.state.errors.ucity}</p>: '' } 
                                </td>
                                <td>
                                    <button type="button" name="save" className="btn" onClick={this.saveTableRow.bind(this,index,dynamicComponent.email)} >Save</button> &nbsp;
                                    <button type="button" name="Cancel" className="btn btn-danger" onClick={this.cancelTableRow.bind(this)} >Cancel</button>
                                </td>
                            </tr>
                            : 
                            <tr id={'tr_'+index}>
                                <td>{index+1}</td>
                                <td>{dynamicComponent.email}</td>
                                <td>{dynamicComponent.first_name}</td>
                                <td>{dynamicComponent.last_name}</td>
                                <td>{dynamicComponent.phone}</td>
                                <td>{dynamicComponent.city}</td>
                                <td>
                                    <i className="fa fa-edit" onClick={this.editTableRow.bind(this,index)}></i>
                                    <i className="fa fa-times" onClick={this.deleteTableRow.bind(this,index)}></i>
                                </td>
                            </tr>
                            }
                        </tbody>) : <tbody><tr><td className="norecords" colSpan="6">No Records</td></tr></tbody>}
                    </table>
                </div>




                <div className="regContainer" style={{background:'#57b3f1'}}>

                    <h2>Registration Page</h2>
                    
                    
                    <div className="regInnCont">
                        <div className="fields">
                            <div className="fieldname">UserName / Email :</div>
                            <div className="fieldvalue">
                                <input type="email" id="email" onChange={this.setValue.bind(this, 'email')} value={this.state.email} />
                                { Object.keys(this.state.errors).length > 0 ? <p className="errorTxt">{this.state.errors.email}</p>: '' }
                            </div>
                        </div>

                        <div className="fields">
                            <div className="fieldname">Password :</div>
                            <div className="fieldvalue"><input type="password" onChange={this.setValue.bind(this, 'password')} value={this.state.password} />
                            { Object.keys(this.state.errors).length > 0 ? <p className="errorTxt">{this.state.errors.password}</p>: '' }
                            </div>
                        </div>

                        <div className="fields">
                            <div className="fieldname">Confirm Password :</div>
                            <div className="fieldvalue"><input type="password" onChange={this.setValue.bind(this, 'cpassword')} value={this.state.cpassword} />
                            { Object.keys(this.state.errors).length > 0 ? <p className="errorTxt">{this.state.errors.cpassword}</p>: '' }
                            </div>
                        </div>

                    </div>

                    <div className="regInnCont">


                        <div className="fields half">
                            <div className="fieldname">First Name :</div>
                            <div className="fieldvalue"><input type="text" onChange={this.setValue.bind(this, 'firstname')} value={this.state.firstname} />
                            { Object.keys(this.state.errors).length > 0 ? <p className="errorTxt">{this.state.errors.firstname}</p>: '' }
                            </div>
                        </div>

                        <div className="fields half fright">
                            <div className="fieldname">LastName :</div>
                            <div className="fieldvalue"><input type="text" onChange={this.setValue.bind(this, 'lastname')} value={this.state.lastname} />
                            { Object.keys(this.state.errors).length > 0 ? <p className="errorTxt">{this.state.errors.lastname}</p>: '' }
                            </div>
                        </div>
                        <div className="fields">
                            <div className="fieldname">Gender :</div>
                            <div className="fieldvalue">
                                <p><input type="radio" value="Male" onChange={this.setValue.bind(this,'gender')} checked={this.state.gender === "Male"} /> Male </p>
                                <p><input type="radio" value="Female" onChange={this.setValue.bind(this,'gender')} checked={this.state.gender === "Female"} /> Female </p>
                                { Object.keys(this.state.errors).length > 0 ? <p className="errorTxt">{this.state.errors.gender}</p>: '' }
                            </div>
                        </div>
                        <div className="fields">
                            <div className="fieldname">Phone Number :</div>
                            <div className="fieldvalue"><input type="number" onChange={this.setValue.bind(this, 'phone')} value={this.state.phone} />
                            { Object.keys(this.state.errors).length > 0 ? <p className="errorTxt">{this.state.errors.phone}</p>: '' }
                            </div>
                        </div>
                        <div className="fields">
                            <div className="fieldname">City :</div>
                            <div className="fieldvalue">
                                <select onChange={this.setValue.bind(this, 'city')} value={this.state.city}>
                                    <option value="">-- Select City --</option>
                                    <option value="Hyderabad">Hyderabad</option>
                                    <option value="Secunderabad">Secunderabad</option>
                                </select>
                                { Object.keys(this.state.errors).length > 0 ? <p className="errorTxt">{this.state.errors.city}</p>: '' }
                            </div>
                        </div>
                        
                        <div className="fields">
                            <div className="fieldname">Hobbies : </div>
                            <div className="fieldvalue">
                            {this.state.hobbies.map((opt, i) =>
                                <div key={i}>
                                <input type="checkbox" checked={opt.value == this.state.arrHobbies[i].value ? true : false} value={opt.value} id={i} onChange={this.valueSet.bind(this, 'hobbi', i)} name={i} /> {opt.value}
                                </div>
                            )}
                            { Object.keys(this.state.errors).length > 0 ? <p className="errorTxt">{this.state.errors.hobbies}</p>: '' }
                            </div>
                        </div>    

                        <div className="fields">
                            <div className="fieldname">About : </div>
                            <div className="fieldvalue">
                                <textarea onChange={this.setValue.bind(this, 'about')} value={this.state.about}></textarea>
                                { Object.keys(this.state.errors).length > 0 ? <p className="errorTxt">{this.state.errors.about}</p>: '' }
                            </div>
                        </div>

                        <div className="fields text-center">
                            <button className="submitbtn" onClick={this.sendValues.bind(this)} type="button">Submit</button>
                        </div>
                    </div>


                </div>

            </div>
        );
    }
}

export default RegForm;
