import React, { useState } from 'react'
import './styles/profile.css'
import { motion } from 'framer-motion'
import districts from "../../public/district.json"
import { getkey, setlocaldata, getlocaldata } from './localStorage/currentUser.js'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

const Profile = ({ set }) => {

    const { firstName, lastName, phoneNumber, district, profileImage } = getlocaldata()

    let [inputs, setInputs] = useState({ firstName: firstName, lastName: lastName, phoneNumber: phoneNumber, district: district })
    const [errors, setErrors] = useState({})
    let [refresh, setRefresh] = useState(false)

    let [file, setFile] = useState(null)

    const token = getkey()


    let updateUser = (e) => {

        e.preventDefault()
        let err = {}


        if (!inputs.firstName) {
            err.firstName = "First name is required";
        } else if (inputs.firstName.length < 3) {
            err.firstName = "Minimum 3 characters";
        }

        if (!inputs.lastName) {
            err.lastName = "last name is required";
        }
        else if (inputs.lastName.length < 1) {
            err.lastName = "Minimum 1 characters";
        }

        let mobilval = /^[6-9]\d{9}$/;

        if (!inputs.phoneNumber) {
            err.phoneNumber = "Mobile Number is required";
        }
        else if (!mobilval.test(inputs.phoneNumber)) {
            err.phoneNumber = "invalid Mobile Number";
        }

        setErrors(err)

        const formData = new FormData()

        formData.append("FirstName", inputs.firstName)
        formData.append("lastName", inputs.lastName);
        formData.append("phoneNumber", inputs.phoneNumber);
        formData.append("district", inputs.district);
        formData.append("profileImage", file);

        console.log(formData);



        if (Object.keys(err).length == 0) {
            let updateapi = async () => {
                try {
                    const update = await fetch('http://localhost:4500/api/v1/agreesmart/users/update', {
                        method: "PUT",
                        headers: { "Authorization": `Bearer ${token}` },
                        body: formData
                    })

                    const response = await update.json()
                    console.log(response);

                    setlocaldata('User', response.response)
                    setRefresh(!refresh)

                }
                catch (error) {

                }
            }
            updateapi()
        }


    }

    const navigate = useNavigate()

    let logout = () => {
        Swal.fire({
            title: "Dou want to Logout?",

            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Logout!"
        }).then((result) => {
            if (result.isConfirmed) {
                let timerInterval;
                Swal.fire({
                    title: "Logging Out!",
                    // html: "I will close in <b></b> milliseconds.",
                    timer: 2000,
                    timerProgressBar: true,
                    didOpen: () => {
                        Swal.showLoading();
                        const timer = Swal.getPopup().querySelector("b");
                        // timerInterval = setInterval(() => {
                        //     timer.textContent = `${Swal.getTimerLeft()}`;
                        // }, 100);
                    },
                    willClose: () => {
                        clearInterval(timerInterval);
                    }
                }).then((result) => {
                    /* Read more about handling dismissals below */
                    if (result.dismiss === Swal.DismissReason.timer) navigate('/');
                });
            }
        });

    }

    return (
        <div className='profilesection  d-flex justify-content-end ' >


            <div className="inside">
                <div className="header d-flex justify-content-between align-items-center" >
                    <h4 className='text-white'>✏️ Edit Profile</h4>
                    <button onClick={() => set(false)}> <i className="fa-solid fa-xmark"></i> Close</button>
                </div>
                <div className="body">


                    <form onSubmit={updateUser}>
                        <div className="editprofile d-flex flex-column justify-content-between align-items-center my-3">
                            <div className="outer">
                                <div className="photo">
                                    <img src={profileImage} alt="" />

                                </div>

                                <div className="camera">
                                    📷
                                    <input type="file" className='file' onChange={(e) => setFile(e.target.files[0])} />
                                </div>
                            </div>


                            <h4>{firstName}</h4>
                            <p>🌾 Farmer · {district}</p>
                            <p>Click photo to change</p>
                        </div>

                        <p>PERSONAL DETAILS</p>
                        <div className="box2">
                            <div className="two w-50">
                                <label htmlFor="">FIRST NAME</label>
                                <input type="text" value={inputs.firstName} required maxLength="15" placeholder='First Name' onChange={(e) => setInputs({ ...inputs, firstName: e.target.value })} />
                                <span >{errors.firstName}</span>
                            </div>
                            <div className="two w-50">
                                <label htmlFor="">LAST NAME</label>
                                <input type="text" value={inputs.lastName} required maxLength="10" placeholder='Last Name' onChange={(e) => setInputs({ ...inputs, lastName: e.target.value })} />
                                <span >{errors.lastName}</span>
                            </div>

                        </div>

                        <div className="box">
                            <label htmlFor="">PHONE NUMBER</label>
                            <input type="number" value={inputs.phoneNumber} required placeholder='Phone' onChange={(e) => setInputs({ ...inputs, phoneNumber: e.target.value })} />
                            <span >{errors.phoneNumber}</span>

                        </div>
                        <div className="box">
                            <label htmlFor="">District</label>
                            <select name="" id="" value={inputs.district} onChange={(e) => setInputs({ ...inputs, district: e.target.value })}>
                                <option value="">Select District</option>
                                {districts ? (districts.districts.map((ele, idx) => (
                                    <option value={ele.name} key={idx}>{ele.name}</option>
                                ))) : (<option value="">Select District</option>)}

                            </select>

                        </div>



                        <div className="box">
                            <button className=" " type="submit">Save Changes</button>
                        </div>
                        <div className="box logoutbox">
                            <label htmlFor="">Account</label>
                            <button className=" " type="button" onClick={logout}>🚪 Logout from Account</button>
                        </div>

                    </form>
                </div>
            </div>


        </div>
    )
}

export default Profile