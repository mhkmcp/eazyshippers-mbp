import React from 'react';
import { Button, Form } from 'react-bootstrap';
import MainContentLayout from '../../../Layouts/MainContentLayout/MainContentLayout';

const IdentificationDocuments = () => {
    return (
        <div>
            <MainContentLayout title="Identifications Documents">
                <div className="p-3">
                    <h6>For High Value Purchases, we require a photo or scan of the following documents  before we can procced with the shipment</h6>
                    <div className="w-50"> <br/>
                        <h4>For Individuals</h4>
                        <hr/>
                        <ul>
                            <li style={{listStyle: 'none'}}>Passport</li>
                            <li style={{listStyle: 'none'}}>Driving License</li>
                        </ul> <br/>
                        
                        <h4>For Businesses</h4>
                        <hr/>
                        <ul>
                            <li style={{listStyle: 'none'}}>Imported Code</li>
                            <li style={{listStyle: 'none'}}>VAT Certificate or TRN No</li>
                            <li style={{listStyle: 'none'}}>Trade License</li>
                        </ul>
                        <Form>
                            <Form.File 
                                id="custom-file"
                                label="Upload File"
                                custom
                            />
                        </Form>
                        <p className="text-center"><small>Upto 4 files JEPG, PNG, PDF <br/>Maximum size 10MB/file</small></p>
                        <Button className="btn-block text-info font-weight-bold rounded-pill py-2 my-3" variant="outline-secondary">Skip</Button>
                    </div>
                </div>
            </MainContentLayout>
        </div>
    );
};

export default IdentificationDocuments;