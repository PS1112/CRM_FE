import { useNavigate } from "react-router-dom";
import './unauthorized.css';

const Unauthorized = () => {
    const navigate = useNavigate();

    const goBack = () => {
        navigate('/');
    }

    return (
        <div className="container-fluid unauth">
            <div className="container-xxl">
                <div className="row unauthorized">
                    <div className="col col-xxl-5 col-xl-5 col-lg-5 col-md-8 col-sm-8 py-4 auth_border">
                        <div className=" pb-3">
                            <div className="d-flex flex-column justify-content-center ">
                                <h1 className=" ">Unauthorized</h1>
                                <br />
                                <p className=" ">You do not have access to the requested page.</p>
                                <div className="flexGrow">
                                    <button onClick={goBack} className="section1-button fw-semibold">Go Back</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Unauthorized