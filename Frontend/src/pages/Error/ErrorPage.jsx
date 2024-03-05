import "./ErrorPage.scss";
import imgError from "../../assets/Technics.png";
import { Link } from "react-router-dom";
import { ROUTES } from "../../utils/routes";

export default function ErrorPage() {
    return (
        <div className="error-page">
            <h1>OOps!</h1>
            <p>Sorry,this page doesn't exist.</p>    
            <Link to={ROUTES.HOME}>
                <button className="button-page">Back to Home</button>
            </Link>
            <img className="img-page" src={imgError} alt="error" />
        </div> 
    );
} 