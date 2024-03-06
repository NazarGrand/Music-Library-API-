import "./ErrorComponent.scss";
import imgError from "../../assets/images/Technics.png";
import { Link } from "react-router-dom";
import { ROUTES } from "../../utils/routes";

export default function ErrorComponent() {
    return (
        <div className="error-page">
            <h1 className="error-page__title">OOps!</h1>
            <p className="error-page__subtitle">Sorry,this page doesn't exist.</p>    
            
            <button className="error-page__button">
                <Link className="error-page__button-link" to={ROUTES.HOME}>
                    Back to Home
                </Link>
            </button>
           
            <img className="error-page__img-404" src={imgError} alt="error" />
        </div> 
    );
}; 