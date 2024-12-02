import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Countsection() {
    const [donorCount, setDonorCount] = useState(0);
    const [donationCount, setDonationCount] = useState(0);

    useEffect(() => {
        const fetchCounts = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/donors/count');
                setDonorCount(response.data.count); // Donor count from backend
                setDonationCount(response.data.donationCount); // Registered user count
            } catch (error) {
                console.error('Error fetching counts:', error);
            }
        };

        fetchCounts();
    }, []);

    return (
        <div className="container px-4 mt-5">
            <div className="row gx-5">
                {/* Donor Count Section */}
                <div className="col-md-6 col-12 mt-1">
                    <div className="fs-1 border border-2 text-center p-5 rounded-3">
                        <div className="fs-1">{donorCount}</div>
                        Donor Count
                    </div>
                </div>

                {/* Registered User Count Section */}
                <div className="col-md-6 col-12 mt-1">
                    <div className="fs-1 border border-2 text-center p-5 rounded-3">
                        <div className="fs-1">{donationCount}</div>
                        Registered Users
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Countsection;
