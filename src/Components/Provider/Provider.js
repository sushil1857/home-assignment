import React from 'react'

const providerControl = props => ( 
    <section className="container mt-4 mb-4">
        <div className="container">
            <div className="row mb-3">
            {props.getProviderRecords()}
            </div>
        </div>
    </section>
);

export default providerControl