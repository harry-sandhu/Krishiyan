import React, { useState, ChangeEvent, FormEvent } from 'react';
import Header from './Header';
import './AccountSetting.css';

interface AccountSettingsState {
    nameOfOrgan: string;
    fullAddress: string;
    organizationType: string;
    primaryContactPerson: string;
    noOfFarmers: string;
    cropClusters: string;
    emailId: string;
    profilePic: File | null;
}

const AccountSettings: React.FC = () => {
    const [state, setState] = useState<AccountSettingsState>({
        nameOfOrgan: '',
        fullAddress: '',
        organizationType: '',
        primaryContactPerson: '',
        noOfFarmers: '',
        cropClusters: '',
        emailId: '',
        profilePic: null,
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setState(prevState => ({ ...prevState, [name]: value }));
    };

    const handleProfilePicChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            // setState(prevState => ({ ...prevState, profilePic: e.target.files[0] }));
        }
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log("Form submitted");
    };

    return (
        <div className="account-settings-component">
            <Header title="Farmer" subtitle="Account Settings" />
            <h2 className="regheading">Account Settings</h2>
            <section className="accountsetting">
                <form onSubmit={handleSubmit}>
                    <div className='flex'>
                        <label>Name of the Organization:</label>
                        <input type="text" name="nameOfOrgan" value={state.nameOfOrgan} onChange={handleChange} />
                    </div>
                    <div className='flex'>
                        <label>Full Address:</label>
                        <textarea name="fullAddress"></textarea>
                    </div>
                    <div className='flex'>
                        <label>Organization Type:</label>
                        <select name="organizationType" value={state.organizationType} onChange={handleChange}>
                            <option value="">Select</option>
                            <option value="Type1">Type 1</option>
                            <option value="Type2">Type 2</option>
                        </select>
                    </div>
                    <div className='flex'>
                        <label>Primary Contact Person:</label>
                        <input type="text" name="primaryContactPerson" value={state.primaryContactPerson} onChange={handleChange} />
                    </div>
                    <div className='flex'>
                        <label>No. of Farmers:</label>
                        <input type="number" name="noOfFarmers" value={state.noOfFarmers} onChange={handleChange} />
                    </div>
                    <div className='flex'>
                        <label>Crop Clusters:</label>
                        <input type="text" name="cropClusters" value={state.cropClusters} onChange={handleChange} />
                    </div>
                    <div className='flex'>
                        <label>Email ID:</label>
                        <input type="email" name="emailId" value={state.emailId} onChange={handleChange} />
                    </div>
                    <div className='flex'>
                        <label>Profile Picture:</label>
                        <input type="file" onChange={handleProfilePicChange} />
                    </div>
                    <div className='flex'>
                        <button type="submit">Save</button>
                    </div>
                </form>
            </section>
        </div>
    );
};

export default AccountSettings;
