import React, { useEffect, useState } from 'react';
import axios from 'axios';

function DonationData() {
    const [donations, setDonations] = useState([]);
    const [error, setError] = useState('');
    const [takenDonations, setTakenDonations] = useState(new Set());
    const [cityFilter, setCityFilter] = useState(''); // State for filtering by city

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('authToken');
                const response = await axios.get('http://localhost:5000/api/food/fetchallfoods', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setDonations(response.data);
            } catch (error) {
                setError(error.response?.data?.error || 'Failed to load donation data.');
            }
        };

        fetchData();
    }, []);

    const handleWantToTake = (donationId) => {
        setTakenDonations((prev) => new Set([...prev, donationId]));
    };

    const handleTookFood = async (donation) => {
        try {
            const token = localStorage.getItem('authToken');
            await axios.post(
                'http://localhost:5000/api/food/tookfood',
                { donationId: donation._id },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            setDonations((prev) => prev.filter((d) => d._id !== donation._id));
        } catch (error) {
            setError(error.response?.data?.error || 'Failed to save donation to history.');
        }
    };

    const filteredDonations = donations.filter((donation) =>
        donation.city?.toLowerCase().includes(cityFilter.toLowerCase()) // Safe navigation operator to prevent errors
    );

    return (
        <div className="donation-data-container">
            <h2>Donation Data</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            
            <div className="filter-section">
                <input
                    type="text"
                    placeholder="Filter by city"
                    value={cityFilter}
                    onChange={(e) => setCityFilter(e.target.value)}
                    className="form-control mb-3 w-50 text-center mx-auto"
                />
            </div>
            
            {!error && filteredDonations.length > 0 ? (
                <table className="table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Address</th>
                            <th>City</th>
                            <th>Description</th>
                            <th>Contact Number</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredDonations.map((donation) => (
                            <tr key={donation._id}>
                                <td>{donation.name}</td>
                                <td>{donation.email}</td>
                                <td>{donation.address}</td>
                                <td>{donation.city || 'N/A'}</td> {/* Fallback for missing city */}
                                <td>{donation.description}</td>
                                <td>{donation.contactNumber}</td>
                                <td>
                                    {!takenDonations.has(donation._id) ? (
                                        <button
                                            className="btn btn-primary"
                                            onClick={() => handleWantToTake(donation._id)}
                                        >
                                            Want to Take
                                        </button>
                                    ) : (
                                        <button
                                            className="btn btn-success"
                                            onClick={() => handleTookFood(donation)}
                                        >
                                            Took Food
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <div className="alert alert-info">No donations available.</div>
            )}
        </div>
    );
}

export default DonationData;
